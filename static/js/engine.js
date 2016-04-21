var hour = 0;
var day = 0;
var min = 0;
var hourStamp = document.getElementById('hour');
var dayStamp = document.getElementById('day');
var minStamp = document.getElementById('min');
var foodLevel = 100;
var waterLevel = 100;
var staminaLevel = 100;
var foodBar = document.getElementById('foodBar');
var waterBar = document.getElementById('waterBar');
var staminaBar = document.getElementById('staminaBar');
var tickRate = 500;
var tick; // timer
var ticksOn = 0;
var minsOn = 0;
var foodRate = 0.19;
var waterRate = 1.4;

// Dicts
// player['stocks'].indexOf(mat) < -1 ||

function craft(item) {
	var req = tools[item]['requires'];
	var craftable = 0;
	if (item in player['tools']) {
		log('No need to make anymore of these...');
	} else {
		for (var mat in req) {
			if ( !(mat in player['stocks']) || req[mat] > player['stocks'][mat]) {
				var x;
				for (var key in req){
					log(" - " + key + ": " + req[key]);
				}
				log('Requires:');
				craftable = 1;
				return;
			}
		}

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
		};
	};
};

function gather(material) { // by hand

};

function give(type, obj, amnt) {

};

function use(obj) {
	if (obj in tools) {
		obj = tools[obj];

		//check stamina
		if (obj['staminaDep'] > player['stamina']) {
			log('Too weak...');
			return;
		};

		//check tool health
		if (player['tools'][obj['name']] < 1) {
			log('Your ' + obj['name'] + " is broken... Use again to repair.");
			delete player['tools'][obj['name']];
			updateTools();
		};

		// harvest material
		for (var mat in obj['harvest']) {
			var amnt = Math.floor((Math.random() * obj['harvest'][mat]) + 1); // generate amount
			affectFood( obj['foodUse'] );
			affectWater( obj['waterUse'] );
			affectStamina( obj['staminaDep'] );
			updateMin( obj['time'] );
			log('Harvested ' + amnt + ' ' + mat);
		}
		
	}
};

function addStocks(item, amnt) {
	//determine type (material, food, water)
	if (item in materials) { // material
		if (item in player['stocks']){
			player['stocks'][item] += amnt;
			delete player['inventory'][item];
		} else {
			player['stocks'][item] = amnt;
			delete player['inventory'][item];
		};
	};

	if (item in foodTypes) { // food
		if (item in player['food']){
			player['food'][item] += amnt;
			delete player['inventory'][item];
		} else {
			player['food'][item] = amnt;
			delete player['inventory'][item];
		};
	};

	if (item in waterTypes) { // water
		if (item in player['water']){
			player['water'][item] += amnt;
			delete player['inventory'][item];
		} else {
			player['water'][item] = amnt;
			delete player['inventory'][item];
		};
	};

};

function removeStocks() {

}

function addInventory(item, amount) {
	if (item in player['inventory']){
		player['inventory'][item] += amount;
	} else {
		player['inventory'][item] = amount;
	}
}

function pickUp() {

}


function setLocation(area) {
	var locationSpan = document.getElementById('location');
	if (area in regions) {
		locationSpan.innerHTML =  area + " - " + regions[area]['name'];
	} else {
		locationSpan.innerHTML = area;
	}
	
	player['location'] = area;
}

function updateStocks() {
	var stocks = document.getElementById('stocks');
	stocks.innerHTML = "";
	for (var item in player['stocks']){
		stocks.innerHTML += '<span>' + item + ': ' + player['stocks'][item] + '</span><br>';	
	}
};

function updateTools() {
	var toolsdiv = document.getElementById('tools');
	var spanExplore = "<span id='mapTool' class='tool' onclick='map(" + '"' + "visible" + '"' + ")'>Map</span>";
	var spanPick = "<span id='pickTool' class='tool' onclick='pickUp()'>Pickup</span>";
	toolsdiv.innerHTML = spanPick + spanExplore;

	for (var item in tools) {
		var span;
		if (item in player['tools']){
			span = "<span id='" + item + "Tool' class='tool' onclick='use(" + '"' + item + '"' + ")'>" + item + "</span>";			
			
		} else {
			span = "<span id='" + item + "Tool' class='tool' style='color:gray;' onclick='craft(" + '"' + item + '"' + ")'>" + item + "</span>";
		}
		toolsdiv.innerHTML += span; 
	};
}

