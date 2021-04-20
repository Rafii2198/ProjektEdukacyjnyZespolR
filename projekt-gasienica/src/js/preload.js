function preload() {
  //ANCHOR Textures

  projectile_TEXTURE = loadImage('./assets/projectile.png');
  targetRed_TEXTURE = loadImage('./assets/Targets/cel.png');
  targetGreen_TEXTURE = loadImage('./assets/Targets/cel2.png');
  targetPurple_TEXTURE = loadImage('./assets/Targets/cel3.png');
  player_TEXTURE = loadImage('./assets/Player/tank.png');
  lufa_TEXTURE = loadImage('./assets/Player/frame1.png');

  // ANCHOR Sounds
  firing_SOUND = new Audio('./assets/Sounds/firing.ogg');
  levelComplete_SOUND = new Audio('./assets/Sounds/levelComplete.ogg');
  levelFailed_SOUND = new Audio('./assets/Sounds/levelFail.ogg');
  score_SOUND = new Audio('./assets/Sounds/score.ogg');
}
