class terrainRect {
  constructor(x, y, w, h, rotation) {
    this.body = Bodies.rectangle(x, y, w, h, {
      isStatic: true,
      label: 'ground',
    });
    World.add(world, this.body);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.rotation = rotation;

    this.show = function () {
      let pos = this.body.position;
      let angle = this.body.angle;

      push();
      fill(255);
      translate(pos.x, pos.y);
      rectMode(CENTER);
      rotate(angle);
      rect(0, 0, this.w, this.h);
      pop();
    };
  }
}

class terrainCircle {
  constructor(x, y, s) {
    this.body = Bodies.circle(x, y, s / 2, {
      isStatic: true,
      label: 'ground',
    });
    World.add(world, this.body);
    this.x = x;
    this.y = y;
    this.s = s;

    this.show = function () {
      let pos = this.body.position;
      let angle = this.body.angle;

      push();
      fill(255);
      translate(pos.x, pos.y);
      rectMode(CENTER);
      rotate(angle);
      circle(0, 0, this.s);
      pop();
    };
  }
}
