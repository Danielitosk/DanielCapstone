// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x = 0;
let y = 0;
let heroX = 0;
let heroY = 0;
let hero;
let player;
let npc1;
let npc2;
let melees = [];
let snipers = [];
let ball = [];
let startTimer = 0;
let rangedWidth;
let rangedHeight;
let spells = [];
let r = 60;
let score = 0;
let kill = 0;
let n = 2;
let gamestate = 0;



function preload() {
  forest = loadImage('assets/background.webp');
  player = loadImage('assets/maincharacter.png');
  npc1 = loadImage('assets/meleenpc.png ');
  npc2 = loadImage('assets/ranged.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  hero = new Character();
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
    snipers.push(new Ranged(rangedWidth, rangedHeight));
  }
}

function spawnMele() {
  for (let i = 0; i < 5; i++) {
    melees.push(new Melee(random(width), 20));
  }

}

function points() {
  textSize(25);
  textFont('Courier New');
  fill('yellow');
  score = int(millis()) + kill * 1000;
  text("SCORE:" + score, windowWidth - 220, 40);

}

let buttoncolor = 'crimson';
let trianglecolor = 250;

function playbutton() {
  fill(buttoncolor);
  textSize();
  rect(width / 2, height / 2, 300, 200, 10, 10, 10, 10);
  fill(trianglecolor);
  triangle(width / 2 - 40, height / 2 - 80, width / 2 + 60, height / 2 + 5, width / 2 - 40, height / 2 + 80);
  
  image(player, 300, 500, 500, 500);
  if (mouseX <= width / 2 + 150 && mouseX >= width/2 -150 && mouseY <= height/2 +100 && mouseY >= height/2 -100) {
    buttoncolor= color(100), trianglecolor = color(200);
    
  }
  
  else {
    buttoncolor = 'crimson';
    trianglecolor = 'white';
  }
  print(trianglecolor)
}


function menu() {
  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
  image(forest, windowWidth / 2, windowHeight / 2, windowWidth + 1, windowHeight);
  fill('violet');
  textSize(50);
  textFont('Courier New');
  text("GAME NAME", width / 2, 150);
  textSize(30);
  fill(250);
  text("Press button to play", width / 2, 350);
  playbutton();
}

function draw() {
  /////////////////////////////////////// GAMESTATE 0 ////////////////////////////////////////////
  // MENU SCREEN
  if (gamestate === 0) {

    menu();

  }

  ////////////////////////////////////// GAMESTATE 1 /////////////////////////////////////////////
  // MAIN GAME

  if (gamestate === 1) {
    background(220);
    imageMode(CENTER);  //background image
    image(forest, windowWidth / 2, windowHeight / 2, windowWidth + 1, windowHeight);
    hero.display();
    hero.move();

    for (let i = 0; i < 10; i++) {
      ball[i].display();
    }
    for (let i = 0; i < melees.length; i++) {
      melees[i].display();
      melees[i].move();
    }
    for (let i = 0; i < 10; i++) {
      snipers[i].display();
    }
    let ellapseTime = millis() - startTimer;

    if (ellapseTime > 3000) {
      spawnMele();
      startTimer = millis();
    }


    for (let i = 0; i < spells.length; i++) {
      spells[i].display();
    }

    // Melee minions attack the 
    for (let Melee of melees) {
      Melee.y += 1.3;


    }
    points();
    for (let Melee of melees) {
      for (let Spell of spells) {
        if (dist(Melee.x, Melee.y - 90, Spell.pos.x, Spell.pos.y) < 60) {

          melees.splice(melees.indexOf(Melee), 1);
          spells.splice(spells.indexOf(Spell), 1);
          kill += 1;  // player kills +1 enemy, counts for his final score
        }
      }


      if (dist(heroX, heroY + 100, Melee.x, Melee.y) < 100) {
        gamestate = 2;
      }

    }

  }



  //////////////////////////////////// GAMESTATE 2 ////////////////////////////////////

  // GAME OVER SCREEN
  if (gamestate === 2) {
    background(120, 120, 120);
    textAlign(CENTER);
    textSize(50);
    textFont('Courier New');
    text("GAME OVER", windowWidth / 2, windowHeight / 2);


  }

}


class Character {
  constructor() {

    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
    heroX = this.x;
    heroY = this.y;

  }

  display() {
    imageMode(CENTER);
    image(player, heroX, heroY, r * 2, r * 2);

  }

  move() {  // player movement and check for borders in the canvas 

    if (keyIsPressed) {
      if (keyCode === 68) {  // move to the right
        heroX += 6;
        if (heroX >= windowWidth - 20) {     // check right border
          heroX = windowWidth - 20;
        }
      }
      if (keyCode === 65) {  // move to the left
        heroX -= 6;
        if (heroX <= 20) {     // check left border
          heroX = 20;
        }
      }
      if (keyCode === 83) {  // move down
        heroY += 6;
        if (heroY >= windowHeight - 175) {   // check lower border
          heroY = windowHeight - 175;
        }
      }
      if (keyCode === 87) {  //move up
        heroY -= 6;
        if (heroY <= 20) {    // check upper border
          heroY = 20;
        }
      }
    }

  }

}



let currentMouseX = 0;
let currentMouseY = 0;
function mousePressed() {
  currentMouseX = mouseX; //check actual position of the mouse
  currentMouseY = mouseY;
  spells.push(new Spell(heroX, heroY)); //cast the spell
}


class Spell {    //MY SPELL
  constructor(x, y, r) {
    this.r = r;
    this.pos = createVector(x, y);
    this.target = createVector(mouseX - this.pos.x, mouseY - this.pos.y);
    this.target.normalize();
    this.target.mult(10);
  }

  display() {
    noStroke();
    fill('crimson');
    ellipse(this.pos.x, this.pos.y, r / 2, r / 3);
    if (this.pos.x !== currentMouseX) {  // for the spells not to interfere with a new spell cast, stopping the program
      if (this.pos.y !== currentMouseY) {
        this.pos.add(this.target); // the spells move directly to where the mouse is pressed
        // if the spell does not connect it goes forever, leaving the screen 
      }
    }

  }

}

class Melee {       // melee npcs
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;


    //hitbox
    this.right;
    this.left;
    this.top;
    this.bottom;
  }

  display() {
    imageMode(CENTER);
    image(npc1, this.x, this.y - 100, r * 2, r * 2);



    //hitbox
    this.right = this.x - 60;
    this.left = this.x + 60;
    this.bottom = this.y + 60;
    this.top = this.y - 60;


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

