const prompt = require("prompt-sync")({ sigint: true });

let gameBoard = ['','','','','','','','','',];

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
function validInput(index){
    if (index < 0 || index > 8) {
        process.stdout.write("Not valid index, please try again\n")
        return false;
    }
    if (gameBoard[index] != ''){
        process.stdout.write("Already checked!\n");
        return false;
    }
    return true;
}
function playTurn(player){
    let ticMark = '';
    if (player == 1) ticMark = "X";
    if (player == 2) ticMark = "O";
    do{
        var index = prompt("Index: ");
    }while(!validInput(index-1));

    try {
        gameBoard[index-1] = ticMark;
    } catch (error) {
        console.log(error);
    }
}
function printTheWinner(playerNumber){

    process.stdout.write(`Player ${playerNumber} is the Winner\n`)

}
function isAnyoneWinning(){

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
            printTheWinner(gameBoard[a]);
            return true;
        }
    }
}

function start(){
    let countMove = 0;
    while(true){        
        if (countMove >= 9){
            process.stdout.write("Tie!\n")
            break
        }
        let player = countMove % 2 + 1;
        process.stdout.write(`Player ${player} turn!\n`)
        playTurn(player);
        countMove++;
        printGameBoard();
        if(isAnyoneWinning())
            break;   
    }
}
start();