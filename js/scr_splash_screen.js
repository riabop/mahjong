var srceenSplashScreen = {
	init: function() {
		console.log("splashScreen.init()");
	},
	show: function() {

		//this.fadeOut();
	},
	hide: function(wait) {
		var t = setTimeout("srceenSplashScreen.fadeOut()", wait);
	},
	fadeOut: function() {

		var i = 1;
		var animate = function() {
			i -= 0.05;
			if (i < 0) {
				window.cancelAnimationFrame(movId); // TODO Send a callback when finish
				console.log("main menu fade out finished");
				obj.style.display = "none";
				movId = 0;
				//finish();
			} else {
				obj.style.opacity = i;
				//console.log(obj,", ",i);
				movId = window.requestAnimationFrame(animate);
			}
		};
		var obj = document.getElementById("splashScreen");
		var movId = window.requestAnimationFrame(animate);
	}
};