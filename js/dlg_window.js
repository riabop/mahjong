"use strict";

App.dlgs = [];

App.dlg = {
	init:function(){
		var el = document.getElementById("btnReturnToMnu");
		el.onclick = function() {
			App.dlg.onAccept();
		};

		var el = document.getElementById("btnDlgCancel");
		el.onclick = function() {
			App.dlg.onCancel();
		};
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
	setSize: function(w,h){
		var obj = document.getElementById("dlgLayer");
		obj.style.width = w;
		obj.style.width = h;
	},
	onCancel:function(callback){
		console.log("dialog canceled!");
	    if (typeof callback === "function") {
	    	callback();
	    }
	},
	onAccept:function(callback){
		console.log("dialog acepted!");
	    if (typeof callback === "function") {
	    	callback();
	    }
	}
};

/*
	App.dlg.setMessage("This game is cool!");
	App.dlg.setSize(400,300);
	App.dlg.onCancel = function(){
		console.log("Cancel!");
	};
	App.dlg.onaccept = function(){
		console.log("Accept!");
	}
	App.dlg.show(1000);
*/


/*
"use strict";

App.dlgs = [];

App.dlg = {
	init:function(){
		var el = document.getElementById("dlgBlackBg");
		el.onclick = function() {
			App.dlg.hide();
		};
	},
	show:function(){
		console.log("dlgTimeIsUp.hide()");
		//this.fadeOut();
		var obj = document.getElementById("dlgBlackBg");
		obj.style.opacity = 1;
		obj.style.display = "block";
	},
	hide: function() {
		console.log("dlgTimeIsUp.hide()");
		var obj = document.getElementById("dlgBlackBg");
		obj.style.opacity = 0;
		obj.style.display = "none";
		//this.fadeOut();
	}
};

*/
