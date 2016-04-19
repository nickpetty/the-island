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
	if (x == null) {
		x = 30000;
	};
	tick = setInterval(update, x);
	console.log('speed changed to ' + x + '.  Default: 30000');

}

function craft(item) {
	var req = tools[item]['requires'];
	var craftable = 0;
	if (item in player['tools']) {
		log('No need to make anymore of these...');
	} else {
		for (var mat in req) {
			if (mat in player['stocks']) { // check if material has been discovered.
				console.log(tools[item]['requires'][mat]);
				console.log(player['stocks'][mat]);
				if (player['stocks'][mat] < tools[item]['requires'][mat]) {
					log('You need more ' + mat + '. Requires: ' + tools[item]['requires'][mat]);
					craftable = 1;
				};
			} else {
				log('You still need to find ' + mat);
				craftable = 1;
			};
		};

		if (craftable == 0) {
			log('Crafting ' + item);
			player['tools'][item] = tools[item];
			for (var mat in req) { // subtract materials
				player['stocks'][mat] = player['stocks'][mat] - tools[item]['requires'][mat];
			};

			player['food'] = player['food'] - tools[item]['foodUse'];
			player['water'] = player['water'] - tools[item]['waterUse'];

			updateTools();
			updateStocks();
			updateHour(tools[item]['time']);
			for (var multi in tools[item]['multipliers']) {
				if (multi in player['multipliers']) {
					player['multipliers'][multi] += tools[item]['multipliers'][multi];
				}  else {
					player['multipliers'][multi] = tools[item]['multipliers'][multi];
				};
			};
		};
	};
};

function gather(material) {

};

function give(type, obj, amnt) {

};

function use(obj) {

};

function updateStocks() {
	var stocks = document.getElementById('stocks');
	stocks.innerHTML = "";
	for (var item in player['stocks']){
		stocks.innerHTML += '<span>' + item + ': ' + player['stocks'][item] + '</span><br>';	
	}
};

function updateTools() {
	var toolsdiv = document.getElementById('tools');
	toolsdiv.innerHTML = "";
	for (var item in tools) {
		var span;
		if (item in player['tools']){
			span = "<span id='tool' onclick='craft(" + '"' + item + '"' + ")'>" + item + "</span>";			
			
		} else {
			span = "<span id='tool' style='color:gray;' onclick='craft(" + '"' + item + '"' + ")'>" + item + "</span>";
		}
		toolsdiv.innerHTML +=  span; 
	};
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
		var explore = 0;

		if (!(player['discoveredRegions'].indexOf(area) > -1)) { // discovering region
			console.log(area);
			log(regions[area]['dialog']);
			player['discoveredRegions'].push(area);
		}
		

		if (reqItems != '') { // check if tools needed to explore area
			var x = [];
			for (var i = reqItems.length - 1; i >= 0; i--) {
				if (!(reqItems[i] in player['tools'])) {
					x.push(reqItems[i])
					explore = 1;
				}
			}

			if (x.length > 0) {
				log('You need ' + reqItems + ' to explore this area.');
				log('You still need ' + x);
			}
		};

		if (explore == 1) {
			affectFood(regions[area]['foodUse']);
			affectWater(regions[area]['waterUse']);
		} else if (explore == 0) {

			affectFood(regions[area]['foodUse']);
			affectWater(regions[area]['waterUse']);

			//log('Searching ' + regions[area]['name'] + '..');

			var found = 0;
			for (var material in regions[area]['materials']){
			
				amnt = Math.floor((Math.random() * regions[area]['materials'][material]) + 0);

				if (amnt > 0) {
					//multiply based on tools
					if (material in player['multipliers']){
						amnt = amnt * player['multipliers'][material];
					};

					if (materials[material]['tool'] != '') { // check if material needs tool
						if (!(materials[material]['tool'] in player['tools'])) {
							log("You'll need a " + materials[material]['tool'] + " to harvest " + material);
							continue;
						}
					}			

					log('Found ' + amnt + ' ' + material + '(s).');
					found += 1;

					if (material in foodTypes) { // see if material found is food
						if (material in player['stocks']) {
							player['foodStores'][material] += amnt;	
						} else {
							player['foodStores'][material] = amnt;
						}
					} 
					if (material in waterTypes) { // see if material found is water
						if (material in player['stocks']) {
							player['waterStores'][material] += amnt;	
						} else {
							player['waterStores'][material] = amnt;
						}
					}
					if (material in materials) { // see if material found is material
						if (material in player['stocks']) {
							player['stocks'][material] += amnt;	
						} else {
							player['stocks'][material] = amnt;
						}
					}
					updateStocks();  
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
	updateTools();
	tick = setInterval(update, tickRate);

	log('You awake, washed ashore.');
}


startGame()
