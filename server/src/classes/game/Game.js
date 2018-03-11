export default class Game {
    _isFinished = false;
    _moveList = [];

    numberOfMoves() {
        return this._moveList.length
    }

    displayBoardAtMove(moveNumber) {

    }

    displayCurrentBoard() {
        return this.displayBoardAtMove(this._moveList.length - 1)
    }

    recordMove(column){
        this._moveList.push(column);
    }

    isFinished(){
        return this._isFinished;
    }
}