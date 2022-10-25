import Player from "../factories/Player";
import ComputerMove from "../factories/ComputerMove";
import 'jquery';

const gamePlay = (() => {
    let playerName;
    let userPlayer;
    let computerPlayer;
    let computerMoves;
    let nextComputerMove;
    let playerStatus;
    let computerStatus;

    const $playerBoard = $('.player-board').children();
    const $computerBoard = $('.computer-board').children();
    const $textTop = $('.text-top');
    const $textBottom = $('.text-bottom');
    const $textResults = $("<p></p>");
    const $replayBtn = $('.replay-btn');

    const textPlayerTurn = 'You fire a shot into enemy waters . . .';
    const textComputerTurn = 'The enemy firest a shot . . .';
    const textComputerWait = 'The enemy is taking aim . . .';
    const textMiss = 'and it\'s a miss.';
    const textHit = 'and it\'s a hit!';
    const testPlayerSunk = ' You sunk their';
    const testComputerSunk = ' They sunk your';
    const textWinTop = `Congratuations ${playerName},`;
    const textWinBottom = 'You\'re the winner!';
    const textLoseTop = 'The enemy has won.';
    const textLoseBottom = 'Better luck next time.';

    function beginGame(userName, computerName) {
        playerName = userName;
        userPlayer = new Player(userName);
        computerPlayer = new Player(computerName);
        computerMoves = new ComputerMove();

        nextComputerMove = Math.floor(Math.random() * 100);
        playerStatus = userPlayer.takeHit(nextComputerMove);

        userPlayer.gameboard.board.forEach(cell => {
            if (cell.shipId !== 'none') {
                jQuery($playerBoard[cell.index]).attr('id', 'ship');
            }
        });

        computerPlayer.gameboard.board.forEach(cell => {
            if (cell.shipId !== 'none') {
                jQuery($computerBoard[cell.index]).addClass('computer-ship');
            }
        });

        $computerBoard.forEach(cell => {
            cell.style.cursor = 'pointer';
            cell.on('click', event => {
                jQuery($(event.currentTarget)).addClass('active');
                userTurn(event);
            });
        });
    };

    function userTurn(event) {
        $(event.currentTarget).removeClass('active');
        $textTop.text('');
        $textBottom.text('');

    };

    return {
        beginGame,
        userTurn
    };
})();

export default gamePlay;