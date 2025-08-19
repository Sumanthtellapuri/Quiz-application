const quizData = [{
        question: "What does HTML stand for?",
        options: ["HyperText Markup Language", "HyperText Machine Language", "Hyperlinks and Text Markup Language", "None of the above"],
        answer: 0,
        explanation: "HTML stands for HyperText Markup Language."
    },
    {
        question: "Which tag is used to define a hyperlink in HTML?",
        options: ["<a>", "<link>", "<href>", "<hyperlink>"],
        answer: 0,
        explanation: "The <a> tag is used to define a hyperlink in HTML."
    },
    {
        question: "What is the default value of the position property in CSS?",
        options: ["relative", "absolute", "fixed", "static"],
        answer: 3,
        explanation: "The default value of the position property in CSS is static."
    },
    {
        question: "Which CSS property controls the text size?",
        options: ["font-size", "text-size", "font-style", "text-style"],
        answer: 0,
        explanation: "The font-size property controls the text size in CSS."
    },
    {
        question: "What does the '===' operator do in JavaScript?",
        options: ["Checks equality with type conversion", "Checks equality without type conversion", "Assigns a value", "Compares two objects"],
        answer: 1,
        explanation: "'===' checks equality without type conversion in JavaScript."
    },
    {
        question: "How do you declare a variable in JavaScript?",
        options: ["var x;", "let x;", "const x;", "All of the above"],
        answer: 3,
        explanation: "All of 'var', 'let', and 'const' can be used to declare a variable in JavaScript."
    },
    {
        question: "Which SQL command is used to retrieve data from a database?",
        options: ["GET", "SELECT", "FETCH", "PICK"],
        answer: 1,
        explanation: "The SELECT statement is used to retrieve data from a database."
    },
    {
        question: "What does SQL stand for?",
        options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "Structured Question Language"],
        answer: 0,
        explanation: "SQL stands for Structured Query Language."
    },
    {
        question: "In Python, which data type is used to store boolean values?",
        options: ["int", "float", "bool", "str"],
        answer: 2,
        explanation: "In Python, boolean values are stored using the 'bool' data type."
    },
    {
        question: "Which method is used to add an element at the end of a list in Python?",
        options: [".append()", ".add()", ".insert()", ".extend()"],
        answer: 0,
        explanation: "The .append() method is used to add an element at the end of a list in Python."
    },
    {
        question: "What is the use of the 'display' property in CSS?",
        options: ["Defines the type of box an element generates", "Sets the color of text", "Sets the background image", "None of the above"],
        answer: 0,
        explanation: "The display property in CSS defines the type of box an element generates."
    },
    {
        question: "Which HTML tag is used to specify a paragraph?",
        options: ["<h1>", "<p>", "<div>", "<span>"],
        answer: 1,
        explanation: "The <p> tag is used to define a paragraph in HTML."
    },
    {
        question: "How do you make a list in HTML?",
        options: ["<ul>", "<ol>", "<li>", "All of the above"],
        answer: 3,
        explanation: "You use <ul>, <ol>, and <li> to create lists in HTML."
    },
    {
        question: "What is the correct syntax for referring to an external script called 'script.js'?",
        options: ["<script src='script.js'>", "<script href='script.js'>", "<script name='script.js'>", "<script file='script.js'>"],
        answer: 0,
        explanation: "The correct syntax for referring to an external script is <script src='script.js'>."
    },
    {
        question: "How do you create a comment in JavaScript?",
        options: ["// This is a comment", "# This is a comment", "<!-- This is a comment -->", "'This is a comment'"],
        answer: 0,
        explanation: "In JavaScript, comments are created with //."
    },
    {
        question: "Which CSS property is used to change the background color of an element?",
        options: ["bg-color", "background-color", "color", "bg-color"],
        answer: 1,
        explanation: "The background-color property is used to change the background color of an element."
    },
    {
        question: "In SQL, which clause is used to filter records?",
        options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
        answer: 0,
        explanation: "The WHERE clause is used to filter records in SQL."
    },
    {
        question: "What does the 'len()' function do in Python?",
        options: ["Calculates the length of a string", "Returns the sum of a list", "Calculates the square of a number", "None of the above"],
        answer: 0,
        explanation: "The len() function in Python returns the length of an object, like a string or list."
    },
    {
        question: "How do you define a function in Python?",
        options: ["function myFunction()", "def myFunction():", "function: myFunction", "def: myFunction"],
        answer: 1,
        explanation: "In Python, functions are defined using 'def myFunction():'."
    },
    {
        question: "What does the 'position: absolute' property do in CSS?",
        options: ["Positions the element relative to the closest positioned ancestor", "Positions the element relative to the document", "Floats the element", "None of the above"],
        answer: 0,
        explanation: "The position: absolute property positions an element relative to its closest positioned ancestor."
    },
    {
        question: "Which SQL statement is used to update data in a database?",
        options: ["UPDATE", "MODIFY", "CHANGE", "ALTER"],
        answer: 0,
        explanation: "The UPDATE statement is used to modify existing records in a database."
    }
];



