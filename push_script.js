var direction = {
	left:37, // You needed commas separating the properties.
	up:38,
	right:39,
	down:40 // You don't need a comma for the last property, but it's fine if there is one.
}; // You needed a semicolon when initialising variables to an object.

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var radius = 10;
var block_size = 20;


var wallsOnScreen = [];
function wall(x,y,w,h) {
	this.position_x = x;
	this.position_y = y;
	this.height = h,
	this.width = w;
	this.type = 'wall';
	
	this.collides = function(point_x,point_y,p_height,p_width){
		//if((this.position_x < point_x) && (point_x < (this.position_x + this.width)) && 
		//	(this.position_y < point_y) && (point_y < (this.position_y + this.height))){
		//	return true;
		//} else{ return false;}
		
		if (this.position_x < point_x + p_width && this.position_x + this.width > point_x &&
			this.position_y < point_y + p_height && this.height + this.position_y > point_y) {
			return true;
		} else{ return false;}
	}
	this.draw = function(){
		
		context.fillStyle = "grey";
		for (i=0; i < this.width; i+=block_size){
			for (j=0; j < this.height; j+=block_size){
				context.rect(i+this.position_x, j+this.position_y, block_size, block_size);
				context.fillRect(i+this.position_x, j+this.position_y, block_size, block_size);
			}
		}
		context.stroke();
	}
}

var blocksOnScreen = [];
function block(x,y,len){

	this.position_x = x;
	this.position_y = y;
	this.movement_x = 0;
	this.movement_y = 0;
	this.side_length = len;
	this.type = 'block';
	this.id = 0;
   
	this.collides = function(point_x,point_y,p_height,p_width){
		if (this.position_x < point_x + p_width && this.position_x + this.side_length > point_x &&
			this.position_y < point_y + p_height && this.side_length + this.position_y > point_y) {
			return true;
		} else{ return false;}
		
		//if((this.position_x < point_x) && (point_x < (this.position_x + this.side_length)) && 
		//	(this.position_y < point_y) && (point_y < (this.position_y + this.side_length))){
		//	return true;
		//} else{ return false;}
	}

	this.detectCollision = function(point_x, point_y,p_height,p_width){
		//check for walls
		for(i = 0; i < wallsOnScreen.length; i++){
			if(wallsOnScreen[i].collides(point_x, point_y,p_height,p_width)){
				return true;
			}
		}
		//check for blocks
		for(i = 0; i < blocksOnScreen.length; i++){
			if(i != this.id){
				if(blocksOnScreen[i].collides(point_x, point_y,p_height,p_width)){
					return true;
				}
			}
		}
		return false;
	}
	this.draw = function(){
		context.rect(this.position_x, this.position_y, this.side_length, this.side_length);
		context.fillStyle = "red";
		context.fillRect(this.position_x, this.position_y, this.side_length, this.side_length);
		context.stroke();
	}
}


var player = {
	color:"blue",
	position_x:0,
	position_y:0,
	movement_x:0,
	movement_y:0,
	moving_block:[],
	updatePosition: function(){
		if(0 < this.movement_x){
			if (this.canMove(this.position_x + this.movement_x, this.position_y + this.movement_y)){
				this.position_x = this.position_x + this.movement_x;
				if(this.moving_block[0] != null){
					this.moving_block[0].position_x = this.moving_block[0].position_x + this.movement_x;
				}
			}
		} else if (this.movement_x < 0){
			if (this.canMove(this.position_x + this.movement_x, this.position_y + this.movement_y)){
				this.position_x = this.position_x + this.movement_x;
				if(this.moving_block[0] != null){
					this.moving_block[0].position_x = this.moving_block[0].position_x + this.movement_x;
				}
			}
		}
		if(0 < this.movement_y){
			if (this.canMove(this.position_x + this.movement_x, this.position_y + this.movement_y)){
				this.position_y = this.position_y + this.movement_y;
				if(this.moving_block[0] != null){
					this.moving_block[0].position_y = this.moving_block[0].position_y + this.movement_y;
				}
			}
		} else if (this.movement_y < 0){
			if (this.canMove(this.position_x + this.movement_x, this.position_y + this.movement_y)){
				this.position_y = this.position_y + this.movement_y;
				if(this.moving_block[0] != null){
					this.moving_block[0].position_y = this.moving_block[0].position_y + this.movement_y;
				}
			}
		}
	},
	canMove: function(displacement_x,displacement_y) {
		this.moving_block = this.detectCollision(displacement_x - radius,displacement_y - radius, 2*radius, 2*radius);
		if (this.moving_block.length == 0){
			return true;
		} else if(this.moving_block.length > 1){
			return false;
		}else if(this.moving_block[0].type == 'wall' ){
			return false;
		} else if(this.moving_block[0].type == 'block'){
			return (false == this.moving_block[0].detectCollision(this.moving_block[0].position_x +this.movement_x,
				this.moving_block[0].position_y +this.movement_y,this.moving_block[0].side_length,this.moving_block[0].side_length))
		} else{
			throw "detectCollision is not working!";
		}
	},

	detectCollision: function(point_x, point_y,p_height,p_width){
		var found_objects = [];
		//check for walls
		for(i = 0; i < wallsOnScreen.length; i++){
			if(wallsOnScreen[i].collides(point_x, point_y,p_height,p_width)){
				found_objects.push(wallsOnScreen[i]);
			}
		}

		//check for blocks
		for(i = 0; i < blocksOnScreen.length; i++){
			if(blocksOnScreen[i].collides(point_x, point_y,p_height,p_width)){
				found_objects.push(blocksOnScreen[i]);
			}
		}
		return found_objects;
	},
}

