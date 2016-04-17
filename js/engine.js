var hour = 0;
var day = 0;
var hourStamp = document.getElementById('hour');
var dayStamp = document.getElementById('day');
var foodLevel = 100;
var waterLevel = 100;
var foodBar = document.getElementById('foodBar');
var waterBar = document.getElementById('waterBar');
var tickRate = 30000;
var tick;

// Dicts

function craft(item) {
	// Check requirements
	for (var req in items[item]['requires']) {
		console.log(req);
	}
};

function log(text) {
	console.log(text);
};

function searchArea(x,y) {
	var area = x + y;
	if (area in regions) {
		log('Searching ' + regions[area]['name']);
		for (item in regions[area]['items']){
			amnt = Math.floor((Math.random() * regions[area]['items'][item]) + 0);
			if (amnt > 0) {
				log('Found ' + amnt + ' ' + item + '(s).');
				if (item in player['stocks']) {
					player['stocks'][item] += amnt;	
				} else {
					player['stocks'][item] = amnt;
				}
				 
			}
		}
	}
};

// functions
function update () {
	console.log('decreasing');
	affectFood(-0.19);
	affectWater(-1.4);
	updateHour(1);
	checkHealth();
};

function checkHealth () {
	if (foodLevel < 1 || waterLevel < 1) {
		clearInterval(tick);
		document.getElementById('status').innerHTML = 'You died.';
	};
};

function affectFood(amt) {
	foodLevel += amt;
	foodBar.value = foodLevel;
	player['food'] = foodLevel;
};

function affectWater(amt) {
	waterLevel += amt;
	waterBar.value = waterLevel;
	player['water'] = waterLevel
};

function eat (type) {
	if (foodLevel < 100) {
		affectFood(foodTypes[type]['food']);
		affectWater(foodTypes[type]['liquid']);
	};
};

function drink (type) {
	if (waterLevel < 100) {
		affectFood(foodTypes[type]['food']);
		affectWater(foodTypes[type]['liquid']);
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
	foodBar.value = foodLevel;
	waterBar.value = waterLevel;
	updateDay(0);
	updateHour(12);
	tick = setInterval(update, tickRate);	
}

startGame()
