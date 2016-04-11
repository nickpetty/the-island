var hour = 0;
var day = 0;
var hourStamp = document.getElementById('hour');
var dayStamp = document.getElementById('day');
var foodLevel = 10;
var waterLevel = 10;
var foodBar = document.getElementById('foodBar');
var waterBar = document.getElementById('waterBar');
var tickRate = 2000;
var tick;

// Dicts
var foodTypes = {
	'berry':{
		'food':1,
		'liquid':.5
	},
	'fish':{
		'food':10,
		'liquid':-2
	}
};

var waterTypes = {
	'rain':{
		'liquid':10,
		'food':0
	},
	'broth':{
		'liquid':7,
		'food':4
	}
};

var items = {
	'stoneHatchet':{
		'requires':{'rock':1, 'wood':1},
		'description':'A weak stone hatchet.',
		'name':'Stone Hatchet',
		'damage':5,
		'wearPerUse':-3,
		'time':1,
		'foodUse':-3,
		'waterUse':-2
	}
}

var fire = {
	'woodFire':{
		'requires':{'wood':5, 'flint':1},
		'description':'Wood camp fire.',
		'name':'Camp Fire'
	}
}

var stats = {
	'health':100,
	'maxCarry':70,
	'inventory': {
		'dagger':1
	}
}

var inventory = {
	add: function(item, weight){
		stats['inventory'][item] = weight;

	},
	del: function(item){

	}
}

inventory.add('poop', .5)


function craft(item) {
	// Check requirements
	for (var req in items[item]['requires']) {
		console.log(req);
	}
};

function log(text) {

};

function gather(item) {

};

// functions
function update () {
	console.log('decreasing');
	drainFood(-0.19);
	drainWater(-1.4);
	updateHour(1);
	checkHealth();
};

function checkHealth () {
	if (foodLevel < 1 || waterLevel < 1) {
		clearInterval(tick);
		document.getElementById('status').innerHTML = 'You died.';
	};
};


function drainFood(amt) {
	foodLevel += amt;
	foodBar.value = foodLevel;
};

function drainWater(amt) {
	waterLevel += amt;
	waterBar.value = waterLevel;
};

function eat (type) {
	if (foodLevel < 100) {
		foodLevel += foodTypes[type]['food'];
		foodBar.value = foodLevel;
		waterLevel += foodTypes[type]['liquid'];
		waterBar.value = waterLevel;
	};
};

function drink (type) {
	if (waterLevel < 100) {
		waterLevel += waterTypes[type]['liquid'];
		waterBar.value = waterLevel;
		foodLevel += waterTypes[type]['food'];
		foodBar.value = foodLevel;
	};
};

function updateDay (amt) {
	day += amt;
	dayStamp.innerHTML = "Day " + day;

};

function updateHour (amt) {
	hour += amt;
	if (hour == 24) {
		hour = 0;
		updateDay(1);
	}
	hourStamp.innerHTML = "Hour " + hour;
};

function startGame() {
	foodBar.value = foodLevel;
	waterBar.value = waterLevel;
	updateDay(0);
	updateHour(12);
	tick = setInterval(update, tickRate);	
}

startGame()
