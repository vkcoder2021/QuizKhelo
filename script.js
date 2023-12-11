const questions=[
    {
        question:"What are the identifiers called that cannot be used as variables or function names?",
        answers:[
            {text:"Constants",correct:false},
            {text:"Reserved Words",correct:true},
            {text:"Concrete Terms",correct:false},
            {text:"Favorites",correct:false},
        ]
    },
    {
        question:"What is the language or list of instructions that are executed by the computer (how JavaScript is built)?",
        answers:[
            {text:"JSON",correct:false},
            {text:"Syntax",correct:true},
            {text:"Scope",correct:false},
            {text:"Output",correct:false},
        ]
    },
    {
        question:"In JavaScript, what is used in conjunction with HTML to “react” to certain elements?",
        answers:[
            {text:"Boolean",correct:false},
            {text:"Condition",correct:false},
            {text:"RegExp",correct:false},
            {text:"Events",correct:true},
        ]
    },
    {
        question:"What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?",
        answers:[
            {text:"While Loop",correct:true},
            {text:"Else Loop",correct:false},
            {text:"Conditional Loop",correct:false},
            {text:"For Loop",correct:false},
        ]
    }

];
const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");
let currentQuestionIndex=0;
let score =0;
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+ 1;
    questionElement.innerHTML=questionNo+"."+currentQuestion.question;
    
    currentQuestion.answers.forEach(answer=>{
       const button=document.createElement("button");
       button.innerHTML=answer.text;
       button.classList.add("btn");
       answerButton.appendChild(button);
       if (answer.correct){
        button.dataset.correct=answer.correct;
       }
       button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct === "true";
    if (isCorrect){
      selectedBtn.classList.add("correct");
      score++;
    }
    else {
      selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct ==="true"){
           button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
  }
  function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score}out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
  }
  function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
  }
  nextButton.addEventListener("click",()=>{
    if (currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
  })
startQuiz();