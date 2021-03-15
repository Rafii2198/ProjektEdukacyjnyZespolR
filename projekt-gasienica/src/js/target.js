class Target {
  constructor(img, x, y, d, points, options) {
    this.body = Bodies.circle(x, y, d - 15, options);
    this.points = points;
    this.x = x;
    this.y = y;
    this.d = d;
    World.add(world, this.body);
    this.show = function () {
      let pos = this.body.position;
      let angle = this.body.angle;

      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      rectMode(CENTER);
      image(img, 0, 0, this.d, this.d);
      pop();
    };
  }
}
