var socket;

function setup() {
  createCanvas(600, 400);
  background(51);

  socket = io.connect('http://localhost:3001');
  socket.on('mouse', newDrawing);
  socket.on('mouseClick', newClick);
}

function newDrawing(data) {
  noStroke();
  fill(255, 0, 100);
  ellipse(data.x, data.y, 36, 36);
}

function newClick(data) {
  alert('click');
}

function mouseDragged() {
  var data = {
    x: mouseX,
    y: mouseY
  }

  socket.emit('mouse', data);

  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, 36, 36);
}

function draw() {

}

document.onclick = function(){
  socket.emit('mouseClick', event);
};

