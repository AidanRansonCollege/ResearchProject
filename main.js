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
        localStorage.setItem(colorValue, colorValue);
    }

    if(document.getElementById("CheckLine").checked == true){
        localStorage.setItem(lineOption, true);
    }
    else{
        localStorage.setItem(lineOption, false);
    }
    DisplaySettings();
}

function DisplaySettings(){
    document.getElementById("DropIndex").value = localStorage.getItem(iterations);
    document.getElementById("DropColor").value = localStorage.getItem(colorValue);

    if(localStorage.getItem(lineOption) == "true"){
        document.getElementById("CheckLine").checked = true;
    }
    else{
        document.getElementById("CheckLine").checked = false;
    }
    

    document.getElementById("Iterations").textContent = "Iterations: " + localStorage.getItem(iterations);
    document.getElementById("Lines").textContent = "Lines Enabled: " + localStorage.getItem(lineOption);
    document.getElementById("Color").textContent = "Color is: " + localStorage.getItem(colorValue);
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
    programmingTimes[index] = endTime - startTime;
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
    
    let iterationsLocal = localStorage.getItem(iterations);
    audio.play();
    console.log("Incorrect");
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
    
    let iterationsLocal = localStorage.getItem(iterations);
    audio.play();
    this.style.backgroundColor = "#CCCCCC";
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
    
    let iterationsLocal = localStorage.getItem(iterations);
    audio.play();
    this.style.backgroundColor = "#CCCCCC";
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
const Square1 = new Symbol("square", "#D41159", "circle", "#1A85FF", "lower", false);
const Square2 = new Symbol("square", "#D41159", "circle", "#1A85FF", "upper", false);
const Square3 = new Symbol("square", "#D41159", "circle", "#1A85FF", "right", false);
const Square4 = new Symbol("square", "#D41159", "circle", "#1A85FF", "left", false);
const Square5 = new Symbol("square", "#D41159", "circle", "#D41159", "lower", false);
const Square6 = new Symbol("square", "#D41159", "circle", "#D41159", "upper", false);
const Square7 = new Symbol("square", "#D41159", "circle", "#D41159", "right", false);
const Square8 = new Symbol("square", "#D41159", "circle", "#D41159", "left", false);
const Square9 = new Symbol("square", "#1A85FF", "circle", "#1A85FF", "lower", false);
const Square10 = new Symbol("square", "#1A85FF", "circle", "#1A85FF", "upper", false);
const Square11 = new Symbol("square", "#1A85FF", "circle", "#1A85FF", "right", false);
const Square12 = new Symbol("square", "#1A85FF", "circle", "#1A85FF", "left", false);
const Circle1 = new Symbol("circle", "#D41159", "square", "#1A85FF", "lower", false);
const Circle2 = new Symbol("circle", "#D41159", "square", "#1A85FF", "upper", false);
const Circle3 = new Symbol("circle", "#D41159", "square", "#1A85FF", "right", false);
const Circle4 = new Symbol("circle", "#D41159", "square", "#1A85FF", "left", false);
const Circle5 = new Symbol("circle", "#D41159", "square", "#D41159", "lower", false);
const Circle6 = new Symbol("circle", "#D41159", "square", "#D41159", "upper", false);
const Circle7 = new Symbol("circle", "#D41159", "square", "#D41159", "right", false);
const Circle8 = new Symbol("circle", "#D41159", "square", "#D41159", "left", false);
const Circle9 = new Symbol("circle", "#1A85FF", "square", "#1A85FF", "lower", false);
const Circle10 = new Symbol("circle", "#1A85FF", "square", "#1A85FF", "upper", false);
const Circle11 = new Symbol("circle", "#1A85FF", "square", "#1A85FF", "right", false);
const Circle12 = new Symbol("circle", "#1A85FF", "square", "#1A85FF", "left", false);

const Square1Line = new Symbol("square", "#D41159", "circle", "#1A85FF", "lower", true);
const Square2Line = new Symbol("square", "#D41159", "circle", "#1A85FF", "upper", true);
const Square3Line = new Symbol("square", "#D41159", "circle", "#1A85FF", "right", true);
const Square4Line = new Symbol("square", "#D41159", "circle", "#1A85FF", "left", true);
const Square5Line = new Symbol("square", "#D41159", "circle", "#D41159", "lower", true);
const Square6Line = new Symbol("square", "#D41159", "circle", "#D41159", "upper", true);
const Square7Line = new Symbol("square", "#D41159", "circle", "#D41159", "right", true);
const Square8Line = new Symbol("square", "#D41159", "circle", "#D41159", "left", true);
const Square9Line = new Symbol("square", "#1A85FF", "circle", "#1A85FF", "lower", true);
const Square10Line = new Symbol("square", "#1A85FF", "circle", "#1A85FF", "upper", true);
const Square11Line = new Symbol("square", "#1A85FF", "circle", "#1A85FF", "right", true);
const Square12Line = new Symbol("square", "#1A85FF", "circle", "#1A85FF", "left", true);
const Circle1Line = new Symbol("circle", "#D41159", "square", "#1A85FF", "lower", true);
const Circle2Line = new Symbol("circle", "#D41159", "square", "#1A85FF", "upper", true);
const Circle3Line = new Symbol("circle", "#D41159", "square", "#1A85FF", "right", true);
const Circle4Line = new Symbol("circle", "#D41159", "square", "#1A85FF", "left", true);
const Circle5Line = new Symbol("circle", "#D41159", "square", "#D41159", "lower", true);
const Circle6Line = new Symbol("circle", "#D41159", "square", "#D41159", "upper", true);
const Circle7Line = new Symbol("circle", "#D41159", "square", "#D41159", "right", true);
const Circle8Line = new Symbol("circle", "#D41159", "square", "#D41159", "left", true);
const Circle9Line = new Symbol("circle", "#1A85FF", "square", "#1A85FF", "lower", true);
const Circle10Line = new Symbol("circle", "#1A85FF", "square", "#1A85FF", "upper", true);
const Circle11Line = new Symbol("circle", "#1A85FF", "square", "#1A85FF", "right", true);
const Circle12Line = new Symbol("circle", "#1A85FF", "square", "#1A85FF", "left", true);


var noLine = [Square1, Square2, Square3, Square4, Square5, Square6, Square7, Square8, Square9, Square10, Square11, Square12, Circle1, Circle2, Circle3, Circle4, Circle5, Circle6, Circle7, Circle8, Circle9, Circle10, Circle11, Circle12];
var yesLine = [Square1, Square2, Square3, Square4, Square5, Square6, Square7, Square8, Square9, Square10, Square11, Square12, Circle1, Circle2, Circle3, Circle4, Circle5, Circle6, Circle7, Circle8, Circle9, Circle10, Circle11, Circle12, Square1Line, Square2Line, Square3Line, Square4Line, Square5Line, Square6Line, Square7Line, Square8Line, Square9Line, Square10Line, Square11Line, Square12Line, Circle1Line, Circle2Line, Circle3Line, Circle4Line, Circle5Line, Circle6Line, Circle7Line, Circle8Line, Circle9Line, Circle10Line, Circle11Line, Circle12Line]

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
    if(localStorage.getItem(iterations) == null){
        sessionStorage.setItem(iterations, 3);
    }

    if(localStorage.getItem(lineOption) == null){
        sessionStorage.setItem(lineOption, false);
    }

    let lineOptionLocal = localStorage.getItem(lineOption);
    let iterationsLocal = localStorage.getItem(iterations);
    
    if(lineOptionLocal == "true"){
        console.log("HAS LINES");
        availableChars = yesLine;
    }
    else{
        console.log("NO LINES");
        availableChars = noLine;
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

    for(let i = 0; i < buttons.length; i++){
        let randomIndex = Math.floor(Math.random() * copyExtraChars.length);
        let ctx = canvases[i].getContext("2d");
        Draw(ctx, copyExtraChars[randomIndex], canvases[i].width, canvases[i].height);
        copyExtraChars.splice(randomIndex, 1);
        buttons[i].addEventListener("click", IncorrectProgramming);
    }

    ///////////////////////// DRAW CORRECT BUTTONS ////////////////////////
    let trueButtonIndex = Math.floor(Math.random() * buttons.length);
    let trueButton = buttons[trueButtonIndex];
    let trueCanvas = canvases[trueButtonIndex];

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
    let doneButton = document.getElementById("DoneButton");
    doneButton.disabled = true;
    ResizeCanvas();
    let copyGoalChars = JSON.parse(sessionStorage.getItem('goalChars'));
    let copyExtraChars = JSON.parse(sessionStorage.getItem('extraChars'));


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


    for(let i = 0; i< buttons.length; i++){
        let randomIndex = Math.floor(Math.random() * copyExtraChars.length)
        ctx = canvases[i].getContext("2d");
        Draw(ctx, copyExtraChars[randomIndex], canvases[i].width, canvases[i].height);
        copyExtraChars.splice(randomIndex, 1);
        buttons[i].addEventListener("click", IncorrectTesting);
    }


    let trueButtonIndexes = NonRepeatingValues(copyGoalChars.length);
    
    for(let i=0; i<trueButtonIndexes.length; i++){
        var trueButton = buttons[trueButtonIndexes[i]];
        var trueCanvas = canvases[trueButtonIndexes[i]];
        ctx = trueCanvas.getContext("2d");
        ctx.clearRect(0,0, trueCanvas.width, trueCanvas.height);
        Draw(ctx, copyGoalChars[i], trueCanvas.width, trueCanvas.height);
        trueButton.removeEventListener("click", IncorrectTesting);
        trueButton.addEventListener("click", CorrectTesting);
    }
}
