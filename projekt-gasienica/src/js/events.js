function hitDetection(event) {
  console.log(event);
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
    if (labelA === 'projectile' && labelB === 'target') {
      Points += targets[i].points;
      World.remove(world, targets[i].body);
      targets.splice(i, 1);
    } else if (labelB === 'projectile' && labelA === 'target') {
      Points += targets[i].points;
      World.remove(world, targets[i].body);
      targets.splice(i, 1);
    }
  }
}
