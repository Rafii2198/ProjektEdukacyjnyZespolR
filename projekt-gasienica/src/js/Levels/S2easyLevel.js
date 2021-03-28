// ANCHOR Aliases
const Engine = Matter.Engine,
  World = Matter.World,
  Vector = Matter.Vector,
  Body = Matter.Body,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var maxShots = 5;
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
  player = new Player(60, 290, 5);
  // ANCHOR Adding targets
  targets.push(new target(250, (height / 4) * 3.5, 30, 50));
  targets.push(new target(400, (height / 4) * 3.5, 35, 50));
  targets.push(new target(550, (height / 4) * 3.5, 40, 50));
  targets.push(new target(700, (height / 4) * 3.5, 45, 50));

  // ANCHOR Adding terrain
  terrain.push(new terrainRect(0, (height / 4) * 3, 250, height / 2));
}

function draw() {
  background(51);
  image(bacground1_TEXTURE, -300, 0, 1200, 659);
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
      if (Points > localStorage.getItem('S2easyLevel_Score')) {
        window.localStorage.setItem('S2easyLevel_Score', Points);
      }
      window.location.href = '../index.html';
    });
  }
}
