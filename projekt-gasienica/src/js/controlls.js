function KeyboardControlls() {
  if (Aiming.aimingMode) {
    if (keyIsPressed && key == ' ') {
      // Shooting
      let proj = new Projectile(projectile_TEXTURE, 150, 530, 25, 25, {
        label: 'projectile',
      });
      Aiming.aimX = Math.floor(
        Aiming.magnitude *
          Math.cos(
            (Aiming.aimAngle + Aiming.aimAngleOffset) * (Math.PI / 180)
          ) +
          proj.x
      );
      Aiming.aimY = Math.floor(
        Aiming.magnitude *
          Math.sin(
            (Aiming.aimAngle + Aiming.aimAngleOffset) * (Math.PI / 180)
          ) +
          proj.y
      );
      const angle = Math.atan2(Aiming.aimY - proj.y, Aiming.aimX - proj.x);
      Body.applyForce(
        proj.body,
        { x: proj.x, y: proj.y },
        {
          x: Math.cos(angle) * (Aiming.magnitude / 1500),
          y: Math.sin(angle) * (Aiming.magnitude / 1500),
        }
      );
      Aiming.aimingMode = false;
      projectiles.push(proj);
    }
    if (
      keyIsPressed &&
      (keyCode === UP_ARROW || key == 'w' || key == 'W') &&
      Aiming.magnitude != 100
    ) {
      // Magnitude increase
      Aiming.magnitude += 1;
    }
    if (
      keyIsPressed &&
      (keyCode === DOWN_ARROW || key == 's' || key == 'S') &&
      Aiming.magnitude !== 0
    ) {
      // Magnitude Decrease
      Aiming.magnitude -= 1;
    }
    if (
      keyIsPressed &&
      (keyCode === RIGHT_ARROW || key == 'd' || key == 'D') &&
      Aiming.aimAngle != 360
    ) {
      // Angle increase
      Aiming.aimAngle += 1;
    }
    if (
      keyIsPressed &&
      (keyCode === LEFT_ARROW || key == 'a' || key == 'A') &&
      Aiming.aimAngle != 0
    ) {
      // Angle decrease
      Aiming.aimAngle -= 1;
    }
  }
}
