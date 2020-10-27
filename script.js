let gameModule = (function() {
let gameWon = false;
let gameWinner = '';
let gameboard = ['','','','','','','','',''];

let gameBoard = (function() {
    'use strict';
    let i = 0;

    function playerMove(selectedField) {
        let turns = ['x','o','x','o','x','o','x','o','x'];
        let currentTurn = turns[i];
        // attached eventlistener will give the div
        
        gameboard[selectedField] = currentTurn;
        i++
    }

    function checkGameOver() {
        let lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        for (let j = 0; j < lines.length; j++) {
            if (gameboard[lines[j][0]] !== '' && gameboard[lines[j][0]] == gameboard[lines[j][1]] && gameboard[lines[j][1]] == gameboard[lines[j][2]]) {
                gameWon = true;
                gameWinner = gameboard[lines[j][0]]
                return gameWinner, gameWon;
            }
        }
    }

    function clearBoard() {
        gameboard = ['','','','','','','','',''];
        i = 0;
        gameWon = false;
        displayController.renderGameboard();
        displayController.addBoardListeners();
    }

    return {
        gameboard,
        playerMove,
        checkGameOver,
        clearBoard
    };

})();

let displayController = (function() {
let fields = document.querySelectorAll('.gameBoard');

function renderGameboard() {
    
    for (let i = 0; i < fields.length; i++) {
        fields[i].innerHTML = gameboard[i]
        
    }
    return;
};

function renderScoreboard() {
    document.querySelector('#player1').innerHTML = players.playerDisplay(players.player1);
    document.querySelector('#player2').innerHTML = players.playerDisplay(players.player2);
}

function addScoreboardListeners() {
    document.querySelector('#player1Btn').addEventListener('click', () => {
        players.player1.name = prompt('Enter name for player 1:', 'Player1');
        renderScoreboard();
    });
    document.querySelector('#player2Btn').addEventListener('click', () => {
        players.player2.name = prompt('Enter name for player 2:', 'Player2');
        renderScoreboard();
    });
    document.querySelector('#restartBtn').addEventListener('click', () => {
        players.player1.score = 0;
        players.player2.score = 0;
        renderScoreboard();

    });
};

function addBoardListeners() {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i].innerHTML == '') {
            fields[i].addEventListener('click', function playMove() {
                selectedField = fields[i].id;
                gameBoard.playerMove(selectedField);
                fields.forEach(element => {
                    element.removeEventListener('click', playMove);   
                });
                renderGameboard();
                gameBoard.checkGameOver();
                if (gameWon == true) {
                    players.announceWinner();
                    renderScoreboard();
                    gameBoard.clearBoard();
                }
            })
        }
    };
};


return {
    renderScoreboard,
    addScoreboardListeners,
    renderGameboard,
    addBoardListeners,
};

})();



let players = (function() {
    let player1 = {
        tag:'x',
        name:'Player 1',
        score:0,
        nameScore:function() {return this.name + ': ' + this.score}
    }
    let player2 = {
        tag:'o',
        name:'Player 2',
        score:0,
        nameScore:function() {return this.name + ': ' + this.score}
    }
    
    function playerDisplay(player) {
        let playerNameScore = player.nameScore();
        return playerNameScore;
    }

    function announceWinner() {
        if (gameWinner == player1.tag) {
            player1.score++;
            alert(`${players.player1.name} has won the game! Congratulations!`);
        } else if (gameWinner == player2.tag) {
            player2.score++;
            alert(`${players.player2.name} has won the game! Congratulations!`);
        } else {
            alert (`It's a tie!`)
        }
    
    }

    return {
        player1,
        player2,
        playerDisplay,
        announceWinner
    }

})();

displayController.renderScoreboard();
displayController.addScoreboardListeners();
displayController.renderGameboard();
displayController.addBoardListeners();

})();