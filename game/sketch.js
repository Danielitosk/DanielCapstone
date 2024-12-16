// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x = 0;
let y = 0;
let playerX = 0;
let playerY = 0;
let hero;
let player;

let npc1;
let npc2;
let enemiesM = [];
let enemiesR = [];
let ball = [];
let startTimer = 0;
let rangedWidth;
let rangedHeight;
let spells = [];
let melee = [];
let r= 60;


function preload() {
  forest = loadImage('assets/background.webp');
  player = loadImage('assets/maincharacter.png');
  npc1 = loadImage('assets/meleenpc.png ');
  npc2 = loadImage('assets/ranged.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  hero = new Character();
  melee = new Melee();
  spawnMele();
  spawnRanged();
  for (let i = 0; i < 10; i++) {
    let rangedWidth = 100 + i * 190;
    ball.push(new Lightball(rangedWidth, 900));
  }

}

function spawnRanged() {
  for (let i = 0; i < 1000; i++) {
    let rangedWidth = 100 + i * 190;
    enemiesR.push(new Ranged(rangedWidth, rangedHeight));
  }
}

function spawnMele() {
  for (let i = 0; i < 10; i++) {

    enemiesM.push(new Melee(random(width), 20));

  }
}

function mousePressed() {
  spells.push(new Spell(hero.x, hero.y));
}


function draw() {
  background(220);
  imageMode(CENTER);  //background image
  image(forest, windowWidth / 2, windowHeight / 2, windowWidth + 1, windowHeight);
  hero.display();
  hero.move();

  for (let i = 0; i < 10; i++) {
    ball[i].display();
  }
  for (let i = 0; i < enemiesM.length; i++) {
    enemiesM[i].display();
    enemiesM[i].move();
  }
  for (let i = 0; i < 10; i++) {
    enemiesR[i].display();
  }
  let ellapseTime = millis() - startTimer;
  if (ellapseTime > 4000) {
    spawnMele();
    startTimer = millis();
  }
  for (let i = 0; i < spells.length; i++) {
    spells[i].display();
    spells[i].move();
    for (let s = 0; s < spells.length; s++) {
      if (spells[i].hits(enemiesM[s])) {
        enemiesM[s].dissapear();
      }
    }
  }

}

class Character {
  constructor(x, y, move) {
    this.x = width / 2;
    this.y = height / 2;

  }

  display() {
    imageMode(CENTER);
    image(player, this.x, this.y, r*2, r*2+20);

  }



  move() {  // player movement and check for borders in the canvas 

    if (keyIsPressed) {
      if (keyCode === 68) {  // move to the right
        this.x += 6;
        if (this.x >= windowWidth - 20) {     // check right border
          this.x = windowWidth - 20;
        }
      }
      if (keyCode === 65) {  // move to the left
        this.x -= 6;
        if (this.x <= 20) {     // check left border
          this.x = 20;
        }
      }
      if (keyCode === 83) {  // move down
        this.y += 6;
        if (this.y >= windowHeight - 175) {   // check lower border
          this.y = windowHeight - 175;
        }
      }
      if (keyCode === 87) {  //move up
        this.y -= 6;
        if (this.y <= 20) {    // check upper border
          this.y = 20;
        }
      }
    }

  }

}
class Spell {    //MY SPELL
  constructor(x, y, move) {
    this.pos = createVector(x, y);

  }

  display() {
    noStroke();
    fill('crimson');
    ellipse(this.pos.x, this.pos.y, r/2, 2/3);
  }

  hits(enemiesM) {
    let d = dist(this.x, this.y, enemiesM.x, enemiesM.y);
    if (d < this.r+enemiesM.r){
      return true;
    }
    else{
      return false;
    }
  }


  move() {  // player shoots, the spells casts
    this.y = this.y - 1;


  }


}

class Melee {       // melee npcs
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r= 60;
  }

  display() {
    imageMode(CENTER);
    image(npc1, this.x, this.y, r*2+20, r*2);
  }

  dissapear(){
    this.r= this.r - r*2+20;
  }

  move() {

  }


}

class Ranged {       // ranged npc
  constructor(x, y) {
    this.x = x;
    this.y = y;

  }

  display() {
    imageMode(CENTER);
    image(npc2, this.x, windowHeight - 50, 120, 120);
  }


}

class Lightball {
  constructor(x, y) {
    this.x = x;
    this.y = y;

  }

  display() {
    noStroke();
    fill('cyan');
    ellipse(this.x, this.y, 30, 25);
  }

  move() {
    //enemies cast lightrays to kill character


  }
}

