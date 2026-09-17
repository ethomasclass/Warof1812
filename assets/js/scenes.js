/* ------------------------------------------------------------------
   scenes.js — artwork, drawn as flat inline SVG.

   Every scene is THREE layers that pan at different rates:

     back  (2880x900, depth 0.5)  distant glow and sky. Nothing with a
                                  recognisable position, so it can slide
                                  freely without detaching from anything.
     mid   (4000x900, depth 1.0)  the room itself. All furniture, all
                                  clickable items, and the character live
                                  here, so they never drift apart.
     fg    (4800x900, depth 1.25) near-black silhouettes that sweep past
                                  the camera. This is most of why a
                                  panning room feels expensive.

   Layer widths are sized so that no layer ever runs out of art at full
   camera travel. See CAMERA in game.js for the arithmetic.

   Style rules, applied throughout:
     - two colour temperatures only: cold teal, warm amber, nothing between
     - light sources are visible objects (window, fire, candle)
     - objects are rim-lit on the side facing a source
     - clickable items are cream paper, the brightest thing in the room
     - the floor reflects
-------------------------------------------------------------------*/

const PALETTE = {
  cold:    '#4fd3c4',
  coldLo:  '#0b2129',
  warm:    '#ffb45c',
  paper:   '#f6ecd6',
  black:   '#02080a'
};

/* shared gradient defs, injected into each layer that needs them */
const D = `
<defs>
  <linearGradient id="wallG" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#12313a"/><stop offset="1" stop-color="#0a1f26"/>
  </linearGradient>
  <linearGradient id="whiteNight" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#d9e0dc"/><stop offset="0.55" stop-color="#b3bfbe"/>
    <stop offset="1" stop-color="#8e9c9e"/>
  </linearGradient>
  <linearGradient id="whiteCol" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#eef2ec"/><stop offset="0.6" stop-color="#c4cecb"/>
    <stop offset="1" stop-color="#8a9698"/>
  </linearGradient>
  <linearGradient id="whiteDay" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#d7d2c4"/><stop offset="0.5" stop-color="#bdb7a8"/>
    <stop offset="1" stop-color="#9b9486"/>
  </linearGradient>
  <linearGradient id="daySky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#8ca4b2"/><stop offset="0.5" stop-color="#b9c4c4"/>
    <stop offset="1" stop-color="#dcd9cc"/>
  </linearGradient>
  <linearGradient id="ashWall" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#2a2b2c"/><stop offset="0.55" stop-color="#3b3a36"/>
    <stop offset="1" stop-color="#232322"/>
  </linearGradient>
  <linearGradient id="sootStone" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#1a1817"/><stop offset="0.45" stop-color="#4a4640"/>
    <stop offset="1" stop-color="#6b6559"/>
  </linearGradient>
  <linearGradient id="ashFloor" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#3a3834"/><stop offset="1" stop-color="#181817"/>
  </linearGradient>
  <radialGradient id="bloomDay" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#e8ecec" stop-opacity="0.5"/>
    <stop offset="1" stop-color="#e8ecec" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="moonSky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#091a28"/><stop offset="0.6" stop-color="#14323d"/>
    <stop offset="1" stop-color="#2d5b5c"/>
  </linearGradient>
  <linearGradient id="moonG" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#cdf6ee"/><stop offset="1" stop-color="#4fbdb5"/>
  </linearGradient>
  <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0d2230"/><stop offset="0.55" stop-color="#2b4a58"/>
    <stop offset="0.8" stop-color="#7c6a62"/><stop offset="1" stop-color="#d79a5c"/>
  </linearGradient>
  <radialGradient id="bloomC" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#7fe3d6" stop-opacity="0.5"/>
    <stop offset="1" stop-color="#7fe3d6" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="bloomW" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#ffb45c" stop-opacity="0.72"/>
    <stop offset="1" stop-color="#ff8a3d" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="bloomCand" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#ffd48a" stop-opacity="0.85"/>
    <stop offset="1" stop-color="#ffb45c" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="floorG" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0e2a31"/><stop offset="1" stop-color="#040d10"/>
  </linearGradient>
  <linearGradient id="reflFade" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity="0.34"/>
    <stop offset="1" stop-color="#fff" stop-opacity="0"/>
  </linearGradient>
  <mask id="reflM"><rect x="0" y="660" width="4000" height="240" fill="url(#reflFade)"/></mask>
  <filter id="bl" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="16"/></filter>
</defs>`;

/* small helpers ---------------------------------------------------*/
const svg = (w, body) =>
  `<svg viewBox="0 0 ${w} 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">${D}${body}</svg>`;

/* a run of books for a shelf */
const books = (x, y, n, seed) =>
  Array.from({ length: n }, (_, i) => {
    const h = 52 + ((i * 7 + seed * 5) % 18);
    return `<rect x="${x + i * 23}" y="${y + (72 - h)}" width="17" height="${h}" fill="#0e2d34"/>`;
  }).join('');


/* ==================================================================
   SCALE
   -----
   One foot = 73 world units. A 5'8" person is 414 units tall and
   stands on y=760; the wall meets the floor at y=660, so the camera
   sees about 22 feet of room at a time. Every piece of furniture below
   is built from real dimensions: a desk is 30 inches high, a mantel is
   4'6", a door is 7 feet. Getting this wrong was what made the first
   pass read as a giant empty hall.
==================================================================*/
const FT = 73;
const FLOOR = 660;        // wall/floor junction, for things against the wall
const STAND = 760;        // where the character's feet are

/* a framed map or chart, the walls of the cabinet room were covered
   in them: "maps, globes, charts, &c." */
const chart = (x, y, w, h, seed) => `
  <g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#0c262e"/>
    <rect x="${x + 5}" y="${y + 5}" width="${w - 10}" height="${h - 10}" fill="#d9cfae"/>
    <rect x="${x}" y="${y}" width="${w}" height="4" fill="#c98a3c" opacity="0.45"/>
    <g opacity="0.55" fill="none" stroke="#5b6b52" stroke-width="2">
      <path d="M${x + 14} ${y + h * 0.62} q${w * 0.16} -${h * 0.2} ${w * 0.3} -${h * 0.05}
               q${w * 0.14} ${h * 0.14} ${w * 0.28} -${h * 0.1}
               q${w * 0.12} -${h * 0.12} ${w * 0.24} ${h * 0.02}"/>
      <path d="M${x + 14} ${y + h * 0.4} q${w * 0.2} ${h * 0.12} ${w * 0.38} 0"/>
    </g>
    <g opacity="0.3" stroke="#7a6a48" stroke-width="1">
      ${Array.from({ length: 4 }, (_, i) => `<line x1="${x + 10}" y1="${y + 12 + i * (h - 24) / 3}" x2="${x + w - 10}" y2="${y + 12 + i * (h - 24) / 3}"/>`).join('')}
      ${Array.from({ length: 3 }, (_, i) => `<line x1="${x + 14 + i * (w - 28) / 2}" y1="${y + 10}" x2="${x + 14 + i * (w - 28) / 2}" y2="${y + h - 10}"/>`).join('')}
    </g>
    <circle cx="${x + w * (0.3 + (seed % 3) * 0.16)}" cy="${y + h * 0.5}" r="4" fill="#8e2b22"/>
  </g>`;

/* Latrobe's klismos chair: the Finlay brothers of Baltimore made them,
   and three were broken inside four months by men leaning back. */
const klismos = (x, base, flip) => `
  <g transform="translate(${x} ${base}) scale(${flip || 1} 1)">
    <path d="M0 0 q-6 -40 -4 -74" stroke="#0a2229" stroke-width="9" fill="none"/>
    <path d="M52 0 q10 -38 6 -74" stroke="#0a2229" stroke-width="9" fill="none"/>
    <path d="M-6 -74 L62 -74 L58 -86 L-2 -86 Z" fill="#123840"/>
    <path d="M-2 -86 q-16 -54 -8 -92" stroke="#0a2229" stroke-width="10" fill="none"/>
    <path d="M56 -86 q-14 -52 -6 -90" stroke="#0a2229" stroke-width="10" fill="none"/>
    <path d="M-12 -178 q34 -16 66 -2 l-3 16 q-30 -12 -60 2 z" fill="#1b5a5f"/>
  </g>`;

/* The fire came out of every window and ran up the stone above it.
   That black tongue over each opening is the single most recognisable
   thing about the ruin, so it gets its own helper. */
const scorch = (x, y, w, h) => `
  <path d="M${x} ${y} q${w * 0.18} -${h * 0.74} ${w * 0.34} -${h * 0.3}
           q${w * 0.1} -${h * 0.5} ${w * 0.22} -${h * 0.1}
           q${w * 0.16} -${h * 0.62} ${w * 0.3} ${h * 0.06}
           q${w * 0.1} -${h * 0.3} ${w * 0.14} ${h * 0.34}
           l0 ${h * 0.5} l-${w} 0 z"
        fill="#131211" opacity="0.88"/>`;

/* a scaffolding bay: poles, ledgers, a plank */
const scaffold = (x, base, h) => `
  <g stroke="#6b5a3e" stroke-width="11" fill="none" opacity="0.95">
    <line x1="${x}" y1="${base}" x2="${x}" y2="${base - h}"/>
    <line x1="${x + 210}" y1="${base}" x2="${x + 210}" y2="${base - h}"/>
    <line x1="${x - 14}" y1="${base - h * 0.38}" x2="${x + 224}" y2="${base - h * 0.38}"/>
    <line x1="${x - 14}" y1="${base - h * 0.74}" x2="${x + 224}" y2="${base - h * 0.74}"/>
    <line x1="${x}" y1="${base - h * 0.38}" x2="${x + 210}" y2="${base - h * 0.74}"/>
  </g>
  <rect x="${x - 22}" y="${base - h * 0.4}" width="254" height="14" fill="#8a7448"/>
  <rect x="${x - 22}" y="${base - h * 0.76}" width="254" height="14" fill="#7d6840"/>`;

