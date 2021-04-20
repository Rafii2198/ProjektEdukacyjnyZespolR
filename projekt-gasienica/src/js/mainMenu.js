let menuLevelClicked = new Audio('assets/Sounds/menuLevelClick.ogg');
let buttonsSounds = document.getElementsByClassName('menuLevels');
var file;
levels = Object.values(levels);
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
      file = `level.html?level=${element.id}`;
    };
  });
  menuLevelClicked.addEventListener('ended', () => {
    window.location.href = file;
  });
}

changeLevels();
changeButtons();

document.getElementById('buttonRight').onclick = () => {
  if (page != levels.length - 1) {
    page++;
    changeLevels();
    changeButtons();
  }
};

document.getElementById('buttonLeft').onclick = () => {
  if (page != 0) {
    page--;
    changeLevels();
    changeButtons();
  }
};
