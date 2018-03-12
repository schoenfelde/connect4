export default class Game {
    _isFinished = false;
    _columnCount = 7;
    _rowCount = 6;
    _maxMoves = this._rowCount * this._columnCount;
    _moveList = [];
    winner = false;

    numberOfMoves() {
        return this._moveList.length
    }

    getMoves() {
        return this._moveList;
    }

    displayBoardAtMove(moveNumber) {

    }

    displayCurrentBoard() {
        return this.displayBoardAtMove(this._moveList.length - 1)
    }

    recordMove(column){
        this._validateMove(column);
        //Remainder 0 = first player, remainder 1 = second player
        const player = this._moveList.length % 2 + 1;
        const move = {
            player: player,
            column: column,
            row: this._getRowNumber(column)
        }
        this._moveList.push(move);
        const winner = this.checkWinConditions();
        if (winner)
            this.winner = winner;
        this.updateGameStatus();
    }

    getGameStatus() {
        return {
            finished: this.isFinished(),
            status: this._status
        }
    }

    updateGameStatus() {
        if (this._moveList.length === this._maxMoves){
            this._isFinished = true;
            this._status = 'Game over, cat!'
        }
        else if(this.winner) {
            this._isFinished = true;
            this._status = `Game over, congratulations to ${this.winner}!`
        }
        else
            this._status = 'In progress';
    }

    checkWinConditions() {
        const player1Moves = this._moveList.filter( x => x.player === 1);
        const player2Moves = this._moveList.filter( x => x.player === 2);
        return ( this.checkHorizontalWin(player1Moves, player2Moves) || this.checkVerticalWin() || this.checkDiagonalWin() );
    }

    checkHorizontalWin(p1Moves, p2Moves) {
        return this._checkRows(p1Moves) || this._checkRows(p2Moves);
    }

    _checkRows(moves) {
        for ( let i = 0; i < this._rowCount; i++ ) {
            //Get all players pieces on a row
            let sameRowPieces = moves.filter( x => x.row === i);
            if (sameRowPieces.length < 4)
                continue
            else {
                sameRowPieces.sort(this._rowSorter)
                for (let j = 0; j < sameRowPieces.length; j++){
                    if (j + 4 > sameRowPieces.length) 
                            break;
                    else {
                        if (sameRowPieces[j].column === sameRowPieces[j+1].column - 1  &&  sameRowPieces[j].column === sameRowPieces[j+2].column - 2 && sameRowPieces[j].column === sameRowPieces[j+3].column - 3){
                            return moves[0].player
                        }
                    }
                }
            }
        }
        return false;
    }

    _rowSorter( a , b) {
        return a.row > b.row ? 1 : (a.row < b.row ? -1 : 0)
    }

    checkVerticalWin() {

    }

    checkDiagonalWin() {

    }

    _validateMove(column) {
        if (column < 1 || column > this._columnCount)
            throw new Error(`Column ${column} is not a valid move. Please select a column 1 - 7`)

        if (this._moveList.length === this._maxMoves)
            throw new Error('Game is finished, no more moves possible!')
            
        const numPiecesInColumn = this._moveList.filter( x => x.column === column).length;
        if (numPiecesInColumn === this._rowCount)
            throw new Error(`Column ${column} is filled! Please select a different column`)    
    }

    _getRowNumber(column) {
        return this._moveList.filter( x => x.column === column).length
    }

    isFinished(){
        return this._isFinished;
    }
}