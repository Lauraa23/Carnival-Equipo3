const rock = 1;
const scissors = 2;
const paper = 3;
let userChoice = 0;
let userScore = 0;
let machineScore = 0;

function handUserSelection() {
  const piedra = document.getElementById("piedra");
  const tijera = document.getElementById("tijera");
  const papel = document.getElementById("papel");

  if (piedra && tijera && papel) {
    piedra.addEventListener("click", (event) =>
      processUserSelection(event, rock)
    );
    tijera.addEventListener("click", (event) =>
      processUserSelection(event, scissors)
    );
    papel.addEventListener("click", (event) =>
      processUserSelection(event, paper)
    );
  }
}

function processUserSelection(event, choice) {
  if (userScore < 3 && machineScore < 3) {
    userChoice = choice;
    gameResult();
  }
}

function handMachineSelection() {
  const possibleResult = [rock, scissors, paper];
  const randomizerResult = Math.floor(Math.random() * possibleResult.length);
  return possibleResult[randomizerResult];
}

function determineWinner(userResult, machineResult) {
  if (userResult === machineResult) {
    alert("Empate");
  } else if (
    (userResult === rock && machineResult === scissors) ||
    (userResult === scissors && machineResult === paper) ||
    (userResult === paper && machineResult === rock)
  ) {
    alert("¡Buena elección 😸!");
    userScore++;
    updateScores();
  } else {
    alert("¡Mala elección 🙀!");
    machineScore++;
    updateScores();
  }
}

function updateScores() {
  document.getElementById("score1").textContent = userScore;
  document.getElementById("score2").textContent = machineScore;
  roundFinalWinner();
}

function roundFinalWinner() {
  if (userScore === 3) {
    alert("¡Felicidades! Ganaste la ronda 😺");
    disableGame();
    launchConfetti();
  } else if (machineScore === 3) {
    alert("Lo siento, has perdido la ronda 😿");
    disableGame();
    launchPoop();
  }
}

// funcion lanza confetti 
function launchConfetti() {
  let duration = 5 * 1000;
  let end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}

// fin

//popos
function launchPoop() {
  (function frame() {
    // Crea el emoji de popo y lo lanza desde arriba
    const poop = document.createElement("div");
    poop.classList.add("poop");
    poop.innerText = "💩"; 
    poop.style.left = Math.random() * window.innerWidth + "px";
    poop.style.top = "-50px"; 
    document.body.appendChild(poop);

    const poopAnimation = poop.animate([
      { top: "-50px", opacity: 1 }, 
      { top: "100vh", opacity: 0 } 
    ], {
      duration: 5000, 
      easing: "linear", 
      fill: "forwards",
    });

    poopAnimation.onfinish = () => {
      poop.remove();
    };

    // Continúa lanzando popo si la animación no ha terminado
    poopAnimation.oncancel = poopAnimation.onfinish; // Manejo para navegadores antiguos que no soportan onfinish

    requestAnimationFrame(frame);
  }());
}
//fin


function disableGame() {
  const piedra = document.getElementById("piedra");
  const papel = document.getElementById("papel");
  const tijera = document.getElementById("tijera");

  if (piedra && papel && tijera) {
    piedra.removeEventListener("click", handUserSelection);
    papel.removeEventListener("click", handUserSelection);
    tijera.removeEventListener("click", handUserSelection);
  }
}

function gameResult() {
  const machineChoice = handMachineSelection();
  const result = determineWinner(userChoice, machineChoice);
}

document.addEventListener("DOMContentLoaded", handUserSelection);

export { handUserSelection };
