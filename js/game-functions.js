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

    document.getElementById("endSound").play();

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
  timerSound();
}

// DETIENE EL TEMPORIZADOR

function stopTimer() {
  clearInterval(timerId);
}

function processUserSelection(event, choice) {
  if (userScore < 3 && machineScore < 3) {
    userChoice = choice;
    soundsOfHands(choice);
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
    } else if (machineScore === 3) {
      alert("Lo siento, has perdido la ronda 😿");
    }
    disableGame();
  }
}

// funcion lanza confetti

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

function timerSound() {
  const timerElement = document.getElementById("time");
  const countDownTime = 5;
  let timeRemaining = countDownTime;

  const updateTimer = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    if (timeRemaining > 0) {
      timeRemaining--;
    }
  };
}

function soundsOfHands(choice) {
  switch (choice) {
    case rock:
      document.getElementById("soundPiedra").play();
      break;
    case scissors:
      document.getElementById("soundTijera").play();
      break;
    case paper:
      document.getElementById("soundPapel").play();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  handUserSelection();
  startTimer();
});

export { handUserSelection };
