// ANCHOR Aliases
const Engine = Matter.Engine,
  World = Matter.World,
  Vector = Matter.Vector,
  Body = Matter.Body,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var maxShots = 4;
// ANCHOR Predefinitions
let engine;
let world;
let projectiles = [];
let targets = [];
let terrain = [];
let Points = 0;
var player;
function setup() {
  createCanvas(800, 600);
  frameRate(60);
  engine = Engine.create();
  world = engine.world;
  world.gravity.y = 1.5;
  Events.on(engine, 'collisionStart', hitDetection);
  Engine.run(engine);
  var ground = Bodies.rectangle(400, 600, 100000, 10, {
    isStatic: true,
    label: 'ground',
  });
  World.add(world, ground);
  player = new Player(400, 535, 5);
  // ANCHOR Adding targets
  targets.push(new target(50, 400, 45, 50));
  targets.push(new target(220, 450, 45, 50));
  targets.push(new target(280, 125, 45, 50));
  targets.push(new target(520, 125, 45, 50));
  targets.push(new target(580, 450, 45, 50));
  targets.push(new target(750, 400, 45, 50));

  // ANCHOR Adding terrain
  terrain.push(new terrainRect(400, 575, 800, 50));
}

function draw() {
  background(51);
  image(bacground3_TEXTURE, 0, 0, 1200, 659);
  KeyboardControlls();
  noStroke(255);
  fill(170);
  rectMode(CENTER);
  for (var i = 0; i < terrain.length; i++) {
    terrain[i].show();
  }
  player.show();
  for (var i = 0; i < projectiles.length; i++) {
    projectiles[i].show();
  }
  for (var i = 0; i < targets.length; i++) {
    targets[i].show();
  }
  textAlign(CENTER);
  if (maxShots != 0) {
    text(`Wynik: ${Points}`, width / 2, 24);
  } else {
    text(`Kliknij Prawy Przycisk myszy`, width / 2, 24);
    window.addEventListener('click', () => {
      if (Points > localStorage.getItem('medium2Level_Score')) {
        window.localStorage.setItem('medium2Level_Score', Points);
      }
      window.location.href = '../index.html';
    });
  }
}
