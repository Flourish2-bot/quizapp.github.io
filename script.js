// script.js

let questions = [
    {
        prompt: `Inside which HTML 
                 element do we put 
                 the JavaScript?`,
        options: [
            "<javascript>",
            "<js>",
            "<script>",
            "<scripting>",
        ],
        answer: "<script>",
    },

    {
        prompt: `Which HTML tag is used to define a table row?`,
        options: [
            "<tr>",
            "<th>",
            "<td>",
            " <table>",
        ],
        answer: "<tr>",
    },

    {
        prompt: `In JavaScript, which 
                 of the following is 
                 a logical operator?`,
        options: ["|", "&&", "%", "/"],
        answer: "&&",
    },

    {
        prompt: `which HTML tag is used to define a list _____.`,
        options: [
            "<dl>",
            "<ul>",
            "<ol>",
            "<li>",
        ],
        answer: "<li>",
    },
    {
        prompt:`which HTML tag is used to define a hyperlink`,
        options: [
            "<link>",
            "<a>",
            "<nav>",
            "none of the above",
        ],
        answer: "<a>"
    }
];

// Get Dom Elements

let questionsEl = document.querySelector("#questions");
let timerEl = document.querySelector("#timer");
let choicesEl = document.querySelector("#options");
let submitBtn = document.querySelector("#submit-score");
let startBtn = document.querySelector("#start");
let nameEl = document.querySelector("#name");
let feedbackEl = document.querySelector("#feedback");
let reStartBtn = document.querySelector("#restart");

// to multiple the answer by time
let currentQuestionIndex = 0;
let time = questions.length * 10;
let timerId;

// Start quiz

function quizStart() {
    timerId = setInterval(clockTick,1000);
    timerEl.textContent = time;
    let landingScreenEl =
        document.getElementById("start-screen");
    landingScreenEl.setAttribute("class","hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

// make your choice of answers
function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let promptEl = document.getElementById("question-words");
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(
        function (choice, i) {
            let choiceBtn =
                document.createElement("button");
            choiceBtn.setAttribute("value",choice );
            choiceBtn.textContent = i + 1 + ". " + choice;
            choiceBtn.onclick = questionClick;
            choicesEl.appendChild(choiceBtn);
        }
    );
}

//to see if the answer is correct or not

function questionClick() {
    if (
        this.value !== questions[currentQuestionIndex].answer
    ) {
        time -= 10;
    if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = `Wrong! The correct answer is${questions[currentQuestionIndex].answer}.`;
        feedbackEl.style.color = "red";
    } else {
        feedbackEl.textContent ="Correct!";
        feedbackEl.style.color ="green";
    }
    feedbackEl.setAttribute("class","feedback");
    setTimeout(function () {
        feedbackEl.setAttribute("class","feedback hide");
    }, 
    2000);
    currentQuestionIndex++;
    if (currentQuestionIndex ===questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

// stop the timer and end the quiz

function quizEnd() {
    clearInterval(timerId);
    let endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    let finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class","hide");
}

// End quiz if timer reaches 0

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

// Save score and user name

function saveHighscore() {
    let name = nameEl.value.trim();
    if (name !== "") {
        let highscores =JSON.parse(window.localStorage.getItem("highscores")
            ) || [];
        let newScore = {
            score: time,
            name: name,
        };
        highscores.push(newScore);
        window.localStorage.setItem("highscores",JSON.stringify(highscores));
        alert("Your Score has been Submitted");
    }
}

// Save users' score

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
        alert("Your Score has been Submitted");
    }
}
nameEl.onkeyup = checkForEnter;
submitBtn.onclick = saveHighscore;
startBtn.onclick = quizStart;