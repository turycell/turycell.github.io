function DrawPopover(Title, Inner, OriginPoint, RequestedWidth)
{
	/* The last parameter is optional. If it's not passed a value it will default
	 * to 'undefined', and in this case we se it to a default value of 500px */
	if ( RequestedWidth === undefined ) {
        RequestedWidth = "500px";
    }
	/* First, we create the shell of the popover and a blanket to make everything 
	 * else on the page inactive. The popover has opacity: 0 in the style sheet. */
	
	var Cover = document.createElement("div");
	Cover.id = "Cover";
	Cover.onclick = RemovePopover;
	Cover.style.minHeight = "100%";
	Cover.style.minWidth = "100%";
	Cover.style.position = "absolute";
	Cover.style.top = "0";
	Cover.style.left = "0";
	
	var Popover = document.createElement("div");
	Popover.className = "popover border-popover";
	Popover.id = "Popover";
	Popover.onclick = StopEvent;
	Popover.style.width = RequestedWidth;
	
	document.getElementsByTagName('body')[0].appendChild(Cover);
	Cover.appendChild(Popover);
	
	/* Second, we create a div for the tile and one for the body, and append them 
	 * to the popover. */
	
	var TitleDiv = document.createElement("div");
	TitleDiv.innerHTML = Title;
	TitleDiv.className = "title";
	
	Popover.appendChild(TitleDiv);

	var InnerDiv = document.createElement("div");
	InnerDiv.innerHTML = Inner;
	InnerDiv.className = "inner";
	
	Popover.appendChild(InnerDiv);
	
	/* Now we can calculate the size of the popover body. */
	
	var Height = Popover.offsetHeight;
	var Width = Popover.offsetWidth;
	
	/* We can now place the popover and decide which side the arrow should point to. 
	 * We need to now the position of the origin element relative to the window, but
	 * offsetTop gives us the position relative to the parent element. So we cycle
	 * up the element parenthood using the offsetParent property.
	 * Not that the single '=' in the while() statement is not an error: it means we
	 * are making an assignment and then continuing the loop if obj is not null. */
	
	var OriginElement = document.getElementById(OriginPoint);
	var OriginTop = 0;
	var obj = OriginElement;
	 
	do {
		OriginTop += obj.offsetTop;
	} while (obj = obj.offsetParent);
		 
	OriginBottom = OriginTop + OriginElement.offsetHeight;
	
	/* If the point of origin if entirely below the middle of the screen, the arrow 
	 * points up; if it's above, it points down. If it crosses that line, we need to 
	 * calculate which side we lean towards, comparing the differences between the 
	 * Top and Bottom positions and half the window height. */
	
	if (OriginTop > window.innerHeight/2)
	{
		/* The element is all in the upper half of the window, point down. */
		Popover.style.bottom = window.innerHeight - OriginTop + "px";
		Popover.innerHTML += '<b class="border-notch-down notch-down" id="notch"></b><b class="notch-down" id="notch-border"></b>'
	}
	else if (OriginBottom < window.innerHeight/2)
	{
		/* The element is all in the bottom half of the window, point up. */
		Popover.style.top = OriginBottom + "px";
		Popover.innerHTML += '<b class="border-notch-up notch-up" id="notch"></b><b class="notch-up" id="notch-border"></b>'
	}
	else if (window.innerHeight/2 - OriginTop < OriginBottom - window.innerHeight/2)
	{
		/* The top edge of the origin is closer to the middle of the window than the 
		 * bottom edge, point down. */
		Popover.style.bottom = window.innerHeight - OriginTop + "px";
		Popover.innerHTML += '<b class="border-notch-down notch-down" id="notch"></b><b class="notch-down" id="notch-border"></b>'
	}
	else
	{
		/* The bottom edge of the origin is closer to the middle of the window than the 
		 * top edge, point up. */
		Popover.style.top = OriginBottom + "px";
		Popover.innerHTML += '<b class="border-notch-up notch-up" id="notch"></b><b class="notch-up" id="notch-border"></b>'
	}
	
	/* If there is enough space at the sides, we vertically center the popover and its 
	 * origin, otherwise we set a distance from the border of the window. */
	
	var OriginLeft = 0;
	var obj = OriginElement;
	 
	do {
		OriginLeft += obj.offsetLeft;
	} while (obj = obj.offsetParent);
		 
	OriginRight = OriginLeft + OriginElement.offsetWidth;
	
	/* Note that OriginRight is NOT the distance of the object from the right side of the
	 * window, it's the distance of the right side of the object form the left side of the 
	 * window. */
	
	OriginCenter = (OriginLeft + OriginRight) / 2;
	
	if (Width/2 < (OriginCenter - 20) && Width/2 < (window.innerWidth - OriginCenter - 20))
	{
		/* Center-align the popover to the origin */
		Popover.style.left = OriginCenter - Width/2 + "px";
	}
	else if (Width/2 > (OriginCenter / 2 - 20))
	{
		/* Align the popover to the left of the window */
		Popover.style.left = "20px";
	}
	else
	{
		/* Align the popover to the right of the window */
		Popover.style.right = "20px";
	}
	
	/* Last, we align the notch to the middle of the origin. We set its left property to the 
	 * difference between the origin and the popover left offset, and adjust it by half the 
	 * size of the notch. */
	
	document.getElementById("notch").style.left = OriginCenter - Popover.offsetLeft - 16 + "px";
	document.getElementById("notch-border").style.left = OriginCenter - Popover.offsetLeft - 16 + "px";
	
	/* The popover is ready, reveal it. */
	
	Popover.style.opacity = 1;
}

