//Global Var
var goalChars = [];
var extraChars = [];
var iterations = 3;
var index = 0;
var nextScreen = "testing.html";
var finalScreen = "results.html";
var lineOption = false;
var audio = new Audio('audiopop.mp3');
var colorValue = 0;
var tempIndexes;

var color1;
var color2;

//Data Var
var startTime;
var programmingTimes = [];


//Class
class Symbol {
    constructor(shape1, color1, shape2, color2, shape2pos, line){
        this.shape1 = shape1;
        this.color1 = color1;
        this.shape2 = shape2;
        this.color2 = color2;
        this.shape2pos = shape2pos;
        this.line = line;
    }
}



//////////////////////// Canvas Function //////////////////////

var container = document.getElementsByClassName('container');
var canvas = document.getElementsByClassName('canvas');

function ResizeCanvas(){

    for(let i = 0; i < container.length; i++){
        let width = container[i].offsetWidth;
        let height = container[i].offsetHeight;
        if(width <= height){
            canvas[i].width = width;
            canvas[i].height = width;
        }
        else{
            canvas[i].width = height;
            canvas[i].height = height;
        }
    }

    canvas[0].width = canvas[1].width;
    canvas[0].height = canvas[1].height;
}


///////////////////////// Miscellaneous Functions ////////////////////////
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function NonRepeatingValues(length){
    var values = [];
    var possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for(let i=0; i<length; i++){
        let randomIndex = Math.floor(Math.random() * possibleValues.length);
        console.log(possibleValues[randomIndex]);
        values.push(possibleValues[randomIndex]);
        possibleValues.splice(randomIndex, 1);
    }

    return values;
}

///////////////////////// Settings Functions ////////////////////////
function SaveSettings(){
    if(document.getElementById("DropIndex").value != ""){
        iterationValue = document.getElementById("DropIndex").value;
        localStorage.setItem(iterations, iterationValue);
    }

    if(document.getElementById("DropColor").value != ""){
        colorValue = document.getElementById("DropColor").value;
        console.log(colorValue);
        localStorage.setItem("colorValue", colorValue);
    }


    if(document.getElementById("CharacterOption").value != ""){
        let characterOption = document.getElementById("CharacterOption").value;
        localStorage.setItem("CharacterOption", characterOption);
    }

    DisplaySettings();
}

function DisplaySettings(){
    document.getElementById("DropIndex").value = localStorage.getItem(iterations);
    document.getElementById("DropColor").value = localStorage.getItem("colorValue");
    

    document.getElementById("Iterations").textContent = "Iterations: " + localStorage.getItem(iterations);

    console.log(localStorage.getItem("CharacterOption"));
    document.getElementById("Lines").textContent = "Character set: " + document.getElementById("CharacterOption").options[localStorage.getItem("CharacterOption")].text;
    document.getElementById("Color").textContent = "Color is: " + localStorage.getItem("colorValue");
}


///////////////////////// Programming Phase Functions ////////////////////////
function SaveProgramming(){
    sessionStorage.setItem('goalChars', JSON.stringify(goalChars));
    sessionStorage.setItem('extraChars', JSON.stringify(extraChars));
}

function CorrectProgramming(){
    let iterationsLocal = localStorage.getItem(iterations);
    audio.play();
    let endTime = new Date();

    
    //SAVE CLICKS AND TIMES
    let symbolArray = JSON.parse(sessionStorage.getItem("clickedSymbols"));
    symbolArray.push(tempIndexes[this.id]);
    sessionStorage.setItem("clickedSymbols", JSON.stringify(symbolArray));
    console.log(JSON.parse(sessionStorage.getItem("clickedSymbols")));

    let timeArray = JSON.parse(sessionStorage.getItem("clickTimes"));
    timeArray.push((endTime - startTime)/1000);
    sessionStorage.setItem("clickTimes", JSON.stringify(timeArray));
    console.log("times" + JSON.parse(sessionStorage.getItem("clickTimes")));


    if(index < iterationsLocal - 1){
        index += 1;
        console.log("Index " + index);
        this.style.backgroundColor = "#CCCCCC";
        setTimeout(() => {
            this.style.backgroundColor = "#FFFFFF";
            ProgrammingPhase(index);
          }, 250); //0.25 s delay
        
        
    }
    else{
        SaveProgramming()
        window.location.href = nextScreen;
    }
}


