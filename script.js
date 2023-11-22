const prompt = require("prompt-sync")({ sigint: true });



function printGameBoard(){
    for (let i = 0; i < 9;i++){
        if (i !=0 && i % 3 ==0 ) process.stdout.write('\n')
        if (gameBoard[i])
            process.stdout.write(` ${gameBoard[i]} `)
        else
            process.stdout.write(' * ')
    }
    process.stdout.write('\n')
}
function validInput(index,gameBoard){
    
    if (gameBoard[index] != ''){
        alert("Already checked!\n");
        return false;
    }
    return true;
}
function isAnyoneWinning(gameBoard){

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            alert(`Player ${gameBoard[a]} is the Winner\n`);
            return true;
        }
    }
}

function playTurn(index,currPlayer,gameBoard){

    let ticMark = '';
    if (currPlayer == 1) ticMark = "X";
    if (currPlayer == 2) ticMark = "O";
    if(!validInput(index,gameBoard)){ 
        console.log(currPlayer,gameBoard)
        return {currPlayer,gameBoard};
    }
    
    currPlayer = currPlayer % 2 + 1;
    
    try {
        gameBoard[index] = ticMark;
        const classNameOfSquare = ".square-" + index;
        const square = document.querySelector(classNameOfSquare);
        square.style.cssText += "display: flex;justify-content: center; align-items: center;";
        square.style.fontSize = "80px";
        square.textContent = ticMark;
        
        return {currPlayer,gameBoard};
    } catch (error) {
        console.log(error);
    }
    return {currPlayer,gameBoard};
}

function drawSquare (){
    let gameActive = true;
    let currPlayer = 1;
    var gameBoard = ['','','','','','','','',''];
    const boxContainer = document.querySelector(".square-container");
    boxContainer.textContent = "";
    for(let i = 0; i < 9;i++){
        const square = document.createElement('div');
        square.style.width = '200px';
        square.style.height = '200px';
        square.className = "square-" + i;
        square.style.border = "1px solid black";
        boxContainer.appendChild(square);

        square.addEventListener('click',()=>{
            if (!gameActive) return;
            const index = square.className.split('-')[1];
            const result = playTurn(index,currPlayer,gameBoard);             
            currPlayer = result.currPlayer;
            gameBoard = result.gameBoard;
            if(isAnyoneWinning(gameBoard)){
                gameActive = false;
                return;
            }                           
        }); 
    }
}