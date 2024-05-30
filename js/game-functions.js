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



/*sonido cuenta regresiva*/
document.addEventListener("DOMContentLoaded", function() {
  const timerElement = document.getElementById('time');
  const countdownTime = 5; // 10 minutes in seconds
  let timeRemaining = countdownTime;

  const updateTimer = () => {
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
      timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
      if (timeRemaining > 0) {
          timeRemaining--;
      } else {
          timerElement.classList.add('expired');
          endSound.play();
          clearInterval(timerInterval);
      }
      
  };

  const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
});

//sonido elección de piedra, papel o tijera
document.getElementById('tijera').addEventListener('click', function() {
  document.getElementById('soundTijera').play();
});

document.getElementById('piedra').addEventListener('click', function() {
  document.getElementById('soundPiedra').play();
});

document.getElementById('papel').addEventListener('click', function() {
  document.getElementById('soundPapel').play();
});

//
     /* const tijeraElement = document.getElementById("tijera");
      const piedraElement = document.getElementById("piedra");
      const papelElement = document.getElementById("papel");

      const soundTijera = document.getElementById("soundTijera");
      const soundPiedra = document.getElementById("soundPiedra");
      const soundPapel = document.getElementById("soundPapel");

tijeraElement.addEventListener('click', () => {
 soundTijera.currentTime = 0; // Reinicia el audio a su inicio
 soundTijera.play(); 
});

piedraElement.addEventListener('click', () => {
  soundPiedra.currentTime = 0;
  soundPiedra.play();
});

papelElement.addEventListener('click', () => {
  soundPapel.currentTime = 0;
  soundPapel.play();
}); */

export { handUserSelection };