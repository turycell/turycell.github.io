var Infect = 0;
var General = 0;
var ActivePlayer;

function wheel(event)
{
		var delta = 0;

		if (!event)
			/* For IE. */
			event = window.event;
		if (event.wheelDelta) { 
			/* IE/Opera. */
			delta = event.wheelDelta/120;
		} else if (event.detail) {
			/* In Mozilla, sign of delta is different than in IE.
			 * Also, delta is multiple of 3. */
			delta = -event.detail/3;
		}

		/* If delta is nonzero, handle it.
		 * Basically, delta is now positive if wheel was scrolled up,
		 * and negative, if wheel was scrolled down. */
		if (delta < 0)
		{
			var player = event.currentTarget;
			var currentLife = Number(player.getElementsByClassName("number")[0].innerHTML.split('<')[0]);
			var currentPoison = Number(player.getElementsByClassName("poison")[0].innerHTML);

			currentLife--;

			player.getElementsByClassName("number")[0].innerHTML = currentLife + '<div class="poison" id="poison">' + currentPoison + '</div>'
			player.getElementsByClassName("bar")[0].value = currentLife;
			if (currentPoison > 0)
			{
				player.getElementsByClassName("poison")[0].style.display = "block";
			}		
		}

		if (delta > 0)
		{
			var player = event.currentTarget;
			var currentLife = Number(player.getElementsByClassName("number")[0].innerHTML.split('<')[0]);
			var currentPoison = Number(player.getElementsByClassName("poison")[0].innerHTML);

			currentLife++;

			player.getElementsByClassName("number")[0].innerHTML = currentLife + '<div class="poison" id="poison">' + currentPoison + '</div>'
			player.getElementsByClassName("bar")[0].value = currentLife;
			if (currentPoison > 0)
			{
				player.getElementsByClassName("poison")[0].style.display = "block";
			}		
		}

		/* Prevent default actions caused by mouse wheel.
		 * That might be ugly, but we handle scrolls somehow
		 * anyway, so don't bother here... */
		if (event.preventDefault)
			event.preventDefault();

		event.returnValue = false;
}

function changeDamage(increase)
{
	var value = document.getElementById("value")
	
	if (increase > 0)
	{
		value.innerHTML++;
		document.getElementById("minus").disabled = false;
		document.getElementById("minus").className = "ButtonBlue VeryBigButton GroupFirst";
	}

	if (increase < 0)
	{
		value.innerHTML--;
		if (value.innerHTML == "0")
		{
			document.getElementById("minus").disabled = true;
			document.getElementById("minus").className = "ButtonDisabled VeryBigButton GroupFirst";
		}
	}

}

