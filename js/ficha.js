ficha = function (pieceType){

	createID = function(){
		var timestamp = new Date().getTime();
		var randomNumber = Math.ceil(Math.random()*100000);
		return type + "_" + timestamp + "_" + randomNumber;	
	}
	
	var type = "ficha";
	var ID = createID();
	var el = null;

	// Funcion privada
	var ficha = function(pieceType){
		console.log("inicializade objeto ", ID);
		drawTemplate();
		el = document.getElementById(ID);
		//console.log("this.el",el);

		el.onclick = function(){
			//console.log(ID,"onClick!");
			//console.log("el",el);

			// get id
			var id = el.getAttribute("id");
			window.actionsManager.pressPiece(id);
		};
	}
	
	drawTemplate = function(){
		//console.log("dibuja!");	
		document.write('<div id="'+ ID +'" pieceType="'+pieceType+'" class="ficha" style="top:0px;left:0px;display:none"> [' + pieceType+ '] ' + ID +'</div>');
	}

	this.oculta = function(){
		//console.log("oculta!");	
	}

	this.getType = function(){
		return type;
	};

	this.selectTicha = function(){
		console.log("select ".el);
		el.style.border = "3px solid blue";
	};

	this.unselect = function(){
		
	};

	this.show = function (){
		//console.log("show");
		el.style.display = null;
	};

	this.setPosition = function(x,y){
		el.style.top = y+"px";
		el.style.left = x+"px";
	};

	ficha(pieceType);
	//console.log("pieceType:",pieceType);


}