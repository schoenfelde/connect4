export default class Game {
    _isFinished = false;
    _columnCount = 7;
    _rowCount = 6;
    _maxMoves = this._rowCount * this._columnCount;
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
        this._validateMove(column);
        this._moveList.push(column);
    }

    _validateMove(column) {
        if (column < 1 || column > this._columnCount)
            throw new Error(`Column ${column} is not a valid move. Please select a column 1 - 7`)

        if (this._moveList.length === this._maxMoves)
            throw new Error('Game is finished, no more moves possible!')
            
        const numPiecesInColumn = this._moveList.filter( x => x === column).length;
        if (numPiecesInColumn === this._rowCount)
            throw new Error(`Column ${column} is filled! Please select a different column`)    
        
    }

    isFinished(){
        return this._isFinished;
    }
}