var currentRoll = 0;
var totalRolls = 1000;
var prefCD = 80;
var prefFD = 15;
var prefCC = 8;
var minPassives = 4;

for (var a = 0; a < totalRolls; a++) roll();
console.log($('#target').children().length);

function roll () {
	var statList = 
	[
		"cc",
		"cd",
		"fd",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12",
		"13",
		"14",
		"15",
		"16"
	];

	var passiveList = 
	[
		"ambush",
		"cull the weak",
		"ballistics",
		"thrill of the hunt",
		"awareness",
		"archery",
		"leech",
		"p 8",
		"p 9",
		"p 10",
		"p 11",
		"p 12",
		"p 13",
		"p 14",
		"p 15",
		"p 16",
		"p 17",
		"p 18",
		"p 19"
	];

	currentRoll++;

	var ancientRoll = rollNum(0, 100, 90);

	var borderVal = 'border: 1px solid black;';
	if (ancientRoll) borderVal = 'border: 5px solid red;';

	var rolledItem = '<div class="item" style="'+borderVal+'width: 200px; padding:10px;'+
	'float: left; font-size: 30px; margin: 5px;"><p>roll: '+currentRoll+'</p>';

	var chosenStats = [];

	rolledItem += "------";

	if (ancientRoll) 
		rolledItem += '<p>DEX: ' + rollNum(850, 1000) + '</p>';
	else 
		rolledItem += '<p>DEX: ' + rollNum(650, 750) + '</p>';
	
	for ( var i = 0; i < 2; i++ ) {
		var num = Math.floor( Math.random() * statList.length );
    	chosenStats.push( statList[num] );
    	if( !checkQuality( {stat: statList[num]} ) )return;
    	statList.splice( num, 1 );
	};

	for (var j = 0; j < chosenStats.length; j++) {		

    	if(chosenStats[j] == 'cd') {
			var prefcd = rollNum(50, 100, prefCD);
			if (prefcd == false) return;
    		chosenStats[j] += " " + prefcd + "%";
    	}
    	if(chosenStats[j] == 'fd'){
    		var preffd = rollNum(15, 20, prefFD);
			if (preffd == false) return;
    		chosenStats[j] += " " + preffd + "%";
    	} 
    	if(chosenStats[j] == 'cc'){
    		var prefcc = rollNum(8, 10, prefCC);
			if (prefcc == false) return;
			chosenStats[j] += " " + prefcc + "%";
    	} 

    	rolledItem += '<p>- ' + chosenStats[j] + '</p>';
	}
		

	var passiveNum = Math.floor( Math.random() * passiveList.length );
	var chosenPassive = passiveList[passiveNum];

    if(!checkQuality({passive: passiveNum}))return;

	rolledItem += "&#9675";
	rolledItem += '<p>' + chosenPassive + '</p>';

	rolledItem += '</div>';

	$( '#target' ).append( $(rolledItem) );
}

function checkQuality(obj){
	if (obj.stat)
		if ( obj.stat != 'cc' && 
		     obj.stat != 'cd' && 
		     obj.stat != 'fd') return false;

	if (obj.passive)
		if(obj.passive > minPassives) return false;

	return true;
}

function rollNum(min, max, pref){
	var rnd = Math.floor(Math.random() * (max - min + 1)) + min;
	if (pref == undefined)return rnd;
	if (pref)
		if (rnd >= pref) return rnd;
	return false;
	
}
