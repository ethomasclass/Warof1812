/* ------------------------------------------------------------------
   content.js — every word and every hotspot lives here.
   Edit this file to change the lesson; you never have to touch game.js.

   Hotspot coordinates are PERCENTAGES of the scene, so they scale with
   any screen. Use the ?edit URL flag to see the boxes drawn on screen.
-------------------------------------------------------------------*/

const CONTENT = {

  /* ===============================================================
     BEAT 1 — the street outside the President's House, autumn 1811
  ================================================================*/
  beat1: {
    type: 'dialogue',
    scene: 'street',
    speaker: 'Newsboy',
    lines: [
      "Paper! Get your paper! <em>Sailors seized off Norfolk &mdash; six more taken!</em>",
      "You're the printer's apprentice, ain't you? From the <em>Intelligencer</em>?",
      "Then you'll want to be quick. Congress has been shouting about war for a month now, and half of what they shout ends up in <em>my</em> headlines by suppertime.",
      "But headlines ain't reasons, friend. If you want to know what's really pushing this country toward a war &mdash; the President's study is right up those steps. Nobody's in it this hour.",
      "Go on. Your editor wants the story behind the story."
    ],
    exit: {
      kicker: 'Beat 2 &middot; Inside',
      title: 'The President&rsquo;s Study',
      text: "The hall is quiet. Someone left a candle burning. Whatever is driving this country toward war, the evidence is in this room &mdash; on the desk, on the walls, waiting to be read.",
      button: 'Step inside'
    }
  },

  /* ===============================================================
     BEAT 2 — inside the intact study: the four causes
  ================================================================*/
  beat2: {
    type: 'hunt',
    scene: 'study',
    objective: "Start with the desk. Someone left a letter open on the green blotter &mdash; it came from a sailor.",
    items: [

      /* ---- 1. IMPRESSMENT ---- */
      {
        id: 'letter',
        label: "An open letter on the desk, sealed in red wax",
        tag: 'Cause 1 &middot; Impressment',
        title: "A Sailor's Letter Home",
        quote: "&ldquo;They boarded us at sea and called me an Englishman. I was born in Baltimore. I have been four years aboard His Majesty's ship and I do not know when I shall see home.&rdquo;",
        body: [
          "Britain was locked in a war with Napoleon's France and desperate for sailors. The Royal Navy solved the problem by stopping American merchant ships at sea and dragging men off them &mdash; a practice called <strong>impressment</strong>.",
          "Britain claimed it was only reclaiming deserters. In practice, thousands of American citizens were seized. To Americans it was more than a policy dispute: a nation that cannot protect its own people on its own ships is not truly independent."
        ],
        record: "Impressment &mdash; the British Navy kidnapped American sailors and forced them to serve. Americans saw it as an attack on both their citizens and their independence.",
        hint: "Now look at the wall behind the desk. A printed notice is pinned there &mdash; official, stiff, with a blue British seal at the bottom.",
        hotspot: { left: 43.0, top: 67.5, width: 12.5, height: 9.5 }
      },

      /* ---- 2. ORDERS IN COUNCIL ---- */
      {
        id: 'notice',
        label: "A printed British notice pinned to the wall",
        tag: 'Cause 2 &middot; Trade restrictions',
        title: "The Orders in Council",
        quote: "&ldquo;No neutral vessel shall trade with any port of France or her allies, save such as first touch at a British port and pay the duties there imposed.&rdquo;",
        body: [
          "Britain and France each tried to strangle the other's economy, and neutral American merchants were caught in between. Britain's <strong>Orders in Council</strong> ordered that American ships stop in a British port and pay British fees before trading with Europe.",
          "Jefferson's answer &mdash; the Embargo Act &mdash; shut down American trade entirely and wrecked the American economy worse than the British had. By 1811 merchants were ruined, ports were idle, and a generation of Americans had learned that Britain treated the United States as a colony that had merely wandered off."
        ],
        record: "Trade restrictions &mdash; Britain's Orders in Council blocked American ships from trading freely with Europe, damaging the U.S. economy and treating America as less than a sovereign nation.",
        hint: "There is a rolled dispatch leaning against the globe stand, on the left, tied with a red cord. It came in from the frontier.",
        hotspot: { left: 48.5, top: 22.5, width: 12.0, height: 27.5 }
      },

      /* ---- 3. BRITISH SUPPORT FOR TECUMSEH ---- */
      {
        id: 'dispatch',
        label: "A rolled dispatch tied with red cord, by the globe",
        tag: 'Cause 3 &middot; The frontier',
        title: "Dispatch from the Northwest",
        quote: "&ldquo;The muskets taken from the warriors at Tippecanoe are of British manufacture, and new. They did not come by trade alone.&rdquo;",
        body: [
          "The Shawnee leader <strong>Tecumseh</strong> and his brother Tenskwatawa were building a confederacy of Native nations to stop American settlement from pushing west of the Ohio. British agents in Canada supplied them with weapons and encouragement.",
          "After the Battle of Tippecanoe in 1811, American soldiers found British-made muskets on the field. For westerners, that settled it: the way to end the fighting on the frontier was not to defeat Tecumseh but to drive the British out of Canada."
        ],
        record: "British support for Native nations &mdash; Britain armed Tecumseh's confederacy from Canada. Americans on the frontier blamed Britain for the fighting and wanted the British removed from North America.",
        hint: "One more. By the fireplace on the right there is a lectern, and on it a small stack of handwritten notes &mdash; a speech, marked up in red.",
        hotspot: { left: 27.0, top: 66.5, width: 9.5, height: 21.0 }
      },

      /* ---- 4. WAR HAWKS ---- */
      {
        id: 'speech',
        label: "Handwritten speech notes on the lectern",
        tag: 'Cause 4 &middot; Expansion &amp; national honor',
        title: "A War Hawk's Speech Notes",
        quote: "&ldquo;I would not give one sailor's liberty for all the soil of Canada &mdash; but sir, the taking of Canada is in our power, and the honor of this nation is not.&rdquo;",
        body: [
          "A new generation in Congress &mdash; Henry Clay of Kentucky, John C. Calhoun of South Carolina, and others called the <strong>War Hawks</strong> &mdash; came to Washington demanding war. They were young, they were western and southern, and they had not lived through the Revolution.",
          "Their case braided everything else in this room together: impressment insulted American honor, the Orders in Council robbed American merchants, and Britain armed the frontier from Canada. Take Canada, they argued, and all three problems end at once. On June 18, 1812, Congress voted for war &mdash; the closest war vote in American history."
        ],
        record: "War Hawks &mdash; young congressmen like Henry Clay demanded war to defend national honor and to seize Canada, which they believed would solve impressment, trade, and the frontier all at once.",
        hint: "",
        hotspot: { left: 65.5, top: 60.5, width: 9.0, height: 9.5 }
      }
    ],

    exit: {
      kicker: 'End of the vertical slice',
      title: 'You&rsquo;ve Got Your Story',
      text: "Four causes, four pieces of evidence, all in one room. Time passes. On June 18, 1812, Congress declares war on Great Britain.<br><br><em>Beats 3 and 4 &mdash; the same street in ruins, and the burned study where you'll investigate what the war actually changed &mdash; are next to build.</em>",
      button: 'Review my evidence'
    }
  }
};

/* order of play */
const BEAT_ORDER = ['beat1', 'beat2'];
