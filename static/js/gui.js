function colapse() {
	var container = document.getElementById('tools');
	if (container.clientHeight = 400) {
		container.style = "0px";
	} else {
		container.style = "400px";
		console.log('called');
	};
}