function IncorrectProgramming(){

    endTime = new Date();
    
    let iterationsLocal = localStorage.getItem(iterations);
    audio.play();
    console.log("Incorrect");

    //SAVE CLICKS AND TIMES
    let symbolArray = JSON.parse(sessionStorage.getItem("clickedSymbols"));
    symbolArray.push(tempIndexes[this.id]);
    sessionStorage.setItem("clickedSymbols", JSON.stringify(symbolArray));
    console.log(JSON.parse(sessionStorage.getItem("clickedSymbols")));

    let timeArray = JSON.parse(sessionStorage.getItem("clickTimes"));
    timeArray.push((endTime - startTime)/1000);
    sessionStorage.setItem("clickTimes", JSON.stringify(timeArray));
    console.log("times" + JSON.parse(sessionStorage.getItem("clickTimes")));

    if(index < iterationsLocal - 1){
        index += 1;
        console.log("Index " + index);
        this.style.backgroundColor = "#CCCCCC";

        setTimeout(() => {
            this.style.backgroundColor = "#FFFFFF";
            ProgrammingPhase(index);
          }, 250); //0.25 s delay
    }
    else{
        SaveProgramming()
        window.location.href = nextScreen;
    }
}



///////////////////////// Testing Phase Functions ////////////////////////
function CorrectTesting(){
    endTime = new Date();

    let iterationsLocal = localStorage.getItem(iterations);
    audio.play();
    this.style.backgroundColor = "#CCCCCC";

    //SAVE CLICKS AND TIMES
    let symbolArray = JSON.parse(sessionStorage.getItem("clickedSymbols"));
    symbolArray.push(tempIndexes[this.id]);
    sessionStorage.setItem("clickedSymbols", JSON.stringify(symbolArray));
    console.log(JSON.parse(sessionStorage.getItem("clickedSymbols")));

    let timeArray = JSON.parse(sessionStorage.getItem("clickTimes"));
    timeArray.push((endTime - startTime)/1000);
    sessionStorage.setItem("clickTimes", JSON.stringify(timeArray));
    console.log("times" + JSON.parse(sessionStorage.getItem("clickTimes")));

        setTimeout(() => {
            this.style.backgroundColor = "#FFFFFF";
          }, 250); //0.25 s delay
    console.log("Correct");
    if(index < iterationsLocal -1){
        console.log(index);
        index += 1;
    }
    else{
        document.getElementById("DoneButton").disabled = false;
        console.log("Done");
    }
}

function IncorrectTesting(){
    endTime = new Date();
    
    let iterationsLocal = localStorage.getItem(iterations);
    audio.play();
    this.style.backgroundColor = "#CCCCCC";

     //SAVE CLICKS AND TIMES
     let symbolArray = JSON.parse(sessionStorage.getItem("clickedSymbols"));
     symbolArray.push(tempIndexes[this.id]);
     sessionStorage.setItem("clickedSymbols", JSON.stringify(symbolArray));
     console.log(JSON.parse(sessionStorage.getItem("clickedSymbols")));
 
     let timeArray = JSON.parse(sessionStorage.getItem("clickTimes"));
     timeArray.push((endTime - startTime)/1000);
     sessionStorage.setItem("clickTimes", JSON.stringify(timeArray));
     console.log("times" + JSON.parse(sessionStorage.getItem("clickTimes")));



        setTimeout(() => {
            this.style.backgroundColor = "#FFFFFF";
          }, 250); //0.25 s delay
    console.log("Incorrect");
    if(index < iterationsLocal -1){
        console.log(index);
        index += 1;
        
    }
    else{
        document.getElementById("DoneButton").disabled = false;
        console.log("Done");
    }
}




