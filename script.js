let gameBoard = (function() {
    'use strict';
    let gameboard = ['x','o','x','o','x','o','x','o','x']

    return {
        gameboard,
    };

})();

let displayController = (function() {
'use strict';
let renderGameboard = function() {
    let fields = document.querySelectorAll(.gameBoard)
    for (let i; i < fields.length; i++) {
        fields[i].innerHTML = gameBoard.gameboard[i]
    }
}
    
    
})();

let playersFactory = function() {

};