var direction = {
	left:37
	up:38
	right:39
	down:40
}
var player = {
	color:"blue"
	position_x:0
	position_y:0
	movement_x:0
	movement_y:0
	canMove : function(displacement_x, displament_y) {
		//check if potential movement is possible
		//if(){return true;}
		//else{return false;}
    }
}

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var radius = 70;

window.addEventListener("keydown", keydown = function(event) {
	switch(event.keyCode){
		direction.up:
			player.movement_y=-5;
			break;
		direction.down:
			player.movement_y=5;
			break;
		direction.left:
			player.movement_x=-5;
			break;
		direction.right:
			player.movement_x=5;
			break;
		}
}

window.addEventListener("keyup", keyup = function(event) {
	switch(event.keyCode){
		direction.up:
			player.movement_y=0;
			break;
		direction.down:
			player.movement_y=0;
			break;
		direction.left:
			player.movement_x=0;
			break;
		direction.right:
			player.movement_x=0;
			break;
		}
}
		
function draw() { // Draw entire frame.
	context.beginPath(); // Clear canvas.
	context.fillStyle = "black";
	context.rect(0, 0, canvas.width, canvas.height);
	context.fill();
	
	context.beginPath();
	context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	context.fillStyle = 'blue';
	context.fill();
	context.lineWidth = 5;
	context.strokeStyle = '#003300';
	context.stroke();
}
		
function initCanvas() { // Setup canvas with context and dimensions.
	canvas = document.getElementById("myCanvas");
	canvas.width = cols * tileSize;
	canvas.height = rows * tileSize;
	context = canvas.getContext("2d");
}

function drawText(string, x, y, maxWidth) {
	context.strokeStyle = "turquoise";
	context.fillStyle = "black";
	context.fillText(string, x, y, maxWidth);
	context.strokeText(string, x, y, maxWidth);
}


//MAIN
initCanvas();
draw();
loop = setInterval(main = function() {
				draw();
		}, 1000);