///////////////////////// Shape Functions ////////////////////////
function Draw(ctx, symbol, width, height){
    var actx = ctx;
    actx.lineWidth = 4;

    actx.strokeStyle = symbol.color1;
    

    ///// SHAPE 1 //////////
    if(symbol.shape1 == "square"){
        actx.beginPath();
        actx.moveTo(width/4, width/4);
        actx.lineTo(width/4, width - width/4);
        actx.lineTo(width - width/4, width - width/4);
        actx.lineTo(width - width/4, width/4);
        actx.lineTo(width/4, width/4);
        if(symbol.line == true){
            actx.lineTo(width - width/4, width - width/4);
        }
        actx.stroke();
    }
    else if(symbol.shape1 == "circle"){
        actx.beginPath();
        actx.arc(width/2, width/2, width/4, 0, 2 * Math.PI);
        if(symbol.line == true){
            actx.moveTo(width/2 - width/4 * Math.cos(Math.PI/4), width/2 + width/4 * Math.sin(Math.PI/4));
            actx.lineTo(width/2 + width/4 * Math.cos(Math.PI/4), width/2 - width/4 * Math.sin(Math.PI/4));
            console.log("LINE DRAWN");
        }
        actx.stroke();
    }
    else{
        actx.beginPath();
        actx.font = width/2 + "px Arial";
        actx.fillText(symbol.shape1, 5 * width/16, width - 3 * width/8);
    }

    actx.strokeStyle = symbol.color2;


    ///// SHAPE 2 ///////
    if(symbol.shape2pos == "left"){

        if(symbol.shape2 == "square"){
            actx.beginPath();
            actx.moveTo(width/4, width/2);
            actx.lineTo(width/4, width * (3/8));
            actx.lineTo(4, width * (3/8));
            actx.lineTo(4, width * (5/8));
            actx.lineTo(width/4, width * (5/8));
            actx.lineTo(width/4, width/2);
            actx.stroke();
        }
        else if(symbol.shape2 == "circle"){
            actx.beginPath();
            actx.arc(width/8 + 2, width/2, width/8 - 2, 0, 2* Math.PI);
            actx.stroke();
        }
    }
    else if(symbol.shape2pos == "right"){
        if(symbol.shape2 == "square"){
            actx.beginPath();
            actx.moveTo(width - width/4, width/2);
            actx.lineTo(width - width/4, width * (3/8));
            actx.lineTo(width - 4, width * (3/8));
            actx.lineTo(width - 4, width * (5/8));
            actx.lineTo(width - width/4, width * (5/8));
            actx.lineTo(width - width/4, width/2);
            actx.stroke();
        }
        else if(symbol.shape2 == "circle"){
            actx.beginPath();
            actx.arc(width - width/8 - 2, width -  width/2, width/8 - 2, 0, 2* Math.PI);
            actx.stroke();
        }
    }
    else if(symbol.shape2pos == "upper"){
        if(symbol.shape2 == "square"){
            actx.beginPath();
            actx.moveTo(width/2, width/4);
            actx.lineTo(width * (3/8), width/4);
            actx.lineTo(width * (3/8), 4);
            actx.lineTo(width * (5/8), 4);
            actx.lineTo(width * (5/8), width/4);
            actx.lineTo(width/2, width/4);
            actx.stroke();
        }
        else if(symbol.shape2 == "circle"){
            actx.beginPath();
            actx.arc(width/2, width/8 + 2, width/8 - 2, 0, 2* Math.PI);
            actx.stroke();
        }
    }
    else if(symbol.shape2pos == "lower"){
        if(symbol.shape2 == "square"){
            actx.beginPath();
            actx.moveTo(width/2, width - width/4);
            actx.lineTo(width * (3/8),width -  width/4);
            actx.lineTo(width * (3/8),width -  4);
            actx.lineTo(width * (5/8),width -  4);
            actx.lineTo(width * (5/8),width -  width/4);
            actx.lineTo(width/2,width -  width/4);
            actx.stroke();
            
        }
        else if(symbol.shape2 == "circle"){
            actx.beginPath();
            actx.arc(width/2,width - width/8 - 2, width/8 - 2, 0, 2* Math.PI);
            actx.stroke(); 
        }
    }

}




////////////////////////     SYMBOLS (Shape1, Color1, Shape2, Color2, Shape2 Position, Line)
let colorValueLocal = localStorage.getItem("colorValue");
if(colorValueLocal == null){
    color1 = "#000000";
    color2 = "#000000";
}
else if(colorValueLocal == 1){
    color1 = "#005AB5";
    color2 = "#DC3220";
}
else if(colorValueLocal == 2){
    color1 = "#FFC20A";
    color2 = "#0C7BDC";
}
else if(colorValueLocal == 3){
    color1 = "#E66100";
    color2 = "#5D3A9B";
}

