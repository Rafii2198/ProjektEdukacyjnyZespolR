function renderText() {
  push();
  textAlign(CENTER);
  color(240);
  stroke(0);
  strokeWeight(0.15);
  textSize(18);
  textFont('bahnschrift');
  if (played === false) {
    text(`Wynik: ${Points}`, width / 2, 24);
  } else {
    text(`Kliknij Lewy Przycisk myszy`, width / 2, 24);
    text(`Wynik: ${Points}`, width / 2, 46);
  }
  if (maxShots === 0) {
    window.addEventListener('click', () => {
      if (Points > localStorage.getItem(`${levelName}_Score`)) {
        window.localStorage.setItem(`${levelName}_Score`, Points);
      }
      window.location.href = '../index.html';
    });
  }
  pop();
}
