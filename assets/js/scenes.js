/* ------------------------------------------------------------------
   scenes.js — all artwork, drawn as inline SVG. No image files.
   Every scene uses a 1600x900 viewBox; the stage scales it to fit.
   Hotspot coordinates in content.js are percentages of that box,
   so art and hotspots stay locked together at any screen size.
-------------------------------------------------------------------*/
const SCENES = {};

/* =================================================================
   SHARED DEFS — gradients, filters, textures reused across scenes
==================================================================*/
const DEFS = `
<defs>
  <linearGradient id="skyDusk" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0"    stop-color="#26354f"/>
    <stop offset="0.38" stop-color="#5b5470"/>
    <stop offset="0.66" stop-color="#b87c5e"/>
    <stop offset="0.88" stop-color="#e2a15f"/>
    <stop offset="1"    stop-color="#f2c07a"/>
  </linearGradient>
  <radialGradient id="sunGlow" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0"   stop-color="#ffe7b0" stop-opacity="0.95"/>
    <stop offset="0.45" stop-color="#f7b96a" stop-opacity="0.45"/>
    <stop offset="1"   stop-color="#e79a52" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="stoneFace" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#f4e6cd"/>
    <stop offset="1" stop-color="#d8c2a1"/>
  </linearGradient>
  <linearGradient id="stoneShade" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#d3bb98"/>
    <stop offset="1" stop-color="#b59c7b"/>
  </linearGradient>
  <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#6d5b46"/>
    <stop offset="1" stop-color="#3b3026"/>
  </linearGradient>

  <linearGradient id="wallPaper" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0"   stop-color="#6d4b31"/>
    <stop offset="0.5" stop-color="#8a6140"/>
    <stop offset="1"   stop-color="#5d4029"/>
  </linearGradient>
  <linearGradient id="woodDark" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#5a3a22"/>
    <stop offset="1" stop-color="#361f10"/>
  </linearGradient>
  <linearGradient id="woodDesk" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0"   stop-color="#7d4f2c"/>
    <stop offset="0.5" stop-color="#96613a"/>
    <stop offset="1"   stop-color="#6a4124"/>
  </linearGradient>
  <linearGradient id="paperGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fdf3dc"/>
    <stop offset="1" stop-color="#e2cfa6"/>
  </linearGradient>
  <linearGradient id="paperCool" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#f0ecdd"/>
    <stop offset="1" stop-color="#cfc6ad"/>
  </linearGradient>
  <radialGradient id="candleGlow" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0"   stop-color="#ffdfa0" stop-opacity="0.85"/>
    <stop offset="0.5" stop-color="#f2ae5c" stop-opacity="0.28"/>
    <stop offset="1"   stop-color="#e08a3c" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="fireGlow" cx="0.5" cy="0.6" r="0.5">
    <stop offset="0"   stop-color="#ffc061" stop-opacity="0.9"/>
    <stop offset="0.55" stop-color="#e8762f" stop-opacity="0.35"/>
    <stop offset="1"   stop-color="#b8431c" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="windowLight" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#9fb6cf"/>
    <stop offset="1" stop-color="#d9c08c"/>
  </linearGradient>

  <filter id="soften" x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur stdDeviation="9"/>
  </filter>
  <filter id="softenLight" x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur stdDeviation="3"/>
  </filter>
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" result="n"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer><feFuncA type="linear" slope="0.12"/></feComponentTransfer>
  </filter>
</defs>`;

const GRAIN = `<rect width="1600" height="900" filter="url(#grain)" opacity="0.5" style="mix-blend-mode:overlay" pointer-events="none"/>`;