const Square1 = new Symbol("square", color1, "circle", color2, "lower", false);
const Square2 = new Symbol("square", color1, "circle", color2, "upper", false);
const Square3 = new Symbol("square", color1, "circle", color2, "right", false);
const Square4 = new Symbol("square", color1, "circle", color2, "left", false);
const Square5 = new Symbol("square", color1, "circle", color1, "lower", false);
const Square6 = new Symbol("square", color1, "circle", color1, "upper", false);
const Square7 = new Symbol("square", color1, "circle", color1, "right", false);
const Square8 = new Symbol("square", color1, "circle", color1, "left", false);
const Square9 = new Symbol("square", color2, "circle", color2, "lower", false);
const Square10 = new Symbol("square", color2, "circle", color2, "upper", false);
const Square11 = new Symbol("square", color2, "circle", color2, "right", false);
const Square12 = new Symbol("square", color2, "circle", color2, "left", false);
const Circle1 = new Symbol("circle", color1, "square", color2, "lower", false);
const Circle2 = new Symbol("circle", color1, "square", color2, "upper", false);
const Circle3 = new Symbol("circle", color1, "square", color2, "right", false);
const Circle4 = new Symbol("circle", color1, "square", color2, "left", false);
const Circle5 = new Symbol("circle", color1, "square", color1, "lower", false);
const Circle6 = new Symbol("circle", color1, "square", color1, "upper", false);
const Circle7 = new Symbol("circle", color1, "square", color1, "right", false);
const Circle8 = new Symbol("circle", color1, "square", color1, "left", false);
const Circle9 = new Symbol("circle", color2, "square", color2, "lower", false);
const Circle10 = new Symbol("circle", color2, "square", color2, "upper", false);
const Circle11 = new Symbol("circle", color2, "square", color2, "right", false);
const Circle12 = new Symbol("circle", color2, "square", color2, "left", false);

const Square1Line = new Symbol("square", color1, "circle", color2, "lower", true);
const Square2Line = new Symbol("square", color1, "circle", color2, "upper", true);
const Square3Line = new Symbol("square", color1, "circle", color2, "right", true);
const Square4Line = new Symbol("square", color1, "circle", color2, "left", true);
const Square5Line = new Symbol("square", color1, "circle", color1, "lower", true);
const Square6Line = new Symbol("square", color1, "circle", color1, "upper", true);
const Square7Line = new Symbol("square", color1, "circle", color1, "right", true);
const Square8Line = new Symbol("square", color1, "circle", color1, "left", true);
const Square9Line = new Symbol("square", color2, "circle", color2, "lower", true);
const Square10Line = new Symbol("square", color2, "circle", color2, "upper", true);
const Square11Line = new Symbol("square", color2, "circle", color2, "right", true);
const Square12Line = new Symbol("square", color2, "circle", color2, "left", true);
const Circle1Line = new Symbol("circle", color1, "square", color2, "lower", true);
const Circle2Line = new Symbol("circle", color1, "square", color2, "upper", true);
const Circle3Line = new Symbol("circle", color1, "square", color2, "right", true);
const Circle4Line = new Symbol("circle", color1, "square", color2, "left", true);
const Circle5Line = new Symbol("circle", color1, "square", color1, "lower", true);
const Circle6Line = new Symbol("circle", color1, "square", color1, "upper", true);
const Circle7Line = new Symbol("circle", color1, "square", color1, "right", true);
const Circle8Line = new Symbol("circle", color1, "square", color1, "left", true);
const Circle9Line = new Symbol("circle", color2, "square", color2, "lower", true);
const Circle10Line = new Symbol("circle", color2, "square", color2, "upper", true);
const Circle11Line = new Symbol("circle", color2, "square", color2, "right", true);
const Circle12Line = new Symbol("circle", color2, "square", color2, "left", true);

const LinearB1 = new Symbol("𐀀", color1, null, color2, null, null);
const LinearB2 = new Symbol("𐀁", color1, null, color2, null, null);
const LinearB3 = new Symbol(" 𐀂", color1, null, color2, null, null);
const LinearB4 = new Symbol("𐀃", color1, null, color2, null, null);
const LinearB5 = new Symbol("𐀄", color1, null, color2, null, null);
const LinearB6 = new Symbol("𐀅", color1, null, color2, null, null);
const LinearB7 = new Symbol("𐀆", color1, null, color2, null, null);
const LinearB8 = new Symbol("𐀇", color1, null, color2, null, null);
const LinearB9 = new Symbol("𐀈", color1, null, color2, null, null);
const LinearB10 = new Symbol("𐀉", color1, null, color2, null, null);
const LinearB11 = new Symbol("𐀊", color1, null, color2, null, null);
const LinearB12 = new Symbol("𐀳", color1, null, color2, null, null);
const LinearB13 = new Symbol("𐀴", color1, null, color2, null, null);
const LinearB14 = new Symbol("𐀶", color1, null, color2, null, null);
const LinearB15 = new Symbol("𐀸", color1, null, color2, null, null);
const LinearB16 = new Symbol("𐀍", color1, null, color2, null, null);
const LinearB17 = new Symbol("𐀓", color1, null, color2, null, null);
const LinearB18 = new Symbol("𐀩", color1, null, color2, null, null);
const LinearB19 = new Symbol("𐁔", color1, null, color2, null, null);
const LinearB20 = new Symbol("𐀢", color1, null, color2, null, null);
const LinearB21 = new Symbol("𐀀", color1, null, color2, null, null);
const LinearB22 = new Symbol("𐀹", color1, null, color2, null, null);
const LinearB23 = new Symbol("𐀞", color1, null, color2, null, null);
const LinearB24 = new Symbol("𐀿", color1, null, color2, null, null);


