/* ------------------------------------------------------------------
   game.js — the engine. Art-agnostic on purpose.

   A scene is either an SVG string in SCENES (current) or an image
   path (future). Hotspots are percentage boxes layered on top, so
   swapping vector art for painted backgrounds changes one line here
   and nothing else.

   No build step, no dependencies, no network calls. Drop the folder
   on GitHub Pages and it runs.
-------------------------------------------------------------------*/
(function () {
  'use strict';

  /* ---------- element handles ------------------------------------*/
  const el = {
    screenTitle:  document.getElementById('screen-title'),
    screenGame:   document.getElementById('screen-game'),
    screenCard:   document.getElementById('screen-card'),

    btnStart:     document.getElementById('btn-start'),
    btnHelp:      document.getElementById('btn-help'),

    stageArt:     document.getElementById('stage-art'),
    hotspots:     document.getElementById('hotspots'),
    nudge:        document.getElementById('nudge'),

    dialogue:     document.getElementById('dialogue'),
    dialogueWho:  document.getElementById('dialogue-who'),
    dialogueLine: document.getElementById('dialogue-line'),
    dialogueNext: document.getElementById('dialogue-next'),

    objective:    document.getElementById('objective'),
    pips:         document.getElementById('pips'),

    scrim:        document.getElementById('scrim'),
    modalTag:     document.getElementById('modal-tag'),
    modalTitle:   document.getElementById('modal-title'),
    modalQuote:   document.getElementById('modal-quote'),
    modalBody:    document.getElementById('modal-body'),
    modalRecord:  document.getElementById('modal-record'),
    modalClose:   document.getElementById('modal-close'),

    cardKicker:   document.getElementById('card-kicker'),
    cardTitle:    document.getElementById('card-title'),
    cardText:     document.getElementById('card-text'),
    cardNext:     document.getElementById('card-next')
  };

  /* ---------- state ----------------------------------------------*/
  const state = {
    beatIndex: 0,      // index into BEAT_ORDER
    lineIndex: 0,      // which dialogue line we're on
    itemIndex: 0,      // which item in the chain is next
    finished: false,
    editing: /[?&]edit\b/.test(location.search)
  };

  /* ---------- tiny helpers ---------------------------------------*/
  function show(screen) {
    [el.screenTitle, el.screenGame, el.screenCard]
      .forEach(s => s.classList.toggle('is-active', s === screen));
  }

  function currentBeat() {
    return CONTENT[BEAT_ORDER[state.beatIndex]];
  }

  function paintScene(name) {
    // Today every scene is an inline SVG string. When painted
    // backgrounds arrive, a scene whose value ends in an image
    // extension is rendered as an <img> instead — hotspots don't care.
    const art = SCENES[name];
    if (/\.(png|jpe?g|webp|avif)$/i.test(art)) {
      el.stageArt.innerHTML = '<img src="' + art + '" alt="">';
    } else {
      el.stageArt.innerHTML = art;
    }
  }

  let nudgeTimer = null;
  function nudge(text) {
    el.nudge.innerHTML = text;
    el.nudge.classList.add('is-shown');
    clearTimeout(nudgeTimer);
    nudgeTimer = setTimeout(() => el.nudge.classList.remove('is-shown'), 2600);
  }

  /* ================================================================
     BEAT ROUTING
  =================================================================*/
  function startBeat() {
    const beat = currentBeat();
    show(el.screenGame);
    paintScene(beat.scene);
    el.hotspots.innerHTML = '';
    el.pips.innerHTML = '';
    el.btnHelp.hidden = true;

    if (beat.type === 'dialogue') {
      state.lineIndex = 0;
      el.objective.innerHTML = 'Listen. Press <strong>Space</strong> or click Continue.';
      el.dialogue.hidden = false;
      el.dialogueWho.textContent = beat.speaker;
      renderLine();
    } else {
      state.itemIndex = 0;
      el.dialogue.hidden = true;
      el.objective.innerHTML = beat.objective;
      el.btnHelp.hidden = false;
      renderPips();
      renderHotspot();
    }
  }

  function endBeat() {
    const beat = currentBeat();
    el.cardKicker.innerHTML = beat.exit.kicker;
    el.cardTitle.innerHTML  = beat.exit.title;
    el.cardText.innerHTML   = beat.exit.text;
    el.cardNext.textContent = beat.exit.button.replace(/&mdash;/g, '—');
    show(el.screenCard);
  }

  function advanceBeat() {
    state.beatIndex++;
    if (state.beatIndex < BEAT_ORDER.length) {
      startBeat();
    } else {
      // End of the slice. Beats 3 and 4 slot in here.
      el.cardKicker.innerHTML = 'For the worksheet';
      el.cardTitle.innerHTML  = 'Four Causes, One Room';
      el.cardText.innerHTML   = buildRecap();
      el.cardNext.textContent = 'Play again';
      state.finished = true;
      show(el.screenCard);
    }
  }

  function buildRecap() {
    const items = CONTENT.beat2.items;
    return '<span style="display:block;text-align:left;font-size:0.98rem;line-height:1.7">'
      + items.map((it, i) => (i + 1) + '. ' + it.record).join('<br><br>')
      + '</span>';
  }

  /* ================================================================
     DIALOGUE BEATS
  =================================================================*/
  function renderLine() {
    const beat = currentBeat();
    el.dialogueLine.innerHTML = beat.lines[state.lineIndex];
    const last = state.lineIndex === beat.lines.length - 1;
    el.dialogueNext.innerHTML = last ? 'Head inside &rsaquo;' : 'Continue &rsaquo;';
    el.dialogueNext.focus({ preventScroll: true });
  }

  function nextLine() {
    const beat = currentBeat();
    if (state.lineIndex < beat.lines.length - 1) {
      state.lineIndex++;
      renderLine();
    } else {
      el.dialogue.hidden = true;
      endBeat();
    }
  }

  /* ================================================================
     HUNT BEATS — chained hotspots
  =================================================================*/
  function renderPips() {
    const beat = currentBeat();
    el.pips.innerHTML = beat.items
      .map((_, i) => '<span class="pip' + (i < state.itemIndex ? ' is-found' : '') + '"></span>')
      .join('');
  }

  function renderHotspot() {
    const beat = currentBeat();
    el.hotspots.innerHTML = '';
    el.hotspots.classList.toggle('is-editing', state.editing);

    // Edit mode shows every box at once so hotspots can be repositioned
    // against new art; normal play shows only the next link in the chain.
    const toDraw = state.editing
      ? beat.items
      : beat.items.slice(state.itemIndex, state.itemIndex + 1);

    toDraw.forEach(item => {
      const h = item.hotspot;
      const btn = document.createElement('button');
      btn.className = 'hotspot';
      btn.type = 'button';
      btn.style.left   = h.left + '%';
      btn.style.top    = h.top + '%';
      btn.style.width  = h.width + '%';
      btn.style.height = h.height + '%';
      btn.setAttribute('aria-label', item.label);
      btn.addEventListener('click', () => openItem(item));
      el.hotspots.appendChild(btn);
    });
  }

  function openItem(item) {
    el.modalTag.innerHTML    = item.tag;
    el.modalTitle.innerHTML  = item.title;
    el.modalQuote.innerHTML  = item.quote;
    el.modalBody.innerHTML   = item.body.map(p => '<p>' + p + '</p>').join('');
    el.modalRecord.innerHTML = item.record;

    const beat = currentBeat();
    const isLast = state.itemIndex === beat.items.length - 1;
    el.modalClose.innerHTML = isLast
      ? 'Close the notebook'
      : 'Got it &mdash; keep looking';

    el.scrim.hidden = false;
    el.modalClose.focus({ preventScroll: true });
  }

  function closeItem() {
    el.scrim.hidden = true;
    const beat = currentBeat();
    state.itemIndex++;
    renderPips();

    if (state.itemIndex >= beat.items.length) {
      el.hotspots.innerHTML = '';
      el.btnHelp.hidden = true;
      el.objective.innerHTML = 'Every piece of evidence is in your notebook.';
      setTimeout(endBeat, 450);
    } else {
      el.objective.innerHTML = beat.items[state.itemIndex - 1].hint;
      renderHotspot();
    }
  }

  /* ================================================================
     WIRING
  =================================================================*/
  el.btnStart.addEventListener('click', () => startBeat());

  el.dialogueNext.addEventListener('click', nextLine);

  el.modalClose.addEventListener('click', closeItem);

  // "Where do I look?" — never a fail state, just a stronger pulse.
  el.btnHelp.addEventListener('click', () => {
    const spot = el.hotspots.querySelector('.hotspot');
    if (!spot) return;
    spot.classList.remove('is-pinged');
    void spot.offsetWidth;              // restart the animation
    spot.classList.add('is-pinged');
  });

  // Clicking empty scenery during a hunt: a gentle nudge, never a penalty.
  document.getElementById('stage').addEventListener('click', e => {
    if (e.target.closest('.hotspot')) return;
    if (!el.scrim.hidden) return;
    const beat = currentBeat();
    if (!beat || beat.type !== 'hunt') return;
    nudge('Nothing there. Re-read your notebook below.');
  });

  el.cardNext.addEventListener('click', () => {
    if (state.finished) { location.reload(); return; }
    advanceBeat();
  });

  // Keyboard: space/enter advances dialogue, escape closes the modal.
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !el.scrim.hidden) {
      closeItem();
      return;
    }
    if (e.key !== ' ' && e.key !== 'Spacebar') return;
    // don't hijack space when a button already has focus
    if (document.activeElement && document.activeElement.tagName === 'BUTTON') return;
    if (!el.dialogue.hidden && el.screenGame.classList.contains('is-active')) {
      e.preventDefault();
      nextLine();
    }
  });

  // Hotspot-editing helper: click anywhere in edit mode to print the
  // percentage coordinates, for repositioning boxes against new art.
  if (state.editing) {
    document.getElementById('stage').addEventListener('click', e => {
      const r = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width * 100).toFixed(1);
      const y = ((e.clientY - r.top) / r.height * 100).toFixed(1);
      console.log('left: ' + x + ', top: ' + y);
    });
  }
})();
