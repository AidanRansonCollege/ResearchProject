var currentindex = 0;
function ResizeCanvases() {
    let container = document.getElementsByClassName('container');
    let canvas = document.getElementsByClassName('canvas');
    for (let i = 0; i < container.length; i++) {
        let width = container[i].offsetWidth;
        let height = container[i].offsetHeight;
        if (width <= height) {
            canvas[i].width = width;
            canvas[i].height = width;
        }
        else {
            canvas[i].width = height;
            canvas[i].height = height;
        }
    }
    canvas[0].width = canvas[1].width;
    canvas[0].height = canvas[1].height;
}
class Target {
    constructor(shape1, color1, shape2, color2, shape2pos, line) {
        this.shape1 = shape1;
        this.shape2 = shape2;
        this.color1 = color1;
        this.color2 = color2;
        this.shape2pos = shape2pos;
        this.line = line;
    }
}
var color1 = "#005AB5";
var color2 = "#DC3220";
const SquareA = new Target("square", color1, "circle", color2, "lower", false);
const SquareB = new Target("square", color1, "circle", color2, "upper", false);
const SquareC = new Target("square", color1, "circle", color2, "right", false);
const SquareD = new Target("square", color1, "circle", color2, "left", false);
const LinearBA = new Target("𐀀", color1, "false", color2, "false", false);
const LinearBB = new Target("𐀁", color1, "false", color2, "false", false);
const LinearBC = new Target(" 𐀂", color1, "false", color2, "false", false);
const LinearBD = new Target("𐀃", color1, "false", color2, "false", false);
const TriangleA = new Target("triangle", color1, "false", color2, "false", true);
const TriangleB = new Target("triangle", color1, "triangle", color1, "lower", true);
const TriangleC = new Target("triangle", color1, "triangle", color1, "upper", true);
const TriangleD = new Target("triangle", color1, "triangle", color1, "right", true);
const ArrowA = new Target("⬼", color1, "false", color2, "false", false);
const ArrowB = new Target("⬻", color1, "false", color2, "false", false);
const ArrowC = new Target("⬺", color1, "false", color2, "false", false);
const ArrowD = new Target("⬹", color1, "false", color2, "false", false);
function GenerateTestLocal() {
    let S1;
    let S2;
    let S3;
    let F1;
    let F2;
    let F3;
    let F4;
    let F5;
    let F6;
    let F7;
    let F8;
    let F9;
    let TargetPos1;
    let TargetPos2;
    let TargetPos3;
    S1 = TriangleA;
    F1 = TriangleB;
    F2 = TriangleC;
    F3 = TriangleD;
    S2 = SquareA;
    F4 = SquareB;
    F5 = SquareC;
    F6 = SquareD;
    S3 = LinearBA;
    F7 = LinearBB;
    F8 = LinearBC;
    F9 = LinearBD;
    TargetPos1 = 1;
    TargetPos2 = 2;
    TargetPos3 = 0;
    let Test = [];
    Test = [S1, F1, F2, F3, S2, F4, F5, F6, S3, F7, F8, F9, TargetPos1, TargetPos2, TargetPos3];
    sessionStorage.setItem("Test", JSON.stringify(Test));
}
function DrawTarget(ctx, symbol, width) {
    var actx = ctx;
    actx.lineWidth = 4;
    actx.strokeStyle = symbol.color1;
    actx.fillStyle = "black";
    ///// SHAPE 1 //////////
    if (symbol.shape1 == "square") {
        actx.beginPath();
        actx.moveTo(width / 4, width / 4);
        actx.lineTo(width / 4, width - width / 4);
        actx.lineTo(width - width / 4, width - width / 4);
        actx.lineTo(width - width / 4, width / 4);
        actx.lineTo(width / 4, width / 4);
        if (symbol.line == true) {
            actx.lineTo(width - width / 4, width - width / 4);
        }
        actx.stroke();
    }
    else if (symbol.shape1 == "circle") {
        actx.beginPath();
        actx.arc(width / 2, width / 2, width / 4, 0, 2 * Math.PI);
        if (symbol.line == true) {
            actx.moveTo(width / 2 - width / 4 * Math.cos(Math.PI / 4), width / 2 + width / 4 * Math.sin(Math.PI / 4));
            actx.lineTo(width / 2 + width / 4 * Math.cos(Math.PI / 4), width / 2 - width / 4 * Math.sin(Math.PI / 4));
            console.log("LINE DRAWN");
        }
        actx.stroke();
    }
    else if (symbol.shape1 == "triangle") {
        actx.beginPath();
        actx.moveTo(width / 4, width / 4);
        actx.lineTo(width - width / 4, width / 4);
        actx.lineTo(width / 2, width - width / 4);
        actx.lineTo(width / 4, width / 4);
        if (symbol.line == true) {
            actx.moveTo(width / 2, width - width / 4);
            actx.lineTo(width / 2, width / 4);
        }
        actx.stroke();
    }
    else {
        actx.beginPath();
        actx.font = Math.floor(width / 2) + "px Arial";
        actx.fillText(symbol.shape1, 5 * width / 16, width - 3 * width / 8);
    }
    actx.strokeStyle = symbol.color2;
    ///// SHAPE 2 ///////
    if (symbol.shape2pos == "left") {
        if (symbol.shape2 == "square") {
            actx.beginPath();
            actx.moveTo(width / 4, width / 2);
            actx.lineTo(width / 4, width * (3 / 8));
            actx.lineTo(4, width * (3 / 8));
            actx.lineTo(4, width * (5 / 8));
            actx.lineTo(width / 4, width * (5 / 8));
            actx.lineTo(width / 4, width / 2);
            actx.stroke();
        }
        else if (symbol.shape2 == "circle") {
            actx.beginPath();
            actx.arc(width / 8 + 2, width / 2, width / 8 - 2, 0, 2 * Math.PI);
            actx.stroke();
        }
        else if (symbol.shape2 == "triangle") {
            actx.beginPath();
            actx.moveTo(width / 4, width / 2);
            actx.lineTo(width / 4, width * (3 / 8));
            actx.lineTo(width / 4 - width * (1 / 8), width / 2);
            actx.lineTo(width / 4, width * (5 / 8));
            actx.lineTo(width / 4, width / 2);
            actx.stroke();
        }
    }
    else if (symbol.shape2pos == "right") {
        if (symbol.shape2 == "square") {
            actx.beginPath();
            actx.moveTo(width - width / 4, width / 2);
            actx.lineTo(width - width / 4, width * (3 / 8));
            actx.lineTo(width - 4, width * (3 / 8));
            actx.lineTo(width - 4, width * (5 / 8));
            actx.lineTo(width - width / 4, width * (5 / 8));
            actx.lineTo(width - width / 4, width / 2);
            actx.stroke();
        }
        else if (symbol.shape2 == "circle") {
            actx.beginPath();
            actx.arc(width - width / 8 - 2, width - width / 2, width / 8 - 2, 0, 2 * Math.PI);
            actx.stroke();
        }
        else if (symbol.shape2 == "triangle") {
            actx.beginPath();
            actx.moveTo(width - width / 4, width / 2);
            actx.lineTo(width - width / 4, width * (3 / 8));
            actx.lineTo(width - width / 4 + width * (1 / 8), width / 2);
            actx.lineTo(width - width / 4, width * (5 / 8));
            actx.lineTo(width - width / 4, width / 2);
            actx.stroke();
        }
    }
    else if (symbol.shape2pos == "upper") {
        if (symbol.shape2 == "square") {
            actx.beginPath();
            actx.moveTo(width / 2, width / 4);
            actx.lineTo(width * (3 / 8), width / 4);
            actx.lineTo(width * (3 / 8), 4);
            actx.lineTo(width * (5 / 8), 4);
            actx.lineTo(width * (5 / 8), width / 4);
            actx.lineTo(width / 2, width / 4);
            actx.stroke();
        }
        else if (symbol.shape2 == "circle") {
            actx.beginPath();
            actx.arc(width / 2, width / 8 + 2, width / 8 - 2, 0, 2 * Math.PI);
            actx.stroke();
        }
        else if (symbol.shape2 == "triangle") {
            actx.beginPath();
            actx.moveTo(width * (3 / 8), width / 4);
            actx.lineTo(width / 2, width * (1 / 8));
            actx.lineTo(width * (5 / 8), width / 4);
            actx.lineTo(width * (3 / 8), width / 4);
            actx.stroke();
        }
    }
    else if (symbol.shape2pos == "lower") {
        if (symbol.shape2 == "square") {
            actx.beginPath();
            actx.moveTo(width / 2, width - width / 4);
            actx.lineTo(width * (3 / 8), width - width / 4);
            actx.lineTo(width * (3 / 8), width - 4);
            actx.lineTo(width * (5 / 8), width - 4);
            actx.lineTo(width * (5 / 8), width - width / 4);
            actx.lineTo(width / 2, width - width / 4);
            actx.stroke();
        }
        else if (symbol.shape2 == "circle") {
            actx.beginPath();
            actx.arc(width / 2, width - width / 8 - 2, width / 8 - 2, 0, 2 * Math.PI);
            actx.stroke();
        }
        else if (symbol.shape2 == "triangle") {
            actx.beginPath();
            actx.moveTo(width * (3 / 8), width - width / 4);
            actx.lineTo(width / 2, width - width * (1 / 8));
            actx.lineTo(width * (5 / 8), width - width / 4);
            actx.lineTo(width * (3 / 8), width - width / 4);
            actx.stroke();
        }
    }
}
function SettingsButtonTS() {
    window.location.href = "settings.html";
}
function StartButtonTS() {
    window.location.href = "Encoding.html";
}
function WelcomeButtonTS() {
    window.location.href = "Welcome.html";
}
function DoneTestingTS() {
    window.location.href = "results.html";
}
function IncorrectEncoding() {
    console.log("INCORRECT" + currentindex);
    if (currentindex < 2) {
        currentindex += 1;
        this.style.backgroundColor = "#CCCCCC";
        setTimeout(() => {
            this.style.backgroundColor = "#FFFFFF";
        }, 250);
        setTimeout(() => {
            EncodingPhase();
        }, 100);
    }
    else {
        this.style.backgroundColor = "#CCCCCC";
        setTimeout(() => {
            this.style.backgroundColor = "#FFFFFF";
        }, 250);
        setTimeout(() => {
            window.location.href = "Recognition.html";
        }, 100);
    }
}
function CorrectEncoding() {
    console.log("CORRECT" + currentindex);
    if (currentindex < 2) {
        currentindex += 1;
        this.style.backgroundColor = "#CCCCCC";
        setTimeout(() => {
            this.style.backgroundColor = "#FFFFFF";
        }, 250);
        setTimeout(() => {
            EncodingPhase();
        }, 100);
    }
    else {
        this.style.backgroundColor = "#CCCCCC";
        setTimeout(() => {
            this.style.backgroundColor = "#FFFFFF";
        }, 250);
        setTimeout(() => {
            window.location.href = "Recognition.html";
        }, 100);
    }
}
function StartPhase() {
    GenerateTestLocal();
    EncodingPhase();
}
function EncodingPhase() {
    ResizeCanvases();
    //Define needed values
    let startTime = new Date();
    let copyTest = JSON.parse(sessionStorage.getItem("Test"));
    console.log(copyTest);
    let buttons = document.getElementsByClassName("button");
    const canvases = [
        document.getElementById("canvas1"),
        document.getElementById("canvas2"),
        document.getElementById("canvas3"),
        document.getElementById("canvasGoal")
    ];
    //Clear Previous Drawings
    for (let i = 0; i < canvases.length; i++) {
        let canvas = canvases[i].getContext("2d");
        canvas.clearRect(0, 0, canvases[i].width, canvases[i].height);
    }
    //Draw Correct Button
    let trueButtonIndex = copyTest[12 + currentindex];
    let trueButton = buttons[trueButtonIndex];
    let trueCanvas = canvases[trueButtonIndex];
    let ctx = trueCanvas.getContext("2d");
    DrawTarget(ctx, copyTest[4 * currentindex], trueCanvas.width);
    trueButton.addEventListener("click", CorrectEncoding);
    //Draw Goal
    let goalCanvas = canvases[3];
    ctx = goalCanvas.getContext("2d");
    DrawTarget(ctx, copyTest[4 * currentindex], goalCanvas.width);
    //Draw InCorrect Buttons
    for (let i = 0; i < buttons.length; i++) {
        if (i != trueButtonIndex) {
            ctx = canvases[i].getContext("2d");
            DrawTarget(ctx, copyTest[4 * currentindex + i + 1], canvases[i].width);
            buttons[i].addEventListener("click", IncorrectEncoding);
        }
    }
}