var noLine = [Square1, Square2, Square3, Square4, Square5, Square6, Square7, Square8, Square9, Square10, Square11, Square12, Circle1, Circle2, Circle3, Circle4, Circle5, Circle6, Circle7, Circle8, Circle9, Circle10, Circle11, Circle12];
var yesLine = [Square1, Square2, Square3, Square4, Square5, Square6, Square7, Square8, Square9, Square10, Square11, Square12, Circle1, Circle2, Circle3, Circle4, Circle5, Circle6, Circle7, Circle8, Circle9, Circle10, Circle11, Circle12, Square1Line, Square2Line, Square3Line, Square4Line, Square5Line, Square6Line, Square7Line, Square8Line, Square9Line, Square10Line, Square11Line, Square12Line, Circle1Line, Circle2Line, Circle3Line, Circle4Line, Circle5Line, Circle6Line, Circle7Line, Circle8Line, Circle9Line, Circle10Line, Circle11Line, Circle12Line]
var LinearB = [LinearB1, LinearB2, LinearB3, LinearB4, LinearB5, LinearB6, LinearB7, LinearB8, LinearB9, LinearB10, LinearB11, LinearB12, LinearB13, LinearB14, LinearB15, LinearB16, LinearB17, LinearB18, LinearB19, LinearB20, LinearB21, LinearB22, LinearB23, LinearB24]

var availableChars;


///////////////////////// Button Functions ////////////////////////
function SettingsButton(){
    window.location.href = "settings.html";
}

function StartButton(){
    window.location.href = "programming.html";
}

function WelcomeButton(){
    window.location.href = "Welcome.html";
}


function DoneTesting(){
    window.location.href = "results.html";
}





//////////////////////////////////// Phases ////////////////////////////////////////////////////

function Start(){
    let temparray = [];
    sessionStorage.setItem("clickedSymbols", JSON.stringify(temparray));
    sessionStorage.setItem("clickTimes", JSON.stringify(temparray));

    if(localStorage.getItem(iterations) == null){
        sessionStorage.setItem(iterations, 3);
    }

    if(localStorage.getItem("CharacterOption") == null){
        sessionStorage.setItem("CharacterOption", 1);
    }

    let CharacterSet = localStorage.getItem("CharacterOption");
    let iterationsLocal = localStorage.getItem(iterations);
    
    if(CharacterSet == 0){
        console.log("HAS LINES");
        availableChars = noLine;
    }
    else if(CharacterSet == 1){
        availableChars = LinearB;
    }

    extraChars = availableChars;
    for(let i = 0; i < iterationsLocal; i++){
        let randomIndex = Math.floor(Math.random() * availableChars.length);
        goalChars[i] = availableChars[randomIndex];
        extraChars.splice(randomIndex, 1);
    }

    sessionStorage.setItem(extraChars, JSON.stringify(extraChars));
    ProgrammingPhase(index);
}