/* wall sconce, two candles, feeble next to an Argand lamp */
const sconce = (x, y) => `
  <g>
    <path d="M${x} ${y} q10 -16 20 0" stroke="#c98a3c" stroke-width="4" fill="none" opacity="0.7"/>
    <rect x="${x - 2}" y="${y - 26}" width="5" height="26" fill="#f2e4c4"/>
    <rect x="${x + 17}" y="${y - 22}" width="5" height="22" fill="#f2e4c4"/>
    <path d="M${x} ${y - 34} q6 8 0 12 q-6 -4 0 -12 z" fill="#ffd48a"/>
    <path d="M${x + 19} ${y - 30} q6 8 0 12 q-6 -4 0 -12 z" fill="#ffd48a"/>
    <circle cx="${x + 10}" cy="${y - 26}" r="64" fill="url(#bloomCand)" opacity="0.5"/>
  </g>`;

/* the Argand lamp: a brass font, a glass chimney, and six times the
   light of a candle. Jefferson and Madison both used them. */
const argand = (x, base) => `
  <g>
    <ellipse cx="${x}" cy="${base}" rx="34" ry="9" fill="#8a6a2c"/>
    <path d="M${x - 22} ${base} q6 -26 22 -30 q16 4 22 30 z" fill="#c98a3c"/>
    <rect x="${x - 7}" y="${base - 54}" width="14" height="26" fill="#a8762f"/>
    <path d="M${x - 24} ${base - 54} l48 0 l-5 -16 l-38 0 z" fill="#c98a3c"/>
    <path d="M${x - 19} ${base - 128} q4 -34 19 -34 q15 0 19 34 q-4 14 -19 14 q-15 0 -19 -14 z"
          fill="#ffeec4" opacity="0.32"/>
    <rect x="${x - 19}" y="${base - 128}" width="38" height="58" fill="#ffeec4" opacity="0.22"/>
    <path d="M${x} ${base - 106} q11 16 0 30 q-11 -14 0 -30 z" fill="#ffd88a"/>
    <path d="M${x} ${base - 100} q6 10 0 18 q-6 -8 0 -18 z" fill="#fff6dd"/>
    <circle cx="${x}" cy="${base - 96}" r="230" fill="url(#bloomCand)"/>
  </g>`;

/* ==================================================================
   ACT 1, SCENE 1 — the street outside the President's House, dusk 1811
==================================================================*/
const street = {
  back: svg(2880, `
    <rect width="2880" height="900" fill="url(#skyG)"/>
    <circle cx="2260" cy="700" r="560" fill="url(#bloomW)"/>
    <circle cx="2260" cy="690" r="54" fill="#ffd9a0"/>
    <g opacity="0.45" fill="#1b3340">
      <ellipse cx="640"  cy="230" rx="380" ry="38"/>
      <ellipse cx="1560" cy="164" rx="320" ry="30"/>
      <ellipse cx="2440" cy="272" rx="400" ry="34"/>
    </g>
    <path d="M0 620 q150 -54 300 -14 q170 -50 340 -10 q160 -44 320 -6 q180 -40 360 -4
             q160 -34 320 -2 q170 -28 340 0 q150 -22 300 2 q140 -16 280 2 l0 340 L0 980 Z"
          fill="#0a1b22"/>`),

  mid: svg(4000, `
    <!-- =========================================================
         THE AVENUE — unpaved, half-built, barely a capital yet
    ========================================================== -->

    <!-- the President's House. At this scale only the ground floor and
         the foot of the portico fit the frame; the columns run off the
         top, which is roughly what you would see standing across the
         road from it. -->
    <g transform="translate(1044 197) scale(0.55)">
      <rect x="1180" y="0" width="2280" height="660" fill="url(#whiteNight)"/>
      <rect x="1180" y="0" width="14" height="660" fill="#eef6f2" opacity="0.5"/>
      <!-- cornice and roof balustrade, so the facade is not cut off flat -->
      <rect x="1150" y="-62" width="2340" height="62" fill="#dfe6e1"/>
      <rect x="1150" y="-74" width="2340" height="14" fill="#f0f4ef"/>
      <rect x="1150" y="-162" width="2340" height="16" fill="#dfe6e1"/>
      <g fill="#cbd5d1">${Array.from({length:38},(_,i)=>`<rect x="${1172+i*60}" y="-146" width="20" height="72" rx="7"/>`).join('')}</g>
      <!-- rusticated plinth -->
      <rect x="1180" y="556" width="2280" height="104" fill="#9daaab"/>
      ${Array.from({length:19},(_,i)=>`<rect x="${1180+i*120}" y="556" width="114" height="48" fill="none" stroke="#7e8c8e" stroke-width="3"/>`).join('')}
      ${Array.from({length:19},(_,i)=>`<rect x="${1180+i*120}" y="608" width="114" height="46" fill="none" stroke="#7e8c8e" stroke-width="3"/>`).join('')}

      <!-- ground-floor windows: 3ft wide, 6ft tall, with real piers of
           wall between them. Neoclassical fenestration is narrow and
           widely spaced; packing them edge to edge read as a shopfront. -->
      <g>
        ${[1272, 1584, 1896, 2853, 3156].map((x,i)=>{
          const lit = [0,1,3].indexOf(i) >= 0;
          return `<rect x="${x-13}" y="62" width="246" height="480" fill="#7b8788"/>
            <rect x="${x}" y="76" width="220" height="452" fill="${lit ? '#ffc270' : '#33403f'}" opacity="${lit ? 0.94 : 1}"/>
            <g stroke="#43504f" stroke-width="9">
              <line x1="${x+110}" y1="76" x2="${x+110}" y2="528"/>
              <line x1="${x}" y1="226" x2="${x+220}" y2="226"/>
              <line x1="${x}" y1="376" x2="${x+220}" y2="376"/>
            </g>
            <rect x="${x-22}" y="528" width="264" height="22" fill="#ccd4d1"/>
            <rect x="${x-18}" y="50" width="256" height="16" fill="#e2e8e3"/>
            ${lit ? `<circle cx="${x+110}" cy="300" r="200" fill="url(#bloomW)" opacity="0.38"/>` : ''}`;
        }).join('')}
      </g>

      <!-- the portico: two columns, 3 feet across, running off the top -->
      <g>
        <rect x="2210" y="0" width="560" height="52" fill="#e4eae5"/>
        <rect x="2210" y="52" width="560" height="10" fill="#9daaab"/>
        <!-- entablature and pediment over the portico -->
        <rect x="2168" y="-70" width="644" height="70" fill="#eef2ec"/>
        <rect x="2168" y="-82" width="644" height="14" fill="#f6f9f4"/>
        <path d="M2150 -82 L2830 -82 L2490 -216 Z" fill="#e4eae5"/>
        <path d="M2150 -82 L2830 -82 L2490 -216 Z" fill="none" stroke="#b6c1bf" stroke-width="6"/>
        ${[2250, 2620].map(x=>`
          <rect x="${x}" y="0" width="150" height="556" fill="url(#whiteCol)"/>
          <rect x="${x-18}" y="536" width="186" height="26" fill="#dfe6e1"/>
          <rect x="${x-18}" y="562" width="186" height="14" fill="#93a0a1"/>`).join('')}
      </g>

      <!-- the door, and the steps up to it -->
      <g>
        <rect x="2402" y="188" width="176" height="368" fill="#7d8a8b"/>
        <rect x="2416" y="202" width="148" height="354" fill="#22312f"/>
        <rect x="2416" y="202" width="10" height="354" fill="#ffb45c" opacity="0.6"/>
        <path d="M2402 188 q88 -58 176 0 z" fill="#c3ccc9"/>
        <circle cx="2552" cy="392" r="9" fill="#c98a3c"/>
        <rect x="2318" y="556" width="344" height="30" fill="#c8d1ce"/>
        <rect x="2288" y="586" width="404" height="30" fill="#b3bdbb"/>
        <rect x="2258" y="616" width="464" height="32" fill="#9daaab"/>
        <rect x="2228" y="648" width="524" height="30" fill="#879496"/>
        <!-- lanterns either side of the door -->
        ${sconce(2350, 380)}
        ${sconce(2600, 380)}
      </g>
    </g>

    <!-- gate piers and iron railing -->
    <g>
      <!-- the lawn between the avenue and the house -->
      <rect x="0" y="566" width="4000" height="96" fill="#16323a"/>
      <rect x="0" y="566" width="4000" height="5" fill="#2a6a6c" opacity="0.4"/>
      <!-- railing across the front, with the gate opposite the door -->
      <rect x="2210" y="470" width="70" height="196" fill="#0a2229"/>
      <rect x="2202" y="446" width="86" height="28" fill="#123840"/>
      <rect x="2560" y="470" width="70" height="196" fill="#0a2229"/>
      <rect x="2552" y="446" width="86" height="28" fill="#123840"/>
      <rect x="0" y="524" width="2210" height="9" fill="#061820"/>
      <g fill="#081f26">${Array.from({length:55},(_,i)=>`<rect x="${i*40}" y="528" width="8" height="138"/>`).join('')}</g>
      <rect x="2630" y="524" width="1370" height="9" fill="#061820"/>
      <g fill="#081f26">${Array.from({length:34},(_,i)=>`<rect x="${2636+i*40}" y="528" width="8" height="138"/>`).join('')}</g>
      <!-- the path from the gate to the steps -->
      <path d="M2300 566 L2540 566 L2596 660 L2244 660 Z" fill="#33403f" opacity="0.7"/>
    </g>

    <!-- the road: mud, ruts, puddles catching the last of the sun -->
    <rect x="0" y="659" width="4000" height="241" fill="url(#floorG)"/>
    <g opacity="0.22" fill="#6d5a42">
      ${Array.from({length:56},(_,i)=>`<ellipse cx="${(i*197)%4000}" cy="${688+((i*67)%190)}" rx="${34+(i%5)*20}" ry="${7+(i%3)*4}"/>`).join('')}
    </g>
    <g opacity="0.3" fill="#ffb45c" filter="url(#bl)">
      <ellipse cx="2280" cy="760" rx="440" ry="26"/>
      <ellipse cx="1500" cy="846" rx="360" ry="22"/>
    </g>
    <g opacity="0.4" stroke="#1b3b3a" stroke-width="7" fill="none">
      <path d="M0 800 q1000 -40 2000 -6 q1000 34 2000 -10"/>
      <path d="M0 856 q1000 -36 2000 -2 q1000 30 2000 -8"/>
    </g>

    <!-- street lamp -->
    <g>
      <rect x="514" y="286" width="17" height="384" fill="#061820"/>
      <rect x="488" y="656" width="68" height="18" fill="#061820"/>
      <rect x="494" y="216" width="58" height="72" fill="#0b242c"/>
      <rect x="503" y="226" width="40" height="54" fill="#ffd48a"/>
      <path d="M488 216 l34 -30 l34 30 z" fill="#0f333a"/>
      <circle cx="523" cy="252" r="190" fill="url(#bloomCand)"/>
    </g>

    <!-- the newsboy. 430 units from the top of his raised newspaper to
         his boots, which puts him around five foot two. -->
    <image href="assets/img/newsboy.png" x="1426" y="320" width="148" height="430"
           preserveAspectRatio="xMidYMax meet"/>

    <!-- his crate of papers -->
    <g>
      <rect x="1680" y="576" width="156" height="98" fill="#0a2229"/>
      <rect x="1680" y="576" width="156" height="7" fill="#2a6a6c" opacity="0.6"/>
      <rect x="1696" y="600" width="124" height="6" fill="#123840"/>
      <rect x="1700" y="536" width="118" height="42" fill="#e9e0c8"/>
      <rect x="1708" y="524" width="118" height="38" fill="#f4ecd6"/>
      <rect x="1722" y="538" width="88" height="7" fill="#6e6a60"/>
      <rect x="1722" y="552" width="64" height="4" fill="#9a968c"/>
    </g>

    <!-- a handcart, and the building rubble of an unfinished capital -->
    <g>
      <rect x="3640" y="576" width="250" height="26" fill="#123840"/>
      <rect x="3656" y="602" width="218" height="56" fill="#0d2b32"/>
      <circle cx="3700" cy="676" r="54" fill="none" stroke="#0a2229" stroke-width="15"/>
      <circle cx="3840" cy="676" r="54" fill="none" stroke="#0a2229" stroke-width="15"/>
      <path d="M3640 586 l-120 -44" stroke="#0a2229" stroke-width="13"/>
    </g>
    <g fill="#0c262e">
      <rect x="700" y="596" width="150" height="34"/>
      <rect x="714" y="562" width="120" height="34"/>
      <rect x="740" y="630" width="150" height="30"/>
      <path d="M950 660 l46 -56 l46 56 z"/>
    </g>

    <!-- reflections in the wet ruts -->
    <g mask="url(#reflM)" opacity="0.35">
      <g transform="translate(0,1318) scale(1,-1)">
        <rect x="1420" y="0" width="2040" height="660" fill="#0a2229"/>
        <rect x="514" y="286" width="17" height="374" fill="#0a2229"/>
      </g>
      <ellipse cx="523" cy="706" rx="120" ry="40" fill="#ffd48a" opacity="0.5" filter="url(#bl)"/>
      <ellipse cx="2280" cy="710" rx="380" ry="46" fill="#ffb45c" opacity="0.35" filter="url(#bl)"/>
    </g>`),

  fg: svg(4800, `
    <g fill="#02080a">
      <rect x="0" y="0" width="176" height="900"/>
      <rect x="4624" y="0" width="176" height="900"/>
      <rect x="640" y="0" width="60" height="900"/>
      <path d="M700 0 L700 170 q-44 -76 -130 -92 l0 -78 z"/>
      <rect x="3760" y="0" width="72" height="900"/>
      <path d="M0 876 L4800 876 L4800 900 L0 900 Z"/>
    </g>
    <g opacity="0.2">
      <rect x="700" y="0" width="5" height="900" fill="#ffb45c"/>
      <rect x="3756" y="0" width="5" height="900" fill="#4fd3c4"/>
    </g>`)
};