function map(display) {
	var map = document.getElementById('map');
	var hide = document.getElementById('hide');
	map.style.visibility = display;
	hide.style.visibility = display;
}

function log(text) {
	var logbook = document.getElementById('logbook');
	logbook.innerHTML = "<br><font size='3'>  " + text + "</font>" + logbook.innerHTML
	console.log(text);
};

function go(){
	x = document.getElementById('x').value;
	y = document.getElementById('y').value;
	var x_coord = ['A','B','C','D','E','F','G','H'];
	var area = x + y;
	var crntLocX = parseInt(x_coord.indexOf(player['location'][0]) - 1);
	var crntLocY = parseInt(player['location'][1]);
	x = x_coord.indexOf(area[0]) - 1;
	var distance = Math.round(Math.sqrt(Math.pow(x-crntLocX,2) + Math.pow(y-crntLocY,2))); //determine food and water usage based on distance
	//check stamina
	if (player['stamina'] < (distance*10)) {
		log("That's too far.. you need to rest.");
		map('hidden');
		return;
	};

	if (area == 'D5') { // if we're back home
		if (Object.keys(player['inventory']).length > 0){
			for (item in player['inventory']){
				addStocks(item, player['inventory'][item]);
			}
		}
		affectFood(distance*2);
		affectWater(distance);
		affectStamina(distance*10);
		updateMin(distance*5);
		setLocation(area);
		map('hidden');
	} else {
		if (area in regions) {
			if (!(player['discoveredRegions'].indexOf(area) > -1)) { // discovering region
				log(regions[area]['dialog']);
				player['discoveredRegions'].push(area);
			};
		};
		
		affectFood(distance*2);
		affectWater(distance);
		affectStamina(distance*10);
		updateMin(distance*5);
		setLocation(area);
		map('hidden');
		log('Found ' + itemsInRegion(area) + ' in region ' + area + '.');
	}
}

function itemsInRegion(area) {
	var found = [];
	if (area in regions){
		for (var material in regions[area]['materials']){
			found.push(material);
		};
	} else {
		found = "nothing";
	}
	return found;
}

function explore() {
	x = document.getElementById('x').value;
	y = document.getElementById('y').value;
	var area = x + y;
	var x_coord = ['A','B','C','D','E','F','G','H'];
	var y_coord = [1,2,3,4,5,6];

	if (area == 'D5') { // if we're back home
		if (Object.keys(player['inventory']).length > 0){
			for (item in player['inventory']){
				addStocks(item, player['inventory'][item]);
			}
		}
		return;
	}

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

					addInventory(material, amnt);
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
	if (ticksOn == 1) {
		console.log('tick');
	};
	updateMin(1);
	affectStamina(-0.3); // raises by one
	checkHealth();
};

function checkHealth () {
	if (foodLevel < 1 || waterLevel < 1) {
		clearInterval(tick);
		log('You died.');
	};
};

function affectFood(amt) {
	foodLevel = foodLevel - amt;
	if (foodLevel > 100) {
		foodLevel = 100;
	};
	foodBar.value = foodLevel;
	player['food'] = foodLevel;
};

function affectWater(amt) {
	waterLevel = waterLevel - amt;
	if (waterLevel > 100) {
		waterLevel = 100;
	};
	waterBar.value = waterLevel;
	player['water'] = waterLevel;
};

function affectStamina(amt) {
	staminaLevel = staminaLevel - amt;
	if (staminaLevel > 100) {
		staminaLevel = 100;
	};
	staminaBar.value = staminaLevel;
	player['stamina'] = staminaLevel;
}

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
	affectFood(foodRate);
	affectWater(waterRate);
};

function updateMin(amt) {
	min += amt;

	if (min > 59) {
		min = 0 + (min-60);
		updateHour(1);
	}
	if (minsOn == 1) {
		console.log(min);
	};
	player['min'] = min;	
}

function startGame() {
	foodBar.value = player['food'];
	waterBar.value = player['water'];
	staminaBar.value = player['stamina'];
	updateDay(player['day']);
	updateHour(player['hour']);
	updateMin(player['min']);
	updateTools();
	setLocation('D5');
	tick = setInterval(update, tickRate);

	log('You awake, washed ashore.');
}


startGame()
