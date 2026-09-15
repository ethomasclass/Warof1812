# The War of 1812 Investigation

A point-and-click lesson for 9th grade US History. Students play a printer's
apprentice at the *National Intelligencer*, sent to find the real causes of
the war. No timer, no voting, no wrong answers — discovery plus a paper
worksheet.

**Status: vertical slice.** Beats 1 and 2 (the street, and the intact study
with the four causes) are complete and playable. Beats 3 and 4 (the ruined
street and the burned study, covering impacts) are not built yet.

## Running it

Open `index.html` in any browser. That's the whole thing — no build step, no
server, no dependencies, no network calls after the page loads.

### Publishing to GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → branch `main`, folder
`/ (root)`. The site appears at
`https://ethomasclass.github.io/Warof1812/` within a minute or two.
Students open that link on a Chromebook and play. Nothing to install.

## Files

| File | What it holds |
|---|---|
| `index.html` | Page skeleton — screens, modal, rail |
| `assets/css/game.css` | All styling. System fonts only, so it works offline |
| `assets/js/content.js` | **Every word of the lesson and every hotspot box** |
| `assets/js/scenes.js` | The artwork, drawn as inline SVG |
| `assets/js/game.js` | The engine — beat routing, chained hotspots, modal |

### Changing the lesson

Everything a teacher would want to reword lives in `content.js`: the newsboy's
dialogue, each item's title, quote, historical detail, the "write this in your
notebook" line, and the hint pointing to the next item. You never have to open
`game.js` to change the history.

Each item also carries a `hotspot` — `left`, `top`, `width`, `height` as
percentages of the scene. Percentages, not pixels, so the boxes stay locked to
the art at any screen size.

### Repositioning hotspots

Add `?edit` to the URL (`index.html?edit`). Every hotspot box is drawn in red
at once, and clicking anywhere prints that point's percentage coordinates to
the browser console. Useful when swapping in new artwork.

## Swapping the artwork

The current SVG scenes are **working placeholders**, not the target look. The
engine is art-agnostic: in `scenes.js`, a scene is either an inline SVG string
(today) or a path to an image file. `game.js` renders an `<img>` automatically
when the value ends in `.png`, `.jpg`, `.webp`, or `.avif`.

To swap in painted or AI-generated backgrounds:

1. Drop the file in `assets/img/`.
2. In `scenes.js`, replace the scene with the path:
   `SCENES.study = 'assets/img/study.webp';`
3. Load `index.html?edit` and drag the four hotspot percentages in
   `content.js` onto the new art.

Nothing else changes. Export at 1600×900 and save as WebP — four scenes at
~200KB each load instantly even on school wifi.

### Art direction, for whoever or whatever draws it

Target: HD pixel art / painted adventure-game backgrounds, warm lighting,
Monkey-Island-era LucasArts — **not** blocky 8-bit.

Four scenes are needed:

1. **Street, 1811** — Pennsylvania Avenue outside the President's House at
   dusk, warm low sun, iron fence, muddy road, lit windows. One newsboy in the
   foreground.
2. **Study, intact, 1811** — the President's study by candlelight: desk with
   a green blotter, bookshelves, a tall window, a lit fireplace, a globe, a
   lectern. Empty of people.
3. **Street, 1814** — the same camera angle, after the British burning:
   blackened walls, collapsed roof, scaffolding, grey daylight. One laborer.
4. **Study, burned, 1814** — the same room gutted: scorched walls, a hole in
   the ceiling, ash, cold light through the broken window. Empty of people.

Two rules that matter more than prettiness:

- **No people and no readable text inside the two study scenes.** Every bit of
  visual attention belongs to the four clickable objects, and all historical
  detail is delivered in the popup, not by making students squint at tiny text
  in the image.
- **The clickable objects must win on silhouette.** A letter, a posted notice,
  a rolled dispatch, a stack of speech notes — each needs a distinct shape and
  clear contrast against the clutter behind it. This is a hidden-object
  mechanic; readable silhouettes beat decorative density every time.

Keep the camera identical between scenes 1 and 3, and between 2 and 4. The
before/after echo is the whole point of the framing.

## Accessibility and classroom notes

- Every hotspot is a real `<button>` with a descriptive label, so the lesson is
  playable by keyboard (Tab and Enter) and by screen reader.
- **"Where do I look?"** pulses the current hotspot. It is always available and
  costs nothing — there is no penalty and no score.
- Clicking empty scenery gives a gentle nudge, never a failure.
- Space advances dialogue; Escape closes an evidence popup.
- `prefers-reduced-motion` turns off the pulsing for students who need it.
- Nothing is stored and nothing is transmitted. No accounts, no student data,
  no privacy paperwork.
