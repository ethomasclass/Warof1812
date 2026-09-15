# The War of 1812 Investigation

A walkable point-and-click lesson for 9th grade US History. Students play a
printer's apprentice at the *National Intelligencer*, sent to find the real
causes of the war. No timer, no score, no fail states.

**Status: Act One vertical slice.** The street and the study are complete and
playable, with all four causes and the drawer puzzle. Act Two (the ruined
street and the burned study, covering the impacts) is not built yet.

## Running it

Open `index.html` in any browser. No build step, no dependencies, no network
calls after the page loads.

### Publishing to GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`. The site
appears at `https://ethomasclass.github.io/Warof1812/` a minute later.
Students open the link on a Chromebook. Nothing to install, no login.

## How it is built

| File | What it holds |
|---|---|
| `index.html` | Screens, modals, the objective rail |
| `assets/css/game.css` | All styling. System fonts only, so it works offline |
| `assets/js/content.js` | **Every word of the lesson, every hotspot, the puzzle** |
| `assets/js/scenes.js` | The artwork, as inline SVG |
| `assets/js/documents.js` | Evidence rendered as paper props |
| `assets/css/documents.css` | Paper grain, folds, foxing, letterpress |
| `assets/js/game.js` | Camera, walking, hotspots, puzzle, notebook |

### The camera

The stage shows one screen. Each room is 2.5 screens wide and pans to follow
the character. Three layers move at different rates:

| layer | width | depth | holds |
|---|---|---|---|
| back | 1.8 screens | 0.50 | sky and distant glow |
| mid | 2.5 screens | 1.00 | the room, all items, the character |
| fg | 3.0 screens | 1.25 | near-black silhouettes sweeping past |

Every layer is sized so it never runs out of art at full camera travel. All
clickable items and the character live on the mid layer, so they can never
drift away from the furniture they belong to.

### The character

Profile view, which is the whole trick: movement is one-dimensional, so there
is no pathfinding and no depth sorting. Walking is an `x` value and a CSS leg
swing.

**Walking is never a toll.** Clicking a distant object walks you there *and*
opens it in the same click. Nobody has to walk somewhere before they are
allowed to look at something. Arrow keys also walk, for keyboard users.

### The puzzle

Two rules keep a puzzle classroom-safe, and both are enforced in the design:

1. **The answer is always in the room.** The drawer's three digits come from
   three documents the student has already read (six sailors, Article 3,
   November 7). Being stuck means *go re-read something*, which is the
   behaviour we want anyway. The notebook is reachable from inside the puzzle,
   and it records the full quotes, not just the takeaways, so the answer is
   always recoverable.
2. **It is always skippable, visibly and without penalty.** "Ask the editor"
   just solves it. The handful of students who would burn eight minutes get
   moved along; everyone else never touches it.

No inventory, and nothing combines with anything. That is where adventure
games become unteachable.

### Evidence is paper, not a dialog box

Each document is a physical object: a letter folded in four with a broken wax
seal and foxing stains, a stiff letterpress proclamation with a drop cap and a
Board of Trade stamp, a dispatch written in the field and mud-marked, a speech
still being argued with in red ink. They lie at an angle on a desk with the
historical reading pinned beside them. Paper grain, fold creases, torn edges and
age spots are all generated in CSS and SVG &mdash; there are no image files.

### Ambient objects

Eleven objects in the two scenes do nothing except reward looking: the Argand
lamp, the broken Grecian chairs, the looking glasses, the charts, the globe, the
hearth, the Washington portrait, the clock, the coat on the peg. They are always
clickable, never required, and never advance the chain. Each answers with a slip
of paper rather than a dialog. This is where the room pays back curiosity
without costing the lesson its spine.

### Changing the lesson

Everything a teacher would reword lives in `content.js`: dialogue, each item's
quote, its historical detail, the "write this in your notebook" line, the hint
pointing at the next item, and the puzzle's riddle and answers. You never have
to open `game.js`.

Hotspots are `left/top/width/height` as percentages of the 4000-unit-wide
world, and `standAt` is where the character stops. Percentages, not pixels, so
everything holds at any screen size.

