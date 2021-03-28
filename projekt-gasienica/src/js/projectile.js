var Aiming = {
  aimAngle: 0,
  angle: 0,
  aimAngleOffset: -90,
  aimX: 0,
  aimY: 0,
  magnitude: 0,
  aimingMode: true,
};
class Projectile {
  constructor(img, x, y, w, h, options) {
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    World.add(world, this.body);
    this.show = function () {
      let pos = this.body.position;
      let angle = this.body.angle;

      push();
      translate(pos.x, pos.y);
      imageMode(CENTER);
      rectMode(CENTER);
      rotate(angle);
      image(img, 0, 0, this.w, this.h);
      pop();
    };
  }
}
