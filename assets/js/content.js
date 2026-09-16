/* ------------------------------------------------------------------
   content.js — every word of the lesson, and every clickable box.

   WRITING RULES for this file, so the lesson stays usable in a real
   9th grade classroom:

     - Short sentences. One idea each. Aim under 20 words.
     - Define a term the first time it appears, in the same sentence.
     - Assume no background knowledge. Not Napoleon, not "neutral",
       not what the Royal Navy was, not what Congress does.
     - Every document has a plain-English version one button away. The
       original wording stays, because reading a primary source is the
       skill; but 1812 English is a wall, not a lesson.
     - Concrete over abstract. "Ships sat empty" beats "economic
       contraction".

   Hotspot boxes are percentages of the 4000-unit world. standAt is
   where the character stops, offset so he does not block what he reads.
-------------------------------------------------------------------*/

const CONTENT = {

act1: {
  title: 'Act One &middot; Why We Went to War',

  /* ===============================================================
     THE OPENING. The mood of the country, before anything is clicked.
  ================================================================*/
  intro: {
    kicker: 'Washington City &middot; the night of June 18, 1812',
    heading: 'America Declares War',
    text:
      "<p>This morning, President James Madison signed a piece of paper. " +
      "With it, the United States went to war against Great Britain &mdash; " +
      "the most powerful country on earth.</p>" +

      "<p>It is the first time this country has ever declared war on anyone. " +
      "It almost did not happen. The vote in Congress was the closest vote for " +
      "any war in American history: <strong>79 to 49</strong> in the House, " +
      "<strong>19 to 13</strong> in the Senate. Nearly four out of every ten " +
      "members voted no.</p>" +

      "<p>Tonight the country is split in half. In Kentucky and Baltimore, " +
      "people are lighting bonfires in the street. In New England, church bells " +
      "are ringing slowly, the way they ring for a funeral, and flags are flying " +
      "at half-mast.</p>" +

      "<p>They may have a point. The United States Navy has sixteen ships. " +
      "Britain has hundreds.</p>" +

      "<p>You are a printer's apprentice at the <em>National Intelligencer</em>, " +
      "Washington's newspaper. Your editor wants one story by morning, and he " +
      "wants it answered properly:</p>" +

      "<p class=\"card-ask\">Why did we do this?</p>",
    button: 'Get to work'
  },

  scenes: {

    /* ===============================================================
       THE STREET, the night of the declaration
    ================================================================*/
    street: {
      art: 'street',
      startAt: 6,
      objective: 'Walk down the street to the newsboy. Click where you want to go.',
      hotspots: [
        {
          id: 'newsboy', kind: 'talk',
          label: 'A newsboy shouting the news',
          standAt: 19.5,
          box: { left: 22.4, top: 41.0, width: 5.0, height: 41.0 },
          speaker: 'Newsboy',
          lines: [
            "War! We're at war! <em>Congress votes &mdash; Mr. Madison signs &mdash; war with Britain!</em>",
            "You're the printer's boy, ain't you? From the <em>Intelligencer</em>?",
            "Then you picked a night for it. I've sold out twice already. Sold a paper to a man who cheered and a paper to a man who cried.",
            "Vote was seventy-nine to forty-nine. My father says that's not a country agreeing. That's a country arguing and one side winning.",
            "Everyone knows <em>what</em> happened. Nobody's told them <em>why</em>. The President's rooms are up those steps, and they're empty this hour.",
            "Go on. Your editor wants the reasons."
          ],
          unlocks: 'door',
          thenObjective: 'Now go up the steps to the President&rsquo;s rooms.'
        },
        {
          id: 'lamp', kind: 'look',
          label: 'A street lamp',
          standAt: 16.0,
          box: { left: 12.0, top: 22.5, width: 2.0, height: 9.5 },
          caption: "Whale oil. The city lights about a dozen of these along the avenue, and only when Congress is meeting. Tonight every one of them is lit."
        },
        {
          id: 'crate', kind: 'look',
          label: 'A crate of newspapers',
          standAt: 27.0,
          box: { left: 29.6, top: 57.5, width: 4.2, height: 15.5 },
          caption: "The <em>National Intelligencer</em>, still damp from the press. In two years British soldiers will burn this paper's office and throw its type into the street."
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

      /* ---- always clickable, never required ---- */
      ambient: [
        {
          id: 'tally', kind: 'look',
          label: 'The vote count, written out on the table',
          standAt: 72.5,
          box: { left: 66.8, top: 56.5, width: 3.4, height: 7.0 },
          caption: "The count, in somebody's neat hand. House: 79 yes, 49 no. Senate: 19 yes, 13 no. Every single Federalist voted against. No war this country has ever declared has passed by so little."
        },
        {
          id: 'lamp', kind: 'look',
          label: 'An Argand lamp burning on the desk',
          standAt: 34,
          box: { left: 29.6, top: 46.0, width: 1.7, height: 9.0 },
          caption: "An Argand lamp. It burns six times brighter than a candle. Both Mr. Jefferson and Mr. Madison keep them. Reading after dark stopped being a chore about ten years ago."
        },
        {
          id: 'chair', kind: 'look',
          label: 'A Grecian chair beside the desk',
          standAt: 34.5,
          box: { left: 31.4, top: 57.0, width: 2.4, height: 8.5 },
          caption: "Mr. Latrobe had these made in Baltimore. Greek style, with curved legs. Three of them broke within four months. Gentlemen will lean back in them."
        },
        {
          id: 'window', kind: 'look',
          label: 'A tall window with red velvet drapes',
          standAt: 12,
          box: { left: 4.8, top: 9.0, width: 9.0, height: 45.0 },
          caption: "Red silk velvet, the same cloth the Madisons hung in the big rooms downstairs. Outside, past the dirt road, half of Washington City is still a building site."
        },
        {
          id: 'glass', kind: 'look',
          label: 'A large looking glass over a pier table',
          standAt: 22,
          box: { left: 17.6, top: 17.0, width: 5.2, height: 33.0 },
          caption: "Mirrors, set facing the lamps. Mrs. Madison worked out that light doubles if you give it something to bounce off, and that a bright room is a room people want to stay in."
        },
        {
          id: 'coat', kind: 'look',
          label: 'A coat and hat on a peg',
          standAt: 6,
          box: { left: 2.0, top: 31.0, width: 2.4, height: 20.0 },
          caption: "Somebody's coat, still damp. Whoever came in from the rain tonight has not gone home yet. Nobody in this house is sleeping much."
        },
        {
          id: 'books', kind: 'look',
          label: 'A bookshelf',
          standAt: 47,
          box: { left: 38.4, top: 22.0, width: 6.4, height: 51.0 },
          caption: "Law books, mostly, and records of the last Congress. One of them is worn soft at the spine: a book about the rights of countries that stay out of other people's wars. Everyone has been quoting it this year."
        },
        {
          id: 'charts', kind: 'look',
          label: 'Maps and charts covering the wall',
          standAt: 68,
          box: { left: 64.8, top: 18.0, width: 5.9, height: 19.0 },
          caption: "A visitor once wrote that the President's office held a big table and &ldquo;maps, globes, charts&rdquo; all around the walls. The ones nearest the fire are all of the Canadian border."
        },
        {
          id: 'globe', kind: 'look',
          label: 'A globe on a stand',
          standAt: 76,
          box: { left: 78.6, top: 50.0, width: 3.3, height: 26.0 },
          caption: "The Atlantic Ocean takes up most of it. Almost everything this country is arguing about sits on the far side of that water, and news takes about six weeks to cross it."
        },
        {
          id: 'hearth', kind: 'look',
          label: 'The fireplace',
          standAt: 82,
          box: { left: 84.9, top: 44.0, width: 6.6, height: 29.0 },
          caption: "Somebody has been burning papers tonight. A corner of one did not catch, and the handwriting on it is not a clerk's."
        },
        {
          id: 'portrait', kind: 'look',
          label: 'A portrait of General Washington',
          standAt: 82,
          box: { left: 84.8, top: 7.0, width: 6.8, height: 26.0 },
          caption: "General Washington, painted full length. In two years Mrs. Madison will refuse to leave this house until this painting is out of its frame and out of the city. It is the only thing in these rooms that survives what is coming."
        },
        {
          id: 'clock', kind: 'look',
          label: 'A tall case clock',
          standAt: 94,
          box: { left: 96.2, top: 17.0, width: 3.2, height: 55.0 },
          caption: "A quarter past eleven, on the first night of the first war this country ever declared. Somewhere out in the dark, nobody in Britain has even heard about it yet."
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
          tag: 'Reason 1 &middot; Impressment',
          heading: "A Sailor's Letter Home",
          doc: {
            type: 'letter',
            place: 'Off Halifax, the 4th March 1811',
            lines: [
              'Dear Mother,',
              'They boarded us at sea and called me an Englishman. I was born in Baltimore and said so twice.',
              'They took <strong>six</strong> of us off the deck that morning. I am well used, but I am not free to come home.'
            ],
            sign: 'Yr. obedient son, Wm. Hale',
            plain: [
              '<strong>Dear Mother,</strong>',
              'British sailors boarded our ship out at sea. They said I was English. I told them twice that I was born in Baltimore.',
              'They took <strong>six</strong> of us off the deck that morning. They treat me all right, but they will not let me go home.',
              '<em>&mdash; William Hale</em>'
            ]
          },
          quote: "&ldquo;They took <strong>six</strong> of us off the deck that morning.&rdquo;",
          body: [
            "Britain was fighting a long war against France, and the British navy always needed more sailors. So British warships stopped American ships at sea and took sailors off them by force. This was called <strong>impressment</strong>.",
            "Britain said it was only taking back its own runaway sailors. But thousands of the men it took were American citizens, born in the United States, like the boy who wrote this letter.",
            "Here is the question that made people furious: if a country cannot protect its own people on its own ships, is it really free?"
          ],
          record: "Impressment &mdash; British warships stopped American ships and took sailors by force. Americans saw it as an attack on their citizens and proof that Britain did not treat the United States as a real country.",
          hint: "Back toward the window there is a printed notice pinned to the wall. It looks official, and it has a blue seal."
        },

        /* 2 ------------------------------------------- ORDERS IN COUNCIL */
        {
          id: 'notice', kind: 'evidence',
          label: "A printed British order pinned to the wall",
          standAt: 20.0,
          box: { left: 23.4, top: 30.5, width: 3.4, height: 18.0 },
          tag: 'Reason 2 &middot; Blocked trade',
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
            stamp: 'Board of Trade &middot; London',
            plain: [
              '<strong>An order from the King of Great Britain.</strong>',
              'France has tried to shut down British trade. So Britain is doing the same thing back.',
              '<strong>Rule 3.</strong> No <em>neutral</em> ship may trade with France or her allies unless it stops at a British port first and pays a British fee.',
              '<em>A neutral country is one that is not fighting on either side. The United States was neutral. This rule applied to American ships.</em>'
            ]
          },
          quote: "&ldquo;<strong>Article 3.</strong> No neutral vessel shall trade with any port of France or her allies&hellip;&rdquo;",
          body: [
            "Britain and France were at war with each other. Each one tried to wreck the other's trade. American ships got caught in the middle.",
            "This British rule said American ships had to stop at a British port and pay a British fee before trading in Europe. America never agreed to it. Britain simply ordered it.",
            "President Jefferson fought back by shutting down American trade completely. That hurt America far more than it hurt Britain. Ships sat empty at the docks. Merchants lost everything. By 1812 many Americans felt Britain still treated them like colonists instead of citizens of a free country."
          ],
          record: "Blocked trade &mdash; Britain's Orders in Council stopped American ships from trading freely in Europe. It wrecked the American economy and treated the United States as less than a real country.",
          hint: "Through the arch, in the cabinet room, there is a dispatch lying on the long table. It came in from the frontier."
        },

        /* 3 -------------------------------------------------- THE FRONTIER */
        {
          id: 'dispatch', kind: 'evidence',
          label: "A dispatch on the cabinet table, tied with red cord",
          standAt: 67.5,
          box: { left: 60.8, top: 54.0, width: 2.7, height: 10.0 },
          tag: 'Reason 3 &middot; The frontier',
          heading: 'A Report from the Frontier',
          doc: {
            type: 'dispatch',
            haste: 'Haste &mdash; post haste',
            place: 'Vincennes, Indiana Territory',
            lines: [
              'Sir &mdash; the action on the Tippecanoe was fought the <strong>7th</strong> of November and the ground is ours, though dearly.',
              'I am to report that the muskets taken from the warriors are of British manufacture, and new.',
              'They did not come by trade alone. I would stake my commission on it.'
            ],
            sign: 'Jno. Gibson, Sec., Ind. Terr.',
            plain: [
              '<strong>Sir,</strong>',
              'We fought the battle at Tippecanoe on <strong>November 7th</strong>. We hold the ground, but we lost a lot of men.',
              'I have to report this: the guns we took from the warriors were made in Britain, and they were brand new.',
              'They did not get them through ordinary trading. I would bet my job on it.',
              '<em>&mdash; John Gibson</em>'
            ]
          },
          quote: "&ldquo;The muskets taken from the warriors are of British manufacture, and new.&rdquo;",
          body: [
            "American settlers kept pushing west onto land where Native nations already lived. A Shawnee leader named <strong>Tecumseh</strong> tried to stop it. He worked to join many nations together into one alliance strong enough to hold the line.",
            "Britain still ruled Canada, just across the northern border. British agents there gave Tecumseh's alliance guns and encouragement.",
            "In 1811 American soldiers fought Tecumseh's followers at Tippecanoe. On the battlefield they found British-made muskets that had never been fired. To settlers in the west, that settled the argument. The real enemy was not Tecumseh. It was Britain &mdash; and Britain was right next door."
          ],
          record: "The frontier &mdash; Britain supplied guns to Tecumseh's alliance from Canada. Settlers in the west blamed Britain for the fighting and wanted the British pushed out of North America.",
          hint: "Back at the desk. The bottom drawer is locked, and whatever the President wanted kept shut is inside it."
        },

        /* 4 ------------------------------------- THE DRAWER AND THE HAWKS */
        {
          id: 'drawer', kind: 'puzzle',
          label: "A locked drawer in the desk",
          standAt: 38.5,
          box: { left: 29.2, top: 64.5, width: 5.6, height: 9.0 },

          puzzle: {
            prompt: "Three brass dials under the lock. Someone scratched a note into the wood above them:",
            riddle: "&ldquo;<em>What the Navy took. What the Article numbered. What the day was at Tippecanoe.</em>&rdquo;",
            slots: [
              { label: 'The Navy took', answer: 6 },
              { label: 'The Article',   answer: 3 },
              { label: 'The day',       answer: 7 }
            ],
            help: "All three numbers are in things you have already read. Open your notebook and look again.",
            wrong: "The dials spring back. Not it.",
            skip: "Ask the editor (he just tells you)"
          },

          tag: 'Reason 4 &middot; Land and pride',
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
            margin: 'say this twice',
            plain: [
              '<strong>Speech notes &mdash; Henry Clay of Kentucky</strong>',
              'I would not trade one sailor\'s freedom for all the land in Canada.',
              'But sir &mdash; taking Canada <em>is</em> something we can do. Getting this nation\'s honor back is not.',
              'The volunteer soldiers of Kentucky could capture Montreal for you all by themselves.',
              '<em>He crossed out the polite version and wrote the blunt one. He also noted to himself: say this twice.</em>'
            ]
          },
          quote: "&ldquo;The taking of Canada is in our power, and the honor of this nation is not.&rdquo;",
          body: [
            "A group of young congressmen pushed hardest for war. People called them the <strong>War Hawks</strong>. Henry Clay of Kentucky led them. Most came from the West and the South, and most were too young to remember the Revolution.",
            "Their argument tied everything in these rooms together. Britain took American sailors. Britain blocked American trade. Britain armed Native nations from Canada. Take Canada, they said, and all three problems end at once.",
            "They also talked about <strong>honor</strong> &mdash; the country's reputation. Letting Britain push America around, they argued, made the United States look weak in front of the whole world. Today, by 79 votes to 49, Congress agreed with them. Barely."
          ],
          record: "Land and pride &mdash; young congressmen called War Hawks, led by Henry Clay, wanted war to defend the country's honor and to take Canada, which they thought would solve every other problem at once.",
          hint: ""
        }
      ]
    }
  },

  exit: {
    kicker: 'End of Act One',
    heading: 'You Have Your Story',
    text: "Four reasons, four pieces of evidence, two rooms, one night.<br><br>" +
          "Out in the street the bonfires are still burning, and in New England the bells are still ringing. " +
          "Nobody in Britain knows yet. It will be six weeks before they find out.<br><br>" +
          "<em>Act Two &mdash; this same street in ruins, and these rooms burned out &mdash; is next to build.</em>",
    button: 'Review my evidence'
  }
}
};

const ACT_ORDER = ['act1'];
