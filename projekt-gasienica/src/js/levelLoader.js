const urlParams = new URLSearchParams(window.location.search);
const levelSel = urlParams.get('level');
console.log(levelSel);
var selectedLevel;
var levelData;
for (let page in levels) {
  for (let i = 0; i < levels[page].length; i++) {
    console.log(levels[page][i]);
    console.log(levels[page][i]);
    if (levels[page][i] === levelSel) {
      selectedLevel = `./js/jlevels/${page}/${levels[page][i]}.json`;
      break;
    }
  }
}
console.log(selectedLevel);
var levelData;
var request = new XMLHttpRequest();
request.open('GET', selectedLevel, false); // `false` makes the request synchronous
request.send(null);

if (request.status === 200) {
  levelData = JSON.parse(request.responseText);
}

console.log(levelData);
console.log(levelData.targets);
console.log(levelData.targets[1]);
document.title = `Projekt Gąsienica - ${levelData.levelName}`;

// ANCHOR Aliases
const Engine = Matter.Engine,
  World = Matter.World,
  Vector = Matter.Vector,
  Body = Matter.Body,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var maxShots = levelData.maxShots;
// ANCHOR Predefinitions
let engine;
let world;
let projectiles = [];
let targets = [];
let terrain = [];
let Points = 0;
var player;
var played = false;

var map_background;

function setup() {
  createCanvas(800, 600);
  frameRate(60);
  map_background = loadImage(levelData.background[0]);
  engine = Engine.create();
  world = engine.world;
  world.gravity.y = 1.425;
  Events.on(engine, 'collisionStart', hitDetection);
  Engine.run(engine);
  var ground = Bodies.rectangle(400, 600, 100000, 10, {
    isStatic: true,
    label: 'ground',
  });
  World.add(world, ground);
  player = new Player(
    levelData.player[0],
    levelData.player[1],
    levelData.player[2]
  );
  // ANCHOR Adding targets
  for (let i = 0; i < levelData.targets.length; i++) {
    targets.push(
      new target(
        levelData.targets[i][0],
        levelData.targets[i][1],
        levelData.targets[i][2],
        levelData.targets[i][3]
      )
    );
  }
  console.log(targets);

  // ANCHOR Adding terrain
  for (let i = 0; i < levelData.terrainRect.length; i++) {
    terrain.push(
      new terrainRect(
        levelData.terrainRect[i][0],
        levelData.terrainRect[i][1],
        levelData.terrainRect[i][2],
        levelData.terrainRect[i][3]
      )
    );
  }
  for (let i = 0; i < levelData.terrainCircle.length; i++) {
    terrain.push(
      new terrainCircle(
        levelData.terrainCircle[i][0],
        levelData.terrainCircle[i][1],
        levelData.terrainCircle[i][2]
      )
    );
  }
}

function draw() {
  background(51);
  image(
    map_background,
    levelData.background[1],
    levelData.background[2],
    levelData.background[3],
    levelData.background[4]
  );
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
  renderText();
  if (
    maxShots === 0 &&
    Aiming.aimingMode === true &&
    played === false &&
    (levelComplete_SOUND.ended === false || levelFailed_SOUND.ended === false)
  ) {
    if (targets.length === 0) {
      levelComplete_SOUND.play();
      played = true;
    } else {
      levelFailed_SOUND.play();
      played = true;
    }
  }
}