function RemovePopover()
{
	var Cover = document.getElementById("Cover");
	var Popover = document.getElementById("Popover");
	
	Popover.style.opacity = 0;
	
	setTimeout(function()
	{
		Cover.removeChild(Popover);
		document.getElementsByTagName('body')[0].removeChild(Cover);
	}, 100);
	
	/* Just in case the user closes the dialog with the suggestion list open. */
	document.getElementById("autosuggest").style.display = 'none';
}

function StopEvent(event)
{
	/* By default, JavaScript fires onClick events for the element you actually click and all
	 * its parents. We don't want a click on the Popover or its children to close it, so we
	 * need to stop the event here to prevent it from reaching the blanket. */
	 
	event.stopPropagation();
}

function Test()
{
	/*var Title = '<div style="margin: 10px; line-height: 25px;">Add player</div>'
	var Inner = '<div style="margin: 10px; line-height: 25px; background: url(images/light.jpg) repeat top left; border-radius: 6px; box-shadow:inset 0px 0px 10px #000;"><div style="background: url(cards/Teferi.jpg) no-repeat; margin: 20px;" id="avatar" class="player"></div><input type="text" class="text" name="name" id="name" placeholder="Player&apos;s name"/><input type="text" class="text" name="general" id="general" placeholder="General"/><div style="height: 70px;"><button class="ButtonBlue" id="OK" style="float: left;">Add player</button><button class="ButtonRed" id="Delete" style="float: right;">Cancel</button></div></div>'*/
	var Title = '<div style="margin: 10px; line-height: 25px;">Remove all</div>'
	var Inner = '<div style="margin: 10px; line-height: 25px; background: url(images/light.jpg) repeat top left; border-radius: 6px; box-shadow:inset 0px 0px 10px #000;"><input type="button" class="ButtonRed" id="Delete" value="Remove all players" style="position: static; width: 460px; margin: 10px; font-size:24px;"><input type="button" class="ButtonBlue" id="OK" value="No thanks!" style="position: static; width: 460px; margin-bottom: 10px; font-size:24px;"></div>'

	var Origin = "o8o";

	DrawPopover(Title, Inner, Origin);

}