/* ==================================================================
   ACT 1, SCENE 2 — the President's study, intact, by candlelight
==================================================================*/
const study = {
  back: svg(2880, `
    <rect width="2880" height="900" fill="#0d2230"/>
    <rect width="2880" height="900" fill="url(#moonSky)"/>
    <circle cx="820" cy="180" r="40" fill="#dff8f2" opacity="0.9"/>
    <circle cx="820" cy="180" r="130" fill="url(#bloomC)"/>
    <g fill="#e8fbf6" opacity="0.45">
      ${Array.from({length:44},(_,i)=>`<circle cx="${(i*263)%2880}" cy="${30+((i*97)%290)}" r="${1.4+(i%3)*0.7}"/>`).join('')}
    </g>
    <path d="M0 600 q200 -70 400 -18 q220 -62 440 -12 q210 -52 420 -8 q200 -44 400 -6
             q190 -36 380 -4 q160 -28 320 -2 q160 -22 320 0 l0 380 L0 980 Z" fill="#0a2029"/>`),

  mid: svg(4000, `
    <mask id="wallCut">
      <rect width="4000" height="900" fill="#fff"/>
      <rect x="236" y="112" width="300" height="365" fill="#000"/>
    </mask>
    <rect width="4000" height="900" fill="url(#wallG)" mask="url(#wallCut)"/>

    <!-- ambient: window (cold), Argand lamp (warm), hearth (warm) -->
    <circle cx="386"  cy="300" r="440" fill="url(#bloomC)"/>
    <circle cx="3430" cy="430" r="520" fill="url(#bloomW)"/>

    <!-- =========================================================
         THE PRESIDENT'S OFFICE  (x 0 - 1800)
    ========================================================== -->

    <!-- tall window, red silk velvet drapes -->
    <g>
      <rect x="220" y="96" width="332" height="397" fill="none" stroke="#04141a" stroke-width="18"/>
      <g stroke="#04141a" stroke-width="12">
        <line x1="386" y1="112" x2="386" y2="477"/>
        <line x1="236" y1="234" x2="536" y2="234"/>
        <line x1="236" y1="356" x2="536" y2="356"/>
      </g>
      <rect x="196" y="477" width="380" height="22" fill="#04141a"/>
      <rect x="214" y="499" width="344" height="12" fill="#0b2a31"/>
      <!-- window seat -->
      <rect x="230" y="560" width="312" height="24" fill="#123840"/>
      <rect x="236" y="584" width="300" height="76" fill="#0c262e"/>
      <rect x="242" y="548" width="288" height="18" rx="8" fill="#6d2622"/>
      <!-- drapes and swag -->
      <path d="M150 62 q34 220 14 438 l-74 0 l0 -438 z" fill="#7d2b26"/>
      <path d="M622 62 q-34 220 -14 438 l74 0 l0 -438 z" fill="#7d2b26"/>
      <path d="M150 62 q22 214 8 434" stroke="#5c1a17" stroke-width="11" fill="none" opacity="0.65"/>
      <path d="M622 62 q-22 214 -8 434" stroke="#5c1a17" stroke-width="11" fill="none" opacity="0.65"/>
      <path d="M90 62 L682 62 q-70 92 -156 74 q-70 68 -148 4 q-78 60 -140 -6 q-84 20 -148 -72 z" fill="#8e3129"/>
      <path d="M90 52 L682 52 L682 76 L90 76 Z" fill="#a8762f"/>
      <circle cx="238" cy="126" r="9" fill="#c98a3c"/>
      <circle cx="534" cy="126" r="9" fill="#c98a3c"/>
    </g>

    <!-- looking glass and pier table -->
    <g>
      <rect x="712" y="188" width="196" height="268" fill="#a8762f"/>
      <rect x="726" y="202" width="168" height="240" fill="#16414a"/>
      <path d="M726 202 L894 442 L894 202 Z" fill="#1e5560" opacity="0.6"/>
      <path d="M760 160 q50 -34 100 0 l-8 30 q-42 -26 -84 0 z" fill="#a8762f"/>
      <rect x="686" y="540" width="248" height="18" fill="#123840"/>
      <rect x="686" y="540" width="248" height="5" fill="#8fe8dc" opacity="0.3"/>
      <rect x="700" y="558" width="18" height="102" fill="#0a2229"/>
      <rect x="902" y="558" width="18" height="102" fill="#0a2229"/>
      <path d="M700 558 q110 26 220 0 l0 16 q-110 26 -220 0 z" fill="#0d2b32"/>
      <!-- decanter and two glasses -->
      <path d="M736 540 q-14 -40 2 -54 q-8 -14 4 -18 l14 0 q12 4 4 18 q16 14 2 54 z" fill="#8e3129" opacity="0.72"/>
      <path d="M740 512 q10 -6 20 0 l-2 22 q-8 4 -16 0 z" fill="#c2503c" opacity="0.5"/>
      <path d="M776 540 l4 -26 l18 0 l4 26 z" fill="#7fe3d6" opacity="0.3"/>
      <path d="M806 540 l4 -26 l18 0 l4 26 z" fill="#7fe3d6" opacity="0.26"/>
      <!-- a hat set down, and a little stack of cards -->
      <ellipse cx="878" cy="536" rx="38" ry="11" fill="#0a2229"/>
      <path d="M852 536 q26 -32 52 0 z" fill="#0c262e"/>
      <rect x="822" y="530" width="26" height="8" fill="#e9e0c8"/>
      <rect x="826" y="524" width="26" height="8" fill="#f2e9d2"/>
    </g>

    <!-- ITEM 2 pinned to the wall between window and desk -->
    <g transform="rotate(1.6 1010 372)">
      <rect x="952" y="286" width="118" height="152" fill="#efeadb"/>
      <rect x="952" y="286" width="5" height="152" fill="#bff3ea"/>
      <rect x="966" y="302" width="90" height="9" fill="#3f4a55"/>
      <rect x="972" y="318" width="78" height="3" fill="#6d7581"/>
      ${Array.from({length:8},(_,i)=>`<rect x="966" y="${332+i*11}" width="${90-(i%3)*22}" height="3.2" fill="#8b9199"/>`).join('')}
      <circle cx="1040" cy="418" r="12" fill="#2c4670"/>
      <path d="M1040 430 l-6 17 l13 0 z" fill="#2c4670"/>
      <circle cx="1010" cy="283" r="6" fill="#1b5a5f"/>
    </g>
    ${sconce(880, 340)}

    <!-- the President's writing desk: 30 inches high, standing in the
         room rather than against the wall -->
    <g>
      ${klismos(1268, 748)}
      <rect x="1006" y="560" width="460" height="24" fill="#123840"/>
      <rect x="1006" y="560" width="460" height="7" fill="#8fe8dc" opacity="0.4"/>
      <rect x="1440" y="560" width="26" height="200" fill="#0a2229"/>
      <rect x="1006" y="584" width="460" height="92" fill="#0d2b32"/>
      <rect x="1018" y="596" width="436" height="68" fill="#0a262d"/>
      <rect x="1030" y="676" width="24" height="84" fill="#081f26"/>
      <rect x="1418" y="676" width="24" height="84" fill="#081f26"/>
      <!-- green baize writing surface -->
      <rect x="1062" y="548" width="256" height="14" fill="#1d4a3c"/>
      <rect x="1062" y="548" width="256" height="4" fill="#3c7a5e" opacity="0.6"/>
      <!-- inkstand, sand shaker, quill -->
      <g>
        <rect x="1346" y="530" width="72" height="18" rx="3" fill="#8a6a2c"/>
        <ellipse cx="1364" cy="528" rx="13" ry="6" fill="#0a1418"/>
        <ellipse cx="1398" cy="528" rx="11" ry="5" fill="#123840"/>
        <path d="M1364 524 q30 -58 74 -84 q-20 46 -60 90 z" fill="#f4ead2"/>
      </g>
      <!-- a stack of despatches, weighted -->
      <g>
        <rect x="1078" y="534" width="64" height="14" fill="#e6dcc0"/>
        <rect x="1084" y="526" width="64" height="12" fill="#f0e7ce"/>
        <circle cx="1116" cy="522" r="9" fill="#2a3a42"/>
      </g>
      ${argand(1216, 548)}
    </g>

    <!-- ITEM 1: the sailor's letter, open on the baize -->
    <g transform="rotate(-5 1120 542)">
      <path d="M1078 522 L1164 522 L1168 548 L1074 548 Z" fill="#f6ecd6"/>
      <path d="M1078 522 L1121 538 L1164 522" fill="none" stroke="#c9bb9a" stroke-width="2.5"/>
      <circle cx="1154" cy="543" r="8" fill="#a8362c"/>
    </g>

    <!-- ITEM 4: the locked drawer -->
    <g>
      <rect x="1180" y="592" width="212" height="70" fill="#0e2f36"/>
      <rect x="1180" y="592" width="212" height="4" fill="#2a6a6c" opacity="0.8"/>
      <rect x="1192" y="604" width="188" height="46" fill="#0a262d"/>
      <circle cx="1286" cy="627" r="11" fill="#c98a3c"/>
      <circle cx="1286" cy="627" r="5" fill="#081f26"/>
      <rect x="1280" y="627" width="12" height="15" fill="#c98a3c"/>
    </g>

    <!-- a printed cartoon, pinned up years ago and never taken down -->
    <g transform="rotate(-3 1202 336)">
      <rect x="1150" y="280" width="104" height="112" fill="#e6ddc4"/>
      <rect x="1150" y="280" width="4" height="112" fill="#bff3ea" opacity="0.6"/>
      <ellipse cx="1190" cy="352" rx="22" ry="12" fill="#b8ad88"/>
      <path d="M1212 346 q10 -4 12 -8 q-2 -6 -8 -4 q-6 2 -4 12 z" fill="#b8ad88"/>
      <path d="M1196 316 l-2 22 M1186 322 l6 18" stroke="#5c574c" stroke-width="2.4"/>
      <circle cx="1198" cy="308" r="7" fill="#d8cca8"/>
      <rect x="1160" y="374" width="84" height="3" fill="#8b8778"/>
      <circle cx="1202" cy="278" r="5" fill="#1b5a5f"/>
    </g>

    <!-- bookshelf -->
    <g>
      <rect x="1540" y="214" width="252" height="446" fill="#061a20"/>
      <rect x="1540" y="214" width="7" height="446" fill="#4fd3c4" opacity="0.4"/>
      <rect x="1534" y="200" width="264" height="18" fill="#0f333a"/>
      ${[0,1,2,3,4].map(r=>{const y=232+r*86;return books(1556,y,10,r)+`<rect x="1548" y="${y+72}" width="236" height="8" fill="#123840"/>`}).join('')}
    </g>

    <!-- a side chair drawn up to the window, and a basket of papers
         that somebody has been working through -->
    <g>
      <path d="M232 760 q-10 -62 46 -66 l84 0 q56 4 46 66 z" fill="#0f333a"/>
      <path d="M232 760 q-10 -62 46 -66 l14 0 q-46 8 -38 66 z" fill="#1b5a5f"/>
      <rect x="262" y="672" width="76" height="28" fill="#e9e0c8" transform="rotate(-6 300 686)"/>
      <rect x="276" y="662" width="76" height="26" fill="#f2e9d2" transform="rotate(4 314 675)"/>
    </g>

    <!-- coat and hat on a peg, far left -->
    <g>
      <rect x="92" y="300" width="46" height="10" rx="4" fill="#0f333a"/>
      <path d="M100 310 q-22 70 -10 150 q26 16 52 0 q10 -84 -12 -150 z" fill="#123f47"/>
      <path d="M138 310 q22 66 12 146 l-14 6 q10 -76 -12 -146 z" fill="#0a2229"/>
      <ellipse cx="116" cy="292" rx="34" ry="10" fill="#0a2229"/>
      <path d="M96 292 q20 -34 40 0 z" fill="#0c262e"/>
    </g>

    <!-- =========================================================
         THE ARCH  (x 1830 - 2110)
    ========================================================== -->
    <g>
      <rect x="1830" y="60" width="54" height="600" fill="#0a262d"/>
      <rect x="2056" y="60" width="54" height="600" fill="#0a262d"/>
      <rect x="1824" y="40" width="66" height="26" fill="#12444a"/>
      <rect x="2050" y="40" width="66" height="26" fill="#12444a"/>
      <path d="M1884 120 q86 -84 172 0 l0 -60 l-172 0 z" fill="#0a262d"/>
      <rect x="1884" y="60" width="172" height="26" fill="#0c2c33"/>
      <rect x="1884" y="120" width="172" height="540" fill="#061a20" opacity="0.5"/>
      <rect x="1878" y="60" width="5" height="600" fill="#4fd3c4" opacity="0.2"/>
      <rect x="2057" y="60" width="5" height="600" fill="#ffb45c" opacity="0.22"/>
    </g>

    <!-- =========================================================
         THE CABINET ROOM  (x 2110 - 4000)
         "a large table in the center, and maps, globes, charts, &c."
    ========================================================== -->

    <!-- charts and maps covering the wall -->
    ${chart(2190, 176, 196, 148, 1)}
    ${chart(2416, 196, 150, 122, 2)}
    ${chart(2600, 168, 228, 166, 3)}
    ${chart(2860, 206, 142, 116, 0)}
    ${sconce(2400, 396)}
    ${sconce(2960, 396)}

    <!-- a rolled chart leaning in the corner -->
    <g transform="rotate(7 2160 560)">
      <rect x="2146" y="404" width="30" height="256" rx="15" fill="#c9bfa0"/>
      <rect x="2146" y="404" width="9" height="256" fill="#a9a084"/>
    </g>

    <!-- the long cabinet table -->
    <g>
      ${klismos(2330, 752, -1)}
      ${klismos(2880, 752)}
      <rect x="2260" y="556" width="880" height="26" fill="#123840"/>
      <rect x="2260" y="556" width="880" height="7" fill="#8fe8dc" opacity="0.35"/>
      <rect x="2272" y="582" width="856" height="42" fill="#0d2b32"/>
      <rect x="2272" y="582" width="856" height="5" fill="#2a6a6c" opacity="0.5"/>
      <rect x="2296" y="624" width="34" height="136" fill="#0a2229"/>
      <rect x="3070" y="624" width="34" height="136" fill="#0a2229"/>
      <rect x="2660" y="624" width="30" height="136" fill="#081f26"/>
      <rect x="2296" y="700" width="808" height="14" fill="#0a2229"/>
      <rect x="2290" y="750" width="46" height="12" rx="4" fill="#081f26"/>
      <rect x="3064" y="750" width="46" height="12" rx="4" fill="#081f26"/>
      <!-- green baize, papers, a wine glass and a decanter -->
      <rect x="2380" y="546" width="620" height="12" fill="#1d4a3c"/>
      <g transform="rotate(-3 2724 532)">
        <rect x="2674" y="512" width="100" height="34" fill="#f2e9d2"/>
        <rect x="2684" y="520" width="34" height="4" fill="#5c5a52"/>
        <rect x="2684" y="528" width="46" height="3" fill="#8e2b22"/>
        <rect x="2684" y="535" width="40" height="3" fill="#8e2b22"/>
        <rect x="2740" y="520" width="24" height="3" fill="#95928a"/>
        <rect x="2740" y="527" width="24" height="3" fill="#95928a"/>
        <rect x="2740" y="534" width="18" height="3" fill="#95928a"/>
      </g>
      <g>
        <path d="M2940 546 l6 -34 l26 0 l6 34 z" fill="#7fe3d6" opacity="0.35"/>
        <ellipse cx="2959" cy="546" rx="16" ry="5" fill="#2a6a6c" opacity="0.6"/>
        <path d="M3000 546 q-10 -40 4 -58 q14 18 4 58 z" fill="#8e3129" opacity="0.7"/>
      </g>
      ${sconce(2560, 520)}
    </g>

    <!-- ITEM 3: the frontier dispatch, on the cabinet table -->
    <g transform="rotate(-8 2496 540)">
      <rect x="2472" y="506" width="26" height="72" rx="13" fill="#ece0c0"/>
      <rect x="2472" y="506" width="8" height="72" fill="#c4b795"/>
      <ellipse cx="2485" cy="508" rx="13" ry="5" fill="#f6ecd6"/>
      <rect x="2466" y="534" width="38" height="10" fill="#a8362c"/>
      <path d="M2504 539 q14 8 11 21" stroke="#a8362c" stroke-width="5" fill="none"/>
    </g>

    <!-- the globe, 18 inches across -->
    <g>
      <circle cx="3212" cy="512" r="55" fill="#0e2d34"/>
      <path d="M3212 457 a55 55 0 0 0 0 110 z" fill="#14424a"/>
      <circle cx="3212" cy="512" r="55" fill="none" stroke="#c98a3c" stroke-width="5"/>
      <ellipse cx="3212" cy="512" rx="62" ry="15" fill="none" stroke="#c98a3c" stroke-width="5"/>
      <path d="M3192 476 q22 12 42 2" stroke="#3f9b8f" stroke-width="6" fill="none"/>
      <path d="M3178 534 q36 18 70 -2" stroke="#3f9b8f" stroke-width="6" fill="none"/>
      <path d="M3186 572 l26 -6 l26 6 l0 96 l-52 0 z" fill="#0a2229"/>
      <path d="M3176 668 l72 0 l10 24 l-92 0 z" fill="#081f26"/>
    </g>

    <!-- the hearth: mantel at 4 feet 6 -->
    <g>
      <rect x="3330" y="331" width="404" height="329" fill="#0e2f36"/>
      <rect x="3308" y="308" width="448" height="26" fill="#14444c"/>
      <rect x="3330" y="331" width="404" height="6" fill="#ffb45c" opacity="0.45"/>
      <rect x="3404" y="404" width="256" height="256" fill="#030c10"/>
      <rect x="3392" y="392" width="280" height="14" fill="#123840"/>
      <path d="M3532 500 q42 60 22 124 q-30 34 -70 4 q-32 -58 14 -90 q20 -16 34 -38 z" fill="#ff9e42"/>
      <path d="M3534 548 q24 40 10 76 q-18 20 -40 2 q-16 -36 12 -54 z" fill="#ffd88a"/>
      <path d="M3424 648 l216 0 l0 12 l-216 0 z" fill="#1b2026"/>
      <path d="M3440 640 l88 -14 l6 14 l-94 12 z" fill="#2b1c10"/>
      <!-- fire irons and a coal scuttle -->
      <g>
        <path d="M3760 660 l0 -128" stroke="#0a2229" stroke-width="7"/>
        <path d="M3784 660 l0 -120" stroke="#0a2229" stroke-width="7"/>
        <path d="M3752 532 l40 0" stroke="#0a2229" stroke-width="6"/>
        <path d="M3818 660 q-8 -54 26 -58 q34 4 26 58 z" fill="#0c262e"/>
        <path d="M3826 606 q26 -10 44 0" stroke="#123840" stroke-width="6" fill="none"/>
      </g>
      <!-- the Washington portrait over the mantel -->
      <g>
        <rect x="3402" y="66" width="262" height="228" fill="#a8762f"/>
        <rect x="3416" y="80" width="234" height="200" fill="#0a1f26"/>
        <rect x="3428" y="92" width="210" height="176" fill="#12333a"/>
        <ellipse cx="3533" cy="252" rx="86" ry="26" fill="#1a2a36"/>
        <path d="M3496 268 q8 -78 37 -84 q29 6 37 84 z" fill="#101c26"/>
        <path d="M3520 190 q13 9 26 0 l9 22 q-22 12 -44 0 z" fill="#e8e2d4"/>
        <path d="M3533 186 q-20 6 -26 24 l-12 -8 q8 -22 30 -28 z" fill="#161f2a"/>
        <path d="M3533 186 q20 6 26 24 l12 -8 q-8 -22 -30 -28 z" fill="#161f2a"/>
        <circle cx="3533" cy="162" r="25" fill="#c9a98a"/>
        <path d="M3509 156 q24 -30 48 -4 q-2 -26 -24 -26 q-23 0 -24 30 z" fill="#ddd8cc"/>
        <path d="M3506 168 q-9 4 -7 16 q6 6 12 0 z" fill="#ddd8cc"/>
        <path d="M3560 168 q9 4 7 16 q-6 6 -12 0 z" fill="#ddd8cc"/>
        <path d="M3556 230 q22 8 30 30" stroke="#c9a98a" stroke-width="7" fill="none"/>
        <rect x="3402" y="66" width="262" height="7" fill="#e0b56a"/>
      </g>
    </g>

    <!-- tall case clock, far right -->
    <g>
      <rect x="3862" y="256" width="106" height="404" fill="#0a2229"/>
      <rect x="3874" y="286" width="82" height="152" fill="#061a20"/>
      <rect x="3856" y="230" width="118" height="30" fill="#0f333a"/>
      <path d="M3862 230 q53 -46 106 0 z" fill="#0c2c33"/>
      <circle cx="3915" cy="204" r="42" fill="#d9cfae"/>
      <circle cx="3915" cy="204" r="42" fill="none" stroke="#a8762f" stroke-width="5"/>
      <path d="M3915 204 L3915 180 M3915 204 L3932 214" stroke="#2b2620" stroke-width="3"/>
      <ellipse cx="3915" cy="400" rx="22" ry="22" fill="#c98a3c" opacity="0.8"/>
    </g>

    <!-- =========================================================
         FLOOR
    ========================================================== -->
    <rect x="0" y="659" width="4000" height="241" fill="url(#floorG)"/>
    <g opacity="0.5" stroke="#1b4a52" stroke-width="2">
      ${Array.from({length:26},(_,i)=>`<line x1="${i*160}" y1="660" x2="${i*160-70}" y2="900"/>`).join('')}
    </g>
    <g>
      <path d="M700 726 L1700 726 L1830 880 L570 880 Z" fill="#13333a"/>
      <path d="M744 744 L1656 744 L1762 862 L638 862 Z" fill="none" stroke="#c98a3c" stroke-width="5" opacity="0.38"/>
      <path d="M840 774 L1560 774 L1632 838 L768 838 Z" fill="#173d42"/>
    </g>
    <!-- a dropped despatch and a footstool, because people worked here -->
    <g transform="rotate(-9 900 792)">
      <rect x="866" y="778" width="70" height="26" fill="#d9cfae" opacity="0.85"/>
      <rect x="874" y="786" width="50" height="3" fill="#8b9199"/>
    </g>
    <g>
      <rect x="1640" y="716" width="98" height="14" rx="5" fill="#6d2622"/>
      <rect x="1650" y="730" width="16" height="30" fill="#0a2229"/>
      <rect x="1712" y="730" width="16" height="30" fill="#0a2229"/>
    </g>
    <g>
      <ellipse cx="2700" cy="800" rx="900" ry="108" fill="#13333a"/>
      <ellipse cx="2700" cy="800" rx="810" ry="90" fill="none" stroke="#c98a3c" stroke-width="6" opacity="0.45"/>
      <ellipse cx="2700" cy="800" rx="560" ry="62" fill="#173d42"/>
      <ellipse cx="2700" cy="800" rx="460" ry="48" fill="none" stroke="#c98a3c" stroke-width="4" opacity="0.35"/>
    </g>
    <g mask="url(#reflM)" opacity="0.45">
      <g transform="translate(0,1318) scale(1,-1)">
        <rect x="1006" y="560" width="460" height="116" fill="#0d2b32"/>
        <rect x="2260" y="556" width="880" height="44" fill="#123840"/>
        <rect x="3404" y="404" width="256" height="256" fill="#2e1608"/>
        <rect x="1540" y="214" width="252" height="446" fill="#081f26"/>
        <rect x="3862" y="256" width="106" height="404" fill="#081f26"/>
      </g>
      <ellipse cx="3530" cy="704" rx="230" ry="60" fill="#ff9e42" opacity="0.55" filter="url(#bl)"/>
      <ellipse cx="386"  cy="704" rx="210" ry="56" fill="#7fe3d6" opacity="0.4"  filter="url(#bl)"/>
      <ellipse cx="1216" cy="700" rx="170" ry="48" fill="#ffd88a" opacity="0.6"  filter="url(#bl)"/>
    </g>
    <rect x="0" y="656" width="4000" height="4" fill="#2a6a6c" opacity="0.5"/>`),

  fg: svg(4800, `
    <g fill="#02080a">
      <rect x="0" y="0" width="188" height="900"/>
      <path d="M188 0 L188 900 L228 900 L228 214 q62 -120 196 -128 l0 -86 z"/>
      <rect x="4612" y="0" width="188" height="900"/>
      <path d="M4612 0 L4612 900 L4572 900 L4572 250 q-58 -106 -184 -118 l0 -132 z"/>
      <rect x="2576" y="0" width="74" height="900"/>
      <path d="M2650 0 L2650 188 q-46 -80 -138 -96 l0 -92 z"/>
      <path d="M0 872 L4800 872 L4800 900 L0 900 Z"/>
    </g>
    <g opacity="0.2">
      <rect x="228" y="0" width="5" height="900" fill="#4fd3c4"/>
      <rect x="2650" y="0" width="5" height="900" fill="#ffb45c"/>
      <rect x="4567" y="0" width="5" height="900" fill="#ffb45c"/>
    </g>`)
};


