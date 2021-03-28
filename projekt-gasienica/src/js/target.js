class target {
  constructor(x, y, d, points) {
    this.body = Bodies.circle(x, y, d / 2, {
      isStatic: true,
      label: 'target',
    });
    this.img = random([
      targetRed_TEXTURE,
      targetGreen_TEXTURE,
      targetPurple_TEXTURE,
    ]);
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
      image(this.img, 0, 0, this.d, this.d);
      pop();
    };
  }
}
