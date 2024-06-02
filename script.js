const questions = [
  {
    question:
      "Upon encountering empty statements, what does the Javascript Interpreter do?",
    answers: [
      { text: "Throws an error", correct: false },
      { text: "Ignore the statements", correct: true },
      { text: "Gives a warning", correct: false },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "What is the use of the < noscript > tag in Javascript?",
    answers: [
      {
        text: "The contents are displayed by non-JS-based browsers",
        correct: true,
      },
      { text: "Clears all the cookies and cache", correct: false },
      { text: "Both A and B", correct: false },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "What does the ‘toLocateString()’ method do in JS?",
    answers: [
      {
        text: "Returns a localised object representation",
        correct: false,
      },
      { text: "Returns a parsed string", correct: false },
      {
        text: "Returns a localized string representation of an object",
        correct: true,
      },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question:
      "What keyword is used to declare an asynchronous function in Javascript?",
    answers: [
      {
        text: "await",
        correct: false,
      },
      { text: "setTimeout", correct: false },
      {
        text: "async",
        correct: true,
      },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "How to stop an interval timer in Javascript?",
    answers: [
      {
        text: "clearTimer",
        correct: false,
      },
      { text: "intervalOver", correct: false },
      {
        text: "clearInterval",
        correct: true,
      },
      { text: "None of the above", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Your scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
