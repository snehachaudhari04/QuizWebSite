const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Who developed java?",
    choice1: " James Gosling",
    choice2: " Bjarne Stroustrup",
    choice3: "Dennis Ritchie",
    choice4: "None of above",
    answer: 1
  },
  {
    question:
      "Which of the following is not a Java features",
    choice1: "Multithreading",
    choice2: "interface",
    choice3: "Dynamic",
    choice4: "Pointer",
    answer: 4
  },
  {
    question: "_____ is used to find and fix bugs in the Java programs.",
    choice1: "JDB",
    choice2: "JDBC",
    choice3: "JVM",
    choice4: "JRE",
    answer: 1
  }
];


const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    
    return window.location.assign("file:///C:/Users/Admin/Desktop/javascript%20project/end.html");
  }
  questionCounter++;
  
  

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();