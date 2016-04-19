var hour = 0;
var day = 0;
var hourStamp = document.getElementById('hour');
var dayStamp = document.getElementById('day');
var foodLevel = 100;
var waterLevel = 100;
var foodBar = document.getElementById('foodBar');
var waterBar = document.getElementById('waterBar');
var tickRate = 30000;
var tick; // timer
var foodRate = 0.19;
var waterRate = 1.4;

// Dicts
function god(i) {
	if (i == 1) {
		foodRate = 0;
		waterRate = 0;
		console.log('god mode enabled');
	};
	if (i == 0) {
		foodRate = -0.19;
		waterRate = -1.4;
		console.log('god mode disabled');
	}
}

function speed(x) {
	clearInterval(tick);
	tick = setInterval(update, x);
	console.log('speed changed to ' + x + '.  Default: 30000');

}

function craft(item) {
	// Check requirements
	for (var req in items[item]['requires']) {
		console.log(req);
	}
};

function gather(material) {

}

function log(text) {
	var logbook = document.getElementById('logbook');
	logbook.innerHTML = "<br><font size='2'>  " + text + "</font>" + logbook.innerHTML
	console.log(text);
};

function explore() {
	x = document.getElementById('x').value;
	y = document.getElementById('y').value;
	console.log(x + y);
	var area = x + y;
	var x_coord = ['A','B','C','D','E','F','G','H'];
	var y_coord = [1,2,3,4,5,6];

	if (area in regions) { // check if area is explorable
		var reqItems = regions[area]['tools']

		if (!(player['discoveredRegions'].indexOf(area) > -1)) { // discovering region
			console.log(area);
			log(regions[area]['dialog']);
			player['discoveredRegions'].push(area);
		}
		

		if (reqItems != '') {
			log('You still need: ' + reqItems);
			affectFood(regions[area]['foodUse']);
			affectWater(regions[area]['waterUse']);

		} else {

			affectFood(regions[area]['foodUse']);
			affectWater(regions[area]['waterUse']);

			log('Searching ' + regions[area]['name'] + '..');

			var found = 0;
			for (var material in regions[area]['materials']){

				amnt = Math.floor((Math.random() * regions[area]['materials'][material]) + 0);

				if (amnt > 0) {

					log('Found ' + amnt + ' ' + material + '(s).');
					found += 1;

					if (material in foodTypes) { // see if material found is food
						if (material in player['stocks']) {
							player['foodStores'][material] += amnt;	
						} else {
							player['foodStores'][material] = amnt;
						}
					} 
					if (material in waterTypes) { // see if material found is food
						if (material in player['stocks']) {
							player['waterStores'][material] += amnt;	
						} else {
							player['waterStores'][material] = amnt;
						}
					}
					if (material in materials) {
						if (material in player['stocks']) {
							player['stocks'][material] += amnt;	
						} else {
							player['stocks'][material] = amnt;
						}
					}  
				}
			}

			if (found < 1) {
				log("Nothing found...")
			}
		}

	} else {
		log("Nothing here..");
	}

	x = '';
	y = '';	
};

// functions
function update () {
	console.log('tick');
	affectFood(1);
	affectWater(1);
	updateHour(1);
	checkHealth();
};

function checkHealth () {
	if (foodLevel < 1 || waterLevel < 1) {
		clearInterval(tick);
		log('You died.');
	};
};

function affectFood(amt) {
	foodLevel = foodLevel - (amt * foodRate);
	if (foodLevel > 100) {
		foodLevel = 100;
	};
	foodBar.value = foodLevel;
	player['food'] = foodLevel;
};

function affectWater(amt) {
	waterLevel = waterLevel - (amt * waterRate);
	if (waterLevel > 100) {
		waterLevel = 100;
	};
	waterBar.value = waterLevel;
	player['water'] = waterLevel;
};

function eat (type) {
	if (foodLevel < 100) {
		foodLevel = foodLevel + foodTypes[type]['food'];
		waterLevel = waterLevel + foodTypes[type]['liquid'];
	};
};

function drink(type){
	if (waterLevel < 100) {
		foodLevel = foodLevel + waterTypes[type]['food'];
		waterLevel = waterLevel + waterTypes[type]['liquid'];
	};
};

function updateDay (amt) {
	day += amt;
	dayStamp.innerHTML = "Day " + day;
	player['day'] = day;
};

function updateHour (amt) {
	hour += amt;
	if (hour == 24) {
		hour = 0;
		updateDay(1);
	}
	hourStamp.innerHTML = "Hour " + hour;
	player['hour'] = hour;
};

function startGame() {
	foodBar.value = player['food'];
	waterBar.value = player['water'];
	updateDay(player['day']);
	updateHour(player['hour']);
	tick = setInterval(update, tickRate);

	log('You awake, washed ashore.');
}


startGame()
