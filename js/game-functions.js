const rock = 1;
const scissors = 2;
const paper = 3;
let userChoice = 0;
let userScore = 0;
let machineScore = 0;
let timerId;

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

// COMIENZA EL TEMPORIZADOR PARA EL TURNO

function startTimer() {
  let time = 6;
  timerId = setInterval(() => {
    time--;

    document.getElementById("time").textContent = `00:0${time}`;

    if (time <= 0) {
      clearInterval(timerId);
      alert("¡Tiempo agotado! Has perdido el turno 😿");
      machineScore++;
      updateScores();
      if (userScore < 3 && machineScore < 3) {
        startTimer();
      }
    }
  }, 1000);
}

// DETIENE EL TEMPORIZADOR

function stopTimer() {
  clearInterval(timerId);
}

function processUserSelection(event, choice) {
  if (userScore < 3 && machineScore < 3) {
    userChoice = choice;
    stopTimer();
    startTimer();
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
  if (userScore === 3 || machineScore === 3) {
    stopTimer();

    if (userScore === 3) {
      alert("¡Felicidades! Ganaste la ronda 😺");
      launchConfetti();
    } else if (machineScore === 3) {
      alert("Lo siento, has perdido la ronda 😿");
      launchPoop();
    }
    disableGame();
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
      origin: { x: 0 },
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// fin

//popos
function launchPoop() {
  const duration = 5000;

  const intervalId = setInterval(createEmoji, 100);

  setTimeout(() => clearInterval(intervalId), duration);

  function createEmoji() {
    const poop = document.createElement("div");
<<<<<<< HEAD
    poop.className = "poop";
    poop.innerText = "💩";
=======
    poop.classList.add("poop");
    poop.innerText = "💩";
    poop.style.position = "fixed"; // Cambiado a 'fixed' para evitar scroll
>>>>>>> 55a50015ed3eb6a06850af8a70a549e085f3fe26
    poop.style.left = Math.random() * window.innerWidth + "px";
    poop.style.top = "-50px";
    document.body.appendChild(poop);

<<<<<<< HEAD
    poop.animate(
      [{ top: "-50px", opacity: 2 }, { top: "100vh", opacity: 0 }],
      {
        duration: duration,
        easing: "linear",
        fill: "forwards"
      }
    ).onfinish = () => poop.remove();
  }
=======
    const poopAnimation = poop.animate(
      [
        { top: "-50px", opacity: 1 },
        { top: "100vh", opacity: 0 },
      ],
      {
        duration: 5000,
        easing: "linear",
        fill: "forwards",
      }
    );

    poopAnimation.onfinish = () => {
      poop.remove();
    };

    // Continúa lanzando popo si la animación no ha terminado
    poopAnimation.oncancel = poopAnimation.onfinish; // Manejo para navegadores antiguos que no soportan onfinish

    requestAnimationFrame(frame);
  })();
>>>>>>> 55a50015ed3eb6a06850af8a70a549e085f3fe26
}

//fin

function disableGame() {
  const piedra = document.getElementById("piedra");
  const papel = document.getElementById("papel");
  const tijera = document.getElementById("tijera");

  if (piedra && papel && tijera) {
    piedra.removeEventListener("click", processUserSelection);
    papel.removeEventListener("click", processUserSelection);
    tijera.removeEventListener("click", processUserSelection);
  }
}

function gameResult() {
  const machineChoice = handMachineSelection();
  determineWinner(userChoice, machineChoice);
}

document.addEventListener("DOMContentLoaded", () => {
  handUserSelection();
  startTimer();
});

export { handUserSelection };
