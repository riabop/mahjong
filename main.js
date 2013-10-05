	var pi_ejepcio = 3.16;
	var pi_griego = 3.14;
	var $ = document.getElementById;

	//document.getElementById("mainContainer").innerHTML = "fuck!";

	console.log("fuking javascript!");	

	ficha = function (){

		createID = function(){
			var timestamp = new Date().getTime();
			var randomNumber = Math.ceil(Math.random()*100000);
			return type + "_" + timestamp + "_" + randomNumber;	
		}
		
		var type = "ficha";
		var ID = createID();
		var el = null;

		// Funcion privada
		var ficha = function(){
			console.log("inicializade objeto ", ID);
			drawTemplate();
			el = document.getElementById(ID);
			//console.log("this.el",el);
		}
		
		drawTemplate = function(){
			//console.log("dibuja!");	
			document.write('<div id="'+ ID +'" class="ficha" style="top:0px;left:0px;display:none">'+ ID +'</div>');
		}

		this.oculta = function(){
			//console.log("oculta!");	
		}

		this.getType = function(){
			return type;
		};

		this.show = function (){
			//console.log("show");
			el.style.display = null;
		};

		this.setPosition = function(x,y){
			el.style.top = y+"px";
			el.style.left = x+"px";
		};

		ficha();

	} 

	var redrawAll = function(){

		//console.log("Redraw!");
		win_w = window.innerWidth;
		win_h = window.innerHeight;

		// relocate background picture.
		var obj = document.getElementById("levelPicture");
		console.log("obj.style.width/2:",obj.clientWidth);
		var x = (win_w/2) - (obj.clientWidth/2);
		var y = (win_h/2) - (obj.clientHeight/2);
		obj.style.top = y+"px";
		obj.style.left = x+"px";

		// paint the pieces
		console.log("scnarioWidth:",scnarioWidth);
		console.log("scnarioHeight:",scnarioHeight);
		var desp_x = (win_w/2)-(scnarioWidth/2);
		var desp_y = (win_h/2)-(scnarioHeight/2);


		var lon = fichasEnJuego.length;
		for (var i = 0; i < lon; i++){
			var x=escenario1.positions[i].x * 80 + desp_x;
			var y=escenario1.positions[i].y * 100 + desp_y; 
			fichasEnJuego[i].setPosition(x,y);
		}

		relocateFichas();
	}

	window.onresize = function(event) {
	    console.log("width:",window.innerWidth,", height:", window.innerHeight);
	    redrawAll();
	}

	var fichasEnJuego=[];
	var scnarioWidth = null;
	var scnarioHeight = null;

	var createScenario = function(){ // Here the pieces are created, we create new objects

		var pieces_width = 0;
		var pieces_height = 0;

		var lon = escenario1.positions.length;
		for (var i=0; i<lon; i++){
			fichasEnJuego[i] = new ficha;
			var x=escenario1.positions[i].x * 80;
			var y=escenario1.positions[i].y * 100; 
			fichasEnJuego[i].setPosition(x,y);
			fichasEnJuego[i].show();

			if (pieces_width < x) pieces_width = x;
			if (pieces_height < y) pieces_height = y;
		}

		scnarioWidth = pieces_width + 80;
		scnarioHeight = pieces_height + 100;

	}

	var relocateFichas = function(){ // here we relocate the pieces upon the scenary, we dont create objects
		
		// This works!

		/*
		var lon = fichasEnJuego.length;
		var where = document.getElementById("piecesContainer");

		for (var i = 0; i < lon; i++){
			//fichasEnJuego[i].render(where);
			var x=escenario1.positions[i].x * 100;
			var y=escenario1.positions[i].y * 75; 
			fichasEnJuego[i].setPosition(x,y);
			
		}
		*/
		
		/*
		var lon = fichasEnJuego.length;
		var trozo = null;

		for (var i = 0; i < lon; i++){
			var x=escenario1.positions[i].x * 100;
			var y=escenario1.positions[i].y * 75; 
			fichasEnJuego[i].setPosition(x,y);
			trozo = trozo + fichasEnJuego[i].giveMeTheTemplate();
		}

		var where = document.getElementById("piecesContainer");
		where.innerHTML = trozo;
		*/

	}

	createScenario();
	redrawAll();