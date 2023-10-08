const questions = [
    {
        question: 'The song ‘You’ll Never Walk Alone’ was written by Rodgers and Hammerstein for which musical?',
        answers:[
            {text: "Mary Poppins", correct: false},
            {text: "Carousel", correct: true},
            {text: "Singin' in the rain", correct: false},
            {text: "Fiddler on the Roof", correct: false}
        ]
    },
    {
        question: 'What was the middle name of Wolfgang Mozart?',
        answers:[
            {text: "Amadeus", correct: true},
            {text: "Joseph", correct: false},
            {text: "van", correct: false},
            {text: "Osbourne", correct: false}
        ]
    },
    {
        question: 'In which Olympic sport might you get a double axel or a triple Salchow?',
        answers:[
            {text: "Boxing", correct: false},
            {text: "Figure skating", correct: false},
            {text: "In-flight or airport misbehaviour", correct: true},
            {text: "Chess", correct: false}
        ]
    },
    {
        question: 'For what have Snoop Dogg, Naomi Campbell, Gerard Depardieu and David Hasselhoff all been arrested?',
        answers:[
            {text: "Robbery", correct: false},
            {text: "In-flight or airport misbehaviour", correct: true},
            {text: "Shooting", correct: false},
            {text: "Assault on a police officer", correct: false}
        ]
    }
];

const questionElement = document.querySelector('#question');
const answerButtons = document.querySelector('#answer-buttons');
const nextButton = document.querySelector('#next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
         showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{  
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();


