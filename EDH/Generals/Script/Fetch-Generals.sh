#!/bin/bash

while read line; do
	name=`echo "$line" | cut -d ';' -f 2`
	picture=`echo "$line" | cut -d ';' -f 1`
	echo $name
	wget -O "$name.jpg" $picture > /dev/null
	convert -crop 200x200+56+46 +repage "$name.jpg" "$name.jpg"
done < Generals-new-face.txt

while read line; do
	name=`echo "$line" | cut -d ';' -f 2`
	picture=`echo "$line" | cut -d ';' -f 1`
	echo $name
	wget -O "$name.jpg" $picture > /dev/null
	convert -crop 200x200+56+36 +repage "$name.jpg" "$name.jpg"
done < Generals-old-face.txt

while read line; do
	name=`echo "$line" | cut -d ';' -f 2`
	picture=`echo "$line" | cut -d ';' -f 1`
	echo $name
	wget -O "$name.jpg" $picture > /dev/null
	convert -crop 100x100+40+140 +repage "$name.jpg" "$name.jpg"
done < Generals-flip.txt