window.addEventListener("keydown", /*keydown =*/ function(event) {
	switch(event.keyCode){
		case direction.up: // I'm not actually sure if you need the case keyword..
			player.movement_y=-4;
			break;
		case direction.down:
			player.movement_y=4;
			break;
		case direction.left:
			player.movement_x=-4;
			break;
		case direction.right:
			player.movement_x=4;
			break;
	}
});

window.addEventListener("keyup", /*keyup =*/ function(event) {
	switch(event.keyCode){
		case direction.up:
			player.movement_y=0;
			break;
		case direction.down:
			player.movement_y=0;
			break;
		case direction.left:
			player.movement_x=0;
			break;
		case direction.right:
			player.movement_x=0;
			break;
	}
});
		
function drawScreen() { // Draw entire frame.
	context.beginPath(); // Clear canvas.
	var my_gradient = context.createLinearGradient(0, 0, 0, canvas.height);
	my_gradient.addColorStop(0, "Cornflowerblue");
	my_gradient.addColorStop(1, "LightSteelBlue");
	context.fillStyle = my_gradient;
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.beginPath();
	context.arc(player.position_x, player.position_y, radius, 0, 2 * Math.PI, false);
	context.fillStyle = player.color;
	context.fill();
	context.lineWidth = 2;
	context.strokeStyle = '#003300';
	context.stroke();
	
	for(var i = 0; i < blocksOnScreen.length; i++){
		blocksOnScreen[i].draw()
	}
	for(var i = 0; i < wallsOnScreen.length; i++){
		wallsOnScreen[i].draw()
	}
}

function initCanvas() { // Setup canvas with context and dimensions.
	canvas = document.getElementById("myCanvas");
	canvas.width = 600;
	canvas.height = 600;
	context = canvas.getContext("2d");
}

function drawText(string, x, y, maxWidth) {
	context.strokeStyle = "turquoise";
	context.fillStyle = "black";
	context.fillText(string, x, y, maxWidth);
	context.strokeText(string, x, y, maxWidth);
}

function buildRoom (){
	//walls			    // x, y, width, height
	var north = new wall(0,0,canvas.width,block_size);
	var east  = new wall(0,block_size,block_size,canvas.height-block_size);
	var south = new wall(block_size,canvas.height-block_size,canvas.width-(2*block_size),block_size);
	var west  = new wall(canvas.width-block_size,block_size,block_size,canvas.height-block_size);
	wallsOnScreen.push(north);
	wallsOnScreen.push(east);
	wallsOnScreen.push(south);
	wallsOnScreen.push(west);
		
		
	//blocks			 // x, y, side length 
	var block1 = new block(50,50,block_size);
	var block2 = new block(100,50,block_size);
	var block3 = new block(100,100,block_size);
	blocksOnScreen.push(block1);
	blocksOnScreen.push(block2);
	blocksOnScreen.push(block3);
	for(i=0;i<blocksOnScreen.length; i++){
		blocksOnScreen[i].id = i;
	}
	//spawn player
	
}
//MAIN
initCanvas();
buildRoom();
drawScreen();
player.position_y = canvas.height / 2;
player.position_x = canvas.width / 2;
loop = setInterval(main = function() {
	player.updatePosition();
	drawScreen();

}, 33);
// If you're only calling the 'draw' function in your setinterval, you can do it like this:
// setInterval(draw, 1000);
// The 'loop' variable contains the ID of the interval, so you can call 'clearInterval(ID);' later, but you never do this.