document.getElementById("playButton").addEventListener("click", () => {
  window.location.href = "../views/game.html";
});

document.getElementById("ruleButton").addEventListener("click", () => {
  window.location.href = "../views/instructions.html";
});

document.addEventListener("DOMContentLoaded", function() {
  const button = document.getElementById("soundButton");
  const hoverSound = document.getElementById("hoverSound");

  button.addEventListener("mouseover", function() {
      hoverSound.play();
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll('.menuButton');
  const hoverSound = document.getElementById('hoverSound');

  buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
          hoverSound.play();
      });
  });
});