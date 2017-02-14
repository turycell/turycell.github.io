/* Let's store the first free ID in a global variable. As we delete players,
 * the div's are not removed from the DOM even after removeChild(), they're
 * just unlinked, and this would cause duplicate ID's. */

var next_id = 0;


function checkForm()
{
	var Name = document.getElementById("name");
	
	if((Name.value != "") && (GeneralSelected == 1))
	{
		document.getElementById("OK").className = 'ButtonBlue';
	}
	else
	{
		document.getElementById("OK").className = 'ButtonDisabled';
	}
}

function popMenu(Origin)
{
	/* Let's iterate through the players' array to retrieve the name and general associated to this entry. */
	var i = 0;
	var found = 0;
		
	while (!found)
	{
		if (Origin == "player" + PlayersArray[i].id)
		{
			found = 1;
		}
		else
		{
			i++;
		}
	}
	
	var Title = '<div style="margin: 10px; line-height: 25px;">Edit player</div>'
	var Inner = '<form style="margin: 10px; line-height: 25px; background: url(images/light.jpg) repeat top left; border-radius: 6px; box-shadow:inset 0px 0px 10px #000;"><img class="avatar" id="avatar" src="Generals/' + PlayersArray[i].general + '.jpg"><input type="text" class="text" name="name" id="edit-name" value="' + PlayersArray[i].name + '" placeholder="Player&apos;s name" autocomplete="off"/><input type="text" class="text" name="general" id="edit-general" value="' + PlayersArray[i].general + '" placeholder="General" autocomplete="off"/><div style="height: 70px;"><input type="button" class="ButtonBlue" name="OK" id="edit-OK" style="float: left;" value="Confirm" onclick=editPlayer(' + Origin + ')><input type="button" class="ButtonRed" name="Delete" id="edit-Delete" style="float: right;" value="Remove" onclick=removePlayer(' + Origin + ')></div></form>'
		
	DrawPopover(Title, Inner, "avatar" + PlayersArray[i].id);
	AutoSuggest(document.getElementById("edit-general"));
}

function addPlayer()
{
	var Name = document.getElementById("name").value;
	var General = document.getElementById("general").value;
	var Players = document.getElementById("players");
	
	/* If the button is disabled, do nothing. */
	if (document.getElementById("OK").className == 'ButtonDisabled')
		return;

	/* Let's find a free ID for this <div> */
	var id = next_id;
	next_id++;

	var newDiv = document.createElement("div");
	newDiv.className = "player";
	newDiv.innerHTML = '<div id=avatar' + id + '><img src="Generals/' + General + '.jpg"/><div><p>' + Name + '</p></div></div>'
	newDiv.id = "player" + id;
	
	Players.appendChild(newDiv);
	
	document.getElementById("player" + id).onclick=function(){
         popMenu(this.id);
	};

	RemovePopover();
	
	var Entry = new PlayerEntry(id, Name, General);
	PlayersArray.push(Entry);
	
	/* Reset the form */
	document.getElementById('name').value="";
	document.getElementById('general').value="";
	document.getElementById("OK").className = 'ButtonDisabled';
	document.getElementById("avatar").src = 'images/blank.jpg';
}

function removePlayer(Player)
{
	Player.style.MozTransform = 'scale(0)';
	Player.style.WebkitTransform = 'scale(0)';	

	var i = 0;
	
	while (Player.id != "player" + PlayersArray[i].id)
	{
		i++;
	}
	
	PlayersArray.splice(i, 1);
	
	RemovePopover();
	
	setTimeout(function()
	{
		document.getElementById('players').removeChild(Player);
	}, 300);
	
/*	if(document.getElementsByClassName("player").length % 4 == 1)
	{
		var Main = document.getElementById("main");
		currentH = Main.offsetHeight;
		currentH -= 138;
		currentM = -1 * currentH / 2;
		Main.style.height = currentH + "px";
		Main.style.marginTop = currentM + "px";
	}*/
}

function confirmRemoveAll(Origin)
{
	var Title = ''
	var Inner = '<input type="button" class="ButtonRed" id="Delete" value="Remove all players" style="position: static; width: 470px; margin: 10px; font-size:24px;" onclick="removeAllPlayers()"><input type="button" class="ButtonBlue" id="OK" value="No thanks!" style="position: static; width: 470px; margin-bottom: 10px; font-size:24px;" onclick="RemovePopover()">'
	
	DrawPopover(Title, Inner, Origin);
}

