const questions = [
    {
        question: "Which keyword is used to declare a constant in JavaScript?",
        options: ["var", "let", "const", "constant"],
        answer: "const"
    },
    {
        question: "Which method adds an item to the end of an array?",
        options: ["pop()", "push()", "shift()", "add()"],
        answer: "push()"
    },
    {
        question: "What does DOM stand for?",
        options: [
            "Document Object Model",
            "Data Object Method",
            "Document Online Module",
            "Digital Object Manager"
        ],
        answer: "Document Object Model"
    },
    {
        question: "Which method converts JSON text into a JavaScript object?",
        options: [
            "JSON.stringify()",
            "JSON.parse()",
            "JSON.convert()",
            "JSON.object()"
        ],
        answer: "JSON.parse()"
    },
    {
        question: "Which symbol is used for strict equality?",
        options: ["=", "==", "===", "!="],
        answer: "==="
    },
    {
        question: "Which method creates a new array with filtered elements?",
        options: [
            "map()",
            "forEach()",
            "filter()",
            "find()"
        ],
        answer: "filter()"
    },
    {
        question: "Which function runs code after a specific delay?",
        options: [
            "setTimeout()",
            "setDelay()",
            "delay()",
            "wait()"
        ],
        answer: "setTimeout()"
    },
    {
        question: "Which keyword refers to the current object in many JavaScript contexts?",
        options: [
            "self",
            "this",
            "current",
            "object"
        ],
        answer: "this"
    }
];


const questionElement =
    document.getElementById("question");

const optionsElement =
    document.getElementById("options");

const nextBtn =
    document.getElementById("nextBtn");

const scoreElement =
    document.getElementById("score");

const questionNumberElement =
    document.getElementById("questionNumber");

const progressPercent =
    document.getElementById("progressPercent");

const progressElement =
    document.getElementById("progress");

const quizArea =
    document.getElementById("quizArea");

const resultArea =
    document.getElementById("resultArea");

const finalScoreElement =
    document.getElementById("finalScore");

const resultMessage =
    document.getElementById("resultMessage");

const restartBtn =
    document.getElementById("restartBtn");


let currentQuestion = 0;

let score = 0;

let answered = false;


// Show question

function showQuestion() {

    answered = false;

    const current =
        questions[currentQuestion];


    questionElement.textContent =
        current.question;


    questionNumberElement.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    const percent =
        Math.round(
            (currentQuestion / questions.length) * 100
        );


    progressElement.style.width =
        `${percent}%`;

    progressPercent.textContent =
        `${percent}%`;


    optionsElement.innerHTML = "";


    current.options.forEach((option) => {

        const button =
            document.createElement("button");

        button.className = "option";

        button.textContent = option;


        button.addEventListener(
            "click",
            () => selectAnswer(button, option)
        );


        optionsElement.appendChild(button);

    });


    nextBtn.style.display = "none";
}


// Select answer

function selectAnswer(button, selectedAnswer) {

    if (answered) {
        return;
    }

    answered = true;


    const correctAnswer =
        questions[currentQuestion].answer;


    const allOptions =
        document.querySelectorAll(".option");


    allOptions.forEach((option) => {

        option.disabled = true;


        if (
            option.textContent === correctAnswer
        ) {
            option.classList.add("correct");
        }

    });


    if (selectedAnswer === correctAnswer) {

        button.classList.add("correct");

        score++;

        scoreElement.textContent =
            score;

    } else {

        button.classList.add("wrong");

    }


    nextBtn.style.display =
        "block";


    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextBtn.textContent =
            "Show Result";

    } else {

        nextBtn.textContent =
            "Next Question";

    }

}


// Next question

nextBtn.addEventListener(
    "click",
    () => {

        if (
            currentQuestion <
            questions.length - 1
        ) {

            currentQuestion++;

            showQuestion();

        } else {

            showResult();

        }

    }
);


// Show result

function showResult() {

    quizArea.classList.add("hidden");

    resultArea.classList.remove("hidden");


    finalScoreElement.textContent =
        score;


    const percentage =
        Math.round(
            (score / questions.length) * 100
        );


    progressElement.style.width =
        "100%";

    progressPercent.textContent =
        "100%";


    if (percentage === 100) {

        resultMessage.textContent =
            "Perfect score! 🔥";

    } else if (percentage >= 70) {

        resultMessage.textContent =
            "Great job! Keep learning. 💪";

    } else if (percentage >= 50) {

        resultMessage.textContent =
            "Good attempt! Practice more. 📚";

    } else {

        resultMessage.textContent =
            "Keep practicing and try again! 🚀";

    }

}


// Restart

restartBtn.addEventListener(
    "click",
    () => {

        currentQuestion = 0;

        score = 0;

        scoreElement.textContent = "0";

        quizArea.classList.remove("hidden");

        resultArea.classList.add("hidden");

        showQuestion();

    }
);


// Start

showQuestion();