### Repositioning hotspots

Load `index.html?edit`. Every hotspot is drawn in red at once, and clicking
prints world coordinates to the console.

## Historical detail

The room is built from the documented record, not from invention:

- **There was no Oval Office in 1811** &mdash; that room dates from 1909. Madison
  worked in the President's House proper, and the game is set in his office and
  the cabinet room beyond it.
- A contemporary described the President's office as having **"a large table in
  the center, and maps, globes, charts, &c."** around the walls. That is the
  cabinet room in this build, more or less literally.
- The desk is lit by an **Argand lamp**, not a candle. Jefferson and Madison both
  used them, and they burned roughly **six times brighter than a candle** &mdash;
  which is why reading after dark stopped being a hardship around 1800.
- The **klismos chairs** with sabre legs were designed by Benjamin Latrobe and
  made in Baltimore by the Finlay brothers. **Three were broken inside four
  months** because men leaned back in them. That anecdote is an ambient hotspot.
- **Red silk velvet** hangings and **large looking glasses set to face the
  lamps** are from the Madisons' 1809 refurbishment.
- The **Washington portrait** over the mantel is the one Dolley Madison refused
  to leave without in 1814 &mdash; foreshadowed in an ambient caption, and the
  payoff belongs to Act Two.
- The British really did burn the **National Intelligencer**, the paper the
  player works for. That is why the framing was chosen.

Sources: the White House Historical Association on
[Madison-era decorative arts](https://www.whitehousehistory.org/white-house-decorative-arts-in-the-1810s),
[lighting](https://www.whitehousehistory.org/lighting-the-white-house) and
[the 1814 fire](https://www.whitehousehistory.org/reminders-of-1814); and
[Latrobe and the Finlay brothers](https://www.themagazineantiques.com/article/benjamin-henry-latrobe-and-the-furniture-of-john-and-hugh-finlay/).

## Scale

One foot is 73 world units. A 5'8" person is 414 units and stands on y=760, so
the camera sees about 22 feet of room at a time and the character is a little
under half the frame height &mdash; roughly where adventure games put them.
Every piece of furniture is built from a real dimension: a desk is 30 inches
high, a mantel is 4'6", a door is 7 feet. The first pass ignored this and the
room read as a giant empty hall with doll-sized props.

At this scale the President's House does not fit the frame, which is correct:
standing across the avenue you see the ground floor and the foot of the portico,
and the columns run off the top.

## Art

The scenes are flat vector SVG built on four rules, and they are the reason the
room reads the way it does:

- **Two colour temperatures only** — cold teal, warm amber, nothing between
- **Light sources are visible objects** — window, fire, candle, each with a
  bloom and rim-lighting on what faces it
- **Near-black foreground silhouettes** framing and sweeping past the camera
- **A reflective floor**

Cream paper against dark teal makes the four clickable documents the highest
contrast thing in the room, so they win on silhouette without needing a glow.
That is a mechanic decision as much as a visual one.

### Swapping in painted art later

The engine is art-agnostic. A layer is an SVG string today; pointing it at an
image file instead changes nothing else. Keep the camera geometry (1.8 / 2.5 /
3.0 screens wide) and the hotspot percentages still land.

## Accessibility and classroom notes

- Every hotspot is a real `<button>` with a label: playable by Tab and Enter,
  and by screen reader.
- **"Where do I look?"** pans to the current item and flashes it. Always
  available, no penalty, no score.
- Clicking empty scenery gives a gentle nudge, never a failure.
- Space advances dialogue; Escape closes a popup; arrow keys walk.
- `prefers-reduced-motion` turns off the walk bob, the pulsing and the
  edge arrows.
- Nothing is stored and nothing is transmitted. No accounts, no student data.

## Timing

Act One runs roughly 20–25 minutes with the walking and the puzzle. With Act
Two built, expect 45–55 minutes total — realistically **two class periods**.
The acts are meant to be independently launchable so day two starts clean,
with no save files to lose on a shared Chromebook cart.
