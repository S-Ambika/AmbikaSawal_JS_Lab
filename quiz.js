function Quiz(questions) {
    this.score = 0;
    this.questions = questions; //[Q1, Q2,...]
    this.questionIndex = 0; //0
}

//Get me the Question by Index
Quiz.prototype.getQuestionByIndex = function() {
    return this.questions[this.questionIndex];
};

//Verify the answer with option and goto next question.
Quiz.prototype.checkOptionWithAnswer = function(answer) {
    console.log("answer : ", answer);
    console.log("Question : ", quiz.getQuestionByIndex());
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
};

//Checks wether the questions got over or not.
Quiz.prototype.isFinished = function() {
    return this.questionIndex === this.questions.length;
};

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
};

function showScores() {
    var quizElement = document.getElementById("quiz");
    var resPercentage = (quiz.score / questions.length) * 100;
    var msg = '';
    if (quiz.score >= 5) {
        msg = "Congratulations! <br><br>Your Scores : ";
    } else if (quiz.score < 5 && quiz.score > 2) {
        msg = "Keep Learning , Good Luck! <br><br>Your Scores : ";
    } else if (quiz.score <= 2) {
        msg = "OOPs! Try again <br><br>Your Scores : ";
    }
    var result = `<h1> Result </h1>
    <h2 id='score'>${msg}${quiz.score} / ${questions.length} <br>Percentage : ${Math.round(resPercentage)}% </h2>
    <br>
    <h3 id='start'>Start Again</h3>`;
    quizElement.innerHTML = result;
    const start_over = document.getElementById('start');
    start_over.onclick = () => {
        location.reload();
    };

}

function loadQuestions() {
    if (quiz.isFinished()) {
        showScores();
    } else {
        // show question
        var questionElement = document.getElementById("question");
        var questionLoaded = quiz.getQuestionByIndex();
        questionElement.innerHTML = questionLoaded.text;

        //show options
        var choices = questionLoaded.choices;
        for (let idx = 0; idx < choices.length; idx++) {
            var choiceElement = document.getElementById("choice" + idx);
            choiceElement.innerHTML = choices[idx];

            var btnElement = document.getElementById("btn" + idx);
            btnElement.onclick = () => {
                quiz.checkOptionWithAnswer(choices[idx]);
                loadQuestions();
            };
        }
        showProgress();
    }
}

function showProgress() {
    var currQuestIndex = quiz.questionIndex + 1;
    var progressElement = document.getElementById("progress");
    progressElement.innerHTML = `Question ${currQuestIndex} of ${quiz.questions.length}`;
}

var questions = [
    new Question(
        "Q1. Inside which HTML element do we put the JavaScript?", ["jscript", "script", "scripting", "style"],
        "script"
    ),
    new Question(
        "Q2. Where is the correct place to insert a JavaScript?", ["head", "body", "Both", "None"],
        "Both"
    ),
    new Question(
        "Q3. What is the correct syntax for referring to an external script <script __=xyz.js", ["src", "href", "link", "rel"],
        "href"
    ),
    new Question(
        "Q4. What to use to write 'Hello World' in an alert box?", ["confirm", "msg", "alert", "msgBox"],
        "alert"
    ),
    new Question(
        "Q5. How can you add a comment in a JavaScript?", ["//This is comment", "!This is comment->", "/This is comment", "--This is comment"],
        "//This is comment"
    ),

    new Question(
        "Q6. Which event occurs when the user clicks on an HTML element?", [
            "onclick",
            "mouseclick",
            "onChange",
            "setClick",
        ],
        "onclick"
    ),
];

var quiz = new Quiz(questions);
loadQuestions();