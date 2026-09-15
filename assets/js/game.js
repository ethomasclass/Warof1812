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
    pScrim: $('puzzle-scrim'), pNotebook: $('puzzle-notebook'), pPrompt: $('puzzle-prompt'), pRiddle: $('puzzle-riddle'),
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
    dialogueIdx: 0,
    activeSpot: null,
    finished: false,
    editing: /[?&]edit\b/.test(location.search)
  };

  /* =================================================================
     THE CHARACTER — profile view, so movement is one-dimensional
  ==================================================================*/
  const ACTOR_SVG = `
  <svg viewBox="0 0 120 260" xmlns="http://www.w3.org/2000/svg">
    <g class="a-legs">
      <g class="a-leg a-leg-b">
        <path d="M52 150 l-6 84 l22 0 l2 -80 z" fill="#123a42"/>
        <path d="M52 150 l-3 84 l5 0 l2 -82 z" fill="#4fd3c4" opacity="0.3"/>
        <path d="M44 232 l30 0 l0 15 l-34 0 z" fill="#0b2128"/>
        <path d="M44 232 l30 0 l0 3 l-30 0 z" fill="#7fe3d6" opacity="0.35"/>
      </g>
      <g class="a-leg a-leg-a">
        <path d="M64 150 l10 84 l-22 0 l-4 -80 z" fill="#1b5058"/>
        <path d="M70 150 l10 84 l-6 0 l-8 -84 z" fill="#ffb45c" opacity="0.3"/>
        <path d="M50 232 l32 0 l0 15 l-36 0 z" fill="#0f2a31"/>
        <path d="M50 232 l32 0 l0 3 l-32 0 z" fill="#7fe3d6" opacity="0.4"/>
      </g>
    </g>
    <!-- coat -->
    <path d="M44 74 q26 -14 50 0 l10 84 q-36 14 -70 0 z" fill="#1b5a5f"/>
    <path d="M94 74 l10 84 q-7 3 -13 4 l-9 -86 z" fill="#ffb45c" opacity="0.45"/>
    <path d="M44 74 l2 0 l-3 88 l-5 -4 z" fill="#7fe3d6" opacity="0.5"/>
    <!-- satchel -->
    <path d="M40 116 l44 0 l5 38 l-54 0 z" fill="#0f3a40"/>
    <path d="M40 116 q18 -30 44 -34" stroke="#0f3a40" stroke-width="6" fill="none"/>
    <!-- arm -->
    <path class="a-arm" d="M88 84 q16 26 10 58" stroke="#1b5a5f" stroke-width="15" stroke-linecap="round" fill="none"/>
    <!-- head, in profile, facing right -->
    <circle cx="74" cy="48" r="23" fill="#e8b98c"/>
    <path d="M95 42 l9 6 l-9 6 z" fill="#e8b98c"/>
    <path d="M51 42 q22 -26 46 -6 l0 -9 q-25 -21 -46 3 z" fill="#123840"/>
    <ellipse cx="80" cy="34" rx="28" ry="9" fill="#123840"/>
    <circle cx="84" cy="44" r="2.6" fill="#0a2229"/>
    <circle cx="74" cy="48" r="23" fill="#ffb45c" opacity="0.14"/>
  </svg>`;

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
    walkTo(spot.standAt, () => trigger(spot));
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
    el.scrim.hidden = false;
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
    dialValues = p.slots.map(() => 0);
    el.pPrompt.innerHTML = p.prompt;
    el.pRiddle.innerHTML = p.riddle;
    el.pSkip.textContent = p.skip;
    el.pMsg.innerHTML = '&nbsp;';
    renderDials(p);
    el.pScrim.hidden = false;
  }

  function renderDials(p) {
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

  function endAct() {
    const act = CONTENT[ACT_ORDER[state.act]];
    el.cKicker.innerHTML = act.exit.kicker;
    el.cHeading.innerHTML = act.exit.heading;
    el.cText.innerHTML = act.exit.text;
    el.cNext.textContent = act.exit.button.replace(/&mdash;/g, '—');
    show(el.card);
  }

  function show(screen) {
    [el.title, el.game, el.card].forEach(s => s.classList.toggle('is-active', s === screen));
  }

  el.cNext.addEventListener('click', () => {
    if (state.finished) { location.reload(); return; }
    state.finished = true;
    el.cKicker.innerHTML = 'For your worksheet';
    el.cHeading.innerHTML = 'Four Causes, One Room';
    el.cText.innerHTML = '<ol class="recap">' +
      state.notebook.map(n => '<li>' + n.record + '</li>').join('') + '</ol>';
    el.cNext.textContent = 'Play again';
  });

  /* =================================================================
     WIRING
  ==================================================================*/
  el.btnStart.addEventListener('click', () => {
    state.act = 0;
    state.notebook = [];
    el.actor.innerHTML = ACTOR_SVG;
    gotoScene('street');
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
