/*******************************************************

AutoSuggest - a javascript automatic text input completion component
Copyright (C) 2005 Joe Kepley, The Sling & Rock Design Group, Inc.

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA

*******************************************************

Please send any useful modifications or improvements via 
email to joekepley at yahoo (dot) com
http://gadgetopia.com/post/3773

*******************************************************/

/********************************************************
 The AutoSuggest class binds to a text input field
 and creates an automatic suggestion dropdown in the style
 of the "IntelliSense" and "AutoComplete" features of some
 desktop apps. 
 Parameters: 
 elem: A DOM element for an INPUT TYPE="text" form field
 suggestions: an array of strings to be used as suggestions
              when someone's typing.

 Example usage: 
 
 Please enter the name of a fruit.
 <input type="text" id="fruit" name="fruit" />
 <script language="Javascript">
 var fruits=new Array("apple","orange","grape","kiwi","cumquat","banana");
 new AutoSuggest(document.getElementById("fruit",fruits));
 </script>

 Requirements: 

 Unfortunately the AutoSuggest class doesn't seem to work 
 well with dynamically-created DIVs. So, somewhere in your 
 HTML, you'll need to add this: 
 <div id="autosuggest"><ul></ul></div>

 Here's a default set of style rules that you'll also want to 
 add to your CSS: 

 .suggestion_list
 {
 background: white;
 border: 1px solid;
 padding: 4px;
 }

 .suggestion_list ul
 {
 padding: 0;
 margin: 0;
 list-style-type: none;
 }

 .suggestion_list a
 {
 text-decoration: none;
 color: navy;
 }

 .suggestion_list .selected
 {
 background: navy;
 color: white;
 }

 .suggestion_list .selected a
 {
 color: white;
 }

 #autosuggest
 {
 display: none;
 }
*********************************************************/

