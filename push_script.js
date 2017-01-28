var direction = {
	left:37, // You needed commas separating the properties.
	up:38,
	right:39,
	down:40 // You don't need a comma for the last property, but it's fine if there is one.
}; // You needed a semicolon when initialising variables to an object.

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var radius = 20;

var player = {
	color:"blue",
	position_x:0,
	position_y:0,
	movement_x:0,
	movement_y:0,
	updatePosition: function(){
		position_x = position_x + movement_x;
		position_y = position_y + movement_y;
	}
	canMove: function(displacement_x, displament_y) {

	}
};

window.addEventListener("keydown", /*keydown =*/ function(event) {
	switch(event.keyCode){
		case direction.up: // I'm not actually sure if you need the case keyword..
			player.movement_y=-5;
			break;
		case direction.down:
			player.movement_y=5;
			break;
		case direction.left:
			player.movement_x=-5;
			break;
		case direction.right:
			player.movement_x=5;
			break;
	}
});

// This line actually initialises the variable 'keyup' to contain that function,
//		which you don't use. I only did this because I wanted to call the 'keyup' funtion myself in other places in the code.
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
		
function draw() { // Draw entire frame.
	context.beginPath(); // Clear canvas.
	var my_gradient = context.createLinearGradient(0, 0, 0, canvas.height);
	my_gradient.addColorStop(0, "Cornflowerblue");
	my_gradient.addColorStop(1, "LightSteelBlue");
	context.fillStyle = my_gradient;
	context.fillRect(0, 0, canvas.width, canvas.height);
	//context.fill();
	
	context.beginPath();
	context.arc(player.position_x + player.movement_x, player.position_y + player.movement_y, radius, 0, 2 * Math.PI, false);
	context.fillStyle = player.color;
	context.fill();
	context.lineWidth = 4;
	context.strokeStyle = '#003300';
	context.stroke();
}
		
function initCanvas() { // Setup canvas with context and dimensions.
	canvas = document.getElementById("myCanvas");
	canvas.width = 300;
	canvas.height = 300;
	context = canvas.getContext("2d");
}

function drawText(string, x, y, maxWidth) {
	context.strokeStyle = "turquoise";
	context.fillStyle = "black";
	context.fillText(string, x, y, maxWidth);
	context.strokeText(string, x, y, maxWidth);
}

//MAIN
//initCanvas();
draw();
player.position_y = canvas.height / 2;
player.position_x = canvas.width / 2;
loop = setInterval(main = function() {
	player.updatePosition();
	draw();
	// I'm pretty sure you need to add player.movement_N to the player.position_N to get it to move...
}, 100);
// If you're only calling the 'draw' function in your setinterval, you can do it like this:
// setInterval(draw, 1000);
// The 'loop' variable contains the ID of the interval, so you can call 'clearInterval(ID);' later, but you never do this.