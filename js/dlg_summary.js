"use strict";

App.dlgSummary = [];

App.dlgSummary = {
	init:function(){

		var el = document.getElementById("");
		el.onclick = function() {
			App.dlg.onAccept();
		};

		/*
		var el = document.getElementById("");
		el.onclick = function() {
			App.dlg.onCancel();
		};
		*/
	},
	setMessage:function(msg){
		document.getElementById('dlgText').innerHTML = msg;
	},
	show:function(){
		console.log("dlgTimeIsUp.hide()");
		//this.fadeOut();
		var obj = document.getElementById("dlgBlackBg");
		obj.style.opacity = 1;
		obj.style.display = "block";
	},
	hide: function() {
		console.log("dlg.hide()");
		var obj = document.getElementById("dlgBlackBg");
		obj.style.opacity = 0;
		obj.style.display = "none";
		//this.fadeOut();
	},
	
	/*
	setSize: function(w,h){
		var obj = document.getElementById("");
		obj.style.width = w;
		obj.style.width = h;
	},
	*/

	/*
	onCancel:function(callback){
		console.log("dialog canceled!");
	    if (typeof callback === "function") {
	    	callback();
	    }
	},
	*/
	
	onAccept:function(callback){
		console.log("dialog acepted!");
	    if (typeof callback === "function") {
	    	callback();
	    }
	}
};

