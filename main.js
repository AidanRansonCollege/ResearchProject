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
const LinearB = "𐀀𐀁𐀂𐀃𐀄𐀅𐀆𐀇𐀈𐀉𐀊𐀋𐀍𐀎𐀏𐀐𐀑𐀒𐀓𐀔𐀕𐀖𐀗𐀘𐀙𐀚𐀛𐀜𐀝𐀞𐀟𐀠𐀡𐀢𐀣𐀤𐀥𐀦𐀨𐀩𐀪𐀫𐀬𐀭𐀮𐀯𐀰𐀱𐀲𐀳𐀴𐀵𐀶𐀷𐀸𐀹𐀺𐀼𐀽𐀿𐁀𐁁𐁂𐁃𐁄𐁅𐁆𐁇𐁈𐁉𐁊𐁋𐁌𐁍";
var availableChar = Array.from(LinearB);
var testingChar;

//Global Functions
function OutputProgramming(){
    console.log(timeElapsedProgramming/1000 + "s");
    console.log(isCorrectProgramming);
    //COMMENT WHEN SHOWING OUTPUT FIRST TIME
    //window.location.href = destination;
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

    testingChar = availableChar[goalChar];
    availableChar.splice(goalChar,1);
    trueButton.textContent = testingChar;
    goal.textContent = testingChar;
    

    trueButton.removeEventListener("click", IncorrectProgramming);
    trueButton.addEventListener("click", CorrectProgramming);
}

function TestingPhase(){

}