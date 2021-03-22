// ANCHOR Aliases
const Engine = Matter.Engine,
  World = Matter.World,
  Vector = Matter.Vector,
  Body = Matter.Body,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var maxShots = 3;
// ANCHOR Predefinitions
let engine;
let world;
let projectiles = [];
let targets = [];
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
  player = new Player(150, 430, 5);
  for (let i = 0; i < random(1, 8); i++) {
    targets.push(new Target(random(50, 750), random(50, 550), 50, 50));
  }
}

function draw() {
  background(51);
  KeyboardControlls();
  noStroke(255);
  fill(170);
  rectMode(CENTER);
  player.show();
  for (var i = 0; i < projectiles.length; i++) {
    projectiles[i].show();
  }
  for (var i = 0; i < targets.length; i++) {
    targets[i].show();
  }
  textAlign(CENTER);
  if (maxShots != 0) {
    text(`Score: ${Points}`, width / 2, 24);
  } else {
    text(`Press anywhere to continue`, width / 2, 24);
    window.addEventListener('click', () => {
      if (Points > localStorage.getItem('testLevel_Score')) {
        window.localStorage.setItem('testLevel_Score', Points);
      }
      window.location.href = '../index.html';
    });
  }
}
