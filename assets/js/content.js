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
      objective: 'The President&rsquo;s writing desk is at the far end, past the arch. Walk down and lean over it.',
      chained: true,

      /* Two things on this desk are small enough that hunting for them at
         room scale is a trackpad exercise, not a history one. Leaning
         over the desk makes them readable and makes the locked drawer's
         three dials visible, which is where the puzzle actually lives. */
      stations: {
        desk: {
          label: 'The President&rsquo;s writing desk',
          standAt: 37.5,
          box: { left: 25.0, top: 55.0, width: 12.0, height: 22.0 },
          art: STATIONS.desk1812,
          objects: [
            {
              id: 'lamp-close', kind: 'look',
              label: 'The Argand lamp',
              box: { left: 16.0, top: 2.0, width: 12.0, height: 44.0 },
              caption: "An Argand lamp. It burns six times brighter than a candle, which is why anyone can read at this desk after dark at all. Both Mr. Jefferson and Mr. Madison keep them."
            },
            {
              id: 'ink-close', kind: 'look',
              label: 'The inkstand and quill',
              box: { left: 69.0, top: 30.0, width: 16.0, height: 16.0 },
              caption: "Iron gall ink, a sand shaker for blotting, and a goose quill that wants cutting again. Everything in your notebook tonight was written with something like this."
            },
            {
              id: 'stack-close', kind: 'look',
              label: 'A stack of docketed papers',
              box: { left: 65.0, top: 58.0, width: 19.0, height: 11.0 },
              caption: "The clerk's pile. Every sheet is folded and endorsed on the outside &mdash; when it came, who sent it, where it goes. That is how a government remembers anything."
            }
          ]
        }
      },
      editor: {
        open: "Four reasons, boy. Not three, not &ldquo;some.&rdquo; Four, and a piece of paper behind each one. Lean over anything you want a proper look at &mdash; you are a printer's apprentice, not a portrait painter, you may pick things up.",
        1: "Good. Now stop admiring your handwriting and find me the next one. And no, I will not accept &ldquo;the British were mean&rdquo; as a reason.",
        2: "Two down. There's a cartoon of a turtle pinned up over the desk &mdash; read its name backwards before you go. That one's free.",
        3: "Three. The fourth is in the drawer and the drawer is locked, because of course it is. You have the numbers. You have been carrying them around all night."
      },

      /* ---- always clickable, never required ---- */
      ambient: [
        {
          id: 'ograbme', kind: 'look',
          label: 'A printed cartoon pinned above the desk',
          standAt: 36.5,
          box: { left: 28.4, top: 30.2, width: 3.0, height: 13.0 },
          tag: 'Worth a detour &middot; The Embargo Act',
          heading: 'Ograbme, the Snapping Turtle',
          doc: {
            type: 'cartoon',
            head: 'Printed at New York &middot; 1807',
            cry: '&ldquo;Oh! this cursed Ograbme!&rdquo;',
            caption: 'A merchant tries to get his goods out to a British ship. The turtle will not let him.',
            docket: 'Somebody pinned this up here years ago and nobody has taken it down. <em>Read the turtle&rsquo;s name backwards.</em>',
            plain: [
              '<strong>A political cartoon from 1807.</strong>',
              'A snapping turtle has a man by the seat of the trousers. He is trying to carry a barrel of goods out to a British ship, and the turtle will not let go. He is yelling <em>"Oh! this cursed Ograbme!"</em>',
              'The turtle&rsquo;s name is <strong>OGRABME</strong>. Spell it backwards: <strong>EMBARGO</strong>.',
              'That is the joke, and it is also the argument. The cartoonist is saying the Embargo Act was supposed to bite Britain &mdash; and instead it clamped down on Americans.'
            ]
          },
          quote: "&ldquo;Oh! this cursed Ograbme!&rdquo;",
          found: "This is a print from 1807, pinned up by some clerk and never taken down. Political cartoons were how ordinary people argued in public before photographs existed &mdash; cheap to print, and you did not have to be able to read much to get the point.",
          body: [
            "Spell the turtle's name backwards: <strong>OGRABME</strong> is <strong>EMBARGO</strong>.",
            "That is the whole cartoon. Jefferson's <strong>Embargo Act</strong> was meant to bite Britain by cutting off American trade. What the artist is saying is that it bit Americans instead &mdash; the merchant in the picture is not British. He is one of us, trying to earn a living, and his own government has hold of him.",
            "Cartoons like this were everywhere in 1808 and 1809, and they worked. The Embargo was repealed in 1809. Notice what the artist did not have to do: he never had to explain the policy. He just drew a turtle."
          ],
          record: "Ograbme &mdash; an 1807 cartoon attacking the Embargo Act. The turtle's name is 'embargo' spelled backwards, and it is biting an American merchant, not a British one. The point: the Embargo was supposed to hurt Britain and hurt Americans instead.",
          hint: ""
        },
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
          box: { left: 38.8, top: 24.0, width: 5.8, height: 46.0 },
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
          station: 'desk',
          label: "An open letter, sealed in red wax",
          standAt: 36.5,
          box: { left: 37.0, top: 27.0, width: 26.0, height: 36.0 },
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
            "Here is the question that made people furious. If a country cannot protect its own citizens on its own ships, is it really in charge of itself? The word for being in charge of yourself as a country is <strong>sovereignty</strong>, and Americans said Britain was trampling theirs.",
            "So what does a government owe you when a foreign country takes your rights away somewhere else? That argument is what the next twenty years of American politics was about, and it is still going on."
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
          tag: 'Reason 2 &middot; Blocked trade &amp; the Embargo Act',
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
            docket: 'Transmitted by Mr. Russell at London, recd. 3 Feby. 1812. <em>Article 3 copied out for the Message.</em> Endorsed in another hand: &ldquo;And our own Congress&rsquo;s answer was the Embargo, which forbade us to sail at all. Between the two of them I am ruined twice over.&rdquo;',
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
            "Britain and France were at war with each other. Each one tried to wreck the other's trade, and American ships got caught in the middle.",
            "This British rule said American ships had to stop at a British port and pay a British fee before trading in Europe. America never agreed to it. Britain simply ordered it. A country that cannot decide who its own ships trade with is not really running itself &mdash; and that is what Americans meant when they said Britain was violating their <strong>sovereignty</strong>.",
            "President Jefferson tried to fight back <em>without</em> going to war. In 1807 Congress passed his <strong>Embargo Act</strong>, which banned American ships from sailing to any foreign port at all. The idea was that Britain and France needed American goods so badly that losing them would force both countries to back down.",
            "It did not work. Britain bought elsewhere. Meanwhile American ships sat rotting at the docks, sailors had no work, and merchants went broke &mdash; New England hardest of all, and many there smuggled goods out rather than obey. Exports fell by about <strong>80 percent</strong> in a single year. The Embargo was repealed in 1809, having hurt America far more than it hurt anybody else.",
            "So by 1812 Americans had tried the peaceful option and watched it fail. That is a large part of why the next argument was about war."
          ],
          record: "Blocked trade and the Embargo &mdash; Britain's Orders in Council forced American ships to stop at British ports and pay British fees, violating American sovereignty. Jefferson answered with the Embargo Act of 1807, banning American ships from foreign trade, hoping to pressure Britain without war. It failed: exports fell about 80 percent and the American economy, especially New England's, was devastated.",
          hint: "Through the arch, in the cabinet room, there is a dispatch lying on the long table. It came in from the frontier."
        },

        /* 3 -------------------------------------------------- THE FRONTIER */
        {
          id: 'dispatch', kind: 'evidence',
          label: "A transcript of a speech, on the cabinet table",
          standAt: 67.5,
          box: { left: 60.8, top: 54.0, width: 2.7, height: 10.0 },
          tag: 'Reason 3 &middot; The frontier',
          heading: 'Tecumseh Speaks at Vincennes',
          doc: {
            type: 'transcript',
            head: 'Speech of Tecumseh, a Shawanoe chief',
            sub: 'At the council with Govr. Harrison, Vincennes, August 1810',
            lines: [
              'Brother, I wish you to listen to me well.',
              'You have taken our land from us and I do not see how we can remain at peace with you if you continue to do so.',
              'The land belongs to <em>all</em> of us. It was never divided. No one tribe has the right to sell it, even to each other, much less to strangers.',
              '<em>Sell a country! Why not sell the air, the clouds, and the Great Sea?</em>',
              'You wish to prevent the Indians from uniting. You want to make them fight each other. You never see an Indian endeavour to make the white people do so.',
              'I am the head of them all. If you do not give up the land, you will have a hand in the affair, and I do not wish you to be hurt.'
            ],
            interp: "Taken down by the interpreter. Govr. Harrison, sending on the copy, notes that the man &ldquo;speaks bad English, and is not very remarkable for clearness of intellect.&rdquo;",
            docket: 'Recd. War Dept. Enclosed by Govr. Harrison. Filed with the papers on the action at Tippecanoe, the <em>7th</em> of November following, where the muskets taken from the warriors proved of British make, and new.',
            plain: [
              '<strong>Tecumseh, a Shawnee leader, speaking to Governor Harrison. August 1810.</strong>',
              'Brother, listen carefully. You keep taking our land. I do not see how we can stay at peace with you if you keep doing it.',
              'The land belongs to <em>all</em> of us together. It was never split up. No single nation has the right to sell it &mdash; not to another nation, and certainly not to outsiders.',
              '<em>Sell a country! Why not sell the air, the clouds, and the ocean?</em>',
              'You are trying to stop us from uniting. You want us fighting each other. We never try to make white people do that.',
              'I speak for all of them. If you will not give the land back, you will be part of what happens next, and I do not want you hurt.',
              '<em>Note: nobody wrote Tecumseh down in Shawnee. Everything above came through a translator, and Governor Harrison &mdash; who was arguing with him &mdash; said that translator spoke bad English and was not very clear-headed. This is as close as we can get to his voice.</em>'
            ]
          },
          found: "The United States had been buying land from individual nations, one treaty at a time. Tecumseh's whole argument was that this was a trick: the land was held by all Native nations together, so no one of them could sell it. Governor Harrison had his interpreter write the speech down and sent it to Washington. It is in this pile because the war message charged Britain with stirring up the frontier &mdash; but read it, and Tecumseh is not talking about Britain at all.",
          quote: "&ldquo;Sell a country! Why not sell the air, the clouds, and the Great Sea?&rdquo;",
          body: [
            "<strong>Tecumseh</strong> was a Shawnee leader. American settlers kept moving onto land where Native nations already lived, and the United States kept buying that land one nation at a time &mdash; a few leaders signing, a treaty, another piece gone.",
            "Tecumseh said that was not a real sale. The land, he argued, belonged to all Native nations <em>together</em>, so no single nation could sell any of it. He spent years travelling from the Great Lakes to the Gulf trying to build one alliance strong enough to hold the line, and telling people to stop selling.",
            "That is what he was fighting for, and it had nothing to do with Britain. But Britain still ruled Canada, just across the border, and British agents there were happy to supply his alliance with guns.",
            "In November 1811, while Tecumseh was away recruiting in the south, Governor Harrison marched on his brother's settlement and fought his followers at the <strong>Battle of Tippecanoe</strong>. The Americans held the ground &mdash; and on the field they found British muskets, brand new, stamped with the mark of the British government arsenal.",
            "For settlers in the west, that ended the argument. They stopped seeing a man defending his homeland and saw a British weapon instead. The way to make the frontier safe, they decided, was not to beat Tecumseh &mdash; it was to take Canada."
          ],
          record: "The frontier &mdash; Tecumseh, a Shawnee leader, argued that Native land belonged to all nations together so no one nation could sell it, and built an alliance to stop the sales. At the Battle of Tippecanoe (November 1811) American soldiers found new British muskets on the field. Americans blamed Britain for the fighting and wanted the British pushed out of North America.",
          hint: "Back to the desk. Lean over it again &mdash; the bottom drawer is locked, and there are three brass dials under the lock."
        },

        /* 4 ------------------------------------- THE DRAWER AND THE HAWKS */
        {
          id: 'drawer', kind: 'puzzle',
          station: 'desk',
          label: "The locked drawer, and its three brass dials",
          standAt: 38.5,
          box: { left: 33.0, top: 76.0, width: 30.0, height: 18.0 },

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
      objective: 'Same rooms. Someone laid a plank across the burned desk to work on. Walk down and lean over it.',
      chained: true,

      stations: {
        desk: {
          label: 'The burned desk, with a plank laid across it',
          standAt: 37.5,
          box: { left: 25.0, top: 55.0, width: 12.0, height: 22.0 },
          art: STATIONS.desk1815,
          objects: [
            {
              id: 'lamp-close2', kind: 'look',
              label: 'What is left of the Argand lamp',
              box: { left: 14.0, top: 46.0, width: 16.0, height: 16.0 },
              caption: "The brass ran like candle wax and set again in a puddle, in the same spot it stood in when you were last here. Whatever burned in this room burned far hotter than a house fire usually does."
            },
            {
              id: 'dials-close2', kind: 'look',
              label: 'The three brass dials, seized shut',
              box: { left: 33.0, top: 71.0, width: 30.0, height: 14.0 },
              caption: "The dials are still here, green and seized solid. Somebody did not bother with the combination the second time. The drawer was pulled apart with a bar."
            }
          ]
        }
      },
      editor: {
        open: "Same desk, same job, harder question. Four again. And before you ask: no, &ldquo;we won&rdquo; is not an answer, because we did not, and neither did they. Find me what actually changed.",
        1: "Right. Next one's nailed to the wall where you can't miss it, which tells you something about whoever nailed it there.",
        2: "Careful with that one. Everybody in this city is writing the same cheerful paragraph about New Orleans this month. You are going to write a different one.",
        3: "Last piece. It's by the fire, in bits, because the masons nearly used the peace treaty for kindling. I want that detail in the story."
      },

      ambient: [
        {
          id: 'hartford', kind: 'look',
          label: 'A newspaper folded open on the hearth stone',
          standAt: 78.0,
          box: { left: 80.5, top: 62.0, width: 4.4, height: 8.0 },
          tag: 'Worth a detour &middot; The Hartford Convention',
          heading: 'The Delegates from New England',
          doc: {
            type: 'news',
            paper: 'The Connecticut Courant',
            dateline: 'Hartford &middot; January 1815',
            extra: 'Report',
            head: 'The Convention Rises',
            sub: 'Delegates of the New England states conclude three weeks of secret session',
            lines: [
              'The delegates, having sat with the doors closed since the 15th of December, have this day published their report.',
              'They complain that this war has fallen hardest upon the commerce of New England, that the Embargo and its successors ruined their shipping, and that a government of one section ought not to spend the blood and money of another.',
              'They propose amendments to the Constitution to limit the war powers, and they assert the right of a state to interpose itself against measures it holds unconstitutional.',
              'Of a separation from the Union the report says nothing directly. It does not need to. Every reader in the country will supply the word for himself.'
            ],
            toast: 'Three commissioners are appointed to carry the report to Washington.',
            docket: 'Left on the hearth by one of the masons, who says it is good for lighting fires and nothing else. <em>Somebody has drawn a line under the last paragraph.</em>',
            plain: [
              '<strong>Newspaper report. Hartford, Connecticut, January 1815.</strong>',
              'For three weeks, delegates from the New England states met behind closed doors. Today they published what they decided.',
              'Their complaints: this war has hurt New England&rsquo;s shipping trade more than anyone else&rsquo;s. The Embargo wrecked them. And one part of the country should not be able to spend the lives and money of another part.',
              'They want changes to the Constitution limiting the government&rsquo;s war powers. And they claim a state has the right to <em>block</em> a federal law it believes is unconstitutional.',
              'They never actually use the word <em>secession</em> &mdash; leaving the Union. <em>They did not have to. Everyone reading it knew.</em>'
            ]
          },
          quote: "&ldquo;Of a separation from the Union the report says nothing directly. It does not need to.&rdquo;",
          found: "One of the masons has been using old newspapers to light the hearth, and this was in the pile. It is from January, three weeks before the peace news arrived. Somebody has drawn a line under the last paragraph.",
          body: [
            "While the rest of the country was fighting the war, delegates from the New England states met in secret at Hartford for three weeks. New England had opposed this war from the first vote, its shipping had been ruined first by the <strong>Embargo Act</strong> and then by the fighting, and its Federalist leaders had had enough.",
            "They demanded constitutional amendments, and they claimed a state could block a federal law it thought unconstitutional. They stopped just short of saying New England should leave the United States &mdash; but everyone understood.",
            "Then the timing destroyed them. Their delegates reached Washington in February 1815, the same week the news came in that Jackson had won at New Orleans and the war was over. They arrived to complain about a war America had apparently just won. They looked, at best, ridiculous; at worst, disloyal. The Federalist Party never recovered and was finished within a decade.",
            "Hold this next to your notebook. A war fought for national unity had a whole region quietly discussing leaving the country. That is worth more than the treaty is."
          ],
          record: "The Hartford Convention &mdash; New England Federalists met in secret from December 1814 to January 1815 to protest a war that had ruined their trade, demanded constitutional changes, and hinted at leaving the Union. The news of New Orleans and the peace arrived at the same moment their delegates did, making them look ridiculous and destroying the Federalist Party.",
          hint: ""
        },
        {
          id: 'mchenry', kind: 'look',
          label: 'A printed song sheet under a fallen board',
          standAt: 52.0,
          box: { left: 47.5, top: 63.0, width: 4.4, height: 8.5 },
          caption: "A song sheet. Last September the British shelled Fort McHenry at Baltimore for twenty-five hours and the flag was still up at dawn. A lawyer named Key watched it from a ship and wrote a poem about it; somebody set it to a drinking tune and now every printer in the country is selling it. <em>The Star-Spangled Banner.</em> Burn a man's capital and he writes you a song about a flag."
        },
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
          station: 'desk',
          label: 'A merchant ledger open on the plank',
          standAt: 36.5,
          box: { left: 31.0, top: 27.0, width: 34.0, height: 26.0 },
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
          hint: "There is a newspaper sheet nailed to the wall over by the looking glass. Somebody wanted it where people would see it."
        },

        /* 2 --------------------------------------------- NEW ORLEANS */
        {
          id: 'orleans', kind: 'evidence',
          label: 'A newspaper extra nailed to the wall',
          standAt: 20.0,
          box: { left: 23.4, top: 30.5, width: 3.4, height: 18.0 },
          tag: 'Impact 2 &middot; How a country makes a hero',
          heading: 'The Making of Andrew Jackson',
          doc: {
            type: 'news',
            paper: 'The National Intelligencer',
            dateline: 'Washington City &middot; Saturday, February 4, 1815',
            extra: 'Extra',
            head: 'Glorious News',
            sub: 'The enemy beaten before New Orleans &mdash; Genl. Jackson victorious &mdash; the British commander slain',
            lines: [
              'The express is this hour arrived. On the morning of the 8th ult. the enemy advanced in column upon our works below New Orleans and was repulsed in something under half an hour.',
              'The British loss: <strong>291</strong> killed, <strong>1,262</strong> wounded, <strong>484</strong> missing. Their Genl. Pakenham fell in front of the works.',
              'Our own loss: <strong>13</strong> killed, 39 wounded, 19 missing.',
              'The line was held by regulars, by the militia of Tennessee and Kentucky, by free men of colour, by the Baratarian sailors and by the citizens of the place, standing together behind one bank of earth.',
              'Let it be remembered that these were not soldiers of a standing army but <strong>farmers and tradesmen</strong>, and that they broke the troops who beat Bonaparte.',
              'Of Genl. <strong>Andrew Jackson</strong> it is enough to say that he found the city defenceless and has given it back to the nation entire.'
            ],
            toast: 'Toasts were drunk last evening at Davis&rsquo;s: <em>&ldquo;The Hero of New Orleans &mdash; he has redeemed the year.&rdquo;</em>',
            docket: 'Printer&rsquo;s proof. Set in haste, 4 Feby. 1815. <em>Struck off 2,000 and sold out by noon.</em>',
            plain: [
              '<strong>Newspaper extra. Washington, February 4, 1815.</strong>',
              'The rider has just arrived. On January 8th the British marched on our defences outside New Orleans and were driven back in under half an hour.',
              'British losses: <strong>291 killed, 1,262 wounded, 484 missing</strong> &mdash; about 2,000 men. Their commander, General Pakenham, was killed.',
              'American losses: <strong>13 killed, 39 wounded, 19 missing</strong> &mdash; about 70.',
              'The line was held by regular soldiers, Tennessee and Kentucky volunteers, free Black men, local pirates and ordinary townspeople, all behind one wall of dirt.',
              'Remember: these were <strong>farmers and shopkeepers</strong>, not a professional army &mdash; and they beat the troops who had defeated Napoleon.',
              'As for General <strong>Andrew Jackson</strong>: he found the city undefended and has handed it back whole.',
              '<em>A toast last night: &ldquo;The Hero of New Orleans &mdash; he has redeemed the year.&rdquo;</em>'
            ]
          },
          found: "This is your own paper's printer's proof, pulled the hour the express rider got in. Two thousand copies were struck off and sold out by noon, and every other paper in the country reprinted it within the month. This sheet is not a record of what Jackson did. It is the thing that <em>made</em> him.",
          quote: "&ldquo;The Hero of New Orleans &mdash; he has redeemed the year.&rdquo;",
          body: [
            "Look at what the country had to show for three years of war. Three failed invasions of Canada. A navy of sixteen ships against hundreds. The Capitol and the President's House burned. Then, on January 8, 1815, Andrew Jackson's army broke a British attack outside New Orleans in half an hour, losing about 70 men against roughly 2,000.",
            "Two things turned that into something bigger. First, <strong>the news arrived in the wrong order.</strong> Word of the victory reached the east coast in the first week of February. Word that the war had already ended &mdash; the treaty was signed in Europe two weeks <em>before</em> the battle &mdash; did not arrive until about ten days later. So for ten days Americans believed they had won the war by winning this battle.",
            "Second, <strong>newspapers like this one did the rest.</strong> They printed it, reprinted it, and put a name on it. Not the army: a man. Farmers and shopkeepers had beaten the troops who defeated Napoleon, and Andrew Jackson had led them.",
            "It was not true that the battle won the war. It did not change one word of the treaty. But people remember how a story ends, and this is how this one ended. Jackson became <strong>&ldquo;Old Hickory,&rdquo;</strong> the most famous man in America &mdash; and thirteen years later, President."
          ],
          record: "Making a hero &mdash; Jackson's victory at New Orleans (January 8, 1815) came two weeks AFTER the peace treaty was signed, but news of the win reached America before news of the peace. Newspapers turned it into proof that America had won the war, and turned Jackson into a national hero. He was elected President in 1828.",
          hint: "Through the arch, on what is left of the cabinet table, a map has been left unrolled."
        },

        /* 3 --------------------------------------- NATIVE DISPLACEMENT */
        {
          id: 'nations', kind: 'evidence',
          label: 'A map unrolled on the collapsed cabinet table',
          standAt: 67.5,
          box: { left: 60.8, top: 56.0, width: 3.0, height: 7.5 },
          tag: 'Impact 3 &middot; Native nations lost the most',
          heading: 'A Map of the Cessions',
          doc: {
            type: 'map',
            head: 'War Department &middot; Lands ceded by treaty',
            toggleOff: 'Show 1815 ›',
            toggleOn: '‹ Show 1811',
            layers: `
              <!-- west of the Mississippi: unchanged in both years -->
              <path d="M43 44 L232 44 L258 60 L264 212 L271 284 L253 278 L238 281 L217 321 L202 303 L189 276 L176 286 L166 269 L155 252 L143 258 L124 258 L99 243 L83 243 L75 225 L60 219 L50 189 L36 148 L37 78 L32 51 Z" fill="#7d9457" opacity="0.85"/>

              <g class="map-1811">
                <path d="M266 58 q34 -4 40 18 q2 26 -8 40 q-24 8 -34 -12 q-6 -28 2 -46 z" fill="#7d9457" opacity="0.85"/>
                <path d="M282 132 q28 -8 36 10 q4 26 -8 40 q-24 6 -32 -12 q-4 -24 4 -38 z" fill="#7d9457" opacity="0.85"/>
                <path d="M288 234 q30 -10 40 8 q4 20 -4 32 q-24 8 -36 -8 q-6 -20 0 -32 z" fill="#7d9457" opacity="0.85"/>
                <path d="M316 276 q14 -4 16 12 q2 26 -4 44 q-12 6 -16 -12 q-4 -26 4 -44 z" fill="#7d9457" opacity="0.85"/>
                <text class="map-year" x="34" y="34">1811</text>
                <line x1="300" y1="336" x2="308" y2="262" stroke="#5a5146" stroke-width="1.2"/>
                <text class="map-label-sm" x="268" y="350">Creek, Cherokee, Choctaw</text>
                <line x1="196" y1="336" x2="292" y2="158" stroke="#5a5146" stroke-width="1.2"/>
                <text class="map-label-sm" x="146" y="350">Tecumseh&#8217;s alliance</text>
              </g>

              <g class="map-1815">
                <!-- everything held in 1811, hatched: this is the land itself -->
                <path d="M266 58 q34 -4 40 18 q2 26 -8 40 q-24 8 -34 -12 q-6 -28 2 -46 z" fill="url(#lost)"/>
                <path d="M282 132 q28 -8 36 10 q4 26 -8 40 q-24 6 -32 -12 q-4 -24 4 -38 z" fill="url(#lost)"/>
                <path d="M288 234 q30 -10 40 8 q4 20 -4 32 q-24 8 -36 -8 q-6 -20 0 -32 z" fill="url(#lost)"/>
                <!-- what survives, drawn back on top -->
                <path d="M270 64 q26 -2 28 16 q2 20 -8 30 q-18 4 -24 -12 q-2 -22 4 -34 z" fill="#7d9457" opacity="0.85"/>
                <path d="M292 140 q16 -6 18 8 q2 18 -6 26 q-14 4 -16 -10 q-2 -16 4 -24 z" fill="#7d9457" opacity="0.85"/>
                <path d="M310 236 q16 -4 18 8 q2 18 -4 28 q-12 6 -16 -8 q-2 -18 2 -28 z" fill="#7d9457" opacity="0.85"/>
                <path d="M316 276 q14 -4 16 12 q2 26 -4 44 q-12 6 -16 -12 q-4 -26 4 -44 z" fill="#7d9457" opacity="0.85"/>
                <!-- the 1811 outline kept as a dashed ghost, so the gap is
                     visible as a gap rather than as a smaller shape -->
                <g fill="none" stroke="#8e2b22" stroke-width="1.8" stroke-dasharray="5 4" opacity="0.9">
                  <path d="M266 58 q34 -4 40 18 q2 26 -8 40 q-24 8 -34 -12 q-6 -28 2 -46 z"/>
                  <path d="M282 132 q28 -8 36 10 q4 26 -8 40 q-24 6 -32 -12 q-4 -24 4 -38 z"/>
                  <path d="M288 234 q30 -10 40 8 q4 20 -4 32 q-24 8 -36 -8 q-6 -20 0 -32 z"/>
                </g>
                <text class="map-year" x="34" y="34">1815</text>
                <line x1="248" y1="322" x2="296" y2="252" stroke="#8e2b22" stroke-width="1.4"/>
                <text class="map-figure" x="120" y="330">23,000,000</text>
                <text class="map-label-sm" x="120" y="345">acres taken at Fort Jackson alone</text>
                <line x1="360" y1="300" x2="322" y2="252" stroke="#5a5146" stroke-width="1.2"/>
                <text class="map-label-sm" x="332" y="314">what is left</text>
                <line x1="212" y1="150" x2="278" y2="150" stroke="#8e2b22" stroke-width="1.2"/>
                <text class="map-label-sm" x="150" y="146">alliance</text>
                <text class="map-label-sm" x="150" y="159">broken up</text>
              </g>`,
            legend: `
              <div class="map-cap-a">
                <p class="map-key"><i style="background:#7d9457"></i>Land held by Native nations in 1811.</p>
              </div>
              <div class="map-cap-b">
                <p class="map-key"><i class="key-lost"></i><span><strong>Signed away</strong> between 1811 and this spring. The dashed line is where the boundary used to run.</span></p>
                <p class="map-key"><i style="background:#7d9457"></i>What is left.</p>
              </div>`,
            note: 'Genl. Jackson took this land from the Creeks who <em>fought beside him</em>, the same as from those who fought against him. He said they ought to have stopped it.',
            docket: 'Recd. War Dept. 4 Apl. 1815. Referred to the Secy. of War. <em>No answer sent.</em>'
          },
          quote: "Twenty-three million acres, signed away in a single treaty.",
          body: [
            "Tecumseh was killed in battle in October 1813. Without him, and without British guns, the alliance he had spent years building fell apart.",
            "In the South, the war ran alongside a second war against the Creek Nation. When that ended, Andrew Jackson wrote the peace terms himself. The <strong>Treaty of Fort Jackson</strong>, August 1814, took <strong>23 million acres</strong> &mdash; most of what is now Alabama, plus the Creek land in Georgia.",
            "Here is the part students should sit with. Jackson took that land from the Creeks who had fought <em>on his side</em> as well as from the ones who had fought against him. When his Creek allies pointed that out, he told them they should have stopped the war from starting.",
            "The peace treaty with Britain did mention Native nations. <strong>Article 9</strong> said the United States would give back all the land and rights they had held in 1811. It never happened. Nobody could force the United States to keep that promise, and nobody tried. Britain had spent years encouraging Native resistance and now simply stopped. Native nations east of the Mississippi had lost the one outside power with any reason to help them, and settlement pushed west faster than ever."
          ],
          record: "Native nations &mdash; they lost the most. Tecumseh died in 1813 and his alliance fell apart. The Treaty of Fort Jackson took 23 million acres from the Creek Nation in 1814, including from Creeks who had fought for the United States. Article 9 of the peace treaty promised to return Native land held in 1811, and that promise was never kept.",
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
