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
var destination = "testing.html";
var resultsScreen = "results.html";
const LinearB = "𐀀𐀁𐀂𐀃𐀄𐀅𐀆𐀇𐀈𐀉𐀊𐀋𐀍𐀎𐀏𐀐𐀑𐀒𐀓𐀔𐀕𐀖𐀗𐀘𐀙𐀚𐀛𐀜𐀝𐀞𐀟𐀠𐀡𐀢𐀣𐀤𐀥𐀦𐀨𐀩𐀪𐀫𐀬𐀭𐀮𐀯𐀰𐀱𐀲𐀳𐀴𐀵𐀶𐀷𐀸𐀹𐀺𐀼𐀽𐀿𐁀𐁁𐁂𐁃𐁄𐁅𐁆𐁇𐁈𐁉𐁊𐁋𐁌𐁍";
var availableChar = Array.from(LinearB);
var testingChar;

//Global Functions

function SaveProgramming(){
    sessionStorage.setItem('testingChar', testingChar);
    sessionStorage.setItem('timeElapsedProgramming', timeElapsedProgramming);
    sessionStorage.setItem('isCorrectProgramming', isCorrectProgramming);
}

function SaveTesting(){
    sessionStorage.setItem('timeElapsedTesting', timeElapsedTesting);
    sessionStorage.setItem('isCorrectTesting', isCorrectTesting);
}

function IncorrectProgramming(){
    isCorrectProgramming = false;
    endTimeProgramming = new Date();
    timeElapsedProgramming = endTimeProgramming - startTimeProgramming;
    SaveProgramming();
    window.location.href = destination;
}
function CorrectProgramming(){
    isCorrectProgramming = true;
    endTimeProgramming = new Date();
    timeElapsedProgramming = endTimeProgramming - startTimeProgramming;
    SaveProgramming();
    window.location.href = destination;
}

function IncorrectTesting(){
    isCorrectTesting = false;
    endTimeTesting = new Date();
    timeElapsedTesting = endTimeTesting - startTimeTesting;
    SaveTesting()
    window.location.href = resultsScreen;
}

function CorrectTesting(){
    isCorrectTesting = true;
    endTimeTesting = new Date();
    timeElapsedTesting = endTimeTesting - startTimeTesting;
    SaveTesting()
    window.location.href = resultsScreen;
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

    testingChar = availableChar[goalChar];
    availableChar.splice(goalChar,1);
    trueButton.textContent = testingChar;
    goal.textContent = testingChar;

    trueButton.removeEventListener("click", IncorrectProgramming);
    trueButton.addEventListener("click", CorrectProgramming);
}

function TestingPhase(){
    startTimeTesting = new Date();
    var testingChar = sessionStorage.getItem('testingChar');
    var buttons = document.getElementsByClassName("button");
    
    for(let i = 0; i < buttons.length; i++){
        randomChar = Math.floor(Math.random() * availableChar.length)
        buttons[i].textContent = availableChar[randomChar];
        availableChar.splice(randomChar, 1);
        buttons[i].addEventListener("click", IncorrectTesting);
    }

    var trueButtonIndex = Math.floor(Math.random() * buttons.length)
    var trueButton = buttons[trueButtonIndex];
    trueButton.textContent = testingChar;
    
    trueButton.removeEventListener("click", IncorrectTesting);
    trueButton.addEventListener("click", CorrectTesting);
}

function Results(){
    var testingChar = sessionStorage.getItem('testingChar');

    var timeElapsedProgramming = sessionStorage.getItem('timeElapsedProgramming')/1000;
    var isCorrectProgramming = sessionStorage.getItem('isCorrectProgramming');
    
    var timeElapsedTesting = sessionStorage.getItem('timeElapsedTesting')/1000;
    var isCorrectTesting = sessionStorage.getItem('isCorrectTesting');


    //CHANGE DEPENDING ON HOW RESULTS NEED TO BE STORED
    document.getElementById("ProgrammingResults").textContent = "Time: " + timeElapsedProgramming + "s \n" + "Was Correct: " + isCorrectProgramming;
    document.getElementById("TestingResults").textContent = "Time: " + timeElapsedTesting + "s \n" + "Was Correct: " + isCorrectTesting;
    document.getElementById("TestingChar").textContent = testingChar;

}