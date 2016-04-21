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