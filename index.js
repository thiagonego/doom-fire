var debug = false;
var fireStructure = [];
var fireWidth = 60;
var fireHeight = 40;
var wind = true;
var fireSize = fireWidth * fireHeight
var table = new Array(fireHeight);
var fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

function createFireStructure(){

	for (var i = 0; i < fireHeight; i++) {
		var cols = new Array(fireWidth);
		for (var j = 0; j < fireWidth; j++) {
			cols[j] = 0;
		}		
		table[i] = cols;
	}

}

function createFireSource(potentionMax){

	var cols = new Array(fireWidth);
	for (var j = 0; j < fireWidth; j++) {
		table[fireHeight - 1][j] = potentionMax;
	}

}

function renderFire(){

	var html = `<table cellspacing="0" colspacing="0">`
	if(debug == true){
		html = `<table cellspacing="0" colspacing="0" class="debug">`;
	}

	var cell = 0;
	for (var i = 0; i < table.length; i++) {
		html += `<tr>`;
		for (var j = 0; j < table[i].length; j++) {

			cell++
			var color = fireColorsPalette[table[i][j]] == undefined ? fireColorsPalette[0] : fireColorsPalette[table[i][j]];

			if(debug == true){
				html += `<td style="background-color: rgb(${color.r},${color.g},${color.b}">${table[i][j]}`;
				html += `<span class="position-left">${i},${j}</span>`
				html += `<span class="position-right">${cell}</span>`
			}else{
				html += `<td class="pixel" style="background-color: rgb(${color.r},${color.g},${color.b}">`;
			}

			html += `</td>`;

		}
		html += `</tr>`;
	}

	html += `</table>`;
	document.getElementById("doom-fire").innerHTML = html; 

}

function toggleDebug(){

	debug = !debug;
	
	if(debug == false){
		fireWidth = 50;
		fireHeight = 40;		
	}else{
		fireWidth = 25;
		fireHeight = 17;			
	}

	fireSize = fireWidth * fireHeight
	table = new Array(fireHeight);
	createFireStructure();
	createFireSource(36);	
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function calculateFirePropagation(){

	var decay = Math.floor(Math.random() * 3);
	for (var i = 0; i < table.length; i++) {
		if(i != fireHeight - 1){
			for (var j = 0; j < table[i].length; j++) {

				if((table[i + 1][j] - decay) >= 0){
					table[i][j] = table[i + 1][j] - decay;
				}				

				if(wind){

					try{

						var incres = 1;
						var ii = i;

						if( ii > 0){
							ii = getRandomInt(ii - incres, ii + incres);
						}else{
							ii = getRandomInt(0, 0 + incres);
						}

						var jj = j;
						if( jj == 0 ){
							jj = getRandomInt(0, jj + incres);
						}else if( jj == (fireWidth - 1)){
							jj = getRandomInt(jj - incres, jj);
						}else{
							jj = getRandomInt(jj - incres, jj + incres + 1);
						}

						if((table[i + 1][j] - decay) >= 0){
							table[ii][jj] = table[i + 1][j] - decay;
						}
						

					}catch(e){
						console.log(e);
					}
										
				}

			}
		}
	}

	renderFire();

}

function decreaseFire(){
	
	for (var i = 0; i < table[fireHeight - 1].length; i++) {
		var fireIntensity = table[fireHeight - 1][i];	
		if(fireIntensity > 0){
			var decay = Math.floor(Math.random() * 14);
			var newFireIntensity = fireIntensity - decay >= 0 ? fireIntensity - decay : 0;
			table[fireHeight - 1][i] = newFireIntensity;			
		}
		
	}

}


function increaseFire(){
	
	for (var i = 0; i < table[fireHeight - 1].length; i++) {
		var fireIntensity = table[fireHeight - 1][i];	
		if(fireIntensity < 36){
			var decay = Math.floor(Math.random() * 14);
			var newFireIntensity = fireIntensity + decay >= 36 ? 36 : fireIntensity + decay;
			table[fireHeight - 1][i] = newFireIntensity;			
		}
		
	}

}

function start(){

	createFireStructure();
	createFireSource(36);	
	renderFire();
	setInterval(calculateFirePropagation, 40);

}

start();