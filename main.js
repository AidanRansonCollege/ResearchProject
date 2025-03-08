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
    actx.fillStyle = "black";
    

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
    else if(symbol.shape1 == "triangle"){

        actx.beginPath();
        actx.moveTo(width/4, width/4);
        actx.lineTo(width-width/4, width/4);
        actx.lineTo(width/2, width-width/4);
        actx.lineTo(width/4, width/4);
        
        if(symbol.line == true){
            actx.moveTo(width/2, width - width/4);
            actx.lineTo(width/2, width/4);
        }
        actx.stroke();

    }
    else{
        actx.beginPath();
        actx.font = Math.floor(width/2) + "px Arial";
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
        else if(symbol.shape2 == "triangle"){
            actx.beginPath();
            actx.moveTo(width/4, width/2);
            actx.lineTo(width/4, width * (3/8));
            actx.lineTo(width/4 - width * (1/8), width/2);
            actx.lineTo(width/4, width * (5/8));
            actx.lineTo(width/4, width/2);
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
        else if(symbol.shape2 == "triangle"){
            actx.beginPath();
            actx.moveTo(width - width/4, width/2);
            actx.lineTo(width - width/4, width * (3/8));
            actx.lineTo(width - width/4 + width * (1/8), width/2);
            actx.lineTo(width - width/4, width * (5/8));
            actx.lineTo(width - width/4, width/2);
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
        else if(symbol.shape2 == "triangle"){
            actx.beginPath();
            actx.moveTo(width * (3/8), width/4);
            actx.lineTo(width/2, width * (1/8));
            actx.lineTo(width * (5/8), width/4);
            actx.lineTo(width * (3/8), width/4);
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
        else if(symbol.shape2 == "triangle"){
            actx.beginPath();
            actx.moveTo(width * (3/8), width - width/4);
            actx.lineTo(width/2, width - width * (1/8));
            actx.lineTo(width * (5/8), width - width/4);
            actx.lineTo(width * (3/8), width - width/4);
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
const LinearB21 = new Symbol("𐀙", color1, null, color2, null, null);
const LinearB22 = new Symbol("𐀹", color1, null, color2, null, null);
const LinearB23 = new Symbol("𐀞", color1, null, color2, null, null);
const LinearB24 = new Symbol("𐀿", color1, null, color2, null, null);

const Triangle1 = new Symbol("triangle", color1, null, color2, null, true);
const Triangle2 = new Symbol("triangle", color1, "triangle", color1, "lower", true);
const Triangle3 = new Symbol("triangle", color1, "triangle", color1, "upper", true);
const Triangle4 = new Symbol("triangle", color1, "triangle", color1, "right", true);
const Triangle5 = new Symbol("triangle", color1, "triangle", color1, "left", true);
const Triangle6 = new Symbol("triangle", color1, "triangle", color2, "lower", true);
const Triangle7 = new Symbol("triangle", color1, "triangle", color2, "upper", true);
const Triangle8 = new Symbol("triangle", color1, "triangle", color2, "right", true);
const Triangle9 = new Symbol("triangle", color1, "triangle", color2, "left", true);
const Triangle10 = new Symbol("triangle", color2, "triangle", color2, "lower", true);
const Triangle11 = new Symbol("triangle", color2, "triangle", color2, "upper", true);
const Triangle12 = new Symbol("triangle", color2, "triangle", color2, "right", true);
const Triangle13 = new Symbol("triangle", color2, "triangle", color2, "left", true);
const Triangle14 = new Symbol("triangle", color2, "triangle", color1, "lower", true);
const Triangle15 = new Symbol("triangle", color2, "triangle", color1, "upper", true);
const Triangle16 = new Symbol("triangle", color2, "triangle", color1, "right", true);
const Triangle17 = new Symbol("triangle", color2, "triangle", color1, "left", true);
const Triangle18 = new Symbol("triangle", color2, null, color2, null, true);
const Triangle19 = new Symbol("triangle", color1, null, color2, null, false);
const Triangle20 = new Symbol("triangle", color1, "triangle", color1, "lower", false);
const Triangle21 = new Symbol("triangle", color1, "triangle", color1, "upper", false);
const Triangle22 = new Symbol("triangle", color1, "triangle", color1, "right", false);
const Triangle23 = new Symbol("triangle", color1, "triangle", color1, "left", false);
const Triangle24 = new Symbol("triangle", color1, "triangle", color2, "lower", false);
const Triangle25 = new Symbol("triangle", color1, "triangle", color2, "upper", false);
const Triangle26 = new Symbol("triangle", color1, "triangle", color2, "right", false);
const Triangle27 = new Symbol("triangle", color1, "triangle", color2, "left", false);
const Triangle28 = new Symbol("triangle", color2, "triangle", color2, "lower", false);
const Triangle29 = new Symbol("triangle", color2, "triangle", color2, "upper", false);
const Triangle30 = new Symbol("triangle", color2, "triangle", color2, "right", false);
const Triangle31 = new Symbol("triangle", color2, "triangle", color2, "left", false);
const Triangle32 = new Symbol("triangle", color2, "triangle", color1, "lower", false);
const Triangle33 = new Symbol("triangle", color2, "triangle", color1, "upper", false);
const Triangle34 = new Symbol("triangle", color2, "triangle", color1, "right", false);
const Triangle35 = new Symbol("triangle", color2, "triangle", color1, "left", false);
const Triangle36 = new Symbol("triangle", color2, null, color2, null, false);

const Arrow1 = new Symbol("⬼", color1, null, color2, null, null);
const Arrow2 = new Symbol("⬻", color1, null, color2, null, null);
const Arrow3 = new Symbol("⬺", color1, null, color2, null, null);
const Arrow4 = new Symbol("⬹", color1, null, color2, null, null);
const Arrow5 = new Symbol("⬸", color1, null, color2, null, null);
const Arrow6 = new Symbol("⬷", color1, null, color2, null, null);
const Arrow7 = new Symbol("⬶", color1, null, color2, null, null);
const Arrow8 = new Symbol("⬽", color1, null, color2, null, null);
const Arrow9 = new Symbol("⬵", color1, null, color2, null, null);
const Arrow10 = new Symbol("⬴", color1, null, color2, null, null);
const Arrow11 = new Symbol("⥓", color1, null, color2, null, null);
const Arrow12= new Symbol("⥒", color1, null, color2, null, null);
const Arrow13 = new Symbol("⭌", color1, null, color2, null, null);
const Arrow14 = new Symbol("⭋", color1, null, color2, null, null);
const Arrow15 = new Symbol("⭊", color1, null, color2, null, null);
const Arrow16 = new Symbol("⭉", color1, null, color2, null, null);
const Arrow17 = new Symbol("⭈", color1, null, color2, null, null);
const Arrow18 = new Symbol("⭇", color1, null, color2, null, null);
const Arrow19 = new Symbol("⭆", color1, null, color2, null, null);
const Arrow20 = new Symbol("⭅", color1, null, color2, null, null);
const Arrow21 = new Symbol("⭄", color1, null, color2, null, null);
const Arrow22 = new Symbol("⭂", color1, null, color2, null, null);
const Arrow23 = new Symbol("⭁", color1, null, color2, null, null);
const Arrow24 = new Symbol("⬾", color1, null, color2, null, null);

var noLine = [Square1, Square2, Square3, Square4, Square5, Square6, Square7, Square8, Square9, Square10, Square11, Square12, Circle1, Circle2, Circle3, Circle4, Circle5, Circle6, Circle7, Circle8, Circle9, Circle10, Circle11, Circle12];
var LinearB = [LinearB1, LinearB2, LinearB3, LinearB4, LinearB5, LinearB6, LinearB7, LinearB8, LinearB9, LinearB10, LinearB11, LinearB12, LinearB13, LinearB14, LinearB15, LinearB16, LinearB17, LinearB18, LinearB19, LinearB20, LinearB21, LinearB22, LinearB23, LinearB24]
var Triangle = [Triangle1, Triangle2, Triangle3, Triangle4, Triangle5, Triangle6, Triangle7, Triangle8, Triangle9, Triangle10, Triangle11, Triangle12, Triangle13, Triangle14, Triangle15, Triangle16, Triangle17, Triangle18, Triangle19, Triangle20, Triangle21, Triangle22, Triangle23, Triangle24, Triangle25, Triangle26, Triangle27, Triangle28, Triangle29, Triangle30, Triangle31, Triangle33, Triangle34, Triangle35, Triangle36];
var Arrow = [Arrow1, Arrow, Arrow2, Arrow3, Arrow4, Arrow5, Arrow6, Arrow7, Arrow8, Arrow9, Arrow10, Arrow11, Arrow12, Arrow13, Arrow14, Arrow15, Arrow16, Arrow17, Arrow18, Arrow19, Arrow20, Arrow21, Arrow22, Arrow23, Arrow24];
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


function GenerateTest(){
    let S1, S2, S3;
    let F1, F2, F3, F4, F5, F6, F7, F8, F9;

    S1 = Triangle1;
    S2 = Square1;
    S3 = LinearB1;
    F1 = Triangle2;
    F2 = Triangle3;
    F3 = Triangle4;
    F4 = Square2;
    F5 = Square3;
    F6 = Square4;
    F7 = LinearB2;
    F8 = LinearB3;
    F9 = LinearB4;

    Test = [[F1, F2, F3, S1],
            [F4, F5, F6, S2],
            [F7, F8, F9, S3]]

    sessionStorage.setItem("Test", JSON.stringify(Test));
}


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
    else if(CharacterSet == 2){
        availableChars = Triangle;
    }
    else if(CharacterSet == 3){
        availableChars = Arrow;
    }

    extraChars = availableChars;
    for(let i = 0; i < iterationsLocal; i++){
        let randomIndex = Math.floor(Math.random() * availableChars.length);
        goalChars[i] = availableChars[randomIndex];
        extraChars.splice(randomIndex, 1);
    }

    GenerateTest();
    sessionStorage.setItem(extraChars, JSON.stringify(extraChars));
    ProgrammingPhase(index);
}

function ProgrammingPhase(currentIndex){
    ResizeCanvas();
    ///////////////////////// ASSIGN IMPORTANT VARIABLES ////////////////////////
    startTime = new Date();
    let copyTest = JSON.parse(sessionStorage.getItem("Test"));

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
        let ctx = canvases[i].getContext("2d");
        Draw(ctx, copyTest[currentIndex][i], canvases[i].width, canvases[i].height);
        buttons[i].addEventListener("click", IncorrectProgramming);
    }

    ///////////////////////// DRAW CORRECT BUTTON ////////////////////////
    let trueButtonIndex = Math.floor(Math.random() * buttons.length);
    let trueButton = buttons[trueButtonIndex];
    let trueCanvas = canvases[trueButtonIndex];
    let ctx = trueCanvas.getContext("2d");
    ctx.clearRect(0,0, trueCanvas.width, trueCanvas.height);
    Draw(ctx, copyTest[currentIndex][3], trueCanvas.width, trueCanvas.height);
    trueButton.removeEventListener("click", IncorrectProgramming);
    trueButton.addEventListener("click", CorrectProgramming);

    ///////////////////////// DRAW TARGET AT TOP OF SCREEN //////////////////////////
    let ctx2 = canvases[3].getContext("2d");
    Draw(ctx2, copyTest[currentIndex][3], canvases[3].width, canvases[3].height);
    
}



function TestingPhase(){

 startTime = new Date();

    let doneButton = document.getElementById("DoneButton");
    doneButton.disabled = true;
    ResizeCanvas();
    let copyTest = JSON.parse(sessionStorage.getItem("Test"));


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
    let canvascounter =0

    for(let i = 0; i< 3; i++){
        for(let j = 0; j<3; j++){
            ctx = canvases[canvascounter].getContext("2d");
            Draw(ctx, copyTest[i][j], canvases[canvascounter].width, canvases[canvascounter].height);
            buttons[canvascounter].addEventListener("click", IncorrectTesting);
            canvascounter+=1;
        }

    }


    
    
    for(let i=0; i<3; i++){
        let trueButtonIndex = Math.floor(Math.random() * 3 + (i*3));

        var trueButton = buttons[trueButtonIndex];
        var trueCanvas = canvases[trueButtonIndex];
        ctx = trueCanvas.getContext("2d");
        ctx.clearRect(0,0, trueCanvas.width, trueCanvas.height);
        Draw(ctx, copyTest[i][3], trueCanvas.width, trueCanvas.height);
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
