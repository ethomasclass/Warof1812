# The War of 1812 Investigation

A walkable point-and-click lesson for 9th grade US History. Students play a
printer's apprentice at the *National Intelligencer*, sent to find the real
causes of the war. No timer, no score, no fail states.

**Status: both acts playable end to end.** Act One (June 18, 1812, the night war
was declared) and Act Two (spring 1815, the same places burned out) run in one
sitting, with eight pieces of evidence, two puzzles and twenty ambient objects.

### Structure

| | Act One | Act Two |
|---|---|---|
| When | night of June 18, 1812 | spring 1815 |
| Light | dark, warm lamplight | grey morning, cold |
| Question | *Why did we do this?* | *The treaty changed nothing. So what actually changed?* |
| Outside | the avenue, bonfires, a newsboy | the same avenue, scaffolding, a stonemason |
| Inside | the office and cabinet room | the same rooms, gutted |
| Puzzle | a three-dial drawer lock | reassembling the torn treaty |

Every fixture in Act Two sits at the same world x as its Act One counterpart, so
walking through the ruin is a comparison rather than a new room. The Argand lamp
is a puddle of brass at the same spot on the desk. The charts left clean
rectangles on a scorched wall. Where the Washington portrait hung there is a
bare iron hook, which pays off an Act One caption.

### When it is set

The night of **June 18, 1812** &mdash; the day Madison signed the declaration of
war. That framing does the heavy lifting: the player is a newspaper apprentice
sent to answer the question the whole country is asking that night, *why did we
do this?*, and the four pieces of evidence in the President's rooms are the
answer. It also lets the opening establish the stakes honestly:

- The vote was the closest for any declared war in American history: **79&ndash;49**
  in the House (June 4), **19&ndash;13** in the Senate (June 17). All 39 Federalists
  voted no.
- Bonfires in Kentucky and Baltimore; church bells tolling and flags at
  half-mast in New England.
- The United States Navy had sixteen ships. Britain had hundreds.