var Suggestions = new Array("Aboshan, Cephalid Emperor","Adamaro, First to Desire","Adun Oakenshield","Agrus Kos, Wojek Veteran","Akroma, Angel of Fury","Akroma, Angel of Wrath","Akuta, Born of Ash","Alesha, Who Smiles at Death","Alexi, Zephyr Mage","Alhammarret, High Arbiter","Ambassador Laquatus","Anafenza, Kin-Tree Spirit","Anafenza, the Foremost","Anax and Cymede","Angus Mackenzie","Animar, Soul of Elements","Anowon, the Ruin Sage","Anthousa, Setessan Hero","Anya, Merciless Angel","Arashi, the Sky Asunder","Arcades Sabboth","Arcanis the Omnipotent","Arcum Dagsson","Arjun, the Shifting Flame","Ascendant Evincar","Ashling, the Extinguisher","Ashling the Pilgrim","Asmira, Holy Avenger","Atalya, Samite Master","Atarka, World Render","Athreos, God of Passage","Atogatog","Aurelia, the Warleader","Autumn Willow","Avacyn, Angel of Hope","Axelrod Gunnarson","Ayesha Tanaka","Ayumi, the Last Visitor","Azami, Lady of Scrolls","Azusa, Lost but Seeking","Balthor the Defiled","Balthor the Stout","Barktooth Warbeard","Baron Sengir","Barrin, Master Wizard","Bartel Runeaxe","Baru, Fist of Krosa","Basandra, Battle Seraph","Ben-Ben, Akki Hermit","Bladewing the Risen","Blind Seer","Borborygmos Enraged","Borborygmos","Boris Devilboon","Bosh, Iron Golem","Bounteous Kirin","Brago, King Eternal","Braids, Cabal Minion","Braids, Conjurer Adept","Brigid, Hero of Kinsbaile","Brimaz, King of Oreskos","Brion Stoutarm","Brothers Yamazaki","Bruna, Light of Alabaster","Cabal Patriarch","Cao Cao, Lord of Wei","Cao Ren, Wei Commander","Captain Sisay","Celestial Kirin","Chainer, Dementia Master","Chandler","Chandra, Fire of Kaladesh","Child of Alara","Chisei, Heart of Oceans","Cho-Manno, Revolutionary","Chorus of the Conclave","Chromium","Circu, Dimir Lobotomist","Cloudhoof Kirin","Commander Eesha","Commander Greven il-Vec","Cromat","Crosis, the Purger","Crovax, Ascendant Hero","Crovax the Cursed","Daghatar the Adamant","Dakkon Blackblade","Damia, Sage of Stone","Darien, King of Kjeldor","Darigaaz, the Igniter","Daughter of Autumn","Daxos of Meletis","Daxos the Returned","Derevi, Empyrial Tactician","Diaochan, Artful Beauty","Dong Zhou, the Tyrant","Doran, the Siege Tower","Dosan the Falling Leaf","Dragonlord Atarka","Dragonlord Dromoka","Dragonlord Kolaghan","Dragonlord Ojutai","Dragonlord Silumgar","Dralnu, Lich Lord","Drana, Kalastria Bloodchief","Drana, Liberator of Malakir","Dromar, the Banisher","Dromoka, the Eternal","Dwynen, Gilt-Leaf Daen","Edric, Spymaster of Trest","Eight-and-a-Half-Tails","Eladamri, Lord of Leaves","Elesh Norn, Grand Cenobite","Emmara Tandris","Empress Galina","Emrakul, the Aeons Torn","Endrek Sahr, Master Breeder","Ephara, God of the Polis","Erayo, Soratami Ascendant","Erebos, God of the Dead","Eron the Relentless","Ertai, the Corrupted","Ertai, Wizard Adept","Exava, Rakdos Blood Witch","Experiment Kraj","Ezuri, Claw of Progress","Ezuri, Renegade Leader","Feldon of the Third Path","Frankie Peanuts","Fumiko the Lowblood","Gabriel Angelfire","Gaddock Teeg","Gahiji, Honored One","Gallowbraid","Garza Zol, Plague Queen","Geist of Saint Traft","General Jarkeld","Gerrard Capashen","Geth, Lord of the Vault","Ghave, Guru of Spores","Ghost Council of Orzhova","Ghoulcaller Gisa","Gisela, Blade of Goldnight","Glissa Sunseeker","Glissa, the Traitor","Godo, Bandit Warlord","Gosta Dirk","Grand Arbiter Augustin IV","Grandmother Sengir","Greel, Mind Raker","Grenzo, Dungeon Warden","Grimgrin, Corpse-Born","Griselbrand","Guan Yu, Sainted Warrior","Gwafa Hazid, Profiteer","Gwendlyn Di Corci","Haakon, Stromgald Scourge","Hakim, Loreweaver","Halfdane","Hanna, Ship's Navigator","Hazduhr the Abbot","Hazezon Tamar","Heartless Hidetsugu","Heidar, Rimewind Master","Heliod, God of the Sun","He Who Hungers","Higure, the Still Wind","Hikari, Twilight Guardian","Hisoka, Minamo Sensei","Hivis of the Scale","Hixus, Prison Warden","Hokori, Dust Drinker","Homura, Human Ascendant","Horde of Notions","Horobi, Death's Wail","Huang Zhong, Shu General","Hua Tuo, Honored Physician","Hunding Gjornersen","Hythonia the Cruel","Ib Halfheart, Goblin Tactician","Ihsan's Shade","Iizuka the Ruthless","Iname as One","Iname, Death Aspect","Iname, Life Aspect","Infernal Kirin","Ink-Eyes, Servant of Oni","Intet, the Dreamer","Iona, Shield of Emeria","Irini Sengir","Iroas, God of Victory","Isamaru, Hound of Konda","Isao, Enlightened Bushi","Ishi-Ishi, Akki Crackshot","Isperia, Supreme Judge","Isperia the Inscrutable","Ith, High Arcanist","Iwamori of the Open Fist","Ixidor, Reality Sculptor","Jace, Vryn's Prodigy","Jacques le Vert","Jarad, Golgari Lich Lord","Jareth, Leonine Titan","Jasmine Boreal","Jaya Ballard, Task Mage","Jazal Goldmane","Jedit Ojanen","Jedit Ojanen of Efrava","Jeleva, Nephalia's Scourge","Jenara, Asura of War","Jerrard of the Closed Fist","Jeska, Warrior Adept","Jhoira of the Ghitu","Jin-Gitaxias, Core Augur","Jiwari, the Earth Aflame","Johan","Johnny, Combo Player","Jolrael, Empress of Beasts","Jor Kadeen, the Prevailer","Joven","Jugan, the Rising Star","Kaalia of the Vast","Kaervek the Merciless","Kagemaro, First to Suffer","Kaho, Minamo Historian","Kalemne, Disciple of Iroas","Kalitas, Bloodchief of Ghet","Kamahl, Fist of Krosa","Kamahl, Pit Fighter","Kami of the Crescent Moon","Kangee, Aerie Keeper","Karador, Ghost Chieftain","Karametra, God of Harvests","Karlov of the Ghost Council","Karn, Silver Golem","Karona, False God","Karrthus, Tyrant of Jund","Kaseto, Orochi Archmage","Kasimir the Lone Wolf","Kataki, War's Wage","Kaysa","Kazuul, Tyrant of the Cliffs","Keiga, the Tide Star","Kei Takahashi","Kemba, Kha Regent","Kentaro, the Smiling Cat","Keranos, God of Storms","Kiki-Jiki, Mirror Breaker","Kiku, Night's Flower","King Macar, the Gold-Cursed","Kira, Great Glass-Spinner","Kiyomaro, First to Stand","Kodama of the Center Tree","Kodama of the North Tree","Kodama of the South Tree","Kokusho, the Evening Star","Kolaghan, the Storm's Fury","Konda, Lord of Eiganjo","Kongming, Sleeping Dragon","Korlash, Heir to Blackblade","Kothophed, Soul Hoarder","Kozilek, Butcher of Truth","Kresh the Bloodbraided","Kruphix, God of Horizons","Kumano, Master Yamabushi","Kuon, Ogre Ascendant","Kuro, Pitlord","Kyoki, Sanity's Eclipse","Kytheon, Hero of Akros","Lady Caleria","Lady Evangela","Lady Orca","Lady Sun","Lady Zhurong, Warrior Queen","Latulla, Keldon Overseer","Lavinia of the Tenth","Lazav, Dimir Mastermind","Lieutenant Kirtar","Liliana, Heretical Healer","Lim-Dûl the Necromancer","Linessa, Zephyr Mage","Lin Sivvi, Defiant Hero","Linvala, Keeper of Silence","Liu Bei, Lord of Shu","Livonya Silone","Llawan, Cephalid Empress","Lord Magnus","Lord of Tresserhorn","Lorthos, the Tidemaker","Lovisa Coldeyes","Lu Bu, Master-at-Arms","Lu Meng, Wu General","Lu Su, Wu Advisor","Lu Xun, Scholar General","Lyzolda, the Blood Witch","Ma Chao, Western Warrior","Maga, Traitor to Mortals","Mageta the Lion","Major Teroh","Malfegor","Mangara of Corondor","Mannichi, the Fevered Dream","Maralen of the Mornsong","Marath, Will of the Wild","Maraxus of Keld","Marchesa, the Black Rose","Marhault Elsdragon","Marrow-Gnawer","Márton Stromgald","Masako the Humorless","Masumaro, First to Live","Mayael the Anima","Mazirek, Kraul Death Priest","Medomai the Ageless","Melek, Izzet Paragon","Melira, Sylvok Outcast","Meloku the Clouded Mirror","Memnarch","Meng Huo, Barbarian King","Meren of Clan Nel Toth","Merieke Ri Berit","Michiko Konda, Truth Seeker","Mikaeus, the Lunarch","Mikaeus, the Unhallowed","Mirko Vosk, Mind Drinker","Mirri, Cat Warrior","Mirri the Cursed","Mishra, Artificer Prodigy","Mistform Ultimus","Mizzix of the Izmagnus","Mogis, God of Slaughter","Molimo, Maro-Sorcerer","Momir Vig, Simic Visionary","Morinfen","Multani, Maro-Sorcerer","Munda, Ambush Leader","Muzzio, Visionary Architect","Myojin of Cleansing Fire","Myojin of Infinite Rage","Myojin of Life's Web","Myojin of Night's Reach","Myojin of Seeing Winds","Nagao, Bound by Honor","Narset, Enlightened Master","Nath of the Gilt-Leaf","Nebuchadnezzar","Nekusar, the Mindrazer","Nemata, Grove Guardian","Nicol Bolas","Nin, the Pain Artist","Nissa, Vastwood Seer","Niv-Mizzet, Dracogenius","Niv-Mizzet, the Firemind","Norin the Wary","Noyan Dar, Roil Shaper","Numot, the Devastator","Nylea, God of the Hunt","Ob Nixilis, the Fallen","Obzedat, Ghost Council","Ojutai, Soul of Winter","Olivia Voldaren","Oloro, Ageless Ascetic","Omnath, Locus of Mana","Omnath, Locus of Rage","Oona, Queen of the Fae","Opal-Eye, Konda's Yojimbo","Orim, Samite Healer","Oriss, Samite Guardian","Oros, the Avenger","Oyobi, Who Split the Heavens","Palladia-Mors","Pang Tong, Young Phoenix","Patron of the Akki","Patron of the Kitsune","Patron of the Moon","Patron of the Nezumi","Patron of the Orochi","Pavel Maliki","Phage the Untouchable","Pharika, God of Affliction","Phelddagrif","Phenax, God of Deception","Pia and Kiran Nalaar","Pianna, Nomad Captain","Polukranos, World Eater","Prime Speaker Zegana","Princess Lucrezia","Progenitus","Prossh, Skyraider of Kher","Purphoros, God of the Forge","Purraj of Urborg","Radha, Heir to Keld","Radiant, Archangel","Rafiq of the Many","Ragnar","Rakdos, Lord of Riots","Rakdos the Defiler","Rakka Mar","Raksha Golden Cub","Ramirez DePietro","Ramses Overdark","Rashida Scalebane","Rashka the Slayer","Rasputin Dreamweaver","Rayne, Academy Chancellor","Razia, Boros Archangel","Reaper King","Reki, the History of Kamigawa","Reveka, Wizard Savant","Reya Dawnbringer","Rhys the Exiled","Rhys the Redeemed","Richard Garfield, Ph.D.","Riku of Two Reflections","Rith, the Awakener","Riven Turnbull","Rofellos, Llanowar Emissary","Rohgahh of Kher Keep","Roon of the Hidden Realm","Rorix Bladewing","Rosheen Meanderer","Rubinia Soulsinger","Ruhan of the Fomori","Rune-Tail, Kitsune Ascendant","Ruric Thar, the Unbowed","Ryusei, the Falling Star","Sachi, Daughter of Seshiro","Saffi Eriksdotter","Sakashima the Impostor","Sakiko, Mother of Summer","Sapling of Colfenor","Sasaya, Orochi Ascendant","Savra, Queen of the Golgari","Scion of the Ur-Dragon","Sedris, the Traitor King","Seizan, Perverter of Truth","Sekki, Seasons' Guide","Sek'Kuar, Deathkeeper","Selenia, Dark Angel","Selvala, Explorer Returned","Sensei Golden-Tail","Sen Triplets","Seshiro the Anointed","Seton, Krosan Protector","Sharuum the Hegemon","Shattergang Brothers","Shauku, Endbringer","Sheoldred, Whispering One","Shimatsu the Bloodcloaked","Shirei, Shizo's Caretaker","Shisato, Whispering Hunter","Shizuko, Caller of Autumn","Shu Yun, the Silent Tempest","Sidar Jabari","Sidisi, Brood Tyrant","Sidisi, Undead Vizier","Sigarda, Host of Herons","Silumgar, the Drifting Death","Silvos, Rogue Elemental","Sima Yi, Wei Field Marshal","Sir Shandlar of Eberyn","Sisters of Stone Death","Sivitri Scarzam","Skeleton Ship","Skithiryx, the Blight Dragon","Skullbriar, the Walking Grave","Skyfire Kirin","Sliver Legion","Sliver Overlord","Sliver Queen","Slobad, Goblin Tinkerer","Sol'kanar the Swamp King","Soramaro, First to Dream","Soraya the Falconer","Sosuke, Son of Seshiro","Spirit of the Night","Squee, Goblin Nabob","Stangg","Starke of Rath","Stitcher Geralf","Stonebrow, Krosan Hero","Sunastian Falconer","Sun Ce, Young Conquerer","Sun Quan, Lord of Wu","Surrak Dragonclaw","Surrak, the Hunt Caller","Sygg, River Cutthroat","Sygg, River Guide","Szadek, Lord of Secrets","Tahngarth, Talruum Hero","Tajic, Blade of the Legion","Takeno, Samurai General","Taniwha","Tariel, Reckoner of Souls","Tarox Bladewing","Tasigur, the Golden Fang","Teferi, Mage of Zhalfir","Telim'Tor","Teneb, the Harvester","Tetsuo Umezawa","Teysa, Envoy of Ghosts","Teysa, Orzhov Scion","Thada Adel, Acquisitor","Thalia, Guardian of Thraben","Thassa, God of the Sea","The Lady of the Mountain","Thelon of Havenwood","The Mimeoplasm","The Unspeakable","Thraximundar","Thriss, Nantuko Primus","Thrun, the Last Troll","Tibor and Lumia","Titania, Protector of Argoth","Tivadar of Thorn","Tobias Andrion","Tolsimir Wolfblood","Tomorrow, Azami's Familiar","Torsten Von Ursus","Tor Wauki","Toshiro Umezawa","Treva, the Renewer","Triad of Fates","Tromokratis","Trostani, Selesnya's Voice","Tsabo Tavoc","Tuknir Deathlock","Tuktuk the Explorer","Tymaret, the Murder King","Ulamog, the Ceaseless Hunger","Ulamog, the Infinite Gyre","Ulasht, the Hate Seed","Urabrask the Hidden","Ur-Drago","Uril, the Miststalker","Uyo, Silent Prophet","Vaevictis Asmadi","Varolz, the Scar-Striped","Veldrane of Sengir","Vendilion Clique","Venser, Shaper Savant","Verdeloth the Ancient","Vhati il-Dal","Visara the Dreadful","Vish Kal, Blood Arbiter","Volrath the Fallen","Vorel of the Hull Clade","Vorinclex, Voice of Hunger","Vorosh, the Hunter","Withengar Unbound","Wort, Boggart Auntie","Wort, the Raidmother","Wrexial, the Risen Deep","Wydwen, the Biting Gale","Xenagos, God of Revels","Xiahou Dun, the One-Eyed","Xira Arien","Xun Yu, Wei Advisor","Yasova Dragonclaw","Yomiji, Who Bars the Way","Yosei, the Morning Star","Yuan Shao, the Indecisive","Yukora, the Prisoner","Zada, Hedron Grinder","Zedruu the Greathearted","Zhang Fei, Fierce Warrior","Zhang He, Wei General","Zhang Liao, Hero of Hefei","Zhao Zilong, Tiger General","Zhou Yu, Chief Commander","Zhuge Jin, Wu Strategist","Zirilan of the Claw","Zo-Zu the Punisher","Zuberi, Golden Feather","Zuo Ci, the Mocking Sage","Zurgo Bellstriker","Zurgo Helmsmasher","Zur the Enchanter");
var Element

function AutoSuggest(elem)
{
	//The 'me' variable allow you to access the AutoSuggest object
	//from the elem's event handlers defined below.
	var me = this;

	//A reference to the element we're binding the list to.
	Element = elem;

	//Array to store a subset of eligible suggestions that match the user's input
	this.eligible = new Array();

	//The text input by the user.
	this.inputText = null;

	//A pointer to the index of the highlighted eligible item. -1 means nothing highlighted.
	this.highlighted = -1;

	//A div to use to create the dropdown.
	this.div = document.getElementById("autosuggest");


	//Do you want to remember what keycode means what? Me neither.
	var TAB = 9;
	var ENTER = 13;
	var SHIFT = 16;
	var ESC = 27;
	var KEYUP = 38;
	var KEYDN = 40;
	
	/********************************************************
	onkeydown event handler for the input elem.
	Tab key = use the highlighted suggestion, if there is one.
	Esc key = get rid of the autosuggest dropdown
	Up/down arrows = Move the highlight up and down in the suggestions.
	********************************************************/
	Element.onkeydown = function(ev)
	{
		var key = me.getKeyCode(ev);

		switch(key)
		{
			case TAB:
				me.useSuggestion();
				break;

			case ENTER:
				if(me.highlighted > -1)
				{
					me.useSuggestion(); 
					return false; 
				}
				else
				{
					Element.form.OK.click();
				}
				break;

			case ESC:
				me.hideDiv();
				break;

			case KEYUP:
				if (me.highlighted > 0)
				{
					me.highlighted--;
				}
				me.changeHighlight(key);
				break;

			case KEYDN:
				if (me.highlighted < (me.eligible.length - 1))
				{
					me.highlighted++;
				}
				me.changeHighlight(key);
				break;
		}
	};

	/********************************************************
	onkeyup handler for the elem
	If the text is of sufficient length, and has been changed, 
	then display a list of eligible suggestions.
	********************************************************/
	Element.onkeyup = function(ev) 
	{
		var key = me.getKeyCode(ev);
		
		switch(key)
		{
			//The control keys were already handled by onkeydown, so do nothing.
			case TAB:
			case ENTER:
			case SHIFT:
			case ESC:
			case KEYUP:
			case KEYDN:
				return;

			default:

				/* When the general's name is modified, we immediately make the 
				 * OK button insensitive. We'll enable it again when a suggestion 
				 * is accepted. */
				Element.form.OK.className = 'ButtonDisabled';

				if (this.value != me.inputText && this.value.length > 0)
				{
					me.inputText = this.value;
					me.getEligible();
					me.createDiv();
					me.positionDiv();
					me.showDiv();
				}
				else
				{
					me.hideDiv();
				}
		}
	};


	/********************************************************
	Insert the highlighted suggestion into the input box, and 
	remove the suggestion dropdown.
	********************************************************/
	this.useSuggestion = function()
	{
		if (this.highlighted > -1)
		{
			Element.value = this.eligible[this.highlighted];
			
			/* If the player's name is not empty, we enable the OK button. */
			if(Element.form.name.value != "")			
				Element.form.OK.className = 'ButtonBlue';

			this.hideDiv();
			Element.form.avatar.src = "Generals/" + Element.value + ".jpg";
			GeneralSelected = 1;

			//It's impossible to cancel the Tab key's default behavior. 
			//So this undoes it by moving the focus back to our field right after
			//the event completes.
			setTimeout("document.getElementById('" + Element.id + "').focus()",0);
		}
	};

	/********************************************************
	Display the dropdown. Pretty straightforward.
	********************************************************/
	this.showDiv = function()
	{
		if(this.eligible.length > 0)
		{
			this.div.style.display = 'block';
		} 
		else 
		{
			this.div.style.display = 'none'; 
			this.highlighted = -1; 
		}
	};

	/********************************************************
	Hide the dropdown and clear any highlight.
	********************************************************/
	this.hideDiv = function()
	{
		this.div.style.display = 'none';
		this.highlighted = -1;
	};

	/********************************************************
	Modify the HTML in the dropdown to move the highlight.
	********************************************************/
	this.changeHighlight = function()
	{
		var lis = this.div.getElementsByTagName('LI');
		for (i in lis)
		{
			var li = lis[i];

			if (this.highlighted == i)
			{
				li.className = "selected";
			}
			else
			{
				li.className = "";
			}
		}
	};

	/********************************************************
	Position the dropdown div below the input text field.
	********************************************************/
	this.positionDiv = function()
	{
		var el = Element;
		var x = 0;
		var y = el.offsetHeight;
	
		//Walk up the DOM and add up all of the offset positions.
		while (el.offsetParent && el.tagName.toUpperCase() != 'BODY')
		{
			x += el.offsetLeft;
			y += el.offsetTop;
			el = el.offsetParent;
		}

		this.div.style.left = x + 'px';
		this.div.style.top = y + 'px';
	};

	/********************************************************
	Build the HTML for the dropdown div
	********************************************************/
	this.createDiv = function()
	{
		var ul = document.createElement('ul');
	
		//Create an array of LI's for the words.
		for (i in this.eligible)
		{
			var word = this.eligible[i];
	
			var li = document.createElement('li');
			var a = document.createElement('a');
			a.href="javascript:false";
			a.innerHTML = word;
			li.appendChild(a);
	
			if (me.highlighted == i)
			{
				li.className = "selected";
			}
	
			ul.appendChild(li);
		}
	
		this.div.replaceChild(ul,this.div.childNodes[0]);
	

		/********************************************************
		mouseover handler for the dropdown ul
		move the highlighted suggestion with the mouse
		********************************************************/
		ul.onmouseover = function(ev)
		{
			//Walk up from target until you find the LI.
			var target = me.getEventSource(ev);
			while (target.parentNode && target.tagName.toUpperCase() != 'LI')
			{
				target = target.parentNode;
			}
		
			var lis = me.div.getElementsByTagName('LI');
			
	
			for (i in lis)
			{
				var li = lis[i];
				if(li == target)
				{
					me.highlighted = i;
					break;
				}
			}
			me.changeHighlight();
		};

		/********************************************************
		click handler for the dropdown ul
		insert the clicked suggestion into the input
		********************************************************/
		ul.onclick = function(ev)
		{
			me.useSuggestion();
			me.hideDiv();
			me.cancelEvent(ev);
			return false;
		};
	
		this.div.className="suggestion_list";
		this.div.style.position = 'absolute';

	};

	/********************************************************
	determine which of the suggestions matches the input
	********************************************************/
	this.getEligible = function()
	{
		this.eligible = new Array();
		for (i in Suggestions) 
		{
			var suggestion = Suggestions[i];
			
			if(suggestion.toLowerCase().match(this.inputText.toLowerCase()) == this.inputText.toLowerCase())
			{
				this.eligible[this.eligible.length]=suggestion;
			}
		}
	};

	/********************************************************
	Helper function to determine the keycode pressed in a 
	browser-independent manner.
	********************************************************/
	this.getKeyCode = function(ev)
	{
		if(ev)
		{
			return ev.keyCode;
		}
		if(window.event)
		{
			return window.event.keyCode;
		}
	};

	/********************************************************
	Helper function to determine the event source element in a 
	browser-independent manner.
	********************************************************/
	this.getEventSource = function(ev)
	{
		if(ev)
		{
			return ev.target;
		}
	
		if(window.event)
		{
			return window.event.srcElement;
		}
	};

	/********************************************************
	Helper function to cancel an event in a 
	browser-independent manner.
	(Returning false helps too).
	********************************************************/
	this.cancelEvent = function(ev)
	{
		if(ev)
		{
			ev.preventDefault();
			ev.stopPropagation();
		}
		if(window.event)
		{
			window.event.returnValue = false;
		}
	}
}
