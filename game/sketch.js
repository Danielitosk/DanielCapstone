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
let enemiesM= [];
let enemiesR= [];


function preload() {
  forest = loadImage('assets/background.webp');
  player = loadImage('assets/maincharacter.png');
  npc1 = loadImage('assets/meleenpc.png ');
  npc2 = loadImage('assets/ranged.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  hero = new Character();
  for (let i=0; i<100; i++){
    enemiesM[i] = new Melee();
  }
}


function draw() {
  background(220);
  imageMode(CENTER);
  image(forest, windowWidth / 2, windowHeight / 2, windowWidth + 1, windowHeight);
  hero.display();
  hero.move();
  for (let i=0; i<100; i++){
    enemiesM[i].display();
  }  
}

class Character {
  constructor(x, y, move) {
    this.x = width / 2;
    this.y = height / 2;

  }

  display() {

    imageMode(CENTER);
    image(player, this.x, this.y, 120, 140);

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
        if (this.y >= windowHeight - 40) {   // check lower border
          this.y = windowHeight - 40;
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

class Melee {       // melee npcs
  constructor(x, y) {
    this.x = width / 2;
    this.y = height / 2;

  }

  display() {
    imageMode(CENTER);
    image(npc1, this.x, this.y, 120, 120);
  }

}

class Ranged {       // ranged npc
  constructor(x, y) {
    this.x = width / 2;
    this.y = height / 2;

  }

  display() {
    imageMode(CENTER);
    image(npc2, this.x, this.y, 120, 120);
  }

}
