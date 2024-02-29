let synth = new Tone.PolySynth(Tone.Synth);
let bend = new Tone.PitchShift();
bend.pitch = 0;

synth.connect(bend);
bend.toDestination();

function preload(){
  gameFont = loadFont('assets/Bungee-Regular.ttf');
}

function setup() {
  createCanvas (400,400);

  pitchSlider = createSlider (-12, 12, 0, 1);
  pitchSlider.position (170,260);
  pitchSlider.mouseMoved(()=> bend.pitch = pitchSlider.value());
}

let notes = {
  'a' : "B3",
  's' : "C4",
  'd' : "D4",
  'f' : "Eb4",
  'g' : "F4",
  'h' : "G4",
  'j' : "Ab4",
  'k' : "B4",
  'l' : "C5"
}

function keyPressed () {
  let playNotes = notes[key];
  synth.triggerAttack(playNotes);  
}

function keyReleased () {
  let playNotes = notes[key];
  synth.triggerRelease(playNotes, '+0.03');
}

function draw() {
  background (0);
  fill(225);
  textFont(gameFont);  
  textSize(25);
  text('SYNTHESIZER', 90, 70);
  textSize(18);
  text('PRESS A-L TO PLAY SYNTH', 60, 130);
  textSize(12)
  text('MOVE THE SLIDER BELOW TO\nCHANGE THE PITCH BY HALF STEP',80,200)
  textSize(12);
  text('PITCH SHIFTER', 60, 275);
}