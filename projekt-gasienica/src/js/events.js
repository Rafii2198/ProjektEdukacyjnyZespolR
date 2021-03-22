function hitDetection(event) {
  let pairs = event.pairs;
  for (let i = 0; i < pairs.length; i++) {
    var labelA = pairs[i].bodyA.label;
    var labelB = pairs[i].bodyB.label;
    if (labelA === 'projectile' && labelB === 'ground') {
      World.remove(world, projectiles[i].body);
      projectiles.splice(i, 1);
      Aiming.aimingMode = true;
    } else if (labelB === 'projectile' && labelA === 'ground') {
      World.remove(world, projectiles[i].body);
      projectiles.splice(i, 1);
      Aiming.aimingMode = true;
    }
    if (
      (labelA === 'projectile' && labelB === 'target') ||
      (labelB === 'projectile' && labelA === 'target')
    ) {
      for (let j = 0; j < targets.length; j++) {
        if (
          targets[j].body == pairs[i].bodyA ||
          targets[j].body == pairs[i].bodyB
        ) {
          Points += targets[j].points;
          World.remove(world, targets[j].body);
          targets.splice(j, 1);
        }
      }
    }
  }
}
