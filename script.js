const statusDisplay = document.getElementById("gStatus");
let gActive = true;
let gPlayer = "X";
let gState = ["", "", "", "", "", "", "", "", ""];
const gWinCond = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const gWinStatus = () => 'Jogador ' + gPlayer + ' vençeu!';
const gEmpStatus = () => 'Empate!';
const gVezStatus = () => 'É a vez do ' + gPlayer + '!';

statusDisplay.innerHTML = gVezStatus();

function handleSqrPlayed(clickedSqr, clickedSqrIndex){
    gState[clickedSqrIndex] = gPlayer;
    clickedSqr.innerHTML = gPlayer;
}

function handlePlyChange(){
    gPlayer = gPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = gVezStatus();
}

function handleResuValid(){
    let roundWin = false;
    for (let i = 0; i <= 7; i++){
        const wCond = gWinCond[i];
        let a = gState[wCond[0]];
        let b = gState[wCond[1]];
        let c = gState[wCond[2]];
        if(a === '' || b === '' || c === ''){
            continue;
        }
        if(a == b && b==c){
            roundWin = true;
            break;
        }
    }
    if(roundWin){
        statusDisplay.innerHTML = gWinStatus();
        gActive = false;
        return;
    }
    let roundEmp = !gState.includes("");
    if(roundEmp){
        statusDisplay.innerHTML = gEmpStatus();
        gActive = false;
        return;
    }
    handlePlyChange();
}

function handleSqrClick(clickerSqrEvent){
    const clickedSqr = clickerSqrEvent.target;
    const clickedSqrIndex = parseInt(clickedSqr.getAttribute('id'));
    if(gState[clickedSqrIndex] !== "" || !gActive){
        return;
    }
    handleSqrPlayed(clickedSqr, clickedSqrIndex);
    handleResuValid();
}

function handleRestart(){
    gActive = true;
    gPlayer = "X";
    gState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = gVezStatus();
    document.querySelectorAll('.gameSquare').forEach(square => square.innerHTML = "");
}

document.querySelectorAll('.gameSquare').forEach(square => square.addEventListener('click', handleSqrClick));
document.querySelector('.gRestart').addEventListener('click', handleRestart);