function removeAllPlayers()
{
	while (PlayersArray.length > 0)
	{
		Player = document.getElementById("player" + PlayersArray[0].id);
		
		Player.style.MozTransform = 'scale(0)';
		Player.style.WebkitTransform = 'scale(0)';
		
		PlayersArray.splice(0, 1);
	}
	
	setTimeout(function()
	{
		document.getElementById('players').innerHTML = "";
	}, 300);
	
	RemovePopover();
}

function editPlayer(Player)
{
	var Name = document.getElementById("edit-name").value;
	var General = document.getElementById("edit-general").value;
	var i = 0;
	
	/* If the button is disabled, do nothing. */
	if (document.getElementById("edit-OK").className == 'ButtonDisabled')
		return;
	
	while (Player.id != "player" + PlayersArray[i].id)
	{
		i++;
	}
	
	PlayersArray[i].name = Name;
	PlayersArray[i].general = General;
	
	document.getElementById("player" + PlayersArray[i].id).innerHTML = '<div id=avatar' + PlayersArray[i].id + '><img src="Generals/' + General + '.jpg"/><div><p>' + Name + '</p></div></div>'

	RemovePopover();
}

function hideDialog()
{
	document.getElementById('blanket').style.opacity = 0.0;
	document.getElementById('new').style.MozTransform = 'scale(0)';
	document.getElementById('new').style.WebkitTransform = 'scale(0)';
	setTimeout("document.getElementById('blanket').style.height = '0px'; document.getElementById('blanket').style.minHeight = '0px'", 300);
	
	/* Just in case the user closes the dialog with the suggestion list open. */
	document.getElementById("autosuggest").style.display = 'none';
	
}

function drawDialog()
{
	var Title = '<div style="margin: 10px; line-height: 25px;">Add player</div>'
	
	var Inner = '<form style="margin: 10px; line-height: 25px; background: url(images/light.jpg) repeat top left; border-radius: 6px; box-shadow:inset 0px 0px 10px #000;">' +
					'<img class="avatar" id="avatar" src="images/blank.jpg">' +
					'<input type="text" class="text" name="name" id="name" onkeyup="checkForm();" placeholder="Player&apos;s name" autocomplete="off"/>' +
					'<input type="text" class="text" name="general" id="general" onkeyup="checkForm();" placeholder="General" autocomplete="off"/>' +
					'<div id="autosuggest"><ul></ul></div>' +
					'<div style="height: 70px;">' +
						'<input type="button" class="ButtonDisabled" name="OK" id="OK" style="float: left;" value="Add player" onclick="addPlayer();">' +
						'<input type="button" class="ButtonRed" name="Delete" id="Delete" style="float: right;" value="Cancel" onclick="RemovePopover();">' +
					'</div>' +
				'</form>'
	
	
	DrawPopover(Title, Inner, "add");
	AutoSuggest(document.getElementById("general"));
}

function startGame()
{
	var playerList = "#";
	var i = 0;
	
	while (i < PlayersArray.length)
	{
		Player = document.getElementById("player" + PlayersArray[0].id);
		
		PlayerBox = document.createElement("div");
		PlayerBox.className = "box";
		PlayerBox.id = "box" + i;
		PlayerBox.onclick = adjustLife;
		
		PlayerImage = document.createElement("img");
		PlayerImage.className = "general";
		PlayerImage.src = "Generals/" + PlayersArray[i].general + ".jpg";
		
		PlayerName = document.createElement("div");
		PlayerName.className = "name";
		PlayerName.innerHTML = PlayersArray[i].name + '<meter max="40" class="bar" value=40></meter>'
		
		PlayerLife = document.createElement("div");
		PlayerLife.className = "number";
		PlayerLife.innerHTML ='40<div class="poison" id="poison">0</div>'
		
		PlayerBox.appendChild(PlayerImage);
		PlayerBox.appendChild(PlayerName);
		PlayerBox.appendChild(PlayerLife);
		
		document.body.appendChild(PlayerBox);
		
		//playerList += PlayersArray[i].name + "|";
		//playerList += PlayersArray[i].general + "$";
		
		i++;
	}
	document.getElementById('main').style.display = "none";
}
