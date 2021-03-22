let menuLevelClicked = new Audio('assets/Sounds/menuLevelClick.ogg');

document.getElementById('testLevel').onclick = () => {
  menuLevelClicked.play();
};
menuLevelClicked.addEventListener('ended', () => {
  window.location.href = 'Levels/testLevel.html';
});

// ANCHOR TestLevel score
if (localStorage.getItem('testLevel_Score')) {
  document.getElementById('testLevel_Score').innerText =
    'Score: ' + localStorage.getItem('testLevel_Score');
} else {
  document.getElementById('testLevel_Score').innerText = 'Not Finished';
}
