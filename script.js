const prompt = require("prompt-sync")({ sigint: true });
const playerOne = 1;
const playerTwo = 2;
const winningConditionPlayerOne = "XXX";
const winningConditionPlayerTwo = "OOO";
let gameBoard = [["*","*","*"],["*","*","*"],["*","*","*"]];

function printGameBoard(){
    for (let i = 0; i< 3;i++){
        for (let j = 0; j< 3;j++){
            process.stdout.write(`${gameBoard[i][j]} `)
        }
        process.stdout.write("\n")
    }
}
function validInput(row,col){
    if (row > 2 || row < 0 || col > 2 || col < 0) {
        process.stdout.write("Not valid input, please try again\n")
        return false;
    }
    if (gameBoard[row][col] != "*"){
        process.stdout.write("Already checked!\n");
        return false;
    }
    return true;
}
function playTurn(player){
    let ticMark = "?"
    if (player == 1) ticMark = "X"
    if (player == 2) ticMark = "O"
    do{
        let input = prompt("Row? Column? ").split(' ')
        var row = input[0];
        var col = input[1];
    }while(!validInput(row,col));
    try {
        gameBoard[row][col] = ticMark;
    } catch (error) {
        console.log(error);
    }
}
function printTheWinner(playerNumber){
    if (playerNumber == playerOne)
        process.stdout.write("Player one is the winner")
    else if (playerNumber == playerTwo)
        process.stdout.write("Player two is the winner")
    else
        process.stdout.write("Who tf is this?")
}

function checkRow(){
    for (let i = 0;i<3;i++){
        if (gameBoard[i].join('') == winningConditionPlayerOne)
            return {result:true,winner:playerOne};
    if (gameBoard[i].join('') == winningConditionPlayerTwo)
        return {result:true,winner:playerTwo};
    }
    return {result:false}
}
const gameBoardColumn = (colIndex) => gameBoard.map(x => x[colIndex]);
function checkColumn(){
    for (let i = 0;i<3;i++){
        if (gameBoardColumn(i).join('') == winningConditionPlayerOne)
            return {result:true,winner:playerOne};
        if (gameBoardColumn(i).join('') == winningConditionPlayerTwo)  
        return {result:true,winner:playerTwo};
    }    
    return {result:false}
}
function gameBoarDiag(DiagIndex){
    // DiagIndex = 0 => [0][0],[1][1],[2][2]
    // DiagIndex = 1=> [0][2],[1][1],[2][0]
    let result = []
    if (DiagIndex == 0){
        for (let i = 0; i < 3;i++)
            result.push(gameBoard[i][i])
        return result;
    }
    else{
        for(let i = 0;i<3;i++){
            result.push(gameBoard[i][2-i])
        }
        return result;
    }
}
function checkDiag(){
    for(let i = 0;i<2;i++){
        if (gameBoarDiag(i).join('') == winningConditionPlayerOne)
            return {result:true,winner:playerOne};
        if (gameBoarDiag(i).join('') == winningConditionPlayerTwo)  
            return {result:true,winner:playerTwo};
    }
    return {result:false}
}
function isAnyoneWinning(){
    let row = checkRow();
    let col = checkColumn();
    let diag = checkDiag();
    if (row.result){
        printTheWinner(row.winner);
        return true;
    }
    if (col.result){
        printTheWinner(col.winner);
        return true;
    }    
    if (diag.result){
        printTheWinner(diag.winner);
        return true;
    }       
    return false;
}
function start(){
    let countMove = 0;
    while(true){        
        if (countMove >= 9){
            countMove = 0;
            process.stdout.write("Tie!\n")
            break
        }
        let player = countMove % 2 + 1;
        process.stdout.write(`Player ${player} turn!\n`)
        playTurn(player);
        countMove++;
        printGameBoard();
        if(isAnyoneWinning()){
            break;
        }        
    }
    
}
start();