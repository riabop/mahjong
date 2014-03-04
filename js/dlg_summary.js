"use strict";

//App.dlgSummary = [];

App.dlgSummary = {
	init:function(){

		console.log("--------------------------------------");

		var el = document.getElementById("btnDlgOK");
		el.onclick = function() {
			//App.dlg.onAccept();
			App.dlgSummary.onAccept();
		};

		/*
		var el = document.getElementById("");
		el.onclick = function() {
			App.dlg.onCancel();
		};
		*/
	},
	setMessage:function(msg){
		//document.getElementById('dlgText').innerHTML = msg;
	},
	show:function(){

		//console.log("--------------------------------------");

		//console.log("dlgTimeIsUp.hide()");
		//this.fadeOut();
		var obj = document.getElementById("dlgBlackBg"); // !!!
		obj.style.opacity = 1;
		obj.style.display = "block";

		// show dlg
		var obj = document.getElementById("dlg-summary");
		obj.style.display = "block";
	},
	hide: function() {
		console.log("dlg.hide()");
		var obj = document.getElementById("dlgBlackBg"); // !!!
		obj.style.opacity = 0;
		obj.style.display = "none";
		//this.fadeOut();
	},
	onAccept:function(callback){
		console.log("dialog acepted!");
	    if (typeof callback === "function") {
	    	callback();
	    }
	}
};