const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const progressEl = document.getElementById("progress");
const retryEl = document.getElementById("retry");
const startEl = document.getElementById("start");
const questionNo = document.getElementById("qno");
const explanationButton = document.getElementById("explanationButton");
const timerEl = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let quizStarted = false;
let timer;
let timeLeft = 60;

function startQuiz() {
    quizStarted = true;
    startEl.style.display = "none";
    retryEl.style.display = "none";
    loadQuestions();
}


function loadQuestions() {
    clearInterval(timer); // Reset timer
    timeLeft = 60;
    updateTimerDisplay();

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up for this question!");
            loadNextQuestion();
        }
    }, 1000);

    if (currentQuestionIndex >= quizData.length) {
        showResults();
        return;
    }

    let currentQuestion = quizData[currentQuestionIndex];
    questionNo.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const optionEl = document.createElement("div");
        optionEl.classList.add("option");
        optionEl.textContent = option;
        optionEl.addEventListener("click", () => selectOption(index));
        optionsEl.appendChild(optionEl);
    });

    explanationButton.style.display = 'none';
    document.getElementById("prevButton").disabled = currentQuestionIndex === 0;
}

function updateTimerDisplay() {
    timerEl.textContent = `Time Left: ${timeLeft}s`;
}

let correctAnswersCount = 0; // Track the number of correct answers

function selectOption(selectedIndex) {
    if (!quizStarted) return;

    const options = document.querySelectorAll(".option");
    const currentQuestion = quizData[currentQuestionIndex];
    const correctIndex = currentQuestion.answer;

    options.forEach((option, index) => {
        option.classList.remove("correct", "wrong");
        option.style.pointerEvents = "none";

        if (index === correctIndex) {
            option.classList.add("correct");
        } else if (index === selectedIndex) {
            option.classList.add("wrong");
        }
    });

    // Update score based on answer
    if (selectedIndex === correctIndex) {
        score += 5; // Add 5 marks for correct answer
        correctAnswersCount++; // Increment only on correct answer
    } else {
        score -= 2; // Subtract 2 marks for wrong answer
    }

    updateProgressBar(); // Update progress bar based on score
    explanationButton.style.display = 'block';
    showExplanationButton();
}

function updateProgressBar() {
    const progress = (correctAnswersCount / quizData.length) * 100; // Use correctAnswersCount
    progressEl.style.width = progress + "%";
}

function showExplanationButton() {
    explanationButton.innerText = 'Show Explanation';
    explanationButton.addEventListener("click", toggleExplanation);
    explanationButton.classList("text-explanation")
}

function toggleExplanation() {
    const currentQuestion = quizData[currentQuestionIndex];
    const explanation = currentQuestion.explanation || "No explanation available.";
    document.getElementById("explanation-text").textContent = explanation;
    $('#explanation-modal').modal('show');
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        clearInterval(timer);
        loadQuestions();
    }
}

function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestions();
    } else {
        showResults();
    }
}

function showResults() {
    clearInterval(timer);
    questionEl.textContent = `Quiz completed! Your score is ${score}/${quizData.length * 5}`; // Total possible score is quizData.length * 5
    optionsEl.innerHTML = "";
    retryEl.style.display = "block";
}

let attemptCount = 0; // Track the number of retry attempts

function retryQuiz() {
    if (attemptCount < 2 && score < 75) {
        attemptCount++;
        currentQuestionIndex = 0;
        score = 0;
        correctAnswersCount = 0;
        retryEl.style.display = "none";
        loadQuestions();
        updateProgressBar();
    } else {
        alert("Sorry, you have reached the maximum of 2 attempts or your score is less than 75.");
    }
}
/*function retryQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswersCount = 0;
    retryEl.style.display = "none";
    loadQuestions();
    updateProgressBar();
}*/