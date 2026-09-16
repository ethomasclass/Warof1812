/* ------------------------------------------------------------------
   documents.js — evidence as physical paper, not as a dialog box.

   Each piece of evidence is rendered as an actual prop: a folded
   letter with a broken wax seal, a stiff letterpress broadside, a
   dispatch scrawled in the field, a speech marked up in red. They sit
   at an angle on a dark desk surface, with the historical analysis
   pinned beside them.

   Everything is CSS and inline SVG. Paper grain, foxing stains, fold
   creases and torn edges are generated, not photographed.
-------------------------------------------------------------------*/

/* Irregular edges. A straight cut looks printed; a ragged one looks
   handled. Each polygon is hand-jittered rather than random, so the
   same document tears the same way every time. */
const TORN = {
  treaty:   'polygon(1% 1%, 99% 0.6%, 98.6% 26%, 99.4% 54%, 97% 78%, 99% 99%, 62% 97.6%, 28% 99.4%, 2% 98%, 0.6% 70%, 2% 44%, 0.4% 20%)',
  letter:   'polygon(0.6% 1%, 99% 0%, 99.4% 12%, 98.2% 30%, 99.5% 52%, 98% 74%, 99.2% 99%, 60% 98.4%, 32% 99.6%, 1% 98.8%, 0.2% 66%, 1.4% 40%, 0% 18%)',
  dispatch: 'polygon(2% 0.6%, 97% 1.4%, 99% 20%, 97.6% 44%, 99.4% 68%, 97.2% 88%, 98% 99%, 44% 98%, 3% 99.2%, 1% 74%, 2.4% 50%, 0.8% 26%)',
  notes:    'polygon(1% 2%, 46% 0.4%, 99% 1.6%, 98% 34%, 99.4% 62%, 97.8% 98%, 52% 99.4%, 2% 98%, 0.6% 60%, 1.8% 28%)'
};

/* Paper grain: one turbulence filter, reused as a background layer. */
const GRAIN_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23g)' opacity='0.42'/%3E%3C/svg%3E\")";

/* Foxing — the brown age-spots on old paper. Placed, not random. */
function foxing(spots) {
  return spots.map(s =>
    `<span class="fox" style="left:${s[0]}%;top:${s[1]}%;width:${s[2]}px;height:${s[2] * 0.8}px;opacity:${s[3]}"></span>`
  ).join('');
}

/* ------------------------------------------------------------------
   The British royal arms, drawn crudely on purpose — this is a
   colonial reprint of a London proclamation, not the real thing.
-------------------------------------------------------------------*/
const CREST = `
<svg class="crest" viewBox="0 0 120 92" aria-hidden="true">
  <path d="M60 6 L70 14 L80 8 L78 20 L88 18 L82 28 L60 30 L38 28 L32 18 L42 20 L40 8 L50 14 Z" fill="#2b2620"/>
  <path d="M60 32 q26 0 26 22 q0 22 -26 34 q-26 -12 -26 -34 q0 -22 26 -22 z" fill="none" stroke="#2b2620" stroke-width="3"/>
  <path d="M60 32 L60 88" stroke="#2b2620" stroke-width="2.5"/>
  <path d="M35 52 L85 52" stroke="#2b2620" stroke-width="2.5"/>
  <path d="M44 40 l8 0 l0 6 l-8 0 z M68 40 l8 0 l0 6 l-8 0 z" fill="#2b2620"/>
  <path d="M44 62 q8 8 0 14 M76 62 q-8 8 0 14" stroke="#2b2620" stroke-width="2" fill="none"/>
</svg>`;

