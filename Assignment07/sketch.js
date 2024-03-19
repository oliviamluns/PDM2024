let square = new Tone.Synth({
  oscillator: {
    type: 'square'
  },
  envelope : {
    attack: 0.2,
    decay: 0.1,
    sustain: 0.1,
    release: 0.05
  }
}).toDestination();
let saw = new Tone.Synth({
  oscillator: {
    type: 'sawtooth'
  },
  envelope : {
    attack: 0.2,
    decay: 0.1,
    sustain: 0.1,
    release: 0.05
  }
}).toDestination();

function preload (){
  bee = loadImage ('assets/bee.jpeg');
}

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
}

function draw() {
  if (mouseIsPressed ===true){
    background(bee);
  } else if (mouseIsPressed === false){
    background (185,80,60);
    textSize(20);
    fill(255);
    text ('CLICK YOUR MOUSE\nTO TRIGGER ACTION', 90, 150);
  }
}

function mousePressed (){
  saw.triggerAttack('c4');
  square.triggerAttack ('b3');
}

function mouseReleased (){
  saw.triggerRelease();
  square.triggerRelease ();
}