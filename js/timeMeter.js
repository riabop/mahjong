"use strict";

App.timeMeter = function (){

	var movId;

	var maxTime = 0;
	var nowTime = 0;
	var ini_milsec = 0;
	var end_milsec = 0;
	var flag50=0;
	var flag75=0;
	var flag90=0;
	var flag100=0;
	var lastTime = 0;
	var totalTime = 0;
	var total_diference;
	var flag_timeUp = false;
	var go = false;

	var animate = function(time)  {

		var rightNow = new Date().getTime();
		if ((rightNow - lastTime)>1000){

			// update count down display
			if (nowTime >= 0){ 
				document.getElementById('minutes').innerHTML = nowTime;
				nowTime -= 1;
			}

			lastTime = rightNow;
			
			// update main time display
			document.getElementById('mainTime').innerHTML = totalTime;
			totalTime++;
		}
	   	
	   	var diference_percntage;

	   	if (!flag_timeUp){
		   	if (nowTime  < 0){ //&& flag100 == 0
		  		console.log("Yow wasted all your time! You are a loser!");
		  		flag_timeUp = true;
		  		//go = false;
		  		game.timeIsUp();
		  	} else {
				var now_diference = end_milsec - rightNow;
				diference_percntage = (now_diference * 100) / total_diference;
				var h = diference_percntage * 4;
		  		document.getElementById("time").style.height= h + "px";
		  		//movId = window.requestAnimationFrame(animate);
		  	}
	  	}

	  	if (diference_percntage < 50 && flag50 == 0) {
	  		console.log("Yow wasted 50% of your time!");
	  		var obj = document.getElementById("star60");
	  		obj.style.backgroundPosition = "0px -60px";
	  		flag50 = 1;
	  	};
	  	
	  	if (diference_percntage < 25 && flag75 == 0) {
	  		console.log("Yow wasted 75% of your time!");
	  		var obj = document.getElementById("star80");
	  		obj.style.backgroundPosition = "0px -60px";
	  		flag75 = 1;
	  	};

	  	if (diference_percntage < 10 && flag90 == 0) {
	  		console.log("Yow wasted 90% of your time!");
	  		var obj = document.getElementById("star95");
	  		obj.style.backgroundPosition = "0px -60px";
	  		flag90 = 1;
	  	}

	  	if (go) movId = window.requestAnimationFrame(animate);
	};

	this.reset = function(seconds) {

		maxTime = seconds;
		nowTime = maxTime;
	  	console.log("App.timeMeter.reset() miliseconds:",seconds);
	  	totalTime = 0;

  		var obj = document.getElementById("star60");
  		obj.style.backgroundPosition = "0px 0px";
  		flag50 = 0;

  		var obj = document.getElementById("star80");
  		obj.style.backgroundPosition = "0px 0px";
  		flag75 = 0;

  		var obj = document.getElementById("star95");
  		obj.style.backgroundPosition = "0px 0px";
  		flag90 = 0;

  		//flag100 = 0;
  		flag_timeUp = false;

  		document.getElementById('minutes').innerHTML = maxTime;
  		document.getElementById('mainTime').innerHTML = 0;
	  	
	};

	this.start = function() {
		console.log("App.timeMeter.start()");

		ini_milsec = new Date().getTime();
		end_milsec = ini_milsec + (maxTime * 1000);
		total_diference = end_milsec - ini_milsec;

		console.log("ini_milsec:",ini_milsec);
		console.log("end_milsec:",end_milsec);
		console.log("total_diference:",total_diference);
		
		go = true;
	  	movId = window.requestAnimationFrame(animate);
	};

	var pause = function() {
		console.log("App.timeMeter.pause()");
		go = false;
	};

	var stop = function() {
		console.log("App.timeMeter.stop()");
		go = false;
	};

}
