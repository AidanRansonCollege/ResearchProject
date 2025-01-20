//Variables Used
//Global Var
var goalChars = [];
var extraChars = [];
var iterations = 3;
var index = 0;
var nextScreen = "testing.html";


//Programming Vars
var programmingTimes = [];





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

///////////////////////// Functions ////////////////////////

function NonRepeatingValues(length){
    var values = [];
    var possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for(let i=0; i<length; i++){
        let randomIndex = Math.floor(Math.random() * possibleValues.length);
        console.log(possibleValues[randomIndex]);
        values.push(possibleValues[randomIndex]);
        possibleValues.splice(randomIndex, 1);
    }

    console.log(values);

    return values;
}

function SaveProgramming(){
    sessionStorage.setItem('goalChars', JSON.stringify(goalChars));
    sessionStorage.setItem('extraChars', JSON.stringify(extraChars));
    sessionStorage.setItem('iterations', iterations);
}

function CorrectProgramming(){
    console.log(extraChars);
    console.log("Correct");
    if(index < iterations - 1){
        index += 1;
        console.log("Index " + index);
        ProgrammingPhase(index);
        
    }
    else{
        SaveProgramming()
        window.location.href = nextScreen;
    }
}

function CorrectTesting(){
    console.log("Correct");
    if(index < iterations -1){
        console.log(index);
        index += 1;
    }
    else{
        console.log("Done");
    }
}

function IncorrectTesting(){
    console.log("Correct");
    if(index < iterations -1){
        console.log(index);
        index += 1;
    }
    else{
        console.log("Done");
    }
}


function IncorrectProgramming(){
    console.log("Incorrect");
    if(index < iterations - 1){
        index += 1;
        console.log("Index " + index);
        ProgrammingPhase(index);
    }
    else{
        SaveProgramming()
        window.location.href = nextScreen;
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
        actx.arc(x, y-20, 40, 0, 2 * Math.PI);
        actx.stroke();
    }

    actx.strokeStyle = symbol.color2;

    if(symbol.shape2pos == "left"){
        x=x-50;
        y=y-10;
    }
    else if(symbol.shape2pos == "right"){
        x=x+65;
        y=y-10;
    }
    else if(symbol.shape2pos == "upper"){
        y=y-25;
    }
    else if(symbol.shape2pos == "lower"){
        y=y+42;
    }


    if(symbol.shape2 == "square"){
        actx.beginPath();
        actx.moveTo(x-(x/8),y+(y/8));
        actx.lineTo(x+(x/8), y+(y/8));
        actx.lineTo(x+(x/8), y+(y/8) - 37.5);
        actx.lineTo(x-(x/8), y+(y/8) - 37.5);
        actx.lineTo(x-(x/8),y+(y/8))
        actx.stroke();
    }
    else if(symbol.shape2 == "circle"){
        actx.beginPath();
        actx.arc(x, y, 20, 0, 2* Math.PI);
        actx.stroke();
    }

}

var elem = document.documentElement;
function openFullscreen() {
    console.log("Fullscreen");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

////////////////////////     SYMBOLS (Shape1, Color1, Shape2, Color2, Shape2 Position)
const Square1 = new Symbol("square", "red", "circle", "black", "lower");
const Square2 = new Symbol("square", "red", "circle", "black", "upper");
const Square3 = new Symbol("square", "red", "circle", "black", "right");
const Square4 = new Symbol("square", "red", "circle", "black", "left");
const Square5 = new Symbol("square", "red", "circle", "red", "lower");
const Square6 = new Symbol("square", "red", "circle", "red", "upper");
const Square7 = new Symbol("square", "red", "circle", "red", "right");
const Square8 = new Symbol("square", "red", "circle", "red", "left");
const Square9 = new Symbol("square", "black", "circle", "black", "lower");
const Square10 = new Symbol("square", "black", "circle", "black", "upper");
const Square11 = new Symbol("square", "black", "circle", "black", "right");
const Square12 = new Symbol("square", "black", "circle", "black", "left");
const Circle1 = new Symbol("circle", "red", "square", "black", "lower");
const Circle2 = new Symbol("circle", "red", "square", "black", "upper");
const Circle3 = new Symbol("circle", "red", "square", "black", "right");
const Circle4 = new Symbol("circle", "red", "square", "black", "left");
const Circle5 = new Symbol("circle", "red", "square", "red", "lower");
const Circle6 = new Symbol("circle", "red", "square", "red", "upper");
const Circle7 = new Symbol("circle", "red", "square", "red", "right");
const Circle8 = new Symbol("circle", "red", "square", "red", "left");
const Circle9 = new Symbol("circle", "black", "square", "black", "lower");
const Circle10 = new Symbol("circle", "black", "square", "black", "upper");
const Circle11 = new Symbol("circle", "black", "square", "black", "right");
const Circle12 = new Symbol("circle", "black", "square", "black", "left");


var availableChars = [Square1, Square2, Square3, Square4, Square5, Square6, Square7, Square8, Square9, Square10, Square11, Square12, Circle1, Circle2, Circle3, Circle4, Circle5, Circle6, Circle7, Circle8, Circle9, Circle10, Circle11, Circle12];


//////////////////////////////////// Phases ////////////////////////////////////////////////////

function Start(){
    document.addEventListener("click", openFullscreen);

    extraChars = availableChars;
    for(let i = 0; i < iterations; i++){
        let randomIndex = Math.floor(Math.random() * availableChars.length);
        goalChars[i] = availableChars[randomIndex];
        extraChars.splice(randomIndex, 1);
    }

    ProgrammingPhase(index);
}

function ProgrammingPhase(currentIndex){
    ///////////////////////// ASSIGN IMPORTANT VARIABLES ////////////////////////
    startTime = new Date();
    let copyExtraChars = extraChars.slice();

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
}

function TestingPhase(){
    let copyGoalChars = JSON.parse(sessionStorage.getItem('goalChars'));
    let copyExtraChars = JSON.parse(sessionStorage.getItem('extraChars'));
    var iterations = sessionStorage.getItem('iterations');
    var index = 0;

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
        //buttons[i].addEventListener("click", IncorrectTesting);
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
