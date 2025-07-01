const paragraphEl = document.getElementById("paragraph");
const inputField = document.getElementById("input-field");
const timerEl = document.querySelector(".timer");
const wpmEl = document.getElementById("wpm");
const cpmEl = document.getElementById("cpm");
const accuracyEl = document.getElementById("accuracy");

let time = 60;
let timer;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

const sampleText = "Once upon a time in a land far, far away, there lived a curious coder who loved to build things. One day he decided to lockin and achiveve something great and he started folllowing his schedule with perfect consistancy that's where his rebirth happened";

function loadParagraph() {
  paragraphEl.innerHTML = "";
  sampleText.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    span.classList.add("char");
    paragraphEl.appendChild(span);
  });
}

function startTimer() {
  if (!isTyping) {
    isTyping = true;
    timer = setInterval(() => {
      time--;
      timerEl.innerText = `${time}s`;

      if (time === 0) {
        clearInterval(timer);
        inputField.disabled = true;
        calculateResults();
      }
    }, 1000);
  }
}

function calculateResults() {
  const typedChars = inputField.value.length;
  const wpm = Math.round((typedChars / 5) / ((60 - time) / 60));
  const cpm = typedChars;
  const correctChars = charIndex - mistakes;
  const accuracy = Math.round((correctChars / charIndex) * 100);

  wpmEl.innerText = isNaN(wpm) || wpm < 0 ? 0 : wpm;
  cpmEl.innerText = isNaN(cpm) ? 0 : cpm;
  accuracyEl.innerText = (accuracy > 0 ? accuracy : 0) + "%";
}

inputField.addEventListener("input", () => {
  const characters = paragraphEl.querySelectorAll("span");
  const typed = inputField.value.split("");

  startTimer();

  charIndex = typed.length;
  mistakes = 0;

  characters.forEach((char, index) => {
    const typedChar = typed[index];

    if (typedChar == null) {
      char.classList.remove("correct", "incorrect");
    } else if (typedChar === char.innerText) {
      char.classList.add("correct");
      char.classList.remove("incorrect");
    } else {
      char.classList.add("incorrect");
      char.classList.remove("correct");
      mistakes++;
    }
  });

  // Live update stats
  if (time > 0) {
    calculateResults();
  }
});

window.onload = loadParagraph;
