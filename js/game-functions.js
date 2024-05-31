const rock = 1;
const scissors = 2;
const paper = 3;
let userChoice = 0;
let userScore = 0;
let machineScore = 0;
let timerId;

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
}

function stopTimer() {
  clearInterval(timerId);
  endSound.pause();
  endSound.currentTime = 0;
}

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

function showHandUserChoice(choice) {
  const userHand = document.getElementById("manoA");
  switch (choice) {
    case rock:
      userHand.src = "../Recursos/Piedra.svg";
      break;
    case scissors:
      userHand.src = "../Recursos/Tijera.svg";
      break;
    case paper:
      userHand.src = "../Recursos/Papel.svg";
  }
}

function processUserSelection(event, choice) {
  if (userScore < 3 && machineScore < 3) {
    userChoice = choice;
    stopTimer();
    startTimer();
    soundsOfHands(choice);
    animateHands(function () {
      showHandUserChoice(choice);
      gameResult();
    });
  }
}

function handMachineSelection() {
  const possibleResult = [rock, scissors, paper];
  const randomizerResult = Math.floor(Math.random() * possibleResult.length);
  const machineChoice = possibleResult[randomizerResult];
  console.log("Machine choice: ", machineChoice);
  soundsOfHands(machineChoice);
  showHandMachineChoice(machineChoice);
  return machineChoice;
}

function showHandMachineChoice(choice) {
  const machineHand = document.getElementById("manoB");
  console.log("Updating machine hand image: ", choice);
  switch (choice) {
    case rock:
      machineHand.src = "../Recursos/Piedra.svg";
      break;
    case scissors:
      machineHand.src = "../Recursos/Tijera.svg";
      break;
    case paper:
      machineHand.src = "../Recursos/Papel.svg";
  }
}

function determineWinner(userResult, machineResult) {
  if (userResult === machineResult) {
    setTimeout(() => alert("Empate"), 500);
  } else if (
    (userResult === rock && machineResult === scissors) ||
    (userResult === scissors && machineResult === paper) ||
    (userResult === paper && machineResult === rock)
  ) {
    setTimeout(() => alert("¡Buena elección 😸!"), 500);
    userScore++;
    updateScores();
  } else {
    setTimeout(() => alert("¡Mala elección 🙀!"), 500);
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
  animateHands(function () {
    showHandMachineChoice(machineChoice);
    determineWinner(userChoice, machineChoice);
  });
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

function animateHands(callback) {
  $("#manoA").animate({ left: "-=100px" }, 200, function () {
    $("#manoB").animate({ left: "+=100px" }, 200, function () {
      $("#manoA").animate({ left: "+=100px" }, 100, function () {
        $("#manoB").animate({ left: "-=100px" }, 100, callback);
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  handUserSelection();
  startTimer();
});

export { handUserSelection };
