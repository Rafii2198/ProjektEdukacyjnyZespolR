// ANCHOR Aliases
const Engine = Matter.Engine,
  World = Matter.World,
  Vector = Matter.Vector,
  Body = Matter.Body,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var maxShots = 8;
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
  player = new Player(width / 2, 165, 5);
  // ANCHOR Adding targets
  targets.push(new target(137, 300, 40, 50));
  targets.push(new target(137, 500, 40, 50));
  targets.push(new target(137, 100, 40, 50));
  targets.push(new target(663, 300, 40, 50));
  targets.push(new target(663, 500, 40, 50));
  targets.push(new target(663, 100, 40, 50));

  // ANCHOR Adding terrain
  terrain.push(
    new terrainRect(width / 2, (height / 3) * 2, 250, (height / 4) * 3)
  );
}
 // ZW
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
      if (Points > localStorage.getItem('S2mediumLevel_Score')) {
        window.localStorage.setItem('S2mediumLevel_Score', Points);
      }
      window.location.href = '../index.html';
    });
  }
}
