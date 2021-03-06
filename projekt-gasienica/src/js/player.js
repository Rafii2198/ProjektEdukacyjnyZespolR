class Player {
  constructor(x, y, size = 5) {
    this.x = x;
    this.y = y;
    this.size = size / 5;
    this.show = function () {
      push();
      translate(this.x, this.y);
      imageMode(CORNER);
      angleMode(DEGREES);
      rotate(Aiming.aimAngle - 180);
      image(lufa_TEXTURE, 0, 0, 54 / size, 225 / size);
      pop();
      push();
      translate(this.x, this.y);
      imageMode(CENTER);
      rectMode(CENTER);
      image(player_TEXTURE, 0, 0, 453 / size, 204 / size);
      pop();
      push();
      fill(0, 255, 0);
      if (Aiming.aimingMode === true && maxShots != 0) {
        circle(
          Math.floor(
            Aiming.magnitude *
              Math.cos(
                (Aiming.aimAngle + Aiming.aimAngleOffset) * (Math.PI / 180)
              ) +
              player.x
          ),
          Math.floor(
            Aiming.magnitude *
              Math.sin(
                (Aiming.aimAngle + Aiming.aimAngleOffset) * (Math.PI / 180)
              ) +
              player.y
          ),
          5
        );
      }
      pop();
      push();
      textAlign(CENTER);
      color(255);
      stroke(0);
      strokeWeight(0.15);
      textSize(16);
      textFont('bahnschrift');
      text(`Strzały: ${maxShots}`, player.x, player.y - 65);
      pop();
    };
  }
}
