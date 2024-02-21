let waffles = [];
let WaffleSpeed = 1;
let speedInc = 0.2;
let respawnDelay = 2;
let timeRemaining = 30;
let score = 0;
let gameState = 'start';
let gameFont;

function preload(){
  gameFont = loadFont('assets/Bungee-Regular.ttf');
  for (let i = 0; i < 10; i++) {
    spawnWaffle();
  }
}

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background('grey');

  textAlign(CENTER);
  textFont(gameFont);
  textSize(25);

  text("Time: " + ceil(timeRemaining), width/2,20);
 
  if (gameState == 'start') {
    fill('gray');
    rect(0,0,width,height);
    fill('black');
    text("SQUISH ALL THE WAFFLES!\nPRESS 'SPACE' TO START.",width/2, height/2 - 30);
  }

  if (gameState == 'playing') {
    timeRemaining -= deltaTime/1000;
    text("Score: " + score, width/2, 45);
    if (timeRemaining <= 0) {
      gameState = 'end';
      resetWaffles();
    }
  }

  if (gameState == 'end') {
    fill(0);
    rect(0,0,width,height);
    fill('white');
    text("TIME'S UP!\nYOU SQUISHED " + score + " WAFFLES!", width/2, height/2 - 60);
    text("PRESS 'SPACE' TO PLAY AGAIN.",width/2, height/2 + 15);
  }

  flipWaffles();
  addToRespawnTimers();
}

class Waffle {
  constructor(sheetPath) {
    this.respawnTimer = 0;
    this.isDead = false;
    this.xPos = randomXSpawn();
    this.yPos = randomYSpawn();
    this.sprite = new Sprite(this.xPos, this.yPos, 80, 80);
    this.sprite.spriteSheet = sheetPath;
    this.sprite.anis.frameDelay = 8;
    this.animations = {
      walkRight: {row: 0, col: 3, frames: 4},
      squished: {row: 0, frames: 2}
    };
    this.sprite.addAnis(this.animations);
    this.sprite.changeAni('walkRight');
    this.sprite.collider = 'none';
  }

  handleClick() {
    let distance = Math.sqrt(((this.sprite.x-mouseX)*(this.sprite.x-mouseX))+((this.sprite.y-mouseY)*(this.sprite.y-mouseY)));
    if (distance < 20 && !this.isDead){
      WaffleSpeed += speedInc;
      this.sprite.velocity.x = 0;
      this.sprite.changeAni('squished');
      this.isDead = true;
      addToScore(1);
    }
  }

  respawn() {
    if (gameState == 'playing') {
      let newX = randomXSpawn();
      let newY = randomYSpawn();
  
      this.sprite.changeAni('walkRight');
      this.sprite.x = newX;
      this.sprite.y = newY;
  
      if(this.xPos < 0) {
        this.sprite.scale.x = -1;
        this.sprite.velocity.x = WaffleSpeed;
      }
      else {
        this.sprite.velocity.x = -WaffleSpeed;
      }
    }
  }

  flipSides() {
      if (this.sprite.velocity.x > 0) {
        this.sprite.scale.x = 1;
        this.sprite.x = 650;
        this.sprite.y = randomYSpawn();
        this.sprite.velocity.x = -WaffleSpeed;
      }
      else if (this.sprite.velocity.x < 0) {
        this.sprite.scale.x = -1;
        this.sprite.x = -50;
        this.sprite.y = randomYSpawn();
        this.sprite.velocity.x = WaffleSpeed;
      }
  }
}

function randomXSpawn() {
  let position;
  let sides = [0,1]
  let side = random(sides);
  switch (side) {
    case 0:
      position = 650;
      break;
    case 1:
      position = -50;
      break;
  }
  return position;
}

function randomYSpawn() {
  return random(50, 590);
}

function startWaffles() {
  waffles.forEach(element => {
    if(element.xPos < 0) {
      element.sprite.scale.x = -1;
      element.sprite.velocity.x = WaffleSpeed;
    } else {
      element.sprite.scale.x = 1;
      element.sprite.velocity.x = -WaffleSpeed;
    }
  });
}

function spawnWaffle() {
  let newWaffle = new Waffle('assets/image.png');
  waffles.unshift(newWaffle);
}

function flipWaffles() {
  waffles.forEach(element => {
    if (element.sprite.x > 650 || element.sprite.x < -50) {
      element.flipSides();
    }
  });
}

function addToRespawnTimers() {
  waffles.forEach(element => {
    if (element.isDead) {
      element.respawnTimer += deltaTime/1000;
    }
    if (element.respawnTimer > respawnDelay) {
      element.isDead = false;
      element.respawnTimer = 0;
      element.respawn();
    }
  });
}

function addToScore(amount) {
  score += amount;
}

function resetWaffles() {
  waffles.forEach(element => {
    element.sprite.velocity.x = 0;
    element.sprite.changeAni('walkRight');
    element.sprite.x = randomXSpawn();
    element.sprite.y = randomYSpawn();
    currentBugSpeed = 1;
  });
}

function mouseClicked() {
  waffles.forEach(element => {
      element.handleClick();
  });
}

function keyTyped() {
  if (key === ' ' && gameState == 'start') {
    gameState = 'playing';
    startWaffles();
  }
  if (key === ' ' && gameState == 'end') {
    timeRemaining = 30;
    score = 0;
    gameState = 'playing';
    startWaffles();
  }
}