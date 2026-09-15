/* ------------------------------------------------------------------
   content.js — every word of the lesson, and every clickable box.

   Hotspots and stand-points are PERCENTAGES of the 4000-unit-wide world,
   not pixels, so they hold at any screen size. Load index.html?edit to
   draw every box on screen and print coordinates as you click.
-------------------------------------------------------------------*/

const CONTENT = {

/* =================================================================
   ACT ONE — the causes
==================================================================*/
act1: {
  title: 'Act One &middot; The Causes',

  scenes: {

    /* ---------------------------------------------------------------
       Street — walk to the newsboy, then up the steps
    ----------------------------------------------------------------*/
    street: {
      art: 'street',
      startAt: 6,
      objective: 'Walk down the street to the newsboy. Click where you want to go.',
      hotspots: [
        {
          id: 'newsboy',
          kind: 'talk',
          label: 'A newsboy hawking papers',
          standAt: 33,
          box: { left: 34.3, top: 42.5, width: 3.6, height: 31.5 },
          speaker: 'Newsboy',
          lines: [
            "Paper! Get your paper! <em>Sailors seized off Norfolk &mdash; six more taken!</em>",
            "You're the printer's apprentice, ain't you? From the <em>Intelligencer</em>?",
            "Then be quick about it. Congress has been shouting about war for a month, and half of what they shout ends up in <em>my</em> headlines by suppertime.",
            "But headlines ain't reasons, friend. If you want to know what's really pushing this country to war &mdash; the President's study is up those steps, and nobody's in it this hour.",
            "Go on. Your editor wants the story behind the story."
          ],
          unlocks: 'door',
          thenObjective: 'Now go up the steps to the President&rsquo;s study.'
        },
        {
          id: 'door',
          kind: 'exit',
          label: 'The door at the top of the steps',
          hidden: true,
          standAt: 52,
          box: { left: 50.8, top: 51.5, width: 3.2, height: 15.5 },
          to: 'study'
        }
      ]
    },

    /* ---------------------------------------------------------------
       Study — four causes, with the drawer puzzle as the gate to the
       fourth. The chain is guided, but the room is walkable.
    ----------------------------------------------------------------*/
    study: {
      art: 'study',
      startAt: 88,
      facing: -1,
      objective: 'Start at the desk. Someone left a letter open on the blotter &mdash; it came from a sailor.',
      chained: true,
      hotspots: [

        /* ---- 1. IMPRESSMENT ---- */
        {
          id: 'letter',
          kind: 'evidence',
          label: "An open letter on the desk, sealed in red wax",
          standAt: 54.5,
          box: { left: 53.8, top: 58.8, width: 5.2, height: 8.0 },
          tag: 'Cause 1 &middot; Impressment',
          heading: "A Sailor's Letter Home",
          quote: "&ldquo;They boarded us at sea and called me an Englishman. I was born in Baltimore. They took <strong>six</strong> of us off the deck that morning, and I do not know when I shall see home.&rdquo;",
          body: [
            "Britain was at war with Napoleon and desperate for sailors. The Royal Navy solved the problem by stopping American ships at sea and dragging men off them &mdash; a practice called <strong>impressment</strong>.",
            "Britain claimed it was only reclaiming deserters. In practice, thousands of American citizens were seized. To Americans it was more than a policy dispute: a nation that cannot protect its own people on its own ships is not truly independent."
          ],
          record: "Impressment &mdash; the British Navy seized American sailors and forced them to serve. Americans saw it as an attack on both their citizens and their independence.",
          hint: "Now the wall past the bookshelf. A printed notice is pinned there &mdash; official, stiff, with a blue British seal."
        },

        /* ---- 2. ORDERS IN COUNCIL ---- */
        {
          id: 'notice',
          kind: 'evidence',
          label: "A printed British notice pinned to the wall",
          standAt: 40.5,
          box: { left: 38.4, top: 25.0, width: 5.0, height: 26.5 },
          tag: 'Cause 2 &middot; Trade restrictions',
          heading: 'The Orders in Council',
          quote: "&ldquo;<strong>Article 3.</strong> No neutral vessel shall trade with any port of France or her allies, save such as first touch at a British port and pay the duties there imposed.&rdquo;",
          body: [
            "Britain and France each tried to strangle the other's economy, and neutral American merchants were caught in between. Britain's <strong>Orders in Council</strong> required American ships to stop in a British port and pay British fees before trading with Europe.",
            "Jefferson's answer &mdash; the Embargo Act &mdash; shut down American trade entirely and hurt the American economy worse than the British had. By 1811 merchants were ruined, ports sat idle, and a generation had learned that Britain still treated the United States as a colony that had merely wandered off."
          ],
          record: "Trade restrictions &mdash; Britain's Orders in Council blocked American ships from trading freely with Europe, wrecking the U.S. economy and treating America as less than a sovereign nation.",
          hint: "There is a rolled dispatch leaning against the globe, back toward the window, tied with a red cord. It came in from the frontier."
        },

        /* ---- 3. THE FRONTIER ---- */
        {
          id: 'dispatch',
          kind: 'evidence',
          label: "A rolled dispatch tied with red cord, by the globe",
          standAt: 26.5,
          box: { left: 21.2, top: 57.5, width: 3.2, height: 15.5 },
          tag: 'Cause 3 &middot; The frontier',
          heading: 'Dispatch from the Northwest',
          quote: "&ldquo;Tippecanoe, <strong>November 7</strong>. The muskets taken from the warriors are of British manufacture, and new. They did not come by trade alone.&rdquo;",
          body: [
            "The Shawnee leader <strong>Tecumseh</strong> and his brother Tenskwatawa were building a confederacy of Native nations to stop American settlement pushing west of the Ohio. British agents in Canada supplied them with weapons and encouragement.",
            "After the Battle of Tippecanoe in 1811, American soldiers found British-made muskets on the field. For westerners that settled it: the way to end the fighting on the frontier was not to defeat Tecumseh but to drive the British out of Canada."
          ],
          record: "British support for Native nations &mdash; Britain armed Tecumseh's confederacy from Canada. Americans on the frontier blamed Britain for the fighting and wanted the British pushed out of North America.",
          hint: "Back at the desk, the bottom drawer is locked. Whatever the President wanted kept shut is in there."
        },

        /* ---- 4. THE PUZZLE, AND THE CAPSTONE INSIDE IT ---- */
        {
          id: 'drawer',
          kind: 'puzzle',
          label: "A locked drawer in the desk",
          standAt: 61.5,
          box: { left: 59.3, top: 67.5, width: 5.0, height: 11.5 },

          puzzle: {
            prompt: "Three brass dials. Scratched above them, in the President's hand:",
            riddle: "&ldquo;<em>What the Navy took. What the Article numbered. What the day was at Tippecanoe.</em>&rdquo;",
            slots: [
              { label: 'The Navy took',   source: 'letter',   answer: 6 },
              { label: 'The Article',     source: 'notice',   answer: 3 },
              { label: 'The day',         source: 'dispatch', answer: 7 }
            ],
            help: "Every number is in something you have already read. Open your notebook and look again.",
            wrong: "The dials spring back. Not it.",
            skip: "Ask the editor (he just tells you)"
          },

          tag: 'Cause 4 &middot; Expansion &amp; national honor',
          heading: "A War Hawk's Speech Notes",
          quote: "&ldquo;I would not give one sailor's liberty for all the soil of Canada &mdash; but sir, the taking of Canada is in our power, and the honor of this nation is not.&rdquo;",
          body: [
            "A new generation in Congress &mdash; Henry Clay of Kentucky, John C. Calhoun of South Carolina, and others called the <strong>War Hawks</strong> &mdash; came to Washington demanding war. They were young, western and southern, and had not lived through the Revolution.",
            "Their case braided everything else in this room together: impressment insulted American honor, the Orders in Council robbed American merchants, and Britain armed the frontier from Canada. Take Canada, they argued, and all three end at once. On June 18, 1812, Congress voted for war &mdash; the closest war vote in American history."
          ],
          record: "War Hawks &mdash; young congressmen like Henry Clay demanded war to defend national honor and to take Canada, which they believed would solve impressment, trade, and the frontier all at once.",
          hint: ""
        }
      ]
    }
  },

  exit: {
    kicker: 'End of Act One',
    heading: 'You&rsquo;ve Got Your Story',
    text: "Four causes, four pieces of evidence, one room. Time passes. On June 18, 1812, Congress declares war on Great Britain.<br><br><em>Act Two &mdash; the same street in ruins, and the burned study where you investigate what the war actually changed &mdash; is next to build.</em>",
    button: 'Review my evidence'
  }
}
};

const ACT_ORDER = ['act1'];
