/* ------------------------------------------------------------------
   game.js — the engine.

   CAMERA ARITHMETIC
   -----------------
   The stage shows one screen. The world is 2.5 screens wide. Layers pan
   at different rates, and each is sized so it never runs out of art at
   full camera travel:

     layer   width      depth   max travel      needs >=
     back    1.8 screen  0.50   0.75 screen     1.75  ok
     mid     2.5 screen  1.00   1.50 screen     2.50  ok
     fg      3.0 screen  1.25   1.875 screen    2.875 ok

   Hotspots and the character live on the mid layer, so they can never
   drift away from the furniture they belong to.
-------------------------------------------------------------------*/
(function () {
  'use strict';

  const WORLD = 2.5;                 // world width, in screens
  const DEPTH = { back: 0.5, mid: 1, fg: 1.25 };
  const WIDTH = { back: 1.8, mid: 2.5, fg: 3.0 };
  const VIEW  = 1 / WORLD * 100;     // % of the world visible at once = 40
  const WALK_SPEED = 15;             // world-% per second — an unhurried walk

  const $ = id => document.getElementById(id);
  const el = {
    title: $('screen-title'), game: $('screen-game'), card: $('screen-card'),
    stage: $('stage'), back: $('layer-back'), mid: $('layer-mid'), fg: $('layer-fg'),
    hotspots: $('hotspots'), actor: $('actor'), nudge: $('nudge'),
    edgeL: $('edge-l'), edgeR: $('edge-r'),
    dialogue: $('dialogue'), dWho: $('dialogue-who'), dLine: $('dialogue-line'), dNext: $('dialogue-next'),
    objective: $('objective'), pips: $('pips'),
    btnStart: $('btn-start'), btnHelp: $('btn-help'), btnNotebook: $('btn-notebook'),
    scrim: $('scrim'), evMount: $('evidence-mount'), mClose: $('modal-close'),
    caption: $('caption'), captionText: $('caption-text'),
    pScrim: $('puzzle-scrim'), pNotebook: $('puzzle-notebook'),
    pTag: $('puzzle-tag'), pHeading: $('puzzle-heading'), pPrompt: $('puzzle-prompt'), pRiddle: $('puzzle-riddle'),
    dials: $('dials'), pMsg: $('puzzle-msg'), pTry: $('puzzle-try'), pSkip: $('puzzle-skip'),
    nScrim: $('notebook-scrim'), nBody: $('notebook-body'), nClose: $('notebook-close'),
    cKicker: $('card-kicker'), cHeading: $('card-heading'), cText: $('card-text'), cNext: $('card-next')
  };

  const state = {
    act: 0,
    sceneKey: null,
    scene: null,
    x: 50,                 // character position, world-%
    facing: 1,
    camera: 0,             // world-%, left edge of the view
    walking: null,         // { to, then }
    found: [],             // ids of evidence collected, in order
    notebook: [],          // { tag, heading, record }
    chainIndex: 0,
    seqIndex: 0,
    dialogueIdx: 0,
    activeSpot: null,
    cardNext: null,
    finished: false,
    editing: /[?&]edit\b/.test(location.search)
  };

  /* =================================================================
     THE CHARACTER

     The figure is a drawn sprite, cut in two at the coat hem. The body
     piece never moves; the leg piece is drawn twice and the two copies
     swing in opposite directions about the hip, which is the top-centre
     of the leg image. That keeps the original CSS walk cycle working
     with painted art, which a single flat sprite could not do — it would
     just slide along the floor.

     The back leg is the same image darkened, so one drawing covers both.
     Set ACTOR.svg instead of ACTOR.body to go back to vector shapes.
  ==================================================================*/
  const ACTOR = {
    body:   'assets/img/player-body.png',
    leg:    'assets/img/player-leg.png',
    aspect: 0.2311,      // width / height of the whole figure
    legTop: 66.56,       // % down the figure where the hip pivot sits
    legH:   33.44,       // % of the figure's height taken by the leg piece
    bodyH:  69.67
  };

  function buildActor() {
    return '' +
      '<img class="a-leg a-leg-b" src="' + ACTOR.leg + '" alt="">' +
      '<img class="a-leg a-leg-a" src="' + ACTOR.leg + '" alt="">' +
      '<img class="a-body" src="' + ACTOR.body + '" alt="">';
  }

  function styleActor() {
    el.actor.style.aspectRatio = ACTOR.aspect;
    el.actor.style.setProperty('--leg-top', ACTOR.legTop + '%');
    el.actor.style.setProperty('--leg-h', ACTOR.legH + '%');
    el.actor.style.setProperty('--body-h', ACTOR.bodyH + '%');
  }

  /* =================================================================
     LAYOUT
  ==================================================================*/
  function paintScene() {
    const art = SCENES[state.scene.art];
    el.back.innerHTML = art.back;
    el.fg.innerHTML   = art.fg;
    // the mid layer keeps its hotspot and actor children, so the art
    // goes into a dedicated node underneath them
    let artNode = el.mid.querySelector('.layer-art');
    if (!artNode) {
      artNode = document.createElement('div');
      artNode.className = 'layer-art';
      el.mid.insertBefore(artNode, el.mid.firstChild);
    }
    artNode.innerHTML = art.mid;

    el.back.style.width = WIDTH.back * 100 + '%';
    el.mid.style.width  = WIDTH.mid  * 100 + '%';
    el.fg.style.width   = WIDTH.fg   * 100 + '%';
  }

  function applyCamera() {
    // camera is expressed in world-%, converted to screen widths
    const screens = state.camera / 100 * WORLD;
    el.back.style.transform = `translateX(${-screens * DEPTH.back * 100 / WIDTH.back}%)`;
    el.mid.style.transform  = `translateX(${-screens * DEPTH.mid  * 100 / WIDTH.mid}%)`;
    el.fg.style.transform   = `translateX(${-screens * DEPTH.fg   * 100 / WIDTH.fg}%)`;
    el.edgeL.classList.toggle('is-on', state.camera > 1);
    el.edgeR.classList.toggle('is-on', state.camera < 100 - VIEW - 1);
  }

  function centreCamera(instant) {
    const want = Math.max(0, Math.min(100 - VIEW, state.x - VIEW / 2));
    if (instant) {
      state.camera = want;
    } else {
      state.camera += (want - state.camera) * 0.12;   // eased follow
    }
    applyCamera();
  }

  function placeActor() {
    el.actor.style.left = state.x + '%';
    el.actor.style.transform = `translateX(-50%) scaleX(${state.facing})`;
  }

  /* =================================================================
     WALKING — one axis, so this is just a number moving
  ==================================================================*/
  function walkTo(target, then) {
    target = Math.max(3, Math.min(97, target));
    if (Math.abs(target - state.x) < 1.2) { state.x = target; if (then) then(); return; }
    state.facing = target > state.x ? 1 : -1;
    state.walking = { to: target, then: then || null };
    el.actor.classList.add('is-walking');
  }

  let last = performance.now();
  function tick(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;

    if (state.walking) {
      const w = state.walking;
      const dir = Math.sign(w.to - state.x);
      state.x += dir * WALK_SPEED * dt;
      if ((dir > 0 && state.x >= w.to) || (dir < 0 && state.x <= w.to)) {
        state.x = w.to;
        state.walking = null;
        el.actor.classList.remove('is-walking');
        if (w.then) w.then();
      }
      placeActor();
    }
    if (el.game.classList.contains('is-active')) centreCamera(false);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  /* =================================================================
     HOTSPOTS
  ==================================================================*/
  /* Ambient objects are always live. The chain shows only its next
     link. Curiosity is never gated; the lesson still has one path. */
  function visibleSpots() {
    const ambient = state.scene.ambient || [];
    const spots = state.scene.hotspots;
    if (state.editing) return ambient.concat(spots);
    if (!state.scene.chained) {
      return ambient.concat(spots.filter(s => !s.hidden || state.found.indexOf(s.id) >= 0));
    }
    const next = spots[state.chainIndex];
    return next ? ambient.concat([next]) : ambient.slice();
  }

  function renderHotspots() {
    el.hotspots.innerHTML = '';
    el.hotspots.classList.toggle('is-editing', state.editing);
    visibleSpots().forEach(spot => {
      const b = spot.box;
      const btn = document.createElement('button');
      btn.className = spot.kind === 'look' ? 'hotspot hotspot-look' : 'hotspot';
      btn.type = 'button';
      btn.style.left = b.left + '%';
      btn.style.top = b.top + '%';
      btn.style.width = b.width + '%';
      btn.style.height = b.height + '%';
      btn.setAttribute('aria-label', spot.label);
      btn.addEventListener('click', e => { e.stopPropagation(); approach(spot); });
      el.hotspots.appendChild(btn);
    });
    renderPips();
  }

  /* Walking is never a toll: one click both walks you there and opens
     the thing you clicked. */
  function approach(spot) {
    state.activeSpot = spot;
    walkTo(spot.standAt, () => {
      faceToward(spot);
      trigger(spot);
    });
  }

  /* On arrival, turn to face the thing itself. Travel direction is the
     wrong cue: the stand point is offset from the object, so walking to
     it from the far side leaves him looking the opposite way. */
  function faceToward(spot) {
    const centre = spot.box.left + spot.box.width / 2;
    state.facing = centre >= state.x ? 1 : -1;
    placeActor();
  }

  function trigger(spot) {
    if (spot.kind === 'talk')      return startDialogue(spot);
    if (spot.kind === 'evidence')  return openEvidence(spot);
    if (spot.kind === 'puzzle')    return openPuzzle(spot);
    if (spot.kind === 'exit')      return gotoScene(spot.to);
    if (spot.kind === 'look')      return showCaption(spot.caption);
  }

  function renderPips() {
    if (!state.scene.chained) { el.pips.innerHTML = ''; return; }
    el.pips.innerHTML = state.scene.hotspots
      .map((_, i) => '<span class="pip' + (i < state.chainIndex ? ' is-found' : '') + '"></span>')
      .join('');
  }

  /* =================================================================
     DIALOGUE
  ==================================================================*/
  function startDialogue(spot) {
    state.dialogueIdx = 0;
    el.dialogue.hidden = false;
    el.dWho.textContent = spot.speaker;
    renderDialogueLine(spot);
  }

  function renderDialogueLine(spot) {
    el.dLine.innerHTML = spot.lines[state.dialogueIdx];
    const last = state.dialogueIdx === spot.lines.length - 1;
    el.dNext.innerHTML = last ? 'Thanks &rsaquo;' : 'Continue &rsaquo;';
    el.dNext.focus({ preventScroll: true });
  }

  el.dNext.addEventListener('click', () => {
    const spot = state.activeSpot;
    if (!spot) return;
    if (state.dialogueIdx < spot.lines.length - 1) {
      state.dialogueIdx++;
      renderDialogueLine(spot);
    } else {
      el.dialogue.hidden = true;
      if (spot.unlocks) {
        state.found.push(spot.unlocks);
        renderHotspots();
      }
      if (spot.thenObjective) el.objective.innerHTML = spot.thenObjective;
    }
  });

  /* =================================================================
     EVIDENCE
  ==================================================================*/
  function openEvidence(spot) {
    el.evMount.innerHTML = buildEvidence(spot);
    wirePlainToggle();
    el.scrim.hidden = false;
    const panel = el.scrim.querySelector('.modal');
    if (panel) panel.scrollTop = 0;
    el.mClose.focus({ preventScroll: true });

    if (state.notebook.every(n => n.id !== spot.id)) {
      // the quote goes in too: the puzzle's numbers live in the quotes,
      // and the chain hides items once they are found, so the notebook
      // has to be a complete record rather than a summary
      state.notebook.push({
        id: spot.id, tag: spot.tag, heading: spot.heading,
        quote: spot.quote, record: spot.record
      });
    }
  }

  /* The original wording stays on the sheet; the translation replaces
     only the text, so students keep the sense of handling a real thing. */
  function wirePlainToggle() {
    const btn = document.getElementById('plain-toggle');
    const paper = document.getElementById('the-paper');
    if (!btn || !paper) return;
    btn.addEventListener('click', () => {
      const plain = paper.classList.toggle('is-plain');
      btn.textContent = plain ? btn.dataset.on : btn.dataset.off;
      btn.setAttribute('aria-pressed', plain ? 'true' : 'false');
    });
  }

  el.mClose.addEventListener('click', () => {
    el.scrim.hidden = true;
    advanceChain();
  });

  function advanceChain() {
    const spot = state.scene.hotspots[state.chainIndex];
    state.chainIndex++;
    renderHotspots();
    if (state.chainIndex >= state.scene.hotspots.length) {
      el.objective.innerHTML = 'Every piece of evidence is in your notebook.';
      setTimeout(endAct, 500);
    } else if (spot && spot.hint) {
      el.objective.innerHTML = spot.hint;
    }
  }

  /* =================================================================
     THE PUZZLE — answers always live in evidence already read,
     and it is always skippable without penalty.
  ==================================================================*/
  let dialValues = [];

  function openPuzzle(spot) {
    const p = spot.puzzle;
    el.pTag.innerHTML = p.tag;
    el.pHeading.innerHTML = p.title;
    el.pPrompt.innerHTML = p.prompt;
    el.pRiddle.innerHTML = p.riddle;
    el.pSkip.textContent = p.skip;
    el.pMsg.innerHTML = '&nbsp;';
    if (p.kind === 'sequence') {
      el.pTry.hidden = true;
      renderSequence(p);
    } else {
      el.pTry.hidden = false;
      dialValues = p.slots.map(() => 0);
      renderDials(p);
    }
    el.pScrim.hidden = false;
  }

  /* ----------------------------------------------------------------
     Sequence puzzle: rebuild a torn document by reading it. Each piece
     is checked as it is clicked, so there is no submit step and no way
     to be stuck holding a wrong whole answer. Still skippable.
  -----------------------------------------------------------------*/
  function renderSequence(p) {
    state.seqIndex = 0;
    // a fixed shuffle, so the puzzle is the same for every student
    const order = [2, 0, 3, 1];
    el.dials.className = 'seq-wrap';
    el.dials.innerHTML =
      '<div class="seq-target" id="seq-target"><span class="seq-lead">' + p.blank + '</span></div>' +
      '<div class="seq-pieces" id="seq-pieces">' +
        order.map(i => '<button class="seq-piece" type="button" data-i="' + i + '">' +
                       p.pieces[i] + '</button>').join('') +
      '</div>';

    el.dials.querySelectorAll('.seq-piece').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = Number(btn.dataset.i);
        if (i !== state.seqIndex) {
          el.pMsg.innerHTML = p.wrong + ' <span class="puzzle-help">' + p.help + '</span>';
          btn.classList.remove('is-wrong');
          void btn.offsetWidth;
          btn.classList.add('is-wrong');
          return;
        }
        const target = document.getElementById('seq-target');
        const lead = target.querySelector('.seq-lead');
        if (lead) lead.remove();
        const span = document.createElement('span');
        span.className = 'seq-placed';
        span.textContent = (state.seqIndex ? ' ' : '') + p.pieces[i];
        target.appendChild(span);
        btn.disabled = true;
        state.seqIndex++;
        el.pMsg.innerHTML = '&nbsp;';
        if (state.seqIndex >= p.pieces.length) {
          el.pMsg.innerHTML = '<span class="puzzle-done">' + p.done + '</span>';
          setTimeout(() => solvePuzzle(state.activeSpot), 2600);
        }
      });
    });
  }

  function renderDials(p) {
    el.dials.className = 'dials';
    el.dials.innerHTML = '';
    p.slots.forEach((slot, i) => {
      const wrap = document.createElement('div');
      wrap.className = 'dial';
      wrap.innerHTML =
        '<button class="dial-arrow" type="button" aria-label="Increase ' + slot.label + '">&and;</button>' +
        '<output class="dial-num">' + dialValues[i] + '</output>' +
        '<button class="dial-arrow" type="button" aria-label="Decrease ' + slot.label + '">&or;</button>' +
        '<span class="dial-label">' + slot.label + '</span>';
      const [up, , down] = wrap.children;
      const num = wrap.querySelector('.dial-num');
      up.addEventListener('click', () => { dialValues[i] = (dialValues[i] + 1) % 10; num.textContent = dialValues[i]; });
      down.addEventListener('click', () => { dialValues[i] = (dialValues[i] + 9) % 10; num.textContent = dialValues[i]; });
      el.dials.appendChild(wrap);
    });
  }

  el.pTry.addEventListener('click', () => {
    const spot = state.activeSpot;
    const p = spot.puzzle;
    const ok = p.slots.every((s, i) => dialValues[i] === s.answer);
    if (ok) {
      solvePuzzle(spot);
    } else {
      el.pMsg.innerHTML = p.wrong + ' <span class="puzzle-help">' + p.help + '</span>';
      el.dials.classList.remove('is-wrong');
      void el.dials.offsetWidth;
      el.dials.classList.add('is-wrong');
    }
  });

  el.pSkip.addEventListener('click', () => solvePuzzle(state.activeSpot));

  function solvePuzzle(spot) {
    el.pScrim.hidden = true;
    openEvidence(spot);          // the drawer's contents ARE the fourth cause
  }

  /* =================================================================
     NOTEBOOK
  ==================================================================*/
  function openNotebook() {
    el.nBody.innerHTML = state.notebook.length
      ? state.notebook.map(n =>
          '<div class="note"><p class="note-tag">' + n.tag + '</p>' +
          '<p class="note-heading">' + n.heading + '</p>' +
          '<blockquote class="note-quote">' + n.quote + '</blockquote>' +
          '<p class="note-record">' + n.record + '</p></div>').join('')
      : '<p class="note-empty">Nothing written down yet.</p>';
    el.nScrim.hidden = false;
    el.nClose.focus({ preventScroll: true });
  }
  el.btnNotebook.addEventListener('click', openNotebook);
  // the puzzle's answers live in the notebook, so it has to be reachable
  // from inside the puzzle itself
  el.pNotebook.addEventListener('click', openNotebook);
  el.nClose.addEventListener('click', () => { el.nScrim.hidden = true; });

  /* =================================================================
     SCENE + ACT FLOW
  ==================================================================*/
  function gotoScene(key) {
    const act = CONTENT[ACT_ORDER[state.act]];
    state.sceneKey = key;
    state.scene = act.scenes[key];
    state.chainIndex = 0;
    state.found = [];
    state.x = state.scene.startAt;
    state.facing = state.scene.facing || 1;
    state.walking = null;
    el.actor.classList.remove('is-walking');
    el.dialogue.hidden = true;
    el.objective.innerHTML = state.scene.objective;
    paintScene();
    placeActor();
    centreCamera(true);
    renderHotspots();
    show(el.game);
  }

  /* One card renderer for the opening, the act break and the recap.
     Each card carries what happens when the button is pressed. */
  function showCard(data, next) {
    el.cKicker.innerHTML = data.kicker;
    el.cHeading.innerHTML = data.heading;
    el.cText.innerHTML = data.text;
    el.cNext.textContent = data.button.replace(/&mdash;/g, '—');
    state.cardNext = next;
    show(el.card);
    el.cNext.focus({ preventScroll: true });
  }

  function firstSceneOf(act) { return Object.keys(act.scenes)[0]; }

  function endAct() {
    showCard(CONTENT[ACT_ORDER[state.act]].exit, nextAct);
  }

  function nextAct() {
    state.act++;
    const act = CONTENT[ACT_ORDER[state.act]];
    if (!act) { showRecap(); return; }
    showCard(act.intro, () => gotoScene(firstSceneOf(act)));
  }

  function showRecap() {
    showCard({
      kicker: 'For your worksheet',
      heading: 'Everything You Wrote Down',
      text: '<ol class="recap">' +
        state.notebook.map(n => '<li>' + n.record + '</li>').join('') + '</ol>',
      button: 'Play again'
    }, () => location.reload());
  }

  function show(screen) {
    [el.title, el.game, el.card].forEach(s => s.classList.toggle('is-active', s === screen));
  }

  el.cNext.addEventListener('click', () => {
    if (state.cardNext) state.cardNext();
  });

  /* =================================================================
     WIRING
  ==================================================================*/
  el.btnStart.addEventListener('click', () => {
    state.act = 0;
    state.notebook = [];
    el.actor.innerHTML = buildActor();
    styleActor();
    const act = CONTENT[ACT_ORDER[0]];
    showCard(act.intro, () => gotoScene(firstSceneOf(act)));
  });

  // click the floor to walk there
  el.stage.addEventListener('click', e => {
    if (e.target.closest('.hotspot')) return;
    if (!el.scrim.hidden || !el.pScrim.hidden || !el.nScrim.hidden) return;
    hideCaption();
    if (!el.dialogue.hidden) return;
    const r = el.stage.getBoundingClientRect();
    const frac = (e.clientX - r.left) / r.width;              // 0..1 across the view
    const target = state.camera + frac * VIEW;                 // into world-%
    const floor = (e.clientY - r.top) / r.height;
    if (floor < 0.62) { nudge('Nothing there. Check your assignment below.'); return; }
    walkTo(target);
  });

  el.btnHelp.addEventListener('click', () => {
    const spot = (state.scene.hotspots || []).filter(
      (h, i) => state.scene.chained ? i === state.chainIndex : !h.hidden)[0];
    if (!spot) return;
    // pan to it so the student can see where it is, then flash it
    state.x = spot.standAt;
    placeActor();
    renderHotspots();
    const node = el.hotspots.querySelector('.hotspot:not(.hotspot-look)');
    if (!node) return;
    node.classList.remove('is-pinged');
    void node.offsetWidth;
    node.classList.add('is-pinged');
  });

  let captionTimer = null;
  function showCaption(text) {
    el.captionText.innerHTML = text;
    el.caption.hidden = false;
    el.caption.classList.remove('is-shown');
    void el.caption.offsetWidth;
    el.caption.classList.add('is-shown');
    clearTimeout(captionTimer);
    captionTimer = setTimeout(hideCaption, 9000);
  }
  function hideCaption() {
    el.caption.classList.remove('is-shown');
    clearTimeout(captionTimer);
    captionTimer = setTimeout(() => { el.caption.hidden = true; }, 350);
  }

  let nudgeTimer = null;
  function nudge(text) {
    el.nudge.textContent = text;
    el.nudge.classList.add('is-shown');
    clearTimeout(nudgeTimer);
    nudgeTimer = setTimeout(() => el.nudge.classList.remove('is-shown'), 2400);
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!el.nScrim.hidden) { el.nScrim.hidden = true; return; }
      if (!el.scrim.hidden)  { el.scrim.hidden = true; advanceChain(); return; }
    }
    if ((e.key === ' ' || e.key === 'Spacebar') && !el.dialogue.hidden) {
      if (document.activeElement && document.activeElement.tagName === 'BUTTON') return;
      e.preventDefault();
      el.dNext.click();
    }
    // arrow keys walk, for students who prefer the keyboard
    if (e.key === 'ArrowLeft')  walkTo(state.x - 12);
    if (e.key === 'ArrowRight') walkTo(state.x + 12);
  });

  if (state.editing) {
    el.stage.addEventListener('click', e => {
      const r = el.stage.getBoundingClientRect();
      const x = state.camera + (e.clientX - r.left) / r.width * VIEW;
      const y = (e.clientY - r.top) / r.height * 100;
      console.log('world x: ' + x.toFixed(1) + '%  y: ' + y.toFixed(1) + '%');
    });
  }
})();