/* =================================================================
   SCENE: street — Pennsylvania Avenue outside the President's House
==================================================================*/
SCENES.street = `
<svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
${DEFS}
  <!-- sky -->
  <rect width="1600" height="900" fill="url(#skyDusk)"/>
  <circle cx="1180" cy="520" r="420" fill="url(#sunGlow)"/>
  <circle cx="1180" cy="512" r="46" fill="#ffeec2" opacity="0.9" filter="url(#softenLight)"/>

  <!-- soft clouds -->
  <g opacity="0.5" filter="url(#soften)">
    <ellipse cx="380" cy="190" rx="250" ry="42" fill="#c8a9a0"/>
    <ellipse cx="620" cy="250" rx="300" ry="34" fill="#e0b394"/>
    <ellipse cx="1280" cy="180" rx="270" ry="38" fill="#b59aa4"/>
  </g>

  <!-- distant treeline -->
  <g opacity="0.75">
    <path d="M0 560 q60 -40 120 -8 q70 -52 150 -10 q60 -44 130 -6 q40 -30 90 -4 l0 70 L0 612 Z" fill="#3c4438"/>
    <path d="M1600 566 q-70 -44 -140 -6 q-64 -46 -140 -6 q-58 -36 -120 -2 l0 74 l400 0 Z" fill="#3c4438"/>
  </g>

  <!-- ===== the President's House ===== -->
  <g>
    <!-- main block -->
    <rect x="430" y="330" width="740" height="250" fill="url(#stoneFace)"/>
    <rect x="430" y="330" width="740" height="18" fill="#efe0c6"/>
    <!-- roof balustrade -->
    <rect x="418" y="312" width="764" height="22" fill="#e9d8ba"/>
    <g fill="#dcc9a6">
      ${Array.from({length: 24}, (_, i) => `<rect x="${430 + i*31}" y="288" width="11" height="26" rx="4"/>`).join('')}
    </g>
    <!-- north portico -->
    <rect x="640" y="300" width="320" height="26" fill="#f3e5cc"/>
    <path d="M636 300 L964 300 L940 262 L660 262 Z" fill="#efe0c4"/>
    <path d="M660 262 L940 262 L940 300 L660 300 Z" fill="none"/>
    <g>
      ${[0,1,2,3,4,5].map(i => {
        const x = 668 + i*50;
        return `<rect x="${x}" y="326" width="30" height="254" fill="url(#stoneFace)"/>
                <rect x="${x+22}" y="326" width="8" height="254" fill="url(#stoneShade)" opacity="0.8"/>
                <rect x="${x-5}" y="318" width="40" height="12" fill="#f5e8d0"/>
                <rect x="${x-5}" y="572" width="40" height="12" fill="#e6d4b4"/>`;
      }).join('')}
    </g>
    <!-- lit windows -->
    <g>
      ${[450,494,538,582, 992,1036,1080,1124].map((x,i) =>
        `<rect x="${x}" y="376" width="30" height="58" rx="3" fill="${i===2||i===5?'#ffd98f':'#5d5a5e'}"/>
         <rect x="${x-4}" y="370" width="38" height="8" fill="#e8d8b8"/>
         <rect x="${x}" y="476" width="30" height="58" rx="3" fill="${i===1?'#ffcf7d':'#4f4c50'}"/>
         <rect x="${x-4}" y="470" width="38" height="8" fill="#e8d8b8"/>`).join('')}
    </g>
    <!-- window warmth -->
    <g filter="url(#soften)" opacity="0.55">
      <circle cx="553" cy="405" r="40" fill="#ffca7a"/>
      <circle cx="1051" cy="405" r="40" fill="#ffca7a"/>
      <circle cx="509" cy="505" r="38" fill="#ffb964"/>
    </g>
    <!-- ground shadow -->
    <rect x="430" y="574" width="740" height="16" fill="#8a7357" opacity="0.6"/>
  </g>

  <!-- iron fence -->
  <g>
    <rect x="0" y="596" width="1600" height="10" fill="#2b2a2c"/>
    <g fill="#333134">
      ${Array.from({length: 54}, (_, i) => `<rect x="${i*30}" y="600" width="6" height="52"/>`).join('')}
    </g>
    <rect x="0" y="646" width="1600" height="10" fill="#2b2a2c"/>
  </g>

  <!-- road -->
  <rect x="0" y="652" width="1600" height="248" fill="url(#roadGrad)"/>
  <g opacity="0.35" fill="#8f795d">
    ${Array.from({length: 70}, (_, i) => {
      const y = 672 + (i % 7) * 32;
      const x = ((i * 137) % 1600);
      const w = 30 + (i % 4) * 14;
      return `<ellipse cx="${x}" cy="${y}" rx="${w/2}" ry="${5 + (i%3)*2}"/>`;
    }).join('')}
  </g>
  <!-- wet ruts catching the light -->
  <g opacity="0.3" fill="#e0ab6e" filter="url(#softenLight)">
    <ellipse cx="1120" cy="740" rx="230" ry="16"/>
    <ellipse cx="900" cy="830" rx="300" ry="20"/>
  </g>

  <!-- lamppost, left -->
  <g>
    <rect x="176" y="430" width="12" height="300" fill="#26262a"/>
    <rect x="160" y="722" width="44" height="14" rx="4" fill="#26262a"/>
    <path d="M160 432 l22 -26 l22 26 z" fill="#2e2d31"/>
    <rect x="164" y="386" width="36" height="48" rx="4" fill="#3a3237"/>
    <rect x="170" y="392" width="24" height="36" fill="#ffd489"/>
    <circle cx="182" cy="410" r="66" fill="url(#candleGlow)"/>
  </g>

  <!-- newsboy, foreground right -->
  <g id="newsboy">
    <ellipse cx="1128" cy="846" rx="92" ry="16" fill="#241c14" opacity="0.5"/>
    <!-- legs -->
    <path d="M1100 760 l-14 84 l30 0 l10 -76 z" fill="#3f3629"/>
    <path d="M1138 762 l16 82 l-30 0 l-6 -76 z" fill="#4a4030"/>
    <rect x="1078" y="838" width="44" height="14" rx="5" fill="#241a12"/>
    <rect x="1120" y="838" width="44" height="14" rx="5" fill="#241a12"/>
    <!-- coat -->
    <path d="M1090 648 q34 -18 66 0 l16 118 q-50 18 -98 0 z" fill="#6b5232"/>
    <path d="M1122 640 l0 126" stroke="#4e3b23" stroke-width="4"/>
    <!-- satchel -->
    <path d="M1096 700 l68 0 l6 52 l-80 0 z" fill="#8a6136"/>
    <path d="M1096 700 q26 -40 60 -44" stroke="#5e4224" stroke-width="7" fill="none"/>
    <rect x="1104" y="712" width="54" height="12" fill="#f2e3c0"/>
    <!-- arms: one raised with a paper -->
    <path d="M1096 658 q-30 34 -34 74" stroke="#6b5232" stroke-width="18" stroke-linecap="round" fill="none"/>
    <path d="M1152 654 q38 -22 48 -62" stroke="#6b5232" stroke-width="18" stroke-linecap="round" fill="none"/>
    <g transform="rotate(-14 1204 588)">
      <rect x="1170" y="556" width="72" height="56" fill="url(#paperGrad)"/>
      <g fill="#7d6b4c">
        <rect x="1178" y="566" width="56" height="7"/>
        <rect x="1178" y="580" width="56" height="3"/>
        <rect x="1178" y="588" width="56" height="3"/>
        <rect x="1178" y="596" width="40" height="3"/>
      </g>
    </g>
    <!-- head -->
    <circle cx="1124" cy="620" r="26" fill="#e0b184"/>
    <path d="M1098 614 q26 -26 54 -6 l4 -8 q-30 -26 -62 2 z" fill="#3f3122"/>
    <path d="M1094 606 q30 -30 62 -6 l10 6 q-8 -36 -42 -34 q-30 2 -34 30 z" fill="#4a3a26"/>
    <ellipse cx="1150" cy="608" rx="20" ry="7" fill="#4a3a26"/>
  </g>

  <!-- stack of papers on a crate -->
  <g>
    <rect x="322" y="742" width="120" height="76" fill="#5b4227"/>
    <rect x="322" y="742" width="120" height="10" fill="#6f5331"/>
    <g>
      <rect x="336" y="712" width="92" height="34" fill="url(#paperGrad)"/>
      <rect x="342" y="704" width="92" height="34" fill="#f7ebd0"/>
      <rect x="350" y="722" width="70" height="5" fill="#8a7757"/>
      <rect x="350" y="732" width="52" height="3" fill="#8a7757"/>
    </g>
  </g>

  <!-- foreground darkness -->
  <path d="M0 900 L0 800 q400 70 800 44 q400 -26 800 -74 l0 130 Z" fill="#241a12" opacity="0.55" filter="url(#soften)"/>
  ${GRAIN}
</svg>`;

