let cube, cube2, cube3, selectedColor, button1, button2, button3, button4;
let player = new Tone.Player('assets/paintapp.mp3').toDestination();
player.loop = true;
player.playbackRate = 1;
let noise = new Tone.Noise("brown"); 
let filter = new Tone.Filter (1000, "lowpass"); 
noise.connect(filter);
filter.toDestination();

function keyPressed (){
  if (key === 'q') {noise.start();
  filter.frequency.rampTo(3000, 1) 
  } else if (key === 'w') { noise.stop();
    filter.frequency.value = 1000; 
  }
}

let soundFX = new Tone.Players({
  color: "assets/color.mp3",
  clear: "assets/clear.mp3",
  save: "assets/save.mp3",
}).toDestination();

function setup() {
  createCanvas(500, 500);
  selectedColor = color('white');
  cube = new Cube (0,0,color('red'));
  cube2 = new Cube (0,25,color('orange'));
  cube3 = new Cube (0,50,color('yellow'));
  cube4 = new Cube (0,75,color('green'));
  cube5 = new Cube (0,100,color('cyan'));
  cube6 = new Cube (0,125,color('blue'));
  cube7 = new Cube (0,150,color('magenta'));
  cube8 = new Cube (0,175,color('brown'));
  cube9 = new Cube (0,200,color('white'))
  cube10 = new Cube (0,225,color('black'));
  cube11 = new Cube (485,98,color(255,255,255,0.5));
  cube12 = new Cube (485,123.5,color(255,255,255,0.5));
  cube13 = new Cube (460,98,color(255,255,255,0.5));
  cube14 = new Cube (460,123.5,color(255,255,255,0.5));


  button1 = createButton('Play');
  button1.position (460,50);
  button1.mousePressed (() =>player.start());

  button2 = createButton('Stop');
  button2.position (460, 75);
  button2.mousePressed (() =>player.stop());

  button3 = createButton('Clear');
  button3.position (460, 100);
  button3.mousePressed (() =>clear());
  
  button4 = createButton('Save');
  button4.position (460, 125);
  button4.mousePressed (() =>save());
}

function draw() {
  fill(0);
  textSize(10);
  text('SELECTED\nCOLOR',443,13);

  cube.draw();
  cube2.draw ();
  cube3.draw();
  cube4.draw();
  cube5.draw();
  cube6.draw();
  cube7.draw();
  cube8.draw();
  cube9.draw();
  cube10.draw();
  cube11.draw();
  cube12.draw();
  cube13.draw();
  cube14.draw();

  stroke(0);
  strokeWeight(1);
  fill(selectedColor);
  circle(490,25,15);

  stroke(selectedColor);
  strokeWeight(10);
  if (mouseIsPressed === true) {
    line (mouseX, mouseY, pmouseX, pmouseY);
    noise.start();
    filter.frequency.rampTo(3000, 3);
    player.playbackRate +=.001; 
  } else if (mouseIsPressed === false) { noise.stop();
    filter.frequency.value = 100; 
  }
}

function mousePressed () {
  if (cube.contains(mouseX,mouseY)) {
    selectedColor = cube.fill;
    soundFX.player("color").start();
  } else if (cube2.contains(mouseX,mouseY)) {
    selectedColor = cube2.fill;
    soundFX.player("color").start();
  } else if (cube3.contains(mouseX,mouseY)) {
    selectedColor = cube3.fill;
    soundFX.player("color").start();
  } else if (cube4.contains(mouseX,mouseY)) {
    selectedColor = cube4.fill;
    soundFX.player("color").start();
  } else if (cube5.contains(mouseX,mouseY)) {
    selectedColor = cube5.fill;
    soundFX.player("color").start();
  } else if (cube6.contains(mouseX,mouseY)) {
    selectedColor = cube6.fill;
    soundFX.player("color").start();
  } else if (cube7.contains(mouseX,mouseY)) {
    selectedColor = cube7.fill;
    soundFX.player("color").start();
  } else if (cube8.contains(mouseX,mouseY)) {
    selectedColor = cube8.fill;
    soundFX.player("color").start();
  } else if (cube9.contains(mouseX,mouseY)) {
    selectedColor = cube9.fill;
    soundFX.player("color").start();
  } else if (cube10.contains(mouseX,mouseY)) {
    selectedColor = cube10.fill;
    soundFX.player("color").start();
  } else if (cube11.contains(mouseX,mouseY)) {
    soundFX.player("clear").start();
    player.playbackRate = 1;
  } else if (cube12.contains(mouseX,mouseY)) {
    soundFX.player("save").start();
  } else if (cube13.contains(mouseX,mouseY)) {
    soundFX.player("clear").start();
    player.playbackRate = 1;
  } else if (cube14.contains(mouseX,mouseY)) {
    soundFX.player("save").start();
  }
  console.log("selected color is " + selectedColor);
}

class Cube {
  constructor (x,y,fill) {
    this.x = x;
    this.y = y;
    this.fill = fill;
  }
  draw() {
      noStroke();
      fill(this.fill);
      square(this.x,this.y,25);
  }
  contains(x,y) {
    let insideX = x >= this.x && x <= this.x+25;
    let insideY = y >= this.y && y <= this.y+25;
    return insideX && insideY;
  }
}
