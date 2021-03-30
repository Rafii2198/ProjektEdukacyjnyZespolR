let menuLevelClicked = new Audio('assets/Sounds/menuLevelClick.ogg');
let buttonsSounds = document.getElementsByClassName('menuLevels');
var file;
var levels = [
  ['tutorialLevel', 'mediumLevel', 'medium2Level', 'harderLevel'],
  ['S2easyLevel', 'S2mediumLevel', 'S2mediumLevel2', 'S2harderLevel'],
  ['S3easyLevel', 'S3mediumLevel', 'S3mediumLevel2', 'hidden'],
];
var page = 0;
function changeLevels() {
  document.getElementById('pageInfo').innerText = `Strona: ${page + 1} z ${
    levels.length
  }`;
  let slots = document.getElementsByName('slot');
  let imageSlots = document.getElementsByName('imageSlot');
  let scoreSlots = document.getElementsByName('scoreSlot');
  for (let i = 0; i < slots.length; i++) {
    slots[i].id = levels[page][i];
    imageSlots[i].src = 'assets/LevelImages/' + levels[page][i] + '.png';
    scoreSlots[i].id = levels[page][i] + '_Score';
  }
}

function changeButtons() {
  Array.prototype.forEach.call(buttonsSounds, (element) => {
    if (localStorage.getItem(element.id + '_Score')) {
      document.getElementById(element.id + '_Score').innerText =
        'Wynik: ' + localStorage.getItem(element.id + '_Score');
    } else if (document.getElementById(element.id + '_Score') != null) {
      document.getElementById(element.id + '_Score').innerText =
        'Nie ukończono';
    }
    element.onclick = () => {
      menuLevelClicked.play();
      file = 'Levels/' + element.id + '.html';
    };
  });
  menuLevelClicked.addEventListener('ended', () => {
    window.location.href = file;
  });
}

changeLevels();
changeButtons();

async function changePage(way) {
  if (way === true && page != levels.length - 1) {
    page++;
    changeLevels();
    changeButtons();
  } else if (way === false && page != 0) {
    page--;
    changeLevels();
    changeButtons();
  }
}