function confirmLife()
{
	var value = Number(document.getElementById("value").innerHTML);
	var player = document.getElementById(ActivePlayer);
	var currentLife = Number(player.getElementsByClassName("number")[0].innerHTML.split('<')[0]);
	var currentPoison = Number(player.getElementsByClassName("poison")[0].innerHTML);

	if (document.getElementById("check_poison").checked)
	{
		currentPoison += value;
		player.getElementsByClassName("poison")[0].innerHTML = currentPoison;
		player.getElementsByClassName("poison")[0].style.display = "block";
	}
	else
	{
		if (document.getElementById("check_life").checked)
		{
			value *= -1;
		}
		
		currentLife -= value;
		player.getElementsByClassName("number")[0].innerHTML = currentLife + '<div class="poison" id="poison">' + currentPoison + '</div>'
		player.getElementsByClassName("bar")[0].value = currentLife;
		if (currentPoison > 0)
		{
			player.getElementsByClassName("poison")[0].style.display = "block";
		}
	}
	
	if (document.getElementById("check_general").checked && document.getElementById("check_life").checked == false)
	{
		var radios = document.getElementsByName("general_radio");
		
		for (i = 0; radios[i].checked == false; i++);
		
		/* Is no general was selected, never mind. Otherwise, let's process it. */
		
		if (i < radios.length)
		{
		
			/* First off, let's see if a <div> with class "GeneralDamage" exists for the 
			 * active player. If it doesn't, we create it. */
			var box = player.getElementsByClassName("GeneralDamage")[0];
			if(box == null)
			{
				box = document.createElement("div");
				box.className = "GeneralDamage";
				player.getElementsByClassName("name")[0].appendChild(box);
			}
			
			/* Now we are sure that a box for the general damage exists and is pointed to
			 * by the "box" variable. Let's see if the currently selected general has already
			 * dealt damage to the active player. */
			var small_generals = box.getElementsByClassName("SmallGeneralDamage");
			if (small_generals != null)
			{
				for(j = 0; j < small_generals.length; j++)
				{
					if (small_generals[j].id == "general" + i)
					{
						/* We found the geral that's dealing damage! Le'ts save a pointer to this
						 * instance of general damage in a variable and break from the loop. */
						current_general_damage = small_generals[j];
						break;
					}
				}
			}
			
			/* If we got here because the array of general damage boxes was empty or because the
			 * search failed, it means that we need to create a geenral damage instance. */
			
			if (small_generals == null || j == small_generals.length)
			{
					current_general_picture = document.createElement("img");
					current_general_picture.className = "SmallGeneral";
					current_general_picture.src = document.getElementsByClassName("general")[i].src;
					
					current_general_damage =  document.createElement("div");
					current_general_damage.className = "SmallGeneralDamage";
					current_general_damage.id = "general" + i;
					current_general_damage.innerHTML = "0";
					
					box.appendChild(current_general_picture);
					box.appendChild(current_general_damage);
			}
			
			/* In any case, we are now sure that "current_general_damage" points to the <div> we 
			 * need to update. Let's do it! */
			general_damage = Number(current_general_damage.innerHTML);
			general_damage += value;
			current_general_damage.innerHTML = general_damage;
		}
	}

	RemovePopover();
}

function adjustLife()
{
	Origin = event.currentTarget.id;
	var allPictures = document.getElementsByClassName("general");
	var generalSelector = '<div class="pick-general noselect">'
	
	for (var i = 0; i < allPictures.length; i++)
	{
		var name = "check_general" + i;
		var thisGeneral = '<input type="radio" name="general_radio" id="' + name + '"/><label class="ImageSelector" for="' + name + '"style="padding: 0px;"><img src="' + allPictures[i].src + '"></label>';
		generalSelector += thisGeneral;
	}
	
	generalSelector += '</div>';

	ActivePlayer = Origin;
	var Title = '<div style="margin: 10px; line-height: 25px;">Damage dealt</div>'
	var Inner = '<div class="adjust-life noselect" style="margin: 10px;"> \
		<button disabled class="ButtonDisabled VeryBigButton GroupFirst" id="minus" onclick="changeDamage(-1)" style="width: 92px">&minus;</button><div class="ButtonBlank VeryBigButton GroupCenter" id="value" style="width: 174px; text-align: center;">0</div><button class="ButtonBlue VeryBigButton GroupLast" id="plus" onclick="changeDamage(+1)" style="width: 92px">+</button> \
	</div> \
	<div style="margin: 10px; overflow: auto;"> \
	<input type="checkbox" name="check_poison" id="check_poison"/><label class="ButtonBlue VeryBigButton GroupFirst" for="check_poison"><img src="images/phyrexia.png"></label><input type="checkbox" name="check_general" id="check_general"/><label class="ButtonBlue VeryBigButton GroupCenter" for="check_general" id="general" style="padding: 0px;"><img src="images/commander.png"></label><input type="checkbox" name="check_life" id="check_life"/><label class="ButtonBlue VeryBigButton GroupLast" for="check_life" id="life" style="padding: 0px;"><img src="images/life.png"></label> \
	<button class="ButtonBlue VeryBigButton" id="confirm" onclick="confirmLife()">&#x2714;</button>' + generalSelector + '</div>'

	DrawPopover(Title, Inner, Origin, "380px");
}