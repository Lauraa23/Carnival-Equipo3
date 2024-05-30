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
  let time = 8;
  timerId = setInterval(() => {
    time--;

    document.getElementById("time").textContent = `00:0${time}`;

    if (time <= 0) {
      clearInterval(timerId);
      alert("¡Tiempo agotado! Has perdido el turno 😿");
      machineScore++;
      updateScores();
    }
  }, 1000);
}

// DETIENE EL TEMPORIZADOR

function stopTimer() {
  clearInterval(timerId);
}

function processUserSelection(event, choice) {
  if (userScore < 3 && machineScore < 3) {
    stopTimer();
    userChoice = choice;
    gameResult();
    startTimer();
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
  } else if (machineScore === 3) {
    alert("Lo siento, has perdido la ronda 😿");
    disableGame();
  }
}

// funcion lanza confetti

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

document.addEventListener("DOMContentLoaded", () => {
  handUserSelection();
  startTimer();
});

export { handUserSelection };