/* ==================================================================
   Per-type paper. Each returns the inner markup of .paper.
==================================================================*/
const PAPERS = {

  /* a private letter: folded in four, written across, sealed in wax */
  letter(d) {
    return `
      <span class="crease crease-h" style="top:33%"></span>
      <span class="crease crease-h" style="top:67%"></span>
      <span class="crease crease-v" style="left:50%"></span>
      ${foxing([[12,18,26,0.5],[74,12,18,0.4],[60,72,32,0.35],[22,84,14,0.45],[88,50,20,0.3]])}
      <div class="paper-inner">
        <p class="hand hand-place">${d.place}</p>
        ${d.lines.map(l => `<p class="hand">${l}</p>`).join('')}
        <p class="hand hand-sign">${d.sign}</p>
      </div>
      <span class="wax" aria-hidden="true"><span class="wax-crack"></span></span>`;
  },

  /* a printed proclamation: stiff, straight-cut, heavy letterpress */
  broadside(d) {
    return `
      ${foxing([[8,8,20,0.3],[86,22,16,0.28],[50,92,26,0.25]])}
      <div class="paper-inner">
        ${CREST}
        <p class="bs-kicker">${d.kicker}</p>
        <h3 class="bs-title">${d.title}</h3>
        <span class="bs-rule"></span>
        <p class="bs-sub">${d.sub}</p>
        <span class="bs-rule bs-rule-thin"></span>
        ${d.lines.map(l => `<p class="bs-body">${l}</p>`).join('')}
        <p class="bs-foot">${d.foot}</p>
      </div>
      <span class="stamp" aria-hidden="true">${d.stamp}</span>`;
  },

  /* written in the field, in a hurry, on whatever was to hand */
  dispatch(d) {
    return `
      <span class="crease crease-h" style="top:26%"></span>
      <span class="mud"></span>
      ${foxing([[18,10,30,0.5],[70,60,24,0.45],[40,88,18,0.4]])}
      <div class="paper-inner">
        <p class="hand hand-haste">${d.haste}</p>
        <p class="hand hand-place">${d.place}</p>
        ${d.lines.map(l => `<p class="hand hand-fast">${l}</p>`).join('')}
        <p class="hand hand-sign">${d.sign}</p>
      </div>`;
  },

  /* a merchant's ledger: ruled columns, two years side by side */
  ledger(d) {
    return `
      ${foxing([[10,14,22,0.4],[80,64,20,0.35]])}
      <div class="paper-inner">
        <p class="ledger-head">${d.head}</p>
        <table class="ledger-table">
          <tr><th></th><th>${d.colA}</th><th>${d.colB}</th></tr>
          ${d.rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}
        </table>
        <p class="ledger-note">${d.note}</p>
      </div>`;
  },

  /* the treaty: singed at one edge, formal, and much shorter than
     anyone expects it to be */
  treaty(d) {
    return `
      <span class="char-edge"></span>
      ${foxing([[14,12,26,0.4],[72,80,24,0.3]])}
      <div class="paper-inner">
        <p class="bs-kicker">${d.kicker}</p>
        <h3 class="bs-title">${d.title}</h3>
        <span class="bs-rule"></span>
        <p class="treaty-article">${d.article}</p>
        ${d.lines.map(l => `<p class="bs-body treaty-body">${l}</p>`).join('')}
        <p class="bs-foot">${d.foot}</p>
      </div>`;
  },

  /* a speech, still being argued with: struck through, scrawled over */
  notes(d) {
    return `
      ${foxing([[14,22,18,0.4],[78,70,22,0.35]])}
      <div class="paper-inner">
        <p class="notes-head">${d.head}</p>
        ${d.lines.map(l => `<p class="hand hand-notes">${l}</p>`).join('')}
        <p class="notes-margin">${d.margin}</p>
      </div>`;
  }
};

/* ==================================================================
   Build the whole evidence view: the prop on the left, the historian's
   reading of it on the right.
==================================================================*/
function buildEvidence(spot) {
  const d = spot.doc;
  const clip = TORN[d.type] ? `clip-path:${TORN[d.type]};` : '';
  /* The real wording is the point of a primary source, but 1812 English
     is a wall for a 9th grader. So the plain version lives on the same
     sheet of paper, one button away, instead of replacing the original. */
  const plain = `
    <div class="paper-plain">
      <p class="plain-label">In plain English</p>
      ${d.plain.map(l => `<p class="plain-line">${l}</p>`).join('')}
    </div>`;
  return `
    <div class="ev">
      <div class="ev-prop">
        <div class="desk-grain"></div>
        <article class="paper paper-${d.type}" id="the-paper" style="${clip}--grain:${GRAIN_SVG}">
          ${PAPERS[d.type](d)}
          ${plain}
        </article>
        <button class="plain-toggle" id="plain-toggle" type="button"
                aria-pressed="false">Translate this &rsaquo;</button>
      </div>
      <div class="ev-read">
        <p class="ev-tag">${spot.tag}</p>
        <h2 class="ev-heading" id="modal-heading">${spot.heading}</h2>
        ${spot.body.map(p => `<p class="ev-body">${p}</p>`).join('')}
        <div class="ev-note">
          <span class="ev-note-label">Your notebook &mdash;</span>
          <span class="ev-note-text">${spot.record}</span>
        </div>
      </div>
    </div>`;
}
