class Target{
    shape1: string;
    shape2: string;
    color1: string;
    color2: string;
    shape2pos: string
    line: boolean;

    public constructor(shape1: string, shape2: string, color1: string, color2: string, shape2pos: string, line: boolean){
        this.shape1 = shape1;
        this.shape2 = shape2;
        this.color1 = color1;
        this.color2 = color2;
        this.shape2pos = shape2pos;
        this.line = line;
    }
}



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

function GenerateTestLocal(){
    let S1: Target;
    let S2: Target; 
    let S3: Target;
    let F1: Target;
    let F2: Target;
    let F3: Target;
    let F4: Target;
    let F5: Target;
    let F6: Target;
    let F7: Target;
    let F8: Target;
    let F9: Target;


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

    let Test: Target[] = [];
}

function StartPhase(){

    
}