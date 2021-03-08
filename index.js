// ANCHOR Globals
let gravity = 0.058;
let gravitySpeed = 0;

// ANCHOR init Canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

// ANCHOR init player
class Player {
  constructor(posX, posY, radius, color) {
    this.x = posX;
    this.y = posY;
    this.radius = radius;
    this.color = color;
  }
  draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  };
}

const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 30, "red");

// ANCHOR init Projectile
class Projectile {
  constructor(posX, posY, radius, color, velocity, magnitude = 1) {
    this.x = posX;
    this.y = posY;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.magnitude = magnitude;
    this.gravity = gravity;
    this.gravitySpeed = gravitySpeed;
  }
  draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  update = function () {
    this.gravitySpeed += this.gravity;
    this.draw();
    this.x = this.x + this.velocity.x * this.magnitude;
    this.y = this.y + this.velocity.y * this.magnitude + this.gravitySpeed;
  };
}

// ANCHOR init target
class Target {
  constructor(posX, posY, radius = 10, color) {
    this.x = posX;
    this.y = posY;
    this.radius = radius;
    this.color = color;
  }
  draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  };
}

// ANCHOR Target spawn
const targets = [
  new Target(850, 58, undefined, "green"),
  new Target(125, 980, undefined, "green"),
];
// ANCHOR Proejctile spawn
const projectiles = [];

window.addEventListener("click", (event) => {
  const angle = Math.atan2(event.clientY - player.y, event.clientX - player.x);
  projectiles.push(
    new Projectile(
      player.x,
      player.y,
      5,
      "blue",
      {
        x: Math.cos(angle),
        y: Math.sin(angle),
      },
      3
    )
  );
});

// ANCHOR viewport refresh
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  projectiles.forEach((projectile) => {
    projectile.update();
  });
  targets.forEach((target) => {
    target.draw();
  });
}
animate();