/* ==================================================================
   ACT 2, SCENE 1 — the same street, spring 1815. Same camera as the
   night scene, so the ruin lands by comparison rather than by caption.
==================================================================*/
const ruins = {
  back: svg(2880, `
    <rect width="2880" height="900" fill="url(#daySky)"/>
    <circle cx="2100" cy="300" r="520" fill="url(#bloomDay)"/>
    <g opacity="0.5" fill="#a9b3b6">
      <ellipse cx="620"  cy="190" rx="420" ry="44"/>
      <ellipse cx="1620" cy="140" rx="360" ry="34"/>
      <ellipse cx="2500" cy="236" rx="420" ry="40"/>
    </g>
    <path d="M0 628 q170 -46 340 -12 q180 -44 360 -8 q170 -38 340 -6 q190 -34 380 -2
             q170 -30 340 0 q180 -24 360 2 q160 -16 320 4 q140 -12 280 4 l0 330 L0 980 Z"
          fill="#6f7a73"/>`),

  mid: svg(4000, `
    <!-- =========================================================
         THE RUIN. The walls stood; everything inside did not.
    ========================================================== -->
    <g transform="translate(1044 197) scale(0.55)">
      <rect x="1180" y="0" width="2280" height="660" fill="url(#whiteDay)"/>
      <!-- the cornice survived in stretches; the balustrade mostly did not -->
      <rect x="1150" y="-62" width="2340" height="62" fill="#c8c1b0"/>
      <rect x="1150" y="-74" width="2340" height="14" fill="#d6cfbd"/>
      <g fill="#3a352d" opacity="0.45">
        <path d="M1700 -62 l420 0 l0 62 l-420 0 z"/>
        <path d="M2760 -62 l380 0 l0 62 l-380 0 z"/>
      </g>
      <rect x="1150" y="-162" width="640" height="16" fill="#c8c1b0"/>
      <rect x="3010" y="-162" width="480" height="16" fill="#c8c1b0"/>
      <g fill="#bdb5a4">${[0,1,2,3,4,5,6,7,8,9,31,32,33,34,35,36,37].map(i=>`<rect x="${1172+i*60}" y="-146" width="20" height="72" rx="7"/>`).join('')}</g>
      <rect x="1180" y="556" width="2280" height="104" fill="#a89f8f"/>
      ${Array.from({length:19},(_,i)=>`<rect x="${1180+i*120}" y="556" width="114" height="48" fill="none" stroke="#8b8273" stroke-width="3"/>`).join('')}
      ${Array.from({length:19},(_,i)=>`<rect x="${1180+i*120}" y="608" width="114" height="46" fill="none" stroke="#8b8273" stroke-width="3"/>`).join('')}
      <!-- soot washed down the face by the rain that put the fire out -->
      <g fill="#3a352d" opacity="0.3">
        <path d="M1300 300 q22 160 6 360 l-46 0 q18 -200 -4 -360 z"/>
        <path d="M2900 340 q26 140 8 320 l-52 0 q20 -180 -4 -320 z"/>
        <path d="M2060 260 q18 180 4 400 l-38 0 q14 -220 -2 -400 z"/>
      </g>

      <!-- the windows are holes now, and the fire ran up the stone -->
      <g>
        ${[1272, 1584, 1896, 2853, 3156].map(x=>`
          <rect x="${x-13}" y="62" width="246" height="480" fill="#79705f"/>
          <rect x="${x}" y="76" width="220" height="452" fill="#0e0e0d"/>
          <rect x="${x+8}" y="84" width="204" height="170" fill="#5d6a6e" opacity="0.4"/>
          <rect x="${x-22}" y="528" width="264" height="22" fill="#bdb5a4"/>
          <rect x="${x-18}" y="50" width="256" height="16" fill="#cdc6b5"/>
          ${scorch(x-12, 60, 244, 185)}`).join('')}
      </g>

      <!-- the portico: the columns cracked and were re-dressed later,
           but in 1815 two of them are down and propped -->
      <g>
        ${[2250, 2620].map((x,i)=>`
          <rect x="${x}" y="${i===1?120:0}" width="150" height="${i===1?436:556}" fill="#c0b9a8"/>
          <rect x="${x}" y="${i===1?120:0}" width="20" height="${i===1?436:556}" fill="#e2ddce" opacity="0.7"/>
          <rect x="${x+118}" y="${i===1?120:0}" width="32" height="${i===1?436:556}" fill="#8d8676"/>
          <rect x="${x-18}" y="536" width="186" height="26" fill="#a89f8f"/>
          ${i===1 ? `<path d="M${x} 120 l150 0 l-16 -34 l-118 0 z" fill="#8d8676"/>
                      <path d="M${x+170} 560 l120 -190 l34 20 l-118 186 z" fill="#6b5a3e"/>` : ''}`).join('')}
        <rect x="2210" y="0" width="560" height="52" fill="#cdc6b5"/>
        <rect x="2168" y="-70" width="644" height="70" fill="#c8c1b0"/>
        <path d="M2150 -82 L2830 -82 L2490 -216 Z" fill="#c0b9a8"/>
        <path d="M2150 -82 L2830 -82 L2490 -216 Z" fill="none" stroke="#8d8676" stroke-width="6"/>
        ${scorch(2300, -86, 380, 110)}
        ${scorch(2210, 56, 560, 120)}
      </g>

      <!-- the doorway: no door, just the opening and a plank ramp -->
      <g>
        <rect x="2402" y="188" width="176" height="368" fill="#0c0c0b"/>
        <path d="M2402 188 q88 -58 176 0 z" fill="#b5ad9d"/>
        ${scorch(2398, 190, 184, 130)}
        <rect x="2318" y="556" width="344" height="30" fill="#c0b9a8"/>
        <rect x="2288" y="586" width="404" height="30" fill="#b5ad9d"/>
        <rect x="2258" y="616" width="464" height="32" fill="#a89f8f"/>
        <path d="M2228 660 l300 -30 l14 24 l-300 32 z" fill="#7d6840"/>
      </g>

      <!-- scaffolding: three years of work starts here -->
      ${scaffold(1260, 660, 600)}
      ${scaffold(2960, 660, 600)}
      <g stroke="#6b5a3e" stroke-width="10">
        <line x1="1700" y1="660" x2="1760" y2="300"/>
        <line x1="3200" y1="660" x2="3150" y2="320"/>
      </g>
    </g>

    <!-- gate piers, one of them knocked about -->
    <g>
      <rect x="0" y="566" width="4000" height="96" fill="#54584a"/>
      <rect x="2210" y="470" width="70" height="196" fill="#3a3732"/>
      <rect x="2202" y="446" width="86" height="28" fill="#474339"/>
      <rect x="2560" y="482" width="70" height="184" fill="#3a3732" transform="rotate(4 2595 574)"/>
      <rect x="0" y="524" width="2210" height="9" fill="#2d2b27"/>
      <g fill="#332f2b">${Array.from({length:55},(_,i)=>`<rect x="${i*40}" y="528" width="8" height="${i%7===3?92:138}"/>`).join('')}</g>
      <rect x="2630" y="524" width="1370" height="9" fill="#2d2b27"/>
      <g fill="#332f2b">${Array.from({length:34},(_,i)=>`<rect x="${2636+i*40}" y="528" width="8" height="${i%5===2?96:138}"/>`).join('')}</g>
      <path d="M2300 566 L2540 566 L2596 660 L2244 660 Z" fill="#45433c" opacity="0.8"/>
    </g>

    <!-- the road, dried out and rutted -->
    <rect x="0" y="659" width="4000" height="241" fill="url(#ashFloor)"/>
    <g opacity="0.2" fill="#9a8f78">
      ${Array.from({length:56},(_,i)=>`<ellipse cx="${(i*197)%4000}" cy="${688+((i*67)%190)}" rx="${34+(i%5)*20}" ry="${7+(i%3)*4}"/>`).join('')}
    </g>
    <g opacity="0.35" stroke="#57534a" stroke-width="7" fill="none">
      <path d="M0 800 q1000 -40 2000 -6 q1000 34 2000 -10"/>
      <path d="M0 856 q1000 -36 2000 -2 q1000 30 2000 -8"/>
    </g>

    <!-- the stonemason, and his work. 420 units, about five foot nine. -->
    <image href="assets/img/mason.png" x="1826" y="330" width="148" height="420"
           preserveAspectRatio="xMidYMax meet"/>

    <!-- dressed stone, a lime tub, a barrow -->
    <g fill="#8a8172">
      <rect x="600" y="572" width="176" height="46"/>
      <rect x="612" y="618" width="176" height="46"/>
      <rect x="580" y="526" width="146" height="44"/>
      <rect x="596" y="482" width="112" height="42"/>
    </g>
    <g fill="#6f675b">
      <path d="M600 572 l176 0 l0 5 l-176 0 z"/>
      <path d="M580 526 l146 0 l0 5 l-146 0 z"/>
    </g>
    <g>
      <path d="M980 660 q-10 -66 44 -70 l48 0 q54 4 44 70 z" fill="#5c584e"/>
      <ellipse cx="1046" cy="592" rx="50" ry="12" fill="#c9c6b6"/>
      <path d="M900 640 l0 -140" stroke="#5c584e" stroke-width="10"/>
      <path d="M872 496 l58 0 l0 24 l-58 0 z" fill="#4a4740"/>
      <path d="M860 660 l120 0 l0 12 l-120 0 z" fill="#3a3732"/>
    </g>
    <!-- a pile of burnt timber pulled out of the building -->
    <g fill="#1d1c1a">
      <path d="M1520 660 l210 -26 l6 18 l-212 28 z"/>
      <path d="M1526 636 l196 -30 l6 16 l-198 32 z"/>
      <path d="M1550 614 l160 -22 l4 14 l-162 24 z"/>
    </g>
    <g>
      <rect x="3640" y="576" width="250" height="26" fill="#57534a"/>
      <rect x="3656" y="602" width="218" height="56" fill="#443f39"/>
      <circle cx="3700" cy="676" r="54" fill="none" stroke="#332f2b" stroke-width="15"/>
      <circle cx="3840" cy="676" r="54" fill="none" stroke="#332f2b" stroke-width="15"/>
      <path d="M3640 586 l-120 -44" stroke="#332f2b" stroke-width="13"/>
    </g>`),

  fg: svg(4800, `
    <g fill="#121311">
      <rect x="0" y="0" width="176" height="900"/>
      <rect x="4624" y="0" width="176" height="900"/>
      <rect x="330" y="0" width="56" height="900"/>
      <path d="M386 0 L386 170 q-44 -76 -130 -92 l0 -78 z"/>
      <rect x="3960" y="0" width="72" height="900"/>
      <path d="M0 876 L4800 876 L4800 900 L0 900 Z"/>
    </g>
    <g opacity="0.16">
      <rect x="386" y="0" width="5" height="900" fill="#e8ecec"/>
      <rect x="3956" y="0" width="5" height="900" fill="#e8ecec"/>
    </g>`)
};


