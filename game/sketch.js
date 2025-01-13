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

let buttoncolor = 'blueViolet';
let trianglecolor = 250;

function playbutton() {
  noStroke();
  fill(buttoncolor);
  textSize();
  rect(width / 2, height / 2, 300, 200, 10, 10, 10, 10);
  fill(trianglecolor);
  triangle(width / 2 - 40, height / 2 - 80, width / 2 + 60, height / 2 + 5, width / 2 - 40, height / 2 + 80);

  image(player, 300, 500, 500, 500);
  if (mouseX <= width / 2 + 150 && mouseX >= width / 2 - 150 && mouseY <= height / 2 + 100 && mouseY >= height / 2 - 100) {
    buttoncolor = color(100), trianglecolor = color(200);

  }

  else {
    buttoncolor = 'blueViolet';
    trianglecolor = 'white';
  }
  if (mouseX <= width / 2 + 150 && mouseX >= width / 2 - 150 && mouseY <= height / 2 + 100 && mouseY >= height / 2 - 100 && mouseIsPressed === true) {
    gamestate = 1;
  }

}


function menu() {
  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
  image(forest, windowWidth / 2, windowHeight / 2, windowWidth + 1, windowHeight);
  fill('violet');
  textSize(70);
  textFont('Courier New');
  text("Wizard vs Evil Forces", width / 2, 150);
  textSize(30);
  fill(250);
  text("Press button to play", width / 2, 350);
  playbutton();
  fill('IVORY');
  text("Controls", width * 0.8, 250);

  text("WASD: Player movement", width * 0.8, 400);

  text("Click: Shoot", width * 0.8, 500);

  text("Esc: Menu", width * 0.8, 600);
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
    if (keyIsPressed) {
      if (keyCode === 27) {
        gamestate = 0;
      }
    }
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
      Melee.move();

    }
    points();
    for (let Melee of melees) {
      for (let Spell of spells) {
        if (dist(Melee.pos.x, Melee.pos.y - 90, Spell.pos.x, Spell.pos.y) < 60) {

          melees.splice(melees.indexOf(Melee), 1);
          spells.splice(spells.indexOf(Spell), 1);
          kill += 1;  // player kills +1 enemy, counts for his final score
        }
      }


      if (dist(hero.pos.x, hero.pos.y + 100, Melee.pos.x, Melee.pos.y) < 100) {
        gamestate = 2;
      }

    }
   
  }



  //////////////////////////////////// GAMESTATE 2 ////////////////////////////////////

  // GAME OVER SCREEN
  if (gamestate === 2) {
    if (keyIsPressed) {
      if (keyCode === 32) {
        gamestate = 1;
      }
      else if (keyCode === 27) {
        gamestate = 0;
      }
    }
    background(120, 120, 120);
    textAlign(CENTER);
    textSize(70);
    fill('yellow');
    textFont('Courier New');
    text("GAME OVER", windowWidth / 2, windowHeight / 2);
    textSize(30);
    text("Press space to restart", windowWidth / 2, windowHeight - 250);
    text("Esc to leave", windowWidth / 2, windowHeight - 200);
  }


}


class Character {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    heroX = this.pos.x;
    heroY = this.pos.y;

  }

  display() {
    imageMode(CENTER);
    image(player, heroX, heroY, r * 2, r * 2);

  }

  move() {  // player movement and check for borders in the canvas 
    heroX = this.pos.x;
    heroY = this.pos.y;
    if (keyIsPressed) {
      if (keyCode === 68) {  // move to the right
        hero.pos.x += 6;
        if (hero.pos.x >= windowWidth - 20) {     // check right border
          hero.pos.x = windowWidth - 20;
        }
      }
      if (keyCode === 65) {  // move to the left
        hero.pos.x -= 6;
        if (hero.pos.x <= 20) {     // check left border
          hero.pos.x = 20;
        }
      }
      if (keyCode === 83) {  // move down
        hero.pos.y += 6;
        if (hero.pos.y >= windowHeight - 175) {   // check lower border
          hero.pos.y = windowHeight - 175;
        }
      }
      if (keyCode === 87) {  //move up
        hero.pos.y -= 6;
        if (hero.pos.y <= 20) {    // check upper border
          hero.pos.y = 20;
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
    this.pos = createVector(x, y);
    this.r = r;
    this.vel = createVector(0, 0);

    //hitbox
    this.right;
    this.left;
    this.top;
    this.bottom;
  }

  display() {
    imageMode(CENTER);
    image(npc1, this.pos.x, this.pos.y - 100, r * 2, r * 2);

    //hitbox
    this.right = this.pos.x - 60;
    this.left = this.pos.x + 60;
    this.bottom = this.pos.y + 60;
    this.top = this.pos.y - 60;


  }

  move() {
    this.vel = p5.Vector.sub(hero.pos, this.pos);
    this.vel.normalize();
    this.vel.mult(2);

    this.pos.add(this.vel);
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

