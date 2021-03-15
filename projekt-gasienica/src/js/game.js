// ANCHOR Aliases
const Engine = Matter.Engine,
  World = Matter.World,
  Vector = Matter.Vector,
  Body = Matter.Body,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

// ANCHOR Predefinitions
let engine;
let world;
let projectiles = [];
let targets = [];
let Points = 0;

var projectile_TEXTURE;
var target_TEXTURE;
function preload() {
  projectile_TEXTURE = loadImage('assets/projectile.png');
  target_TEXTURE = loadImage('assets/target.png');
}
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
  targets.push(
    new Target(target_TEXTURE, 350, 50, 50, 50, {
      isStatic: true,
      label: 'target',
    })
  );
  targets.push(
    new Target(target_TEXTURE, 700, 25, 100, 200, {
      isStatic: true,
      label: 'target',
    })
  );
}

function draw() {
  background(51);
  KeyboardControlls();
  noStroke(255);
  fill(170);
  rectMode(CENTER);
  circle(150, 530, 70);
  for (var i = 0; i < projectiles.length; i++) {
    projectiles[i].show();
  }
  for (var i = 0; i < targets.length; i++) {
    targets[i].show();
  }
  noStroke(255);
  fill(170);
  rectMode(CENTER);
  circle(150, 530, 40);
  fill(0, 255, 0);
  if (Aiming.aimingMode) {
    circle(
      Math.floor(
        Aiming.magnitude *
          Math.cos(
            (Aiming.aimAngle + Aiming.aimAngleOffset) * (Math.PI / 180)
          ) +
          150
      ),
      Math.floor(
        Aiming.magnitude *
          Math.sin(
            (Aiming.aimAngle + Aiming.aimAngleOffset) * (Math.PI / 180)
          ) +
          530
      ),
      5
    );
  }
  textAlign(CENTER);
  text(`Score: ${Points}`, width / 2, 20);
}
