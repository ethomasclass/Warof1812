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
   ACT 1, SCENE 1 — the street outside the President's House, dusk 1811
==================================================================*/
const street = {
  back: svg(2880, `
    <rect width="2880" height="900" fill="url(#skyG)"/>
    <circle cx="2100" cy="640" r="520" fill="url(#bloomW)"/>
    <circle cx="2100" cy="628" r="52" fill="#ffd9a0"/>
    <g opacity="0.5" fill="#1b3340">
      <ellipse cx="700" cy="250" rx="360" ry="40"/>
      <ellipse cx="1500" cy="180" rx="300" ry="32"/>
      <ellipse cx="2400" cy="290" rx="380" ry="36"/>
    </g>
    <path d="M0 600 q140 -60 280 -16 q160 -66 330 -12 q150 -54 300 -8 q170 -50 340 -4
             q150 -44 300 -2 q160 -40 320 -6 q150 -30 300 -2 q140 -26 280 -4 l0 350 L0 950 Z"
          fill="#0a1b22"/>`),

  mid: svg(4000, `
    <!-- the President's House -->
    <g>
      <rect x="1180" y="212" width="1680" height="410" fill="#0d2830"/>
      <rect x="1180" y="212" width="1680" height="10" fill="#4fd3c4" opacity="0.35"/>
      <rect x="1164" y="196" width="1712" height="20" fill="#113640"/>
      <!-- portico -->
      <path d="M1840 196 L2360 196 L2300 108 L1900 108 Z" fill="#0f2f38"/>
      <path d="M1900 108 L2300 108 L2300 118 L1900 118 Z" fill="#4fd3c4" opacity="0.3"/>
      <g>${[0,1,2,3,4,5].map(i=>{const x=1880+i*82;
        return `<rect x="${x}" y="196" width="46" height="426" fill="#0b242c"/>
                <rect x="${x}" y="196" width="7" height="426" fill="#4fd3c4" opacity="0.4"/>`}).join('')}</g>
      <!-- lit windows: the warm interior we are about to walk into -->
      <g>${[1250,1370,1490,1610,1730, 2420,2540,2660,2780].map((x,i)=>{
        const lit = [1,4,6,8].indexOf(i) >= 0;
        return `<rect x="${x}" y="286" width="62" height="104" fill="${lit?'#ffc270':'#081c23'}"/>
                <rect x="${x}" y="436" width="62" height="104" fill="${lit?'#08202a':'#ffb45c'}" opacity="${lit?1:0.75}"/>`}).join('')}</g>
      <g filter="url(#bl)" opacity="0.5">
        <circle cx="1401" cy="338" r="70" fill="#ffb45c"/>
        <circle cx="2691" cy="338" r="70" fill="#ffb45c"/>
        <circle cx="2451" cy="488" r="66" fill="#ffb45c"/>
      </g>
      <!-- steps up to the door -->
      <g>
        <rect x="2010" y="600" width="180" height="16" fill="#123840"/>
        <rect x="1990" y="616" width="220" height="16" fill="#0f2f38"/>
        <rect x="1970" y="632" width="260" height="18" fill="#0c262e"/>
        <rect x="2062" y="470" width="76" height="132" fill="#061820"/>
        <rect x="2062" y="470" width="8" height="132" fill="#ffb45c" opacity="0.55"/>
      </g>
    </g>

    <!-- iron fence -->
    <g>
      <rect x="0" y="600" width="4000" height="8" fill="#061820"/>
      <g fill="#081f26">${Array.from({length:100},(_,i)=>`<rect x="${i*40}" y="604" width="7" height="52"/>`).join('')}</g>
      <rect x="0" y="650" width="4000" height="9" fill="#061820"/>
    </g>

    <!-- road -->
    <rect x="0" y="659" width="4000" height="241" fill="url(#floorG)"/>
    <g opacity="0.3" fill="#ffb45c" filter="url(#bl)">
      <ellipse cx="2100" cy="760" rx="420" ry="26"/>
      <ellipse cx="2600" cy="850" rx="360" ry="22"/>
    </g>
    <rect x="0" y="656" width="4000" height="4" fill="#2a6a6c" opacity="0.45"/>

    <!-- lamppost -->
    <g>
      <rect x="720" y="366" width="14" height="300" fill="#061820"/>
      <rect x="700" y="658" width="54" height="14" fill="#061820"/>
      <rect x="704" y="318" width="46" height="52" fill="#0b242c"/>
      <rect x="712" y="326" width="30" height="38" fill="#ffd48a"/>
      <circle cx="727" cy="345" r="120" fill="url(#bloomCand)"/>
    </g>

    <!-- newsboy -->
    <g id="npc-newsboy">
      <path d="M1418 560 l-10 100 l26 0 l8 -92 z" fill="#0a2229"/>
      <path d="M1450 562 l14 98 l-26 0 l-6 -92 z" fill="#0d2b32"/>
      <path d="M1412 448 q32 -16 60 0 l14 118 q-46 16 -88 0 z" fill="#14424a"/>
      <path d="M1472 448 l14 118 q-10 4 -18 5 l-12 -120 z" fill="#ffb45c" opacity="0.4"/>
      <path d="M1418 498 l60 0 l6 48 l-72 0 z" fill="#1b5a5f"/>
      <path d="M1414 456 q-28 32 -30 70" stroke="#14424a" stroke-width="17" stroke-linecap="round" fill="none"/>
      <path d="M1474 452 q34 -20 42 -56" stroke="#14424a" stroke-width="17" stroke-linecap="round" fill="none"/>
      <g transform="rotate(-14 1524 386)">
        <rect x="1492" y="356" width="66" height="52" fill="#f6ecd6"/>
        <rect x="1498" y="366" width="52" height="7" fill="#5c5a52"/>
        <rect x="1498" y="380" width="52" height="4" fill="#95928a"/>
        <rect x="1498" y="390" width="36" height="4" fill="#95928a"/>
      </g>
      <circle cx="1444" cy="422" r="25" fill="#e8b98c"/>
      <path d="M1466 414 l10 6 l-10 6 z" fill="#e8b98c"/>
      <path d="M1419 412 q26 -28 52 -6 l0 -10 q-28 -22 -52 4 z" fill="#0d2b32"/>
      <ellipse cx="1452" cy="406" rx="30" ry="9" fill="#0d2b32"/>
      <circle cx="1444" cy="422" r="25" fill="#ffb45c" opacity="0.18"/>
    </g>

    <!-- crate of newspapers -->
    <g>
      <rect x="1200" y="586" width="120" height="74" fill="#0a2229"/>
      <rect x="1200" y="586" width="120" height="6" fill="#2a6a6c" opacity="0.6"/>
      <rect x="1214" y="556" width="92" height="32" fill="#e9e0c8"/>
      <rect x="1226" y="566" width="68" height="5" fill="#6e6a60"/>
    </g>

    <!-- reflections -->
    <g mask="url(#reflM)" opacity="0.4">
      <g transform="translate(0,1318) scale(1,-1)">
        <rect x="1180" y="212" width="1680" height="410" fill="#0a2229"/>
        <rect x="720" y="366" width="14" height="292" fill="#0a2229"/>
        <path d="M1412 448 q32 -16 60 0 l14 118 q-46 16 -88 0 z" fill="#0d3339"/>
      </g>
      <ellipse cx="727" cy="700" rx="90" ry="34" fill="#ffd48a" opacity="0.5" filter="url(#bl)"/>
      <ellipse cx="2100" cy="700" rx="300" ry="40" fill="#ffb45c" opacity="0.35" filter="url(#bl)"/>
    </g>`),

  fg: svg(4800, `
    <g fill="#02080a">
      <rect x="0" y="0" width="150" height="900"/>
      <rect x="4650" y="0" width="150" height="900"/>
      <rect x="560" y="0" width="52" height="900"/>
      <rect x="3180" y="0" width="64" height="900"/>
      <path d="M0 862 L4800 862 L4800 900 L0 900 Z"/>
    </g>
    <g opacity="0.2">
      <rect x="612" y="0" width="4" height="900" fill="#ffb45c"/>
      <rect x="3176" y="0" width="4" height="900" fill="#4fd3c4"/>
    </g>`)
};

