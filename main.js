//Global Variables
var testingChar;
var isCorrectProgramming;
var startTimeProgramming;
var endTimeProgramming;
var timeElapsedProgramming;
var testCharIndex;
/////////////////
var isCorrectTesting;
var startTimeTesting;
var endTimeTesting;
var timeElapsedTesting;
/////////////////
var destination = "testing.html";
var resultsScreen = "results.html";
//const LinearB = "𐀀𐀁𐀂𐀃𐀄𐀅𐀆𐀇𐀈𐀉𐀊𐀋𐀍𐀎𐀏𐀐𐀑𐀒𐀓𐀔𐀕𐀖𐀗𐀘𐀙𐀚𐀛𐀜𐀝𐀞𐀟𐀠𐀡𐀢𐀣𐀤𐀥𐀦𐀨𐀩𐀪𐀫𐀬𐀭𐀮𐀯𐀰𐀱𐀲𐀳𐀴𐀵𐀶𐀷𐀸𐀹𐀺𐀼𐀽𐀿𐁀𐁁𐁂𐁃𐁄𐁅𐁆𐁇𐁈𐁉𐁊𐁋𐁌𐁍";
//var availableChar = Array.from(LinearB);


//Classes
class Symbol {
    constructor(shape1, color1, shape2, color2, shape2pos){
        this.shape1 = shape1;
        this.color1 = color1;
        this.shape2 = shape2;
        this.color2 = color2;
        this.shape2pos = shape2pos;
    }
}


function Draw(ctx, symbol, width, height){
    var actx = ctx;
    var x = width / 2;
    var y = height / 2;
    actx.lineWidth = 4;

    actx.strokeStyle = symbol.color1;
    


    if(symbol.shape1 == "square"){
        actx.beginPath();
        actx.moveTo(x-(x/4),y+(y/4));
        actx.lineTo(x+(x/4), y+(y/4));
        actx.lineTo(x+(x/4), y+(y/4) - 75);
        actx.lineTo(x-(x/4), y+(y/4) - 75);
        actx.lineTo(x-(x/4),y+(y/4))
        actx.stroke();
    }
    else if(symbol.shape1 == "circle"){
        actx.beginPath();
        actx.arc(x, y, 40, 0, 2 * Math.PI);
        actx.stroke();
    }

}

//////////////     Symbol (Shape1, Color1, Shape2, Color2, Shape2 Position)
const SquareOnly = new Symbol("square", "red", null, null, null);
const SquareOnly2 = new Symbol("square", "black", null, null, null);
const SquareOnly3 = new Symbol("square", "blue", null, null, null);
const SquareOnly4 = new Symbol("square", "yellow", null, null, null);
const SquareOnly5 = new Symbol("square", "green", null, null, null);
const CircleOnly = new Symbol("circle", "black", null, null, null);
const CircleOnly2 = new Symbol("circle", "red", null, null, null);
const CircleOnly3 = new Symbol("circle", "blue", null, null, null);
const CircleOnly4 = new Symbol("circle", "green", null, null, null);
const CircleOnly5 = new Symbol("circle", "yellow", null, null, null);


var availableChar = [SquareOnly, SquareOnly2, SquareOnly3, SquareOnly4, SquareOnly5, CircleOnly, CircleOnly2, CircleOnly3, CircleOnly4, CircleOnly5];
//Global Functions



function SaveProgramming(){
    sessionStorage.setItem('testingChar', JSON.stringify(testingChar));
    sessionStorage.setItem('timeElapsedProgramming', timeElapsedProgramming);
    sessionStorage.setItem('isCorrectProgramming', isCorrectProgramming);
    sessionStorage.setItem('testCharIndex', testCharIndex)
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

    console.log(availableChar);
    var buttons = document.getElementsByClassName("button");
    const canvases = [
        document.getElementById("canvas1"),
        document.getElementById("canvas2"),
        document.getElementById("canvas3")
    ];
    

    for(let i = 0; i < buttons.length; i++){
        randomChar = Math.floor(Math.random() * availableChar.length)
        //buttons[i].textContent = availableChar[randomChar].shape1;
        ctx = canvases[i].getContext("2d");
        Draw(ctx, availableChar[randomChar], canvases[i].width, canvases[i].height);
        availableChar.splice(randomChar, 1);
        buttons[i].addEventListener("click", IncorrectProgramming);
    }

    var trueButtonIndex = Math.floor(Math.random() * buttons.length)
    testCharIndex = Math.floor(Math.random() * availableChar.length)
    var trueButton = buttons[trueButtonIndex];
    var trueCanvas = canvases[trueButtonIndex];

    testingChar = availableChar[testCharIndex];
    availableChar.splice(testCharIndex,1);
    ctx=trueCanvas.getContext("2d");
    ctx.clearRect(0,0, trueCanvas.width, trueCanvas.height);
    Draw(ctx, testingChar, trueCanvas.width, trueCanvas.height);

    const goal = document.getElementById("canvasGoal");
    ctx= goal.getContext("2d");
    Draw(ctx, testingChar, trueCanvas.width, trueCanvas.height);

    trueButton.removeEventListener("click", IncorrectProgramming);
    trueButton.addEventListener("click", CorrectProgramming);
}

function TestingPhase(){
    startTimeTesting = new Date();
    var testingChar = JSON.parse(sessionStorage.getItem('testingChar'));
    var buttons = document.getElementsByClassName("button");
    const canvases = [
        document.getElementById("canvas1"),
        document.getElementById("canvas2"),
        document.getElementById("canvas3"),
        document.getElementById("canvas4"),
        document.getElementById("canvas5"),
        document.getElementById("canvas6"),
        document.getElementById("canvas7"),
        document.getElementById("canvas8"),
        document.getElementById("canvas9")
    ];


    for(let i =0; i < availableChar.length; i++){
        
        if (availableChar[i].shape1 == testingChar.shape1 && availableChar[i].color1 == testingChar.color1 && availableChar[i].shape2 == testingChar.shape2 && availableChar[i].color2 == testingChar.color2 && availableChar[i].shape2pos == testingChar.shape2pos){
            availableChar.splice(i, 1);
        }
    }

    console.log(availableChar);

    for(let i = 0; i < buttons.length; i++){
        randomChar = Math.floor(Math.random() * availableChar.length)
        //buttons[i].textContent = availableChar[randomChar].shape1;
        ctx = canvases[i].getContext("2d");
        Draw(ctx, availableChar[randomChar], canvases[i].width, canvases[i].height);
        availableChar.splice(randomChar, 1);
        buttons[i].addEventListener("click", IncorrectTesting);
    }

    var trueButtonIndex = Math.floor(Math.random() * buttons.length)
    console.log(trueButtonIndex); 
    var trueButton = buttons[trueButtonIndex];
    var trueCanvas = canvases[trueButtonIndex];
    //trueButton.textContent = testingChar;
    ctx=trueCanvas.getContext("2d");
    ctx.clearRect(0,0, trueCanvas.width, trueCanvas.height);
    Draw(ctx, testingChar, trueCanvas.width, trueCanvas.height);
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