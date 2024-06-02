const rock = 1;
const scissors = 2;
const paper = 3;
let userChoice = 0;
let userScore = 0;
let machineScore = 0;
let timerId;
const manoA = document.getElementById("manoA");
const manoB = document.getElementById("manoB");

function startTimer() {
  let time = 6;
  clearInterval(timerId); 
  timerId = setInterval(() => {
    document.getElementById("endSound").play(); 
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

function stopTimer() {
  clearInterval(timerId);
  const endSound = document.getElementById("endSound");
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

function showHandMachineChoice(choice) {
  const machineHand = document.getElementById("manoB");
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

function processUserSelection(event, choice) {
  if (userScore < 3 && machineScore < 3) {
    userChoice = choice;
    stopTimer();
    resetHands();
    animateHands().then(() => {
      soundsOfHands(choice);
      showHandUserChoice(choice);
      const machineChoice = handMachineSelection();
      showHandMachineChoice(machineChoice);
      determineWinner(userChoice, machineChoice);
      if (userScore < 3 && machineScore < 3) {
        startTimer();
      }
    });
  }
}

function handMachineSelection() {
  const possibleResult = [rock, scissors, paper];
  const randomizerResult = Math.floor(Math.random() * possibleResult.length);
  return possibleResult[randomizerResult];
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
    disableGame();
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

function gameResult(machineChoice) {
  determineWinner(userChoice, machineChoice);
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

function animateHands() {
  return new Promise((resolve) => {
    manoA.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(-100px)" }],
      { duration: 200 }
    );
    manoB.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(100px)" }],
      { duration: 200 }
    ).onfinish = function () {
      manoA.animate(
        [{ transform: "translateX(-100px)" }, { transform: "translateX(0)" }],
        { duration: 100 }
      );
      manoB.animate(
        [{ transform: "translateX(100px)" }, { transform: "translateX(0)" }],
        { duration: 100 }
      ).onfinish = function () {
        manoA.animate(
          [{ transform: "translateX(0)" }, { transform: "translateX(-100px)" }],
          { duration: 200 }
        );
        manoB.animate(
          [{ transform: "translateX(0)" }, { transform: "translateX(100px)" }],
          { duration: 200 }
        ).onfinish = function () {
          manoA.animate(
            [
              { transform: "translateX(-100px)" },
              { transform: "translateX(0)" },
            ],
            { duration: 100 }
          );
          manoB.animate(
            [
              { transform: "translateX(100px)" },
              { transform: "translateX(0)" },
            ],
            { duration: 100 }
          ).onfinish = function () {
            manoA.animate(
              [
                { transform: "translateX(0)" },
                { transform: "translateX(-100px)" },
              ],
              { duration: 200 }
            );
            manoB.animate(
              [
                { transform: "translateX(0)" },
                { transform: "translateX(100px)" },
              ],
              { duration: 200 }
            ).onfinish = function () {
              manoA.animate(
                [
                  { transform: "translateX(-100px)" },
                  { transform: "translateX(0)" },
                ],
                { duration: 100 }
              );
              manoB.animate(
                [
                  { transform: "translateX(100px)" },
                  { transform: "translateX(0)" },
                ],
                { duration: 100 }
              ).onfinish = function () {
                resolve();
              };
            };
          };
        };
      };
    };
  });
}

function resetHands() {
  const userHand = document.getElementById("manoA");
  const machineHand = document.getElementById("manoB");
  userHand.src = "../Recursos/Mano.svg";
  machineHand.src = "../Recursos/Mano.svg";
}

document.addEventListener("DOMContentLoaded", () => {
  handUserSelection();
  startTimer();
});