function ProgrammingPhase(currentIndex){
    ResizeCanvas();
    ///////////////////////// ASSIGN IMPORTANT VARIABLES ////////////////////////
    startTime = new Date();
    let copyExtraChars = JSON.parse(sessionStorage.getItem(extraChars)).slice();

    var buttons = document.getElementsByClassName("button");
    const canvases = [
        document.getElementById("canvas1"),
        document.getElementById("canvas2"),
        document.getElementById("canvas3"),
        document.getElementById("canvasGoal")
    ];


    ///////////////////////// CLEAR PREVIOUS DRAWINGS ////////////////////////
    for(let i=0; i<canvases.length; i++){
        let canvas = canvases[i].getContext("2d");
        canvas.clearRect(0,0, canvases[i].width, canvases[i].height);
    }


    ///////////////////////// DRAW INCORRECT BUTTONS ////////////////////////

    tempIndexes = [];

    for(let i = 0; i < buttons.length; i++){
        let randomIndex = Math.floor(Math.random() * copyExtraChars.length);
        let ctx = canvases[i].getContext("2d");
        Draw(ctx, copyExtraChars[randomIndex], canvases[i].width, canvases[i].height);
        tempIndexes[i] = copyExtraChars[randomIndex];
        copyExtraChars.splice(randomIndex, 1);
        buttons[i].addEventListener("click", IncorrectProgramming);
    }

    ///////////////////////// DRAW CORRECT BUTTONS ////////////////////////
    let trueButtonIndex = Math.floor(Math.random() * buttons.length);
    let trueButton = buttons[trueButtonIndex];
    let trueCanvas = canvases[trueButtonIndex];
    tempIndexes[trueButtonIndex] = goalChars[currentIndex];
    let ctx = trueCanvas.getContext("2d");
    ctx.clearRect(0,0, trueCanvas.width, trueCanvas.height);
    Draw(ctx, goalChars[currentIndex], trueCanvas.width, trueCanvas.height);
    let ctx2 = canvases[3].getContext("2d");
    Draw(ctx2, goalChars[currentIndex], canvases[3].width, canvases[3].height);
    trueButton.removeEventListener("click", IncorrectProgramming);
    trueButton.addEventListener("click", CorrectProgramming);

    console.log(goalChars);
}



function TestingPhase(){

    startTime = new Date();

    let doneButton = document.getElementById("DoneButton");
    doneButton.disabled = true;
    ResizeCanvas();
    let copyGoalChars = JSON.parse(sessionStorage.getItem('goalChars'));
    let copyExtraChars = JSON.parse(sessionStorage.getItem('extraChars')).slice();


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

    tempIndexes = [];

    for(let i = 0; i< buttons.length; i++){
        let randomIndex = Math.floor(Math.random() * copyExtraChars.length)
        ctx = canvases[i].getContext("2d");
        Draw(ctx, copyExtraChars[randomIndex], canvases[i].width, canvases[i].height);
        tempIndexes[i] = copyExtraChars[randomIndex];
        copyExtraChars.splice(randomIndex, 1);
        buttons[i].addEventListener("click", IncorrectTesting);
    }


    let trueButtonIndexes = NonRepeatingValues(copyGoalChars.length);
    
    for(let i=0; i<trueButtonIndexes.length; i++){
        var trueButton = buttons[trueButtonIndexes[i]];
        var trueCanvas = canvases[trueButtonIndexes[i]];
        ctx = trueCanvas.getContext("2d");
        ctx.clearRect(0,0, trueCanvas.width, trueCanvas.height);
        tempIndexes[trueButtonIndexes[i]] = copyGoalChars[i];
        Draw(ctx, copyGoalChars[i], trueCanvas.width, trueCanvas.height);
        trueButton.removeEventListener("click", IncorrectTesting);
        trueButton.addEventListener("click", CorrectTesting);
    }
}

function resultsScore(obj1, obj2){
    let score = 0;
    console.log(JSON.parse(obj1).color1);



    return score;
}

function Results(){
    let symbolArray = JSON.parse(sessionStorage.getItem("clickedSymbols"));
    let timeArray = JSON.parse(sessionStorage.getItem("clickTimes"));
    let copyGoalChars = JSON.parse(sessionStorage.getItem('goalChars'));

    //PROGRAMMING PHASE RESULTS
    for(let i = 0; i < copyGoalChars.length; i++){
        console.log("GoalChar" + i);
        document.getElementById("GoalChar" + i).textContent = "Goal Stimuli " + (i+1) + "\n" + JSON.stringify(copyGoalChars[i]);
        document.getElementById("ChosenChar" + i).textContent = "Chosen Stimuli " + (i+1) + "\n" + JSON.stringify(symbolArray[i]) ;
    }

    //TESTING PHASE RESULTS
    for(let i=0; i < (symbolArray.length - copyGoalChars.length); i++){
        let newIndex = i + copyGoalChars.length //SKIPS OVER THE SYMBOLS IN THE PROGRAMMING PHASE
        document.getElementById("TestedChar" + i).textContent = "Testing Stimuli " + (i+1) + "\n" + JSON.stringify(symbolArray[newIndex]);
    }

    document.getElementById("ProgrammingResults").textContext = "Clicked Symbols \n" + JSON.stringify(symbolArray[0])



}
