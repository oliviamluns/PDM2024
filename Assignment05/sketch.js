let button1, button2, button3, button4, gameFont, roomSlider, wetMix;
let reverb = new Tone.JCReverb({
  roomSize: 0.8,
  wet: 0.5
});

let soundFX = new Tone.Players({
    coffee : "assets/coffee.mp3",
    crosswalk : "assets/crosswalk.mp3",
    humming: "assets/humming.mp3",
    reverse: "assets/reverse.mp3"
  }) 

soundFX.connect(reverb);
reverb.toDestination();

function preload(){
  gameFont = loadFont('assets/Bungee-Regular.ttf');
}

function setup() {
  createCanvas(400, 400);
  colorMode(HSB)

  button1 = createButton('Coffee Maker');
  button1.position (85,175);
  button1.mousePressed (() =>soundFX.player ('coffee').start());

  button2 = createButton('Crosswalk')
  button2.position (205, 175);
  button2.mousePressed (() =>soundFX.player ('crosswalk').start());

  button3 = createButton('Humming');
  button3.position (85,125);
  button3.mousePressed (() =>soundFX.player ('humming').start());

  button4 = createButton('Reverse');
  button4.position (205,125);
  button4.mousePressed (() =>soundFX.player ('reverse').start());

  wetMix = createSlider(0, 1, 1, 0);
  wetMix.style("width", "200px");
  wetMix.position(80, 240);

  roomSlider = createSlider(0, 1, 0.5, 0);
  roomSlider.style("width", "200px");
  roomSlider.position(80, 300);
}

function draw() {
  background(120, 50, 20);

  reverb.wet.value = wetMix.value();
  reverb.roomSize.value = roomSlider.value();

  textSize(10);
  textFont(gameFont);
  fill(220);
  text("Reverb Wetness", 75, 235);
  text("Reverb Room Size", 75, 295);
  textSize(15);
  text('Press the buttons to make sounds.\nUse the sliders to manipulate the\nreverb effect.', 50, 65);
}
