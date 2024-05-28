const rock = 1;
const scissors = 2;
const paper = 3;
let userChoice = 0;

function handUserSelection() {
  const piedra = document.getElementById("piedra");
  const tijera = document.getElementById("tijera");
  const papel = document.getElementById("papel");

  if (piedra && tijera && papel) {
    piedra.addEventListener("click", () => {
      userChoice = rock;
      gameResult();
    });

    tijera.addEventListener("click", () => {
      userChoice = scissors;
      gameResult();
    });

    papel.addEventListener("click", () => {
      userChoice = paper;
      gameResult();
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
    alert("Empate");
  } else if (
    (userResult === rock && machineResult === scissors) ||
    (userResult === scissors && machineResult === paper) ||
    (userResult === paper && machineResult === rock)
  ) {
    alert("¡Buena elección!");
  } else {
    alert("¡Mala elección :( !");
  }
}

function gameResult() {
  const machineChoice = handMachineSelection();
  console.log(machineChoice);
  const result = determineWinner(userChoice, machineChoice);
}

export { handUserSelection };
