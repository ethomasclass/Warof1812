/* ------------------------------------------------------------------
   content.js — every word of the lesson, every clickable box.

   Two kinds of hotspot:
     evidence / puzzle / talk / exit — the spine of the lesson
     look                           — ambient detail. Always clickable,
                                      never required, never blocks the
                                      chain. This is where the room
                                      rewards curiosity.

   Boxes are percentages of the 4000-unit world; standAt is where the
   character stops, offset from the object so he does not stand in
   front of the thing he is reading. index.html?edit draws them all.
-------------------------------------------------------------------*/

const CONTENT = {

act1: {
  title: 'Act One &middot; The Causes',

  scenes: {

    /* ===============================================================
       THE STREET
    ================================================================*/
    street: {
      art: 'street',
      startAt: 6,
      objective: 'Walk down the street to the newsboy. Click where you want to go.',
      hotspots: [
        {
          id: 'newsboy', kind: 'talk',
          label: 'A newsboy hawking papers',
          standAt: 19.5,
          box: { left: 22.4, top: 41.0, width: 5.0, height: 41.0 },
          speaker: 'Newsboy',
          lines: [
            "Paper! Get your paper! <em>Sailors seized off Norfolk &mdash; six more taken!</em>",
            "You're the printer's apprentice, ain't you? From the <em>Intelligencer</em>?",
            "Then be quick about it. Congress has been shouting about war for a month, and half of what they shout ends up in <em>my</em> headlines by suppertime.",
            "But headlines ain't reasons, friend. If you want the reasons, the President's rooms are up those steps, and nobody's in them this hour.",
            "Go on. Your editor wants the story behind the story."
          ],
          unlocks: 'door',
          thenObjective: 'Now go up the steps to the President&rsquo;s rooms.'
        },
        {
          id: 'lamp', kind: 'look',
          label: 'A street lamp',
          standAt: 16.0,
          box: { left: 12.0, top: 22.5, width: 2.0, height: 9.5 },
          caption: "Whale oil. The city lights perhaps a dozen of them along the avenue, and only when Congress is sitting."
        },
        {
          id: 'crate', kind: 'look',
          label: 'A crate of newspapers',
          standAt: 27.0,
          box: { left: 29.6, top: 57.5, width: 4.2, height: 15.5 },
          caption: "The <em>National Intelligencer</em>, still damp from the press. Three years from now the British will burn this paper's office and scatter its type in the street."
        },
        {
          id: 'door', kind: 'exit',
          label: 'The door at the top of the steps',
          hidden: true, standAt: 56.5,
          box: { left: 59.9, top: 21.0, width: 4.6, height: 41.0 },
          to: 'study'
        }
      ]
    },

    /* ===============================================================
       THE PRESIDENT'S OFFICE AND THE CABINET ROOM
    ================================================================*/
    study: {
      art: 'study',
      startAt: 94,
      facing: -1,
      objective: 'The President&rsquo;s writing desk is at the far end, past the arch. Someone left a letter open on it.',
      chained: true,

      /* ---- ambient. Clickable from the moment you walk in. ---- */
      ambient: [
        {
          id: 'lamp', kind: 'look',
          label: 'An Argand lamp burning on the desk',
          standAt: 34,
          box: { left: 29.6, top: 46.0, width: 1.7, height: 9.0 },
          caption: "An Argand lamp. It burns six times brighter than a candle, and both Mr. Jefferson and Mr. Madison keep them. Reading after dark stopped being a hardship about ten years ago."
        },
        {
          id: 'chair', kind: 'look',
          label: 'A Grecian chair beside the desk',
          standAt: 34.5,
          box: { left: 31.4, top: 57.0, width: 2.4, height: 8.5 },
          caption: "Mr. Latrobe had these made in Baltimore by the Finlay brothers &mdash; Grecian, with sabre legs. Three were broken within four months. Gentlemen will lean back in them."
        },
        {
          id: 'window', kind: 'look',
          label: 'A tall window with red velvet drapes',
          standAt: 12,
          box: { left: 4.8, top: 9.0, width: 9.0, height: 45.0 },
          caption: "Red silk velvet, the same the Madisons hung through the state rooms. Outside, past the unpaved avenue, half of Washington City is still a building site."
        },
        {
          id: 'glass', kind: 'look',
          label: 'A large looking glass over a pier table',
          standAt: 22,
          box: { left: 17.6, top: 17.0, width: 5.2, height: 33.0 },
          caption: "Looking glasses, set to face the lamps. Mrs. Madison understood that light is doubled by anything that will reflect it, and that a room full of light is a room people want to be in."
        },
        {
          id: 'coat', kind: 'look',
          label: 'A coat and hat on a peg',
          standAt: 6,
          box: { left: 2.0, top: 31.0, width: 2.4, height: 20.0 },
          caption: "Somebody's coat, still damp. Whoever came in from the rain tonight has not yet gone home."
        },
        {
          id: 'books', kind: 'look',
          label: 'A bookshelf',
          standAt: 47,
          box: { left: 38.4, top: 22.0, width: 6.4, height: 51.0 },
          caption: "Law, mostly, and the debates of the last Congress. A well-thumbed Vattel on the law of nations &mdash; the book everyone is quoting this year about what a neutral country may and may not be made to do."
        },
        {
          id: 'charts', kind: 'look',
          label: 'Maps and charts covering the wall',
          standAt: 68,
          box: { left: 64.8, top: 18.0, width: 5.9, height: 19.0 },
          caption: "A visitor described the President's office as having a large table in the middle and &ldquo;maps, globes, charts, &amp;c.&rdquo; around the walls. The charts nearest the hearth are all of the Canadian border."
        },
        {
          id: 'globe', kind: 'look',
          label: 'A globe on a stand',
          standAt: 76,
          box: { left: 78.6, top: 50.0, width: 3.3, height: 26.0 },
          caption: "The Atlantic takes up most of it. Everything this country argues about is on the far side of that ocean, and takes six weeks to arrive."
        },
        {
          id: 'hearth', kind: 'look',
          label: 'The hearth',
          standAt: 82,
          box: { left: 84.9, top: 44.0, width: 6.6, height: 29.0 },
          caption: "Somebody has been burning papers. There is a corner of something in the grate that has not quite caught, and the hand on it is not a clerk's."
        },
        {
          id: 'portrait', kind: 'look',
          label: 'A portrait of General Washington',
          standAt: 82,
          box: { left: 84.8, top: 7.0, width: 6.8, height: 26.0 },
          caption: "General Washington, full length. In three years Mrs. Madison will refuse to leave this house until it is out of its frame and out of the city. It is the only thing in these rooms that survives what is coming."
        },
        {
          id: 'clock', kind: 'look',
          label: 'A tall case clock',
          standAt: 94,
          box: { left: 96.2, top: 17.0, width: 3.2, height: 55.0 },
          caption: "A quarter past eleven. The vote in the House is months away yet, and everyone in this city already knows how it goes."
        }
      ],

      /* ---- the chain ---- */
      hotspots: [

        /* 1 ------------------------------------------------ IMPRESSMENT */
        {
          id: 'letter', kind: 'evidence',
          label: "An open letter on the desk, sealed in red wax",
          standAt: 36.5,
          box: { left: 25.9, top: 54.5, width: 3.9, height: 7.0 },
          tag: 'Cause 1 &middot; Impressment',
          heading: "A Sailor's Letter Home",
          doc: {
            type: 'letter',
            place: 'Off Halifax, the 4th March 1811',
            lines: [
              'Dear Mother,',
              'They boarded us at sea and called me an Englishman. I was born in Baltimore and said so twice.',
              'They took <strong>six</strong> of us off the deck that morning. I am well used, but I am not free to come home.'
            ],
            sign: 'Yr. obedient son, Wm. Hale'
          },
          quote: "&ldquo;They took <strong>six</strong> of us off the deck that morning, and I do not know when I shall see home.&rdquo;",
          body: [
            "Britain was at war with Napoleon and desperate for sailors. The Royal Navy solved the problem by stopping American ships at sea and taking men off them &mdash; a practice called <strong>impressment</strong>.",
            "Britain claimed it was only reclaiming deserters. In practice thousands of American citizens were seized. To Americans it was more than a policy dispute: a nation that cannot protect its own people on its own ships is not truly independent."
          ],
          record: "Impressment &mdash; the British Navy seized American sailors and forced them to serve. Americans saw it as an attack on both their citizens and their independence.",
          hint: "Back toward the window there is a printed notice pinned to the wall &mdash; stiff, official, with a blue seal."
        },

        /* 2 ------------------------------------------- ORDERS IN COUNCIL */
        {
          id: 'notice', kind: 'evidence',
          label: "A printed British proclamation pinned to the wall",
          standAt: 20.0,
          box: { left: 23.4, top: 30.5, width: 3.4, height: 18.0 },
          tag: 'Cause 2 &middot; Trade restrictions',
          heading: 'The Orders in Council',
          doc: {
            type: 'broadside',
            kicker: 'By the King',
            title: 'A Proclamation',
            sub: 'Respecting the Trade of Neutral Vessels with France and her Allies',
            lines: [
              'Whereas the enemy hath declared the ports of these kingdoms to be in a state of blockade, and hath thereby compelled His Majesty to resort to a like measure of retaliation&hellip;',
              '<strong>Article 3.</strong> No neutral vessel shall trade with any port of France or her allies, save such as shall first touch at a British port and there pay the duties hereby imposed.'
            ],
            foot: 'God save the King',
            stamp: 'Board of Trade &middot; London'
          },
          quote: "&ldquo;<strong>Article 3.</strong> No neutral vessel shall trade with any port of France or her allies, save such as first touch at a British port and pay the duties there imposed.&rdquo;",
          body: [
            "Britain and France each tried to strangle the other's economy, and neutral American merchants were caught between them. Britain's <strong>Orders in Council</strong> required American ships to stop at a British port and pay British fees before trading with Europe.",
            "Jefferson's answer &mdash; the Embargo Act &mdash; shut down American trade entirely and hurt the American economy worse than the British had. By 1811 merchants were ruined, ports sat idle, and a generation had learned that Britain still treated the United States as a colony that had merely wandered off."
          ],
          record: "Trade restrictions &mdash; Britain's Orders in Council blocked American ships from trading freely with Europe, wrecking the U.S. economy and treating America as less than a sovereign nation.",
          hint: "Through the arch, in the cabinet room, a dispatch is lying on the long table. It came in from the frontier."
        },

        /* 3 -------------------------------------------------- THE FRONTIER */
        {
          id: 'dispatch', kind: 'evidence',
          label: "A dispatch on the cabinet table, tied with red cord",
          standAt: 67.5,
          box: { left: 60.8, top: 54.0, width: 2.7, height: 10.0 },
          tag: 'Cause 3 &middot; The frontier',
          heading: 'Dispatch from the Northwest',
          doc: {
            type: 'dispatch',
            haste: 'Haste &mdash; post haste',
            place: 'Vincennes, Indiana Territory',
            lines: [
              'Sir &mdash; the action on the Tippecanoe was fought the <strong>7th</strong> of November and the ground is ours, though dearly.',
              'I am to report that the muskets taken from the warriors are of British manufacture, and new.',
              'They did not come by trade alone. I would stake my commission on it.'
            ],
            sign: 'Jno. Gibson, Sec., Ind. Terr.'
          },
          quote: "&ldquo;Tippecanoe, the <strong>7th</strong> of November. The muskets taken from the warriors are of British manufacture, and new. They did not come by trade alone.&rdquo;",
          body: [
            "The Shawnee leader <strong>Tecumseh</strong> and his brother Tenskwatawa were building a confederacy of Native nations to stop American settlement pushing west of the Ohio. British agents in Canada supplied them with weapons and encouragement.",
            "After the Battle of Tippecanoe in 1811, American soldiers found British-made muskets on the field. For westerners that settled it: the way to end the fighting on the frontier was not to defeat Tecumseh but to drive the British out of Canada."
          ],
          record: "British support for Native nations &mdash; Britain armed Tecumseh's confederacy from Canada. Americans on the frontier blamed Britain for the fighting and wanted the British pushed out of North America.",
          hint: "Back at the desk. The bottom drawer is locked, and whatever the President wanted kept shut is inside it."
        },

        /* 4 ------------------------------------- THE DRAWER, AND THE HAWKS */
        {
          id: 'drawer', kind: 'puzzle',
          label: "A locked drawer in the desk",
          standAt: 38.5,
          box: { left: 29.2, top: 64.5, width: 5.6, height: 9.0 },

          puzzle: {
            prompt: "Three brass dials under the lock. Scratched into the wood above them, in a hurried hand:",
            riddle: "&ldquo;<em>What the Navy took. What the Article numbered. What the day was at Tippecanoe.</em>&rdquo;",
            slots: [
              { label: 'The Navy took', answer: 6 },
              { label: 'The Article',   answer: 3 },
              { label: 'The day',       answer: 7 }
            ],
            help: "Every number is in something you have already read. Open your notebook and look again.",
            wrong: "The dials spring back. Not it.",
            skip: "Ask the editor (he just tells you)"
          },

          tag: 'Cause 4 &middot; Expansion &amp; national honor',
          heading: "A War Hawk's Speech Notes",
          doc: {
            type: 'notes',
            head: 'For the floor &mdash; Mr. Clay of Kentucky',
            lines: [
              'I would not give one sailor\'s liberty for all the soil of Canada &mdash;',
              '<s>but the acquisition of that province</s> <em>but sir, the taking of Canada is in our power,</em>',
              'and the honor of this nation is <s>not yet</s> <em>not</em>.',
              'The militia of Kentucky alone are competent to place Montreal at your feet.'
            ],
            margin: 'say this twice'
          },
          quote: "&ldquo;I would not give one sailor's liberty for all the soil of Canada &mdash; but sir, the taking of Canada is in our power, and the honor of this nation is not.&rdquo;",
          body: [
            "A new generation in Congress &mdash; Henry Clay of Kentucky, John C. Calhoun of South Carolina, and others called the <strong>War Hawks</strong> &mdash; came to Washington demanding war. They were young, western and southern, and had not lived through the Revolution.",
            "Their case braided everything else in these rooms together: impressment insulted American honor, the Orders in Council robbed American merchants, and Britain armed the frontier from Canada. Take Canada, they argued, and all three end at once. On June 18, 1812, Congress voted for war &mdash; the closest war vote in American history."
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
    text: "Four causes, four pieces of evidence, two rooms. Time passes. On June 18, 1812, Congress declares war on Great Britain.<br><br><em>Act Two &mdash; the same street in ruins, and these rooms burned out &mdash; is next to build.</em>",
    button: 'Review my evidence'
  }
}
};

const ACT_ORDER = ['act1'];