/* ==================================================================
   ACT 2, SCENE 2 — the same two rooms, gutted. Every fixture sits at
   the same world x as its Act One counterpart, so walking through is
   a comparison rather than a new room.
==================================================================*/
const burned = {
  back: svg(2880, `
    <rect width="2880" height="900" fill="url(#daySky)"/>
    <circle cx="700"  cy="240" r="420" fill="url(#bloomDay)"/>
    <circle cx="2000" cy="200" r="380" fill="url(#bloomDay)"/>
    <g opacity="0.45" fill="#aab3b4">
      <ellipse cx="900" cy="200" rx="420" ry="40"/>
      <ellipse cx="2100" cy="150" rx="380" ry="34"/>
    </g>`),

  mid: svg(4000, `
    <mask id="burnCut">
      <rect width="4000" height="900" fill="#fff"/>
      <rect x="236" y="112" width="300" height="365" fill="#000"/>
      <path d="M1180 0 L2060 0 L1960 190 q-160 66 -330 22 q-180 -40 -290 -38 z" fill="#000"/>
      <path d="M3020 0 L3560 0 L3500 128 q-200 52 -390 -30 z" fill="#000"/>
    </mask>
    <rect width="4000" height="900" fill="url(#ashWall)" mask="url(#burnCut)"/>

    <!-- daylight coming in where the roof used to be -->
    <path d="M1240 60 L1980 60 L2260 660 L860 660 Z" fill="#dfe6e6" opacity="0.14"/>
    <path d="M3060 40 L3500 40 L3620 660 L2960 660 Z" fill="#dfe6e6" opacity="0.1"/>
    <circle cx="640" cy="300" r="420" fill="url(#bloomDay)" opacity="0.7"/>

    <!-- =========================================================
         THE OFFICE, burned out
    ========================================================== -->

    <!-- the window: frame gone, drapes gone, daylight straight through -->
    <g>
      <rect x="220" y="96" width="332" height="397" fill="none" stroke="#1d1c1a" stroke-width="18"/>
      <rect x="196" y="477" width="380" height="22" fill="#23211e"/>
      ${scorch(212, 100, 348, 128)}
      <path d="M232 108 l30 -10 l4 26 z" fill="#2b2926"/>
      <path d="M520 112 l-28 -8 l-2 24 z" fill="#2b2926"/>
      <!-- the window seat, burned down to its frame -->
      <path d="M236 584 l300 0 l-8 76 l-284 0 z" fill="#2a2724"/>
      <path d="M244 560 l284 0 l6 22 l-296 0 z" fill="#1d1c1a"/>
    </g>

    <!-- the looking glass: frame burned away, glass gone, hooks left -->
    <g>
      <rect x="712" y="188" width="196" height="268" fill="none" stroke="#242320" stroke-width="10"/>
      <path d="M726 202 l40 0 l-40 56 z" fill="#38413f" opacity="0.5"/>
      <circle cx="810" cy="178" r="7" fill="#5c584e"/>
      ${scorch(704, 192, 212, 96)}
      <!-- the pier table, collapsed -->
      <path d="M686 556 l248 0 l-14 22 l-222 0 z" fill="#2a2724"/>
      <path d="M700 578 l14 82 l-30 0 z" fill="#242320"/>
      <path d="M902 578 l-20 82 l34 0 z" fill="#242320"/>
      <g fill="#4a4740">
        <path d="M742 640 l64 -8 l6 28 l-70 6 z"/>
        <ellipse cx="866" cy="652" rx="34" ry="9"/>
      </g>
    </g>

    <!-- ITEM 2: the New Orleans report, nailed to the scorched wall -->
    <g transform="rotate(-2.4 1010 372)">
      <rect x="952" y="286" width="118" height="152" fill="#e3dcc6"/>
      <rect x="952" y="286" width="5" height="152" fill="#ffffff" opacity="0.5"/>
      <rect x="966" y="302" width="90" height="9" fill="#3a3630"/>
      ${Array.from({length:8},(_,i)=>`<rect x="966" y="${322+i*12}" width="${90-(i%3)*24}" height="3.4" fill="#8b8778"/>`).join('')}
      <rect x="966" y="418" width="46" height="7" fill="#8e2b22"/>
      <circle cx="1010" cy="283" r="6" fill="#5c584e"/>
    </g>

    <!-- the desk: a charred carcass, with a scaffold plank laid across
         it to make a working surface again -->
    <g>
      <path d="M1006 592 l460 0 l-12 84 l-436 0 z" fill="#232220"/>
      <path d="M1030 676 l24 84 l-40 0 z" fill="#1d1c1a"/>
      <path d="M1442 676 l-20 84 l36 0 z" fill="#1d1c1a"/>
      <path d="M1006 592 l460 0 l0 10 l-460 0 z" fill="#5c584e"/>
      <rect x="980" y="556" width="520" height="22" fill="#8a7448"/>
      <rect x="980" y="556" width="520" height="5" fill="#b59a63"/>
      <!-- the drawer, forced open and empty -->
      <g>
        <path d="M1180 606 l212 0 l6 62 l-224 0 z" fill="#1a1918"/>
        <path d="M1174 668 l236 0 l10 28 l-256 0 z" fill="#2a2724"/>
        <path d="M1188 618 l188 0 l4 42 l-196 0 z" fill="#0d0d0c"/>
      </g>
      <!-- the Argand lamp, melted where it stood -->
      <g>
        <ellipse cx="1216" cy="556" rx="34" ry="9" fill="#5c5140"/>
        <path d="M1194 556 q8 -26 22 -28 q14 2 22 28 z" fill="#6b5f46"/>
        <path d="M1206 528 q10 -20 20 -2 q-4 14 -20 2 z" fill="#4a4235"/>
      </g>
    </g>

    <!-- ITEM 1: the ledger, open on the plank -->
    <g transform="rotate(-4 1116 542)">
      <path d="M1058 518 L1174 518 L1178 552 L1054 552 Z" fill="#e8e2ce"/>
      <path d="M1116 518 L1116 552" stroke="#b5ae98" stroke-width="2"/>
      ${Array.from({length:4},(_,i)=>`<rect x="1066" y="${526+i*7}" width="40" height="2" fill="#8b8778"/><rect x="1126" y="${526+i*7}" width="40" height="2" fill="#8b8778"/>`).join('')}
    </g>

    <!-- the bookshelf: shelves gone, uprights standing, ash beneath -->
    <g>
      <rect x="1540" y="214" width="252" height="446" fill="#1a1918"/>
      <rect x="1540" y="214" width="9" height="446" fill="#4a4740"/>
      <rect x="1783" y="214" width="9" height="446" fill="#4a4740"/>
      ${[0,2,4].map(r=>`<rect x="1548" y="${232+r*86+72}" width="${r===2?150:236}" height="9" fill="#2f2c28"/>`).join('')}
      <path d="M1548 660 q120 -34 244 0 z" fill="#3a3630"/>
      ${scorch(1536, 220, 260, 120)}
    </g>

    <!-- the arch, cracked -->
    <g>
      <rect x="1830" y="60" width="54" height="600" fill="#2a2724"/>
      <rect x="2056" y="60" width="54" height="600" fill="#2a2724"/>
      <path d="M1884 120 q86 -84 172 0 l0 -60 l-172 0 z" fill="#242320"/>
      <path d="M1884 120 q86 -84 172 0" stroke="#5c584e" stroke-width="5" fill="none"/>
      <path d="M1920 60 l14 60 l-8 0 l-14 -60 z" fill="#0d0d0c"/>
      <path d="M2030 120 l-16 62 l10 0 l14 -60 z" fill="#0d0d0c"/>
      <rect x="1884" y="120" width="172" height="540" fill="#111110" opacity="0.6"/>
    </g>

    <!-- =========================================================
         THE CABINET ROOM, burned out
    ========================================================== -->

    <!-- soot running up the wall where the heat pooled -->
    <g fill="#191817" opacity="0.55">
      <path d="M2140 0 q40 200 10 400 l-70 0 q26 -210 -6 -400 z"/>
      <path d="M3060 0 q54 170 22 330 l-84 0 q28 -170 -10 -330 z"/>
      <path d="M2700 0 q30 120 8 230 l-54 0 q18 -120 -6 -230 z"/>
    </g>

    <!-- the ghosts of the charts: the fire left their outlines -->
    ${[[2190,176,196,148],[2416,196,150,122],[2600,168,228,166],[2860,206,142,116]].map(c=>`
      <g>
        <rect x="${c[0]}" y="${c[1]}" width="${c[2]}" height="${c[3]}" fill="#2f2d29"/>
        <rect x="${c[0]}" y="${c[1]}" width="${c[2]}" height="${c[3]}" fill="none" stroke="#4e4a42" stroke-width="3"/>
        <circle cx="${c[0]+c[2]/2}" cy="${c[1]-10}" r="5" fill="#5c584e"/>
      </g>`).join('')}

    <!-- the long table, collapsed in the middle -->
    <g>
      <path d="M2260 568 L2700 592 L3140 568 L3140 600 L2700 626 L2260 600 Z" fill="#242320"/>
      <path d="M2260 568 L2700 592 L3140 568 L3140 576 L2700 600 L2260 576 Z" fill="#5c584e"/>
      <path d="M2296 604 l34 150 l-56 0 z" fill="#1d1c1a"/>
      <path d="M3104 604 l-34 150 l56 0 z" fill="#1d1c1a"/>
      <path d="M2640 620 l40 0 l18 132 l-70 0 z" fill="#1a1918"/>
      <!-- burnt chair frames -->
      <path d="M2380 760 q-8 -60 10 -92 l52 0 q18 32 10 92 z" fill="#1d1c1a"/>
      <path d="M2900 752 l-6 -86 l14 0 l10 86 z" fill="#1d1c1a"/>
      <path d="M2880 666 l56 0 l0 12 l-56 0 z" fill="#242320"/>
    </g>

    <!-- ITEM 3: a map, unrolled on the collapsed table and weighted down -->
    <g transform="rotate(4 2500 580)">
      <path d="M2434 550 L2566 550 L2570 600 L2430 600 Z" fill="#ece5d0"/>
      <path d="M2434 550 L2566 550 L2566 556 L2434 556 Z" fill="#f6f1e0"/>
      <g opacity="0.6" fill="none" stroke="#7e8f7a" stroke-width="1.6">
        <path d="M2452 588 q16 -18 34 -10 q16 8 30 -4 q12 -10 24 2"/>
        <path d="M2448 570 q22 8 44 0"/>
      </g>
      <path d="M2496 566 q18 -6 26 6 q4 16 -8 22 q-16 2 -20 -12 z" fill="#b8503c" opacity="0.55"/>
      <!-- rolled edges, and a stone holding it flat -->
      <path d="M2424 550 q10 26 6 50 l-10 0 q-6 -26 4 -50 z" fill="#cfc6ab"/>
      <path d="M2566 550 q10 26 6 50 l10 0 q6 -26 -4 -50 z" fill="#cfc6ab"/>
      <ellipse cx="2470" cy="552" rx="16" ry="6" fill="#6f675a"/>
    </g>

    <!-- the globe: burnt through, the stand still upright -->
    <g>
      <circle cx="3212" cy="512" r="55" fill="#26241f"/>
      <path d="M3212 457 a55 55 0 0 1 0 110 q-40 -30 0 -110 z" fill="#3a3630"/>
      <path d="M3170 490 q40 -22 84 10 q-30 40 -84 -10 z" fill="#0d0d0c"/>
      <circle cx="3212" cy="512" r="55" fill="none" stroke="#5c5140" stroke-width="5"/>
      <path d="M3186 572 l26 -6 l26 6 l0 96 l-52 0 z" fill="#1d1c1a"/>
      <path d="M3176 668 l72 0 l10 24 l-92 0 z" fill="#1a1918"/>
    </g>

    <!-- the hearth: stone, so it survived. A workman's fire in it now -->
    <g>
      <rect x="3330" y="331" width="404" height="329" fill="#3d3a34"/>
      <rect x="3308" y="308" width="448" height="26" fill="#4a4740"/>
      <rect x="3404" y="404" width="256" height="256" fill="#100f0e"/>
      ${scorch(3396, 408, 272, 110)}
      <path d="M3532 560 q26 34 14 70 q-18 20 -42 2 q-20 -34 8 -52 z" fill="#e07a32" opacity="0.9"/>
      <path d="M3534 588 q14 22 6 42 q-10 12 -24 2 q-10 -20 8 -32 z" fill="#ffd88a"/>
      <circle cx="3530" cy="600" r="210" fill="url(#bloomW)" opacity="0.55"/>
      <path d="M3440 648 l88 -14 l6 14 l-94 12 z" fill="#2b1c10"/>
      <!-- a newspaper the masons were going to burn -->
      <g transform="rotate(-6 3268 620)">
        <path d="M3226 596 L3310 596 L3314 644 L3222 644 Z" fill="#e6ddc4"/>
        <path d="M3268 596 L3270 644" stroke="#b9b09a" stroke-width="1.5"/>
        <rect x="3234" y="606" width="28" height="4" fill="#5c574c"/>
        <rect x="3234" y="616" width="24" height="2.6" fill="#8b8778"/>
        <rect x="3276" y="606" width="28" height="4" fill="#5c574c"/>
        <rect x="3276" y="616" width="24" height="2.6" fill="#8b8778"/>
        <path d="M3232 634 l58 -2" stroke="#8e2b22" stroke-width="2"/>
      </g>
      <!-- ITEM 4: the treaty, pulled out of the fire and torn getting
           it loose, laid out on a board -->
      <g>
        <rect x="3548" y="604" width="176" height="16" fill="#8a7448"/>
        <g transform="rotate(-4 3612 586)">
          <path d="M3566 562 L3626 560 L3630 602 L3568 604 Z" fill="#f0e8d0"/>
          <path d="M3612 560 L3630 561 L3632 602 L3610 603 Z" fill="#2a1c10" opacity="0.75"/>
          <rect x="3574" y="572" width="34" height="3" fill="#6b6455"/>
          <rect x="3574" y="580" width="28" height="2.6" fill="#8b8778"/>
          <rect x="3574" y="587" width="32" height="2.6" fill="#8b8778"/>
        </g>
        <g transform="rotate(7 3672 588)">
          <path d="M3648 566 L3700 568 L3698 604 L3646 602 Z" fill="#eae1c6"/>
          <path d="M3646 566 L3660 566 L3658 603 L3645 602 Z" fill="#2a1c10" opacity="0.6"/>
          <rect x="3664" y="578" width="28" height="2.6" fill="#8b8778"/>
          <rect x="3664" y="586" width="22" height="2.6" fill="#8b8778"/>
        </g>
      </g>
      <!-- the bare wall where Washington hung: an iron hook, nothing else -->
      <g>
        <rect x="3402" y="66" width="262" height="228" fill="#2c2a26"/>
        <path d="M3402 66 l262 0 l0 6 l-262 0 z" fill="#4a4740"/>
        <path d="M3528 120 q10 -14 22 -2 l-6 8 q-8 -8 -12 2 z" fill="#5c584e"/>
        <path d="M3533 128 l0 26" stroke="#5c584e" stroke-width="5"/>
        ${scorch(3396, 70, 274, 96)}
      </g>
    </g>

    <!-- the clock, come down flat on the floor, clear of the hearth -->
    <g>
      <path d="M3772 742 L3986 716 L3992 776 L3778 802 Z" fill="#242320"/>
      <path d="M3772 742 L3986 716 L3988 730 L3774 756 Z" fill="#4a4740"/>
      <path d="M3800 750 L3930 734 L3934 774 L3804 790 Z" fill="#141312"/>
      <ellipse cx="3800" cy="726" rx="42" ry="30" fill="#b5ae98"/>
      <ellipse cx="3800" cy="726" rx="42" ry="30" fill="none" stroke="#5c5140" stroke-width="5"/>
      <path d="M3800 726 L3792 706 M3800 726 L3820 732" stroke="#2b2620" stroke-width="3"/>
      <path d="M3846 742 l30 -4 l4 12 l-32 4 z" fill="#5c5140"/>
    </g>

    <!-- =========================================================
         FLOOR: ash, fallen plaster, puddles from the rain
    ========================================================== -->
    <rect x="0" y="659" width="4000" height="241" fill="url(#ashFloor)"/>
    <g opacity="0.5" fill="#4a4740">
      ${Array.from({length:44},(_,i)=>`<ellipse cx="${(i*181)%4000}" cy="${690+((i*73)%180)}" rx="${26+(i%5)*18}" ry="${6+(i%3)*4}"/>`).join('')}
    </g>
    <!-- a song sheet, half under a fallen board -->
    <g transform="rotate(8 1940 600)">
      <path d="M1904 578 L1976 578 L1980 618 L1900 618 Z" fill="#efe7d0"/>
      <rect x="1912" y="586" width="46" height="3.4" fill="#5c574c"/>
      <g stroke="#8b8778" stroke-width="1.2">
        <line x1="1912" y1="596" x2="1968" y2="596"/><line x1="1912" y1="600" x2="1968" y2="600"/>
        <line x1="1912" y1="604" x2="1968" y2="604"/><line x1="1912" y1="608" x2="1968" y2="608"/>
      </g>
      <circle cx="1924" cy="602" r="2.4" fill="#3d382f"/>
      <circle cx="1940" cy="598" r="2.4" fill="#3d382f"/>
      <circle cx="1956" cy="604" r="2.4" fill="#3d382f"/>
    </g>
    <g fill="#5c584e" opacity="0.8">
      <path d="M760 742 l90 -14 l16 26 l-96 18 z"/>
      <path d="M1880 780 l120 -18 l20 30 l-128 22 z"/>
      <path d="M2960 726 l80 -10 l12 22 l-86 12 z"/>
      <path d="M3380 812 l140 -20 l18 30 l-146 24 z"/>
    </g>
    <g opacity="0.3" fill="#cfd8d6" filter="url(#bl)">
      <ellipse cx="1560" cy="760" rx="300" ry="30"/>
      <ellipse cx="800"  cy="820" rx="240" ry="26"/>
    </g>
    <rect x="0" y="656" width="4000" height="4" fill="#5c584e" opacity="0.5"/>`),

  fg: svg(4800, `
    <g fill="#121311">
      <rect x="0" y="0" width="160" height="900"/>
      <path d="M160 0 L160 900 L196 900 L196 250 q62 -116 196 -124 l0 -126 z"/>
      <rect x="4640" y="0" width="160" height="900"/>
      <path d="M4640 0 L4640 900 L4604 900 L4604 280 q-58 -100 -184 -112 l0 -168 z"/>
      <rect x="2576" y="0" width="74" height="900"/>
      <path d="M2650 0 L2650 188 q-46 -80 -138 -96 l0 -92 z"/>
      <!-- a fallen beam across the top of frame -->
      <path d="M980 0 L1240 0 L2180 150 L2120 196 Z"/>
      <path d="M0 872 L4800 872 L4800 900 L0 900 Z"/>
    </g>
    <g opacity="0.18">
      <rect x="196" y="0" width="5" height="900" fill="#e8ecec"/>
      <rect x="2650" y="0" width="5" height="900" fill="#e8ecec"/>
    </g>`)
};

const SCENES = { street, study, ruins, burned };