/* =================================================================
   SCENE: study — the President's study, intact, autumn 1811
==================================================================*/
SCENES.study = `
<svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
${DEFS}
  <rect width="1600" height="900" fill="url(#wallPaper)"/>

  <!-- wall panel moulding -->
  <g fill="none" stroke="#54381f" stroke-width="5" opacity="0.7">
    <rect x="70" y="120" width="300" height="330" rx="4"/>
    <rect x="1230" y="120" width="300" height="330" rx="4"/>
  </g>
  <!-- chair rail + wainscot -->
  <rect x="0" y="560" width="1600" height="20" fill="#4a3018"/>
  <rect x="0" y="580" width="1600" height="120" fill="#5d3c20"/>
  <g fill="none" stroke="#41290f" stroke-width="4" opacity="0.6">
    ${Array.from({length: 13}, (_, i) => `<rect x="${20 + i*122}" y="596" width="96" height="86" rx="3"/>`).join('')}
  </g>

  <!-- ===== window, left ===== -->
  <g>
    <rect x="96" y="128" width="256" height="316" fill="#2b1c0e"/>
    <rect x="110" y="142" width="228" height="288" fill="url(#windowLight)"/>
    <g opacity="0.45" fill="#6b7f92">
      <ellipse cx="180" cy="380" rx="110" ry="40"/>
      <ellipse cx="300" cy="396" rx="90" ry="30"/>
    </g>
    <g stroke="#2b1c0e" stroke-width="10">
      <line x1="224" y1="142" x2="224" y2="430"/>
      <line x1="110" y1="238" x2="338" y2="238"/>
      <line x1="110" y1="334" x2="338" y2="334"/>
    </g>
    <rect x="86" y="436" width="276" height="18" fill="#3b2612"/>
    <!-- drapes -->
    <path d="M60 110 q40 180 14 350 l-52 0 l0 -350 z" fill="#7d2f2c"/>
    <path d="M388 110 q-40 180 -14 350 l52 0 l0 -350 z" fill="#7d2f2c"/>
    <path d="M60 110 q22 180 8 350" stroke="#5e1f1e" stroke-width="10" fill="none" opacity="0.7"/>
    <path d="M388 110 q-22 180 -8 350" stroke="#5e1f1e" stroke-width="10" fill="none" opacity="0.7"/>
    <rect x="16" y="96" width="412" height="24" rx="6" fill="#4a2f16"/>
  </g>
  <!-- light shaft from the window -->
  <path d="M120 150 L360 150 L720 700 L300 700 Z" fill="#ffd9a0" opacity="0.1" filter="url(#soften)"/>

  <!-- ===== bookshelf, back centre-left ===== -->
  <g>
    <rect x="440" y="150" width="270" height="410" fill="url(#woodDark)"/>
    <rect x="452" y="162" width="246" height="386" fill="#2a1a0c"/>
    ${[0,1,2,3].map(r => {
      const y = 178 + r*96;
      const books = Array.from({length: 11}, (_, i) => {
        const cols = ['#7b3b2c','#4c5a3a','#8a6a2c','#3d4a63','#6a2f3e','#57432a'];
        const h = 62 + ((i*7 + r*5) % 18);
        return `<rect x="${462 + i*21}" y="${y + (80-h)}" width="16" height="${h}" rx="2" fill="${cols[(i+r)%6]}"/>`;
      }).join('');
      return `${books}<rect x="452" y="${y+82}" width="246" height="10" fill="#4a2e16"/>`;
    }).join('')}
  </g>

  <!-- ===== fireplace, right ===== -->
  <g>
    <rect x="1180" y="250" width="330" height="330" fill="#6f5b45"/>
    <rect x="1164" y="234" width="362" height="30" rx="4" fill="#85705a"/>
    <rect x="1230" y="330" width="230" height="250" rx="6" fill="#1b120a"/>
    <!-- fire -->
    <g>
      <rect x="1262" y="520" width="166" height="20" rx="6" fill="#3a2a1c"/>
      <path d="M1300 530 l100 -16 l6 14 l-108 12 z" fill="#4a3421"/>
      <path d="M1345 430 q34 46 20 96 q-22 26 -56 4 q-24 -44 10 -70 q16 -12 26 -30 z" fill="#f08a34" opacity="0.92"/>
      <path d="M1348 464 q20 32 10 62 q-14 16 -34 2 q-14 -28 8 -44 z" fill="#ffd067"/>
      <circle cx="1345" cy="500" r="150" fill="url(#fireGlow)"/>
    </g>
    <!-- portrait above the mantel -->
    <rect x="1256" y="90" width="180" height="128" rx="4" fill="#8a6a34"/>
    <rect x="1268" y="102" width="156" height="104" fill="#3a3a44"/>
    <circle cx="1346" cy="150" r="30" fill="#7a6a5c"/>
    <path d="M1310 206 q36 -44 74 0 z" fill="#4a4450"/>
  </g>

  <!-- ===== rug ===== -->
  <ellipse cx="800" cy="790" rx="560" ry="120" fill="#6d2f2f"/>
  <ellipse cx="800" cy="790" rx="500" ry="98" fill="none" stroke="#a8763c" stroke-width="8" opacity="0.8"/>
  <ellipse cx="800" cy="790" rx="380" ry="70" fill="#7d3a34"/>
  <ellipse cx="800" cy="790" rx="300" ry="52" fill="none" stroke="#a8763c" stroke-width="5" opacity="0.6"/>

  <!-- ===== globe, left of desk ===== -->
  <g>
    <path d="M330 790 l40 -96 l88 0 l40 96 z" fill="#4a2e16" opacity="0.9"/>
    <rect x="388" y="676" width="52" height="30" fill="#4a2e16"/>
    <circle cx="414" cy="606" r="76" fill="#5e7f86"/>
    <path d="M356 572 q40 24 84 8 q34 -12 56 6 l-4 -22 q-40 -20 -76 -4 q-30 14 -56 -4 z" fill="#7d8f5c"/>
    <path d="M362 646 q54 26 104 -2 q22 -12 40 -6 l-6 22 q-34 -6 -60 8 q-48 24 -86 0 z" fill="#7d8f5c"/>
    <ellipse cx="392" cy="588" rx="24" ry="16" fill="#8d9a68"/>
    <circle cx="414" cy="606" r="76" fill="none" stroke="#c8a35c" stroke-width="7"/>
    <ellipse cx="414" cy="606" rx="86" ry="20" fill="none" stroke="#c8a35c" stroke-width="7"/>
    <circle cx="390" cy="584" r="28" fill="#fff0c8" opacity="0.16"/>
  </g>

  <!-- ===== the desk ===== -->
  <g>
    <!-- chair behind -->
    <g>
      <rect x="752" y="470" width="110" height="130" rx="14" fill="#4a2e18"/>
      <rect x="766" y="486" width="82" height="100" rx="10" fill="#6d3a32"/>
    </g>
    <!-- desk top -->
    <path d="M520 636 L1104 636 L1140 700 L484 700 Z" fill="url(#woodDesk)"/>
    <path d="M520 636 L1104 636 L1104 648 L520 648 Z" fill="#a8703f" opacity="0.7"/>
    <rect x="512" y="700" width="600" height="18" fill="#5a3620"/>
    <!-- legs -->
    <path d="M530 718 l0 132 l30 0 l0 -132 z" fill="#4a2c16"/>
    <path d="M1064 718 l0 132 l30 0 l0 -132 z" fill="#4a2c16"/>
    <!-- blotter -->
    <path d="M700 640 L1000 640 L1022 690 L680 690 Z" fill="#2f4a38"/>
    <path d="M700 640 L1000 640 L1022 690 L680 690 Z" fill="none" stroke="#8a6a34" stroke-width="4"/>
    <!-- inkwell + quill -->
    <g>
      <ellipse cx="1042" cy="646" rx="26" ry="10" fill="#2b2b33"/>
      <path d="M1018 646 l8 -26 l32 0 l8 26 z" fill="#3c3c46"/>
      <ellipse cx="1042" cy="620" rx="16" ry="6" fill="#15151b"/>
      <path d="M1040 618 q26 -56 66 -84 q-16 44 -54 88 z" fill="#f4ead2"/>
      <path d="M1046 604 q28 -38 52 -56" stroke="#c9b892" stroke-width="3" fill="none"/>
    </g>
    <!-- candlestick -->
    <g>
      <ellipse cx="596" cy="640" rx="28" ry="9" fill="#c8a35c"/>
      <path d="M586 640 l4 -40 l12 0 l4 40 z" fill="#d8b368"/>
      <rect x="588" y="566" width="16" height="38" rx="3" fill="#f4e9cd"/>
      <path d="M596 540 q14 16 0 28 q-14 -12 0 -28 z" fill="#ffd66e"/>
      <circle cx="596" cy="556" r="90" fill="url(#candleGlow)"/>
    </g>
  </g>

  <!-- ============ HOTSPOT ITEM 1: sailor's letter, on the blotter ============ -->
  <g id="item-letter">
    <g transform="rotate(-7 790 662)">
      <path d="M716 634 L868 634 L876 686 L708 686 Z" fill="url(#paperGrad)"/>
      <path d="M716 634 L792 664 L868 634" fill="none" stroke="#bda878" stroke-width="3"/>
      <g fill="#9a8760">
        <rect x="726" y="670" width="70" height="4"/>
        <rect x="726" y="678" width="46" height="3"/>
      </g>
      <circle cx="838" cy="676" r="13" fill="#9c2f2c"/>
      <circle cx="838" cy="676" r="7" fill="#7d211f" opacity="0.7"/>
    </g>
  </g>

  <!-- ============ HOTSPOT ITEM 2: British trade notice, posted on the wall ============ -->
  <g id="item-notice">
    <g transform="rotate(2 880 330)">
      <rect x="790" y="212" width="180" height="236" fill="url(#paperCool)"/>
      <rect x="790" y="212" width="180" height="236" fill="none" stroke="#b3a78c" stroke-width="3"/>
      <rect x="806" y="234" width="148" height="12" fill="#6b6352"/>
      <g fill="#8f866f">
        ${Array.from({length: 9}, (_, i) => `<rect x="806" y="${266 + i*16}" width="${148 - (i%3)*34}" height="5"/>`).join('')}
      </g>
      <circle cx="930" cy="414" r="20" fill="#2f3f6b"/>
      <path d="M930 434 l-10 26 l20 0 z" fill="#2f3f6b"/>
      <circle cx="880" cy="206" r="8" fill="#6b5a3a"/>
    </g>
  </g>

  <!-- ============ HOTSPOT ITEM 3: frontier dispatch, rolled, leaning by the globe ============ -->
  <g id="item-dispatch">
    <g transform="rotate(-16 520 700)">
      <rect x="486" y="628" width="44" height="150" rx="21" fill="#e6d2a6"/>
      <rect x="486" y="628" width="16" height="150" fill="#cdb684" opacity="0.8"/>
      <ellipse cx="508" cy="630" rx="22" ry="8" fill="#f6ecd2"/>
      <ellipse cx="508" cy="630" rx="11" ry="4" fill="#c4ab78"/>
      <rect x="480" y="690" width="56" height="16" rx="4" fill="#8a2f2c"/>
      <path d="M534 700 q26 14 18 40" stroke="#8a2f2c" stroke-width="7" fill="none"/>
    </g>
  </g>

  <!-- ============ HOTSPOT ITEM 4: War Hawk speech notes, on the lectern ============ -->
  <g id="item-speech">
    <g>
      <!-- lectern -->
      <path d="M1064 780 l28 -140 l64 0 l28 140 z" fill="#4a2c16"/>
      <path d="M1076 640 L1172 640 L1186 604 L1062 604 Z" fill="#6a4124"/>
      <!-- the notes -->
      <g transform="rotate(-4 1124 600)">
        <path d="M1074 578 L1178 570 L1184 612 L1078 620 Z" fill="#fdf4dd"/>
        <path d="M1068 586 L1172 578 L1178 620 L1072 628 Z" fill="url(#paperGrad)"/>
        <g fill="#8a7551">
          <rect x="1082" y="592" width="76" height="6"/>
          <rect x="1082" y="604" width="60" height="4"/>
          <rect x="1082" y="612" width="70" height="4"/>
        </g>
        <path d="M1150 588 q18 -6 22 8" stroke="#9c2f2c" stroke-width="4" fill="none"/>
      </g>
    </g>
  </g>

  <!-- warm pools of light on top of everything -->
  <g filter="url(#soften)" opacity="0.35" style="mix-blend-mode:screen">
    <ellipse cx="596" cy="620" rx="190" ry="130" fill="#ffb861"/>
    <ellipse cx="1340" cy="500" rx="200" ry="170" fill="#ff8f42"/>
  </g>
  ${GRAIN}
</svg>`;
