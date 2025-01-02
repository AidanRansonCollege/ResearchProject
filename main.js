//Global Variables
var isCorrectProgramming;
var startTimeProgramming;
var endTimeProgramming;
var timeElapsedProgramming;
/////////////////
var isCorrectTesting;
var startTimeTesting;
var endTimeTesting;
var timeElapsedTesting;
/////////////////
var destination = "testing.html"
var availableChar = ['A', 'B', 'C','D', 'E', 'F'];

//Global Functions
function OutputProgramming(){
    console.log(timeElapsedProgramming/1000 + "s");
    console.log(isCorrectProgramming);
    window.location.href = destination;
}

function IncorrectProgramming(){
    isCorrectProgramming = false;
    endTimeProgramming = new Date();
    timeElapsedProgramming = endTimeProgramming - startTimeProgramming;
    OutputProgramming();
}
function CorrectProgramming(){
    isCorrectProgramming = true;
    endTimeProgramming = new Date();
    timeElapsedProgramming = endTimeProgramming - startTimeProgramming;
    OutputProgramming();
}

function ProgrammingPhase(){
    startTimeProgramming = new Date()
    
    const goal = document.getElementById("goal");
    var buttons = document.getElementsByClassName("button")

    for(let i = 0; i < buttons.length; i++){
        randomChar = Math.floor(Math.random() * availableChar.length)
        buttons[i].textContent = availableChar[randomChar];
        availableChar.splice(randomChar, 1);
        buttons[i].addEventListener("click", IncorrectProgramming);
    }

    var trueButtonIndex = Math.floor(Math.random() * buttons.length)
    var goalChar = Math.floor(Math.random() * availableChar.length);
    var trueButton = buttons[trueButtonIndex];

    trueButton.textContent = availableChar[goalChar];
    goal.textContent = availableChar[goalChar];

    trueButton.removeEventListener("click", IncorrectProgramming);
    trueButton.addEventListener("click", CorrectProgramming);
}