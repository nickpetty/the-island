var foodLevel = 57;
var waterLevel = 80;

var foodTypes = {
	'berry':1,
	'fish':10
};

var waterTypes = {
	'rain':10,
	'puddle':2
};


var foodBar = document.getElementById('foodBar');
var waterBar = document.getElementById('waterBar');

foodBar.value = foodLevel;
waterBar.value = waterLevel;

function update () {
	console.log('decreasing');
	drainFood(-0.19);
	drainWater(-1.4);
};

setInterval(update, 60000);

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
		foodLevel += foodTypes[type];
		foodBar.value = foodLevel;
	};
};

function drink (type) {
	if (waterLevel < 100) {
		waterLevel += waterTypes[type];
		waterBar.value = waterLevel;
	};
};