/* ==================================================================
   ACT 1, SCENE 2 — the President's study, intact, by candlelight
==================================================================*/
const study = {
  back: svg(2880, `
    <rect width="2880" height="900" fill="#0d2230"/>
    <rect width="2880" height="900" fill="url(#moonSky)"/>
    <circle cx="980" cy="210" r="46" fill="#dff8f2" opacity="0.9"/>
    <circle cx="980" cy="210" r="140" fill="url(#bloomC)"/>
    <g fill="#e8fbf6" opacity="0.5">
      ${Array.from({length:40},(_,i)=>`<circle cx="${(i*263)%2880}" cy="${40+((i*97)%300)}" r="${1.5+(i%3)*0.8}"/>`).join('')}
    </g>
    <path d="M0 620 q180 -80 360 -20 q200 -70 400 -14 q210 -60 420 -10 q200 -52 400 -8
             q190 -44 380 -6 q180 -36 360 -4 q140 -26 280 -2 l0 340 L0 960 Z" fill="#0a2029"/>`),

  mid: svg(4000, `
    <!-- The wall is masked around the window, so the back layer's night
         sky shows through and parallaxes as you walk. -->
    <mask id="wallCut">
      <rect width="4000" height="900" fill="#fff"/>
      <rect x="576" y="148" width="268" height="308" fill="#000"/>
    </mask>
    <rect width="4000" height="900" fill="url(#wallG)" mask="url(#wallCut)"/>

    <!-- ambient light, ON the wall: this is what keeps the room from
         reading as a flat sheet of colour -->
    <circle cx="710"  cy="330" r="460" fill="url(#bloomC)"/>
    <circle cx="3090" cy="470" r="520" fill="url(#bloomW)"/>

    <!-- ===== cold source: the window ===== -->
    <g>
      <rect x="560" y="132" width="300" height="340" fill="none" stroke="#04141a" stroke-width="16"/>
      <rect x="576" y="352" width="268" height="104" fill="#3fa79f" opacity="0.3"/>
      <g stroke="#04141a" stroke-width="14">
        <line x1="710" y1="148" x2="710" y2="456"/>
        <line x1="576" y1="252" x2="844" y2="252"/>
        <line x1="576" y1="356" x2="844" y2="356"/>
      </g>
      <rect x="544" y="460" width="332" height="18" fill="#04141a"/>
    </g>
    <path d="M576 478 L844 478 L1010 660 L410 660 Z" fill="#7fe3d6" opacity="0.12"/>

    <!-- wainscot -->
    <rect x="0" y="556" width="4000" height="104" fill="#0a1f26"/>
    <rect x="0" y="552" width="4000" height="7" fill="#16414a"/>

    <!-- ===== globe, rim-lit by the window ===== -->
    <g>
      <circle cx="1020" cy="512" r="62" fill="#0e2d34"/>
      <path d="M1020 450 a62 62 0 0 0 0 124 z" fill="#14424a"/>
      <circle cx="1020" cy="512" r="62" fill="none" stroke="#2f7d78" stroke-width="5"/>
      <path d="M998 466 q26 16 50 4" stroke="#3f9b8f" stroke-width="7" fill="none"/>
      <path d="M978 540 q44 20 84 -2" stroke="#3f9b8f" stroke-width="7" fill="none"/>
      <path d="M980 574 l40 -8 l40 8 l0 86 l-80 0 z" fill="#061820"/>
      <rect x="958" y="450" width="6" height="124" fill="#7fe3d6" opacity="0.3"/>
    </g>

    <!-- ===== ITEM 3: rolled dispatch leaning against the globe stand ===== -->
    <g transform="rotate(-15 900 610)">
      <rect x="886" y="552" width="30" height="106" rx="15" fill="#ece0c0"/>
      <rect x="886" y="552" width="10" height="106" fill="#c4b795"/>
      <rect x="913" y="552" width="4" height="106" fill="#bff3ea" opacity="0.7"/>
      <ellipse cx="901" cy="554" rx="15" ry="6" fill="#f6ecd6"/>
      <rect x="880" y="596" width="42" height="12" fill="#d94f3d"/>
      <path d="M922 602 q18 9 14 27" stroke="#d94f3d" stroke-width="6" fill="none"/>
    </g>

    <!-- ===== bookshelf ===== -->
    <g>
      <rect x="1240" y="180" width="300" height="380" fill="#061a20"/>
      <rect x="1240" y="180" width="8" height="380" fill="#4fd3c4" opacity="0.5"/>
      ${[0,1,2,3].map(r=>{const y=200+r*92;return books(1258,y,11,r)+`<rect x="1248" y="${y+74}" width="284" height="8" fill="#123840"/>`}).join('')}
    </g>

    <!-- ===== ITEM 2: the Orders in Council, pinned to the wall ===== -->
    <g transform="rotate(2 1640 344)">
      <rect x="1560" y="240" width="160" height="212" fill="#eae6d3"/>
      <rect x="1560" y="240" width="6" height="212" fill="#bff3ea"/>
      <rect x="1576" y="262" width="128" height="11" fill="#3f4a55"/>
      ${Array.from({length:9},(_,i)=>`<rect x="1576" y="${290+i*15}" width="${128-(i%3)*30}" height="4" fill="#8b9199"/>`).join('')}
      <circle cx="1682" cy="422" r="17" fill="#2f5f8f"/>
      <path d="M1682 439 l-9 24 l18 0 z" fill="#2f5f8f"/>
      <circle cx="1640" cy="236" r="7" fill="#1b5a5f"/>
    </g>

    <!-- ===== the desk ===== -->
    <g>
      <!-- chair -->
      <rect x="2260" y="430" width="16" height="230" fill="#061820"/>
      <rect x="2200" y="430" width="120" height="16" fill="#0a2229"/>
      <!-- candle, the warm pool that lights the letter -->
      <circle cx="2062" cy="556" r="150" fill="url(#bloomCand)"/>
      <rect x="2054" y="520" width="18" height="52" fill="#f6ecd6"/>
      <path d="M2063 492 q15 17 0 30 q-15 -13 0 -30 z" fill="#ffd48a"/>
      <ellipse cx="2063" cy="586" rx="30" ry="9" fill="#123840"/>
      <!-- desk body -->
      <rect x="1980" y="590" width="620" height="20" fill="#0d2b32"/>
      <rect x="1980" y="590" width="620" height="6" fill="#8fe8dc" opacity="0.45"/>
      <rect x="2594" y="590" width="6" height="130" fill="#ffb45c" opacity="0.4"/>
      <rect x="2010" y="610" width="28" height="112" fill="#061a20"/>
      <rect x="2560" y="610" width="28" height="112" fill="#061a20"/>
      <rect x="2120" y="580" width="260" height="12" fill="#14403a"/>
    </g>

    <!-- ===== ITEM 1: the sailor's letter, on the blotter ===== -->
    <g transform="rotate(-6 2250 574)">
      <path d="M2176 550 L2324 550 L2330 586 L2170 586 Z" fill="#f6ecd6"/>
      <path d="M2176 550 L2250 574 L2324 550" fill="none" stroke="#c9bb9a" stroke-width="3"/>
      <circle cx="2298" cy="578" r="11" fill="#d94f3d"/>
    </g>

    <!-- ===== ITEM 4 container: the locked drawer ===== -->
    <g id="drawer">
      <rect x="2380" y="614" width="190" height="96" fill="#0a2229"/>
      <rect x="2380" y="614" width="190" height="5" fill="#2a6a6c" opacity="0.7"/>
      <rect x="2394" y="628" width="162" height="68" fill="#071e24"/>
      <circle cx="2475" cy="662" r="13" fill="#0d2b32"/>
      <circle cx="2475" cy="662" r="13" fill="none" stroke="#ffb45c" stroke-width="3" opacity="0.65"/>
      <rect x="2468" y="662" width="14" height="18" fill="#ffb45c" opacity="0.5"/>
    </g>

    <!-- ===== warm source: the fireplace ===== -->
    <g>
      <rect x="2900" y="240" width="380" height="320" fill="#0a2229"/>
      <rect x="2882" y="224" width="416" height="26" fill="#12343c"/>
      <rect x="2900" y="240" width="380" height="6" fill="#ffb45c" opacity="0.45"/>
      <rect x="2960" y="330" width="260" height="230" fill="#030c10"/>
      <path d="M3090 420 q38 54 20 112 q-26 30 -62 4 q-28 -52 12 -80 q18 -14 30 -36 z" fill="#ff9e42"/>
      <path d="M3092 462 q22 36 10 68 q-16 18 -36 2 q-15 -32 10 -48 z" fill="#ffd88a"/>
      <path d="M2976 552 l228 0 l0 12 l-228 0 z" fill="#1b2026"/>
      <!-- portrait over the mantel -->
      <rect x="3010" y="76" width="176" height="130" fill="#0f2f38"/>
      <rect x="3024" y="90" width="148" height="102" fill="#061a20"/>
      <circle cx="3098" cy="132" r="26" fill="#1b4a52"/>
      <path d="M3066 186 q32 -40 66 0 z" fill="#164048"/>
      <rect x="3186" y="76" width="5" height="130" fill="#ffb45c" opacity="0.5"/>
    </g>

    <!-- lectern, scenery -->
    <g>
      <path d="M2770 720 l22 -112 l54 0 l22 112 z" fill="#061a20"/>
      <path d="M2846 608 l22 112 l-13 0 l-22 -112 z" fill="#ffb45c" opacity="0.35"/>
      <path d="M2782 608 L2856 608 L2868 578 L2770 578 Z" fill="#0d2b32"/>
      <path d="M2856 608 L2868 578 L2860 578 L2848 608 Z" fill="#ffb45c" opacity="0.45"/>
    </g>

    <!-- doorway, far right -->
    <g>
      <rect x="3540" y="210" width="240" height="450" fill="#04121a"/>
      <path d="M3540 260 q120 -90 240 0 l0 -50 l-240 0 z" fill="#0a1f26"/>
      <rect x="3540" y="210" width="7" height="450" fill="#4fd3c4" opacity="0.28"/>
      <rect x="3773" y="210" width="7" height="450" fill="#ffb45c" opacity="0.28"/>
    </g>

    <!-- floor -->
    <rect x="0" y="659" width="4000" height="241" fill="url(#floorG)"/>
    <g>
      <ellipse cx="2200" cy="790" rx="820" ry="104" fill="#13333a"/>
      <ellipse cx="2200" cy="790" rx="740" ry="86" fill="none" stroke="#c98a3c" stroke-width="6" opacity="0.5"/>
      <ellipse cx="2200" cy="790" rx="520" ry="60" fill="#173d42"/>
      <ellipse cx="2200" cy="790" rx="430" ry="46" fill="none" stroke="#c98a3c" stroke-width="4" opacity="0.4"/>
    </g>
    <g mask="url(#reflM)" opacity="0.48">
      <g transform="translate(0,1318) scale(1,-1)">
        <rect x="1980" y="590" width="620" height="20" fill="#0d2b32"/>
        <rect x="2010" y="610" width="28" height="112" fill="#0a2229"/>
        <rect x="2560" y="610" width="28" height="112" fill="#0a2229"/>
        <rect x="2960" y="330" width="260" height="230" fill="#2e1608"/>
        <path d="M2770 720 l22 -112 l54 0 l22 112 z" fill="#0a2229"/>
        <rect x="1240" y="180" width="300" height="380" fill="#081f26"/>
      </g>
      <ellipse cx="3090" cy="700" rx="200" ry="56" fill="#ff9e42" opacity="0.55" filter="url(#bl)"/>
      <ellipse cx="710"  cy="700" rx="190" ry="52" fill="#7fe3d6" opacity="0.45" filter="url(#bl)"/>
      <ellipse cx="2063" cy="694" rx="96"  ry="38" fill="#ffd48a" opacity="0.6"  filter="url(#bl)"/>
    </g>
    <rect x="0" y="656" width="4000" height="4" fill="#2a6a6c" opacity="0.5"/>`),

  fg: svg(4800, `
    <g fill="#02080a">
      <rect x="0" y="0" width="160" height="900"/>
      <path d="M160 0 L160 900 L196 900 L196 250 q54 -104 170 -112 l0 -138 z"/>
      <rect x="4640" y="0" width="160" height="900"/>
      <path d="M4640 0 L4640 900 L4604 900 L4604 280 q-50 -92 -160 -104 l0 -176 z"/>
      <rect x="2260" y="0" width="60" height="900"/>
      <path d="M2320 0 L2320 210 q-40 -70 -120 -84 l0 -126 z"/>
      <path d="M0 864 L4800 864 L4800 900 L0 900 Z"/>
    </g>
    <g opacity="0.22">
      <rect x="196" y="0" width="4" height="900" fill="#4fd3c4"/>
      <rect x="2320" y="0" width="4" height="900" fill="#ffb45c"/>
      <rect x="4600" y="0" width="4" height="900" fill="#ffb45c"/>
    </g>`)
};

const SCENES = { street, study };
