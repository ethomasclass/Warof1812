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
      startAt: 30,
      objective: 'Walk down the street to the newsboy. Click where you want to go.',
      hotspots: [
        {
          id: 'newsboy', kind: 'talk',
          label: 'A newsboy shouting the news',
          standAt: 31.5,
          box: { left: 35.5, top: 35.2, width: 3.9, height: 48.5 },
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
          standAt: 40.0,
          box: { left: 42.1, top: 57.5, width: 4.2, height: 15.5 },
          caption: "The <em>National Intelligencer</em>, still damp from the press. In two years British soldiers will burn this paper's office and throw its type into the street."
        },
        {
          id: 'door', kind: 'exit',
          label: 'The door at the top of the steps',
          hidden: true, standAt: 60.5,
          box: { left: 58.6, top: 32.5, width: 3.6, height: 24.0 },
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
              'They stopped the Baltimore brig <em>Eliza</em> on the 2nd and mustered every man of us on deck.',
              'The officer said I spoke like an Englishman. I told him twice I was born at Fell\'s Point. He took my protection paper out of my hand, put it in his pocket, and that was the end of the argument.',
              'They took <strong>six</strong> of us off the deck that morning. I am rated ordinary seaman now and used no worse than their own men. But I cannot leave.',
              'If you can swear out another protection at the custom house, send it to the agent at Halifax. Mr. Dunbar says it has done nothing for the eleven men taken before me.'
            ],
            sign: 'Yr. obedient son, Wm. Hale',
            docket: 'Recd. Dept. of State 12 Augt. 1811, enclosed by the mother. Entered, register of impressed seamen, No. 1,214. <em>Laid before Congress with the President\'s Message.</em>',
            plain: [
              '<strong>Dear Mother,</strong>',
              'A British warship stopped our ship, the <em>Eliza</em> out of Baltimore, and lined all of us up on deck.',
              'The officer said I sounded English. I told him twice I was born in Baltimore. He took my <em>protection paper</em> &mdash; the document that proved I was an American citizen &mdash; put it in his pocket, and that ended the argument.',
              'They took <strong>six</strong> of us that morning. They treat me the same as their own sailors, but I am not allowed to leave.',
              'If you can get another protection paper from the customs house, send it to Halifax. A man here says it did no good for the eleven men taken before me.',
              '<em>&mdash; William Hale</em>'
            ]
          },
          found: "American sailors carried a paper called a <strong>protection certificate</strong> to prove they were citizens. His was taken out of his hand. His mother forwarded the letter to the State Department, which kept a running register of seized sailors. It is on this desk because it was one of the papers pulled out of that register to support the President's war message to Congress three weeks ago.",
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
              '<strong>Article 3.</strong> No neutral vessel shall trade with any port of France or her allies, save such as shall first touch at a British port and there pay the duties hereby imposed.',
              'Article 4. Any vessel found trading contrary hereto shall be lawful prize, together with her cargo, and shall be condemned in the Admiralty Court.'
            ],
            foot: 'God save the King',
            stamp: 'Board of Trade &middot; London',
            docket: 'Transmitted by Mr. Russell at London, recd. 3 Feby. 1812. <em>Article 3 copied out for the Message.</em>',
            plain: [
              '<strong>An order from the King of Great Britain.</strong>',
              'France has tried to shut down British trade, so Britain is doing the same thing back.',
              '<strong>Rule 3.</strong> No <em>neutral</em> ship may trade with France or her allies unless it stops at a British port first and pays a British fee.',
              '<strong>Rule 4.</strong> Any ship caught breaking this rule can be seized and kept, cargo and all.',
              '<em>A neutral country is one that is not fighting on either side. The United States was neutral. These rules applied to American ships.</em>'
            ]
          },
          found: "This is a London printing. After the United States withdrew its ambassador, Jonathan Russell was the senior American diplomat left in London, and he sent copies of every new order home so the government could see exactly what the rules were. It is pinned to the wall here because a clerk has been copying Article 3 out by hand for the war message.",
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
              'Sir &mdash; the action on the Tippecanoe was fought the <strong>7th</strong> of November and the ground is ours, though dearly. We buried thirty-seven.',
              'I am to report a matter the Governor wishes laid before the Department. Of the arms taken from the warriors on the field, a great part are military muskets of British manufacture, and new.',
              'Six that I examined myself carry the Tower proof and a crown upon the lockplate. They have not been fired above a season.',
              'Such arms are not got by ordinary trade with the posts. I would stake my commission that they were issued, and issued lately.'
            ],
            sign: 'Jno. Gibson, Sec., Indiana Terr.',
            docket: 'Recd. War Dept. 9 Decr. 1811. Referred to the Secy. of War. <em>Copy to the President.</em>',
            plain: [
              '<strong>Sir,</strong>',
              'We fought the battle at Tippecanoe on <strong>November 7th</strong>. We hold the ground, but we lost a lot of men &mdash; we buried thirty-seven.',
              'The Governor wants the Department to know this: many of the guns we took from the warriors are British <em>military</em> muskets, and they are new.',
              'I checked six of them myself. They are stamped with a crown and the word TOWER &mdash; the mark of the British government arsenal in London. They have barely been fired.',
              'You do not get army guns like that by ordinary trading. I would bet my job that the British handed them out, and handed them out recently.',
              '<em>&mdash; John Gibson</em>'
            ]
          },
          found: "Reports from the western territories went to the Secretary of War, who forwarded copies to the President. This one has been handled a lot lately. British support for Tecumseh's alliance was the third charge in the war message, and this dispatch is the proof behind it.",
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
            tag: 'The locked drawer',
            title: 'Three Brass Dials',
            prompt: "Three brass dials under the lock. The clerk who shut this drawer set them from the three papers he had spent all evening docketing, and scratched himself a reminder in the wood so he would not forget:",
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
            docket: 'Found on the cabinet table after the caucus broke up. Not the President\'s property. Put by in the drawer until Mr. Clay sends for them.',
            plain: [
              '<strong>Speech notes &mdash; Henry Clay of Kentucky</strong>',
              'I would not trade one sailor\'s freedom for all the land in Canada.',
              'But sir &mdash; taking Canada <em>is</em> something we can do. Getting this nation\'s honor back is not.',
              'The volunteer soldiers of Kentucky could capture Montreal for you all by themselves.',
              '<em>He crossed out the polite version and wrote the blunt one. He also noted to himself: say this twice.</em>'
            ]
          },
          found: "These are not a government record and nobody filed them. Henry Clay is Speaker of the House, and he was in these rooms for the war meeting. He left his notes on the table. The President's clerk put them in the drawer because they are not the President's to keep &mdash; which is why the only locked thing in this room is holding somebody else's speech.",
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
,
/* ===================================================================
   ACT TWO — the same places, ten months after the fire, and the real
   question: the treaty changed almost nothing on paper, so what
   actually changed?
====================================================================*/
act2: {
  title: 'Act Two &middot; What Actually Changed',

  intro: {
    kicker: 'Washington City &middot; spring 1815',
    heading: 'The War Is Over',
    text:
      "<p>You were last here on the night the war began. Since then, a lot has happened, " +
      "and almost none of it went the way the War Hawks promised.</p>" +

      "<p>The invasion of Canada failed. Then, in August 1814, British soldiers marched " +
      "into Washington and burned the Capitol and the President's House. They burned your " +
      "newspaper's office too. Mrs. Madison got out with a portrait of George Washington " +
      "cut from its frame, and not much else.</p>" +

      "<p>The peace treaty was signed in Europe in December. It took six weeks to cross " +
      "the Atlantic. In that time, before anyone in America knew the war was already over, " +
      "Andrew Jackson won the biggest victory of the whole war at New Orleans.</p>" +

      "<p>Here is the strange part. The treaty gave nobody anything. No land changed hands. " +
      "The border is exactly where it was. Britain never even promised to stop taking " +
      "American sailors.</p>" +

      "<p>Your editor wants a second story, and it is a harder one:</p>" +

      "<p class=\"card-ask\">The treaty changed almost nothing on paper. So what actually changed?</p>",
    button: 'Go back and look'
  },

  scenes: {

    /* ===============================================================
       THE SAME STREET, ten months after the fire
    ================================================================*/
    ruins: {
      art: 'ruins',
      startAt: 30,
      objective: 'Same street. Walk down and find someone who can tell you what happened here.',
      hotspots: [
        {
          id: 'mason', kind: 'talk',
          label: 'A stonemason working on the wall',
          standAt: 41.5,
          box: { left: 45.5, top: 36.3, width: 3.9, height: 47.5 },
          speaker: 'Stonemason',
          lines: [
            "Mind the lime, lad. It'll take the skin off you.",
            "You were here the night they voted for it, weren't you? I remember the bonfires.",
            "Well. They came up from the bay in August and they walked straight in. Ate the dinner that was laid on the table in there, then set fire to the house around it.",
            "Burned your paper's office too. I heard the admiral told his men to smash all the letter C's, so the printers couldn't spell his name to insult him again.",
            "Look at the stone though. Black as your hat, but she's <em>standing</em>. Walls held. Three years and we'll have her back, better than she was.",
            "Go on in, if you're going. Mind the floor.",
            "There's a clerk been in there a fortnight sorting what's left, and a plank laid over the President's desk to work on. Half of what he's got isn't even salvage &mdash; it's new paper, sent here because there's nowhere else to send it.",
            "Only thing I'd say is: don't let the lads light the fire with anything before he's looked at it. They've near burned the peace treaty twice."
          ],
          unlocks: 'doorway',
          thenObjective: 'Go in through the doorway and see what is left.'
        },
        {
          id: 'stone', kind: 'look',
          label: 'Blocks of fresh stone',
          standAt: 12.0,
          box: { left: 14.4, top: 52.0, width: 5.4, height: 22.0 },
          caption: "New sandstone, cut and waiting. The walls stood through the fire, so they are not starting over &mdash; they are patching. That turns out to be the story of the whole country this year."
        },
        {
          id: 'timber', kind: 'look',
          label: 'Burnt timber pulled out of the building',
          standAt: 42.0,
          box: { left: 37.9, top: 66.0, width: 5.6, height: 8.5 },
          caption: "Roof beams. Everything wooden in the building came out of it like this, in a cart. What stood was the stone, and only the stone."
        },
        {
          id: 'scaffold', kind: 'look',
          label: 'Scaffolding against the burned wall',
          standAt: 47.0,
          box: { left: 43.6, top: 24.0, width: 4.6, height: 36.0 },
          caption: "The black tongue over each window is where the fire came out and ran up the stone. A rainstorm the next day put most of it out. People still argue about whether that storm saved the building."
        },
        {
          id: 'doorway', kind: 'exit',
          label: 'The burned doorway at the top of the steps',
          hidden: true, standAt: 60.5,
          box: { left: 58.6, top: 32.5, width: 3.6, height: 24.0 },
          to: 'burned'
        }
      ]
    },

    /* ===============================================================
       THE SAME ROOMS, gutted
    ================================================================*/
    burned: {
      art: 'burned',
      startAt: 94,
      facing: -1,
      objective: 'Same rooms. Someone laid a plank across the burned desk to work on. There is a ledger open on it.',
      chained: true,

      ambient: [
        {
          id: 'hook', kind: 'look',
          label: 'A bare iron hook on the scorched wall',
          standAt: 82,
          box: { left: 84.8, top: 7.0, width: 6.8, height: 26.0 },
          caption: "This is where General Washington hung. Mrs. Madison would not leave until the canvas was cut out of its frame and carried off. The frame burned. The painting did not. It is the only thing from these rooms that still exists."
        },
        {
          id: 'lamp', kind: 'look',
          label: 'The melted Argand lamp',
          standAt: 34,
          box: { left: 29.6, top: 56.0, width: 2.0, height: 5.5 },
          caption: "The brass ran like candle wax and set again in a puddle. Whatever burned in this room burned far hotter than a house fire usually does."
        },
        {
          id: 'drawerX', kind: 'look',
          label: 'The desk drawer, forced open',
          standAt: 38.5,
          box: { left: 29.2, top: 66.5, width: 5.6, height: 8.0 },
          caption: "The drawer you opened is hanging off its runners, and it is empty. Somebody got the papers out before the fire. Somebody else pulled the drawer apart looking for more."
        },
        {
          id: 'charts', kind: 'look',
          label: 'Clean rectangles on a scorched wall',
          standAt: 68,
          box: { left: 64.8, top: 18.0, width: 5.9, height: 19.0 },
          caption: "The maps are gone, but the wall remembers them. Every chart left a clean shape behind, and the biggest one was the Canadian border. Three invasions of Canada in three years, and every one of them failed."
        },
        {
          id: 'globeX', kind: 'look',
          label: 'The burnt globe',
          standAt: 76,
          box: { left: 78.6, top: 50.0, width: 3.3, height: 26.0 },
          caption: "Burned through on one side. The hole is right about where Britain used to be. Nobody did that on purpose, but everyone who walks past it says the same thing."
        },
        {
          id: 'hearthX', kind: 'look',
          label: 'The fireplace, with a workman\'s fire in it',
          standAt: 82,
          box: { left: 84.9, top: 44.0, width: 6.6, height: 29.0 },
          caption: "Stone, so it lived. The masons keep a fire going in it to warm their hands. It is the only thing in these rooms doing the job it was built for."
        },
        {
          id: 'clockX', kind: 'look',
          label: 'The clock, come down flat',
          standAt: 91,
          box: { left: 93.8, top: 77.0, width: 5.6, height: 10.0 },
          caption: "Fallen forward and stopped. Not at any meaningful hour &mdash; clocks do not do that outside of stories. It just ran down, because for eight months there was nobody here to wind it."
        },
        {
          id: 'sky', kind: 'look',
          label: 'Daylight through the roof',
          standAt: 46,
          box: { left: 32.0, top: 1.0, width: 18.0, height: 10.0 },
          caption: "There is no ceiling. You are standing in the President's rooms looking straight up at the sky, and it is raining in. Nobody who saw this in September thought the country would hold together."
        }
      ],

      hotspots: [

        /* 1 ----------------------------------------------- THE ECONOMY */
        {
          id: 'ledger', kind: 'evidence',
          label: 'A merchant ledger open on the plank',
          standAt: 36.5,
          box: { left: 25.9, top: 55.0, width: 3.9, height: 6.5 },
          tag: 'Impact 1 &middot; The economy learned to stand alone',
          heading: 'A Merchant&rsquo;s Ledger',
          doc: {
            type: 'ledger',
            head: 'Baltimore &middot; goods bought from British houses',
            colA: '1807',
            colB: '1815',
            rows: [
              ['Cloth, bolts', '1,240', '96'],
              ['Nails &amp; iron', '880', '71'],
              ['Glass, crates', '410', '38'],
              ['Made at home', 'almost none', 'most of it']
            ],
            note: 'We could not buy from them, so we paid to have it built here. Now we do not need to buy from them at all. I would ask the Committee to remember what it cost us to learn it.',
            docket: 'Exhibit B. Submitted to the Committee on Commerce and Manufactures, 20 Feby. 1815.',
            plain: [
              '<strong>A Baltimore merchant\'s account book.</strong>',
              'Before the war he bought nearly everything from British companies &mdash; cloth, nails, iron, glass.',
              'During the war he could not buy from Britain at all. So he and others paid American workshops to make those things instead.',
              'By 1815 he is buying almost nothing from Britain. <em>He does not need to.</em>',
              'His note at the bottom asks Congress to remember how expensive it was to learn how.'
            ]
          },
          found: "Congress is about to argue over whether to tax British goods coming in, to protect the new American factories. Merchants were asked to send in their account books as evidence. This one came up from Baltimore for a committee that has nowhere proper to meet, because the Capitol is a burned shell too.",
          quote: "&ldquo;We could not buy from them, so we built it here.&rdquo;",
          body: [
            "Before the war, the United States bought most of its manufactured goods from Britain. Cloth, nails, glass, tools &mdash; almost all of it came across the ocean.",
            "The war cut that off completely. American merchants could not get British goods, so American workshops and mills started making them instead. New England, which had fought hardest against the war, built most of the new factories.",
            "When the war ended, those factories did not close. In 1816 Congress passed a tax on imported goods to protect them. For the first time, the country could make what it needed without asking anyone's permission."
          ],
          record: "The economy &mdash; the war cut off British goods, so Americans started making those goods themselves. American factories grew during the war and stayed open after it. The country became far less dependent on Britain.",
          hint: "There is a military report nailed to the wall over by the looking glass. It came up from New Orleans."
        },

        /* 2 --------------------------------------------- NEW ORLEANS */
        {
          id: 'orleans', kind: 'evidence',
          label: 'A military report nailed to the wall',
          standAt: 20.0,
          box: { left: 23.4, top: 30.5, width: 3.4, height: 18.0 },
          tag: 'Impact 2 &middot; A victory that came too late to matter',
          heading: 'The Report from New Orleans',
          doc: {
            type: 'dispatch',
            haste: 'By express',
            place: 'New Orleans, 9th January 1815',
            lines: [
              'Sir &mdash; the enemy came against our line at daybreak yesterday in column, and was repulsed in something under half an hour.',
              'Their loss, as near as can be counted: <strong>291</strong> killed, <strong>1,262</strong> wounded, <strong>484</strong> missing. Their General Pakenham fell in front of the works.',
              'Our own loss: <strong>13</strong> killed, 39 wounded, 19 missing.',
              'The line was held by regulars, by the Tennessee and Kentucky militia, by free men of colour, by Baratarian sailors, and by the citizens of this city, standing together behind the same mud bank.',
              'Genl. Jackson desires me to say that the militia stood as well as any regulars in the world, and that he will not have it reported otherwise.'
            ],
            sign: 'Aide-de-camp, 7th Military District',
            docket: 'Express from N. Orleans, recd. 4 Feby. 1815. Printed for the city by order of the War Dept.',
            plain: [
              '<strong>New Orleans, January 9th, 1815.</strong>',
              'The British attacked our line at dawn yesterday. We drove them back in under half an hour.',
              'British losses: <strong>291 killed, 1,262 wounded, 484 missing</strong> &mdash; about 2,000 men. Their commander, General Pakenham, was killed.',
              'American losses: <strong>13 killed, 39 wounded, 19 missing</strong> &mdash; about 70 men.',
              'The line was held by regular soldiers, Tennessee and Kentucky volunteers, free Black men, local pirates, and ordinary citizens of the city, all behind the same mud wall.',
              'General Jackson wants it said that the volunteers fought as well as any professional army in the world, and he will not have it reported any other way.'
            ]
          },
          found: "When the express rider reached Washington on February 4th, the War Department had the report printed and posted up around the city so people could read it for themselves. This is one of those sheets. Somebody nailed it to the wall in here, in the ruin of the President's house, which tells you what that news meant to people.",
          quote: "&ldquo;Their loss: <strong>291</strong> killed, <strong>1,262</strong> wounded&hellip; our own: <strong>13</strong> killed.&rdquo;",
          body: [
            "On January 8, 1815, Andrew Jackson's army crushed a British attack outside New Orleans. About 2,000 British soldiers were killed, wounded or missing. American losses were about 70.",
            "Here is the thing everybody forgets: <strong>the war was already over.</strong> The peace treaty had been signed in Europe two weeks earlier. News took six weeks to cross the Atlantic, so nobody at New Orleans knew.",
            "It changed nothing about the peace. It changed everything about how the war felt. Americans had spent three years losing, and their capital had been burned. Now the last thing that happened was a crushing win. People remembered the ending, not the middle &mdash; and Andrew Jackson rode that ending all the way to the presidency."
          ],
          record: "New Orleans &mdash; Jackson's huge victory on January 8, 1815 happened two weeks AFTER the peace treaty was signed, but before the news arrived. It changed nothing officially, but it made Americans feel they had won, and it made Jackson a national hero.",
          hint: "Through the arch, on what is left of the cabinet table, there is a letter."
        },

        /* 3 --------------------------------------- NATIVE DISPLACEMENT */
        {
          id: 'nations', kind: 'evidence',
          label: 'A letter on the collapsed cabinet table',
          standAt: 67.5,
          box: { left: 60.8, top: 56.0, width: 3.0, height: 7.5 },
          tag: 'Impact 3 &middot; Native nations lost their last ally',
          heading: 'A Letter from the Northwest',
          doc: {
            type: 'letter',
            place: 'Detroit, the 2nd March 1815',
            lines: [
              'Sir,',
              'The British have gone back over the lakes and the posts are giving out nothing &mdash; no powder, no provisions, no promises. That is understood here by everyone, on both sides of the water.',
              'Tecumseh fell at the Thames a year and a half since, and what he spent six years building has come apart in eighteen months.',
              'Delegations have come in from four nations this month asking what the ninth article of the treaty means, since it speaks of restoring what they held in 1811.',
              'I have read them the article. They then ask me who is to make it happen, and I have no answer that I would care to give a man in person.'
            ],
            sign: 'Yr. obedt. servant, clerk of the Indian Agency at Detroit',
            docket: 'Recd. War Dept. 4 Apl. 1815. Referred to the Secy. of War. <em>No answer sent.</em>',
            plain: [
              '<strong>Detroit, March 2nd, 1815.</strong>',
              'The British have pulled back across the lakes. Their forts are handing out nothing &mdash; no gunpowder, no food, no promises. Everybody here understands what that means.',
              'Tecumseh was killed in battle a year and a half ago. What he spent six years building fell apart in eighteen months.',
              'Groups from four nations came in this month to ask what <em>Article 9</em> of the peace treaty means, because it says their land and rights from 1811 will be given back.',
              'I read them the article. Then they ask me who is going to make that happen. <em>I do not have an answer I would want to give a man to his face.</em>'
            ]
          },
          found: "The Indian agency at Detroit reported to the Secretary of War. This letter came in three weeks ago and is still lying where it was opened. Look at the bottom of it: a clerk wrote the date it arrived, who it went to, and then three more words.",
          quote: "&ldquo;The nations ask what the treaty does for them. I have no answer that I would care to give in person.&rdquo;",
          body: [
            "Tecumseh was killed at the Battle of the Thames in October 1813. Without him, and without British guns, the alliance he had spent years building fell apart.",
            "The peace treaty did mention Native nations. <strong>Article 9</strong> said the United States would give back to them all the land and rights they had held in 1811.",
            "It never happened. There was no way to force the United States to keep that promise, and nobody tried. Britain, which had spent years encouraging Native resistance, simply stopped &mdash; it had made its peace and it went home. Native nations east of the Mississippi had lost the one outside power that had any reason to help them, and settlement pushed west faster than ever."
          ],
          record: "Native nations &mdash; Tecumseh died in 1813 and his alliance collapsed. The treaty's Article 9 promised to restore Native land and rights from 1811, but that promise was never kept. Britain abandoned its Native allies, and westward settlement sped up.",
          hint: "By the fireplace there is a board with something laid on it. It is the treaty itself, and it is in pieces."
        },

        /* 4 ---------------------------------- THE TREATY (SEQUENCE PUZZLE) */
        {
          id: 'treaty', kind: 'puzzle',
          label: 'The treaty, torn and singed, on a board by the fire',
          standAt: 82,
          box: { left: 88.6, top: 63.0, width: 4.6, height: 6.5 },

          puzzle: {
            tag: 'Pulled out of the fire',
            title: 'The Torn Treaty',
            kind: 'sequence',
            prompt: "It went into the kindling pile and came out again in four pieces. This is the first article of the peace treaty &mdash; the part that says what each side gets to keep.",
            riddle: "Put the sentence back together. Read the pieces and choose the one that comes next.",
            blank: 'Article the First &mdash; &hellip;',
            pieces: [
              'All territory, places, and possessions',
              'taken by either party from the other during the war',
              'shall be restored without delay',
              'and things shall return to the state they were in before the war.'
            ],
            help: "Read it as one long sentence. Which piece could start it?",
            wrong: "That does not follow. Read the piece before it again.",
            skip: "Ask the editor (he just tells you)",
            done: "That is the whole article. Every soldier, every ship, every burned building &mdash; and the map goes back exactly where it started."
          },

          tag: 'Impact 4 &middot; The treaty that changed nothing',
          heading: 'The Treaty of Ghent',
          doc: {
            type: 'treaty',
            kicker: 'Signed at Ghent, 24 December 1814',
            title: 'Treaty of Peace and Amity',
            article: 'Article the First',
            lines: [
              'All territory, places, and possessions taken by either party from the other during the war shall be restored without delay, and things shall return to the state they were in before the war.'
            ],
            foot: 'Ratified 17 February 1815',
            docket: 'Printed by order of Congress, Feby. 1815. One copy to each Department.',
            plain: [
              '<strong>The peace treaty, signed December 24, 1814.</strong>',
              '<strong>Article 1.</strong> Everything either side captured during the war goes back. The border returns to exactly where it was before the war started.',
              '<em>That is it. Read the rest and you will not find impressment. You will not find trade. You will not find one single thing America went to war over in 1812.</em>'
            ]
          },
          found: "Congress had the treaty printed and a copy sent to every department. This one is singed because the masons working in here light the hearth with whatever paper is lying about, and it was in the pile. Somebody pulled it back out. Ten weeks after it ended the war, the peace treaty was very nearly used to start a fire.",
          quote: "&ldquo;Things shall return to the state they were in before the war.&rdquo;",
          body: [
            "Look at what this treaty does <em>not</em> say. Not one word about impressment &mdash; the thing that made Americans angriest. Not one word about trade rules. Not one inch of land changes hands.",
            "So why did the problems stop? <strong>Impressment</strong> stopped because Napoleon was finally beaten in Europe. Britain no longer needed the sailors, so it quietly stopped taking them. The treaty had nothing to do with it. <strong>Trade</strong> opened up for the same reason: Britain's war with France was over.",
            "<strong>Tecumseh's alliance</strong> was already finished &mdash; he had died fifteen months before anyone signed anything. And Article 9's promise to restore Native land was never kept.",
            "Every single thing the United States went to war for in 1812 either fixed itself or never got fixed at all. On paper, three years of war moved nothing. Which leaves the real question: if nothing on the map changed, why did Americans come out of this war feeling like a different country?"
          ],
          record: "The Treaty of Ghent &mdash; signed December 24, 1814, it returned everything to exactly how it was before the war. It said nothing about impressment or trade. Those problems ended because Britain's war with France ended, not because of the treaty. On paper, the war changed nothing.",
          hint: ""
        }
      ]
    }
  },

  exit: {
    kicker: 'End of Act Two',
    heading: 'So What Actually Changed?',
    text:
      "<p>Not the map. Not the treaty. Not one of the four reasons you wrote down on the night the war began.</p>" +
      "<p>But the country fought the most powerful navy on earth and was still standing at the end. It stopped buying what it could make itself. It got a hero out of New Orleans and a song out of Fort McHenry. The party that opposed the war was finished. And Native nations east of the Mississippi lost the last ally who had any reason to help them.</p>" +
      "<p>The walls of this house held. That is about as good a summary of the whole war as you are going to get.</p>" +
      "<p class=\"card-ask\">Now write it.</p>",
    button: 'Review all my evidence'
  }
}
};

const ACT_ORDER = ['act1', 'act2'];