Sources: the [US House history office](https://history.house.gov/Records-and-Research/Listing/lfp_012/)
and the [National Park Service](https://www.nps.gov/articles/mr-madison-s-war.htm)
on the declaration and the debates.

## Act Two's history

Two facts here are almost always told wrong, so both are stated carefully:

- **The Battle of New Orleans.** British losses were 291 killed, 1,262 wounded
  and 484 missing (about 2,000); American losses were 13 killed, 39 wounded and
  19 missing (about 70). It was fought on January 8, 1815 &mdash; two weeks
  *after* the treaty was signed, but before the news crossed the Atlantic.
- **Article 9 of the Treaty of Ghent.** The treaty did not ignore Native
  nations. It promised the United States would restore "all the possessions,
  rights, and privileges which they may have enjoyed&hellip; in 1811". That
  promise was simply never kept, and there was no way to enforce it. This is a
  sharper lesson than "the treaty said nothing", because it is about what a
  treaty is worth without power behind it.

The closing argument the room builds toward: every reason America went to war in
1812 either fixed itself for unrelated reasons (impressment and trade ended
because Britain's war with France ended) or was never fixed at all. On paper the
war moved nothing &mdash; which is what makes the real question worth asking.

Sources: [Britannica](https://www.britannica.com/event/Battle-of-New-Orleans-United-States-United-Kingdom-1815)
on New Orleans; the [Senate's transcript of the Treaty of Ghent](https://www.senate.gov/about/powers-procedures/treaties/treaty-of-ghent/transcript-treaty-of-ghent.htm).

## Reading level

Written for 8th&ndash;9th grade, and the rules are enforced in `content.js`:

- Short sentences, one idea each, generally under 20 words.
- Terms defined the first time they appear, in the same sentence. Nothing
  assumes prior knowledge &mdash; not Napoleon, not "neutral", not what the
  Royal Navy was.
- Concrete over abstract: *"ships sat empty at the docks"* rather than
  *"economic contraction"*.
- **Every document has a plain-English version one button away.** The 1812
  wording stays on the sheet, because reading a primary source is the skill
  being taught; but archaic English is a wall, not a lesson. Pressing
  *Translate this* swaps the text on the same piece of paper, so students see
  that a source gets decoded rather than replaced. The translation also carries
  the glosses &mdash; the Orders in Council translation is where "neutral" gets
  defined.

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

### The puzzles

Two rules keep a puzzle classroom-safe, and both are enforced in both puzzles:

1. **The answer is always in the room.** The drawer's three digits come from
   three documents the student has already read (six sailors, Article 3,
   November 7). Being stuck means *go re-read something*, which is the
   behaviour we want anyway. The notebook is reachable from inside the puzzle,
   and it records the full quotes, not just the takeaways, so the answer is
   always recoverable.
2. **It is always skippable, visibly and without penalty.** "Ask the editor"
   just solves it. The handful of students who would burn eight minutes get
   moved along; everyone else never touches it.

Act Two's puzzle is a **sequence**: the treaty comes out of the fire in four
torn pieces and you rebuild the sentence by reading it. Each piece is checked as
it is clicked, so nobody can get stuck holding a wrong whole answer, and the
reassembled sentence *is* the thesis &mdash; everything goes back exactly where
it was before the war.

No inventory, and nothing combines with anything. That is where adventure
games become unteachable.

### Every document has a reason to be in that room

The first pass had eight well-written documents that felt randomly placed,
because nothing explained how any of them got onto that desk. Real archival
papers carry their own history, so now each one does:

- **A docket.** When a paper arrived it was folded and endorsed on the outside
  in a clerk's hand: when it came, who sent it, where it was filed. Each
  document now carries that endorsement at its foot, in a browner ink and a
  different hand. The Detroit letter's reads *"Recd. War Dept. 4 Apl. 1815.
  Referred to the Secy. of War. No answer sent."* Those last three words do more
  work than a paragraph of analysis.
- **A "Why it is here" note** in the reading panel, stating the chain of custody
  in plain language. This is the sourcing half of historical thinking, which the
  game was otherwise skipping.

The Act One documents are on the desk because a clerk pulled them from the files
to support the President's war message to Congress &mdash; which is genuinely
what that message cited. That also motivates the drawer puzzle: the clerk set
the three dials from the three papers he had spent the evening docketing.

The Act Two documents are there because a clerk has been sorting salvage for a
fortnight on a plank laid over the burned desk, and because committees with no
building left are meeting wherever they can.

**One continuity error fixed.** The treaty cannot have been burned in the 1814
fire &mdash; it was signed four months after the building burned. It is singed
because the masons light the hearth with whatever paper is lying about and this
was in the pile. That is a better image anyway: ten weeks after it ended the
war, the peace treaty was very nearly used as kindling.

### Evidence is paper, not a dialog box

Each document is a physical object: a letter folded in four with a broken wax
seal and foxing stains, a stiff letterpress proclamation with a drop cap and a
Board of Trade stamp, a dispatch written in the field and mud-marked, a speech
still being argued with in red ink. They lie at an angle on a desk with the
historical reading pinned beside them. Paper grain, fold creases, torn edges and
age spots are all generated in CSS and SVG &mdash; there are no image files.

### Hotspots glow, they do not draw boxes

A rectangle with a border reads as user interface. A soft pool of light reads as
part of the scene, and it can spill past the object the way real light does. So
each hotspot renders a radial glow from a pseudo-element inset past its own
bounds, in one of two colours that match the scenes' own lighting:

- **warm amber, slowly pulsing** &mdash; the thing the lesson wants next
- **cool teal, dimmer, never pulsing** &mdash; there is something here, and you
  may ignore it

The `?edit` view still draws the real boxes.

### The character faces what he is looking at

Facing used to be set from the direction of travel, which is the wrong cue: a
stand point is offset from its object, so walking to it from the far side left
him reading a letter over his shoulder. He now turns toward the object's centre
on arrival.

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

The house is **set back from the avenue** behind a lawn and a railing, and drawn
at 0.55 scale to sit at that distance. Flush with the fence it filled the frame
and you could never see it as a building; set back, the whole facade, cornice,
balustrade and portico read at once, and the camera has something to arrive at.

It is painted **white**, which sounds obvious and was the single biggest reason
it did not read. It was lime-washed sandstone; the first pass painted it dark
teal to sit in the night palette and it disappeared. Repainting it exposed a
second problem: the windows were 292 units wide with only 48 units of pier
between them, so they merged into one glazed band. They are now 3ft openings
with real wall between, which is what neoclassical fenestration looks like.

Both acts now open with the house already in frame, so the ruin in Act Two lands
against the memory of the intact building rather than against a caption.

## The character sprites

The three figures are drawn art; the rooms are still SVG. Source files live in
`assets/img/src/` and the game loads the processed PNGs in `assets/img/`.

**Backgrounds were keyed out of JPEGs.** JPEG has no alpha and its compression
smears colour across edges, so a plain colour-match leaves a pink halo. The
processing measures the backdrop from the corners, cuts on distance from it with
a soft band, then *despills* — pulling magenta out of the surviving edge pixels
by clamping red and blue toward green. No halo.

**The player is cut in two at the coat hem**, at 68% of his height. The body
piece never moves; the leg piece is drawn twice and the two copies swing in
opposite directions about the hip, which is the top-centre of the leg image. The
far leg is the same drawing at 62% brightness, so one piece of art covers both
legs and reads as depth.

That is the whole reason for the split. A single flat sprite cannot walk — it
slides along the floor — and asking an image model for a consistent multi-frame
walk cycle is a good way to lose an evening. Cutting one drawing at the hip
keeps the original CSS walk cycle working with painted art.

To go back to vector shapes, set `ACTOR.svg` instead of `ACTOR.body` in
`game.js`. To swap in a different sprite, replace the two PNGs and update the
four numbers in the `ACTOR` object: `aspect`, `legTop`, `legH`, `bodyH`.

The two NPCs are static, so they are single `<image>` elements inside the scene
SVG, sized in world units like every other fixture: the newsboy is 430 units
from the top of his raised newspaper to his boots (about five foot two), the
stonemason 420 (about five foot nine).

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
