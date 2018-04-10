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
        return ( this.checkHorizontalWin(player1Moves, player2Moves) || this.checkVerticalWin(player1Moves, player2Moves) || this.checkDiagonalWin(player1Moves, player2Moves) );
    }

    checkHorizontalWin(p1Moves, p2Moves) {
        return this._checkRows(p1Moves) || this._checkRows(p2Moves);
    }

    _checkRows(moves) {
        // for ( let i = 0; i < this._rowCount; i++ ) {
        //     //Get all players pieces on a column
        //     let sameRowPieces = moves.filter( x => x.row === i);
        //     if (sameRowPieces.length < 4)
        //     continue
        //     else {
        //         sameRowPieces.sort(this._columnSorter)
        //         for (let j = 0; j < sameRowPieces.length; j++){
        //             if (j + 4 > sameRowPieces.length) 
        //             break;
        //             else {
        //                 if (sameRowPieces[j].column === sameRowPieces[j+1].column - 1  &&  sameRowPieces[j].column === sameRowPieces[j+2].column - 2 && sameRowPieces[j].column === sameRowPieces[j+3].column - 3){
        //                     return moves[0].player
        //                 }
        //             }
        //         }
        //     }
        // }
        // return false;
    }

    _rowSorter( a , b) {
        return a.row > b.row ? 1 : (a.row < b.row ? -1 : 0)
    }

    checkVerticalWin(p1Moves, p2Moves) {
        return this._checkColumns(p1Moves) || this._checkColumns(p2Moves);
    }

    _checkColumns(moves) {
        for ( let i = 0; i < this._columnCount; i++ ) {
            //Get all players pieces on a row
            let sameColumnPieces = moves.filter( x => x.column === i);
            if (sameColumnPieces.length < 4)
                continue
            else {
                sameColumnPieces.sort(this._rowSorter)
                for (let j = 0; j < sameColumnPieces.length; j++){
                    if (j + 4 > sameColumnPieces.length) 
                            break;
                    else {
                        if (sameColumnPieces[j].row === sameColumnPieces[j+1].row - 1  &&  sameColumnPieces[j].row === sameColumnPieces[j+2].row - 2 && sameColumnPieces[j].row === sameColumnPieces[j+3].row - 3){
                            return moves[0].player
                        }
                    }
                }
            }
        }
        return false;
    }

    _columnSorter( a , b) {
        return a.column > b.column ? 1 : (a.column < b.column ? -1 : 0)
    }

    checkDiagonalWin(p1Moves, p2Moves) {
        //see if we have 4 pieces
        //sort by column
        //method to check step down or up
        //piece === piece + x, piece + y
        //piece === piece - x, piece - y
        //see if multiple in a line
        let countInARow = 1;
        let increasing = true;
        let prevMove = p1Moves[0];
        p1Moves.sort(this._columnSorter);
        console.log('p1Moves', p1Moves);
        console.log('\n')
        for (let i = 1; i < p1Moves.length; i++) {
            let nextMove = p1Moves.filter( move => prevMove.row === move.row + 1 && prevMove.column === move.column + 1 )[0];
            if (nextMove) {
                if (increasing)
                    countInARow += 1;
                else {
                    increasing = true;
                    countInARow = 1;
                }
            }
            else if(prevMove.row === p1Moves[i].row - 1 && prevMove.column === p1Moves[i].column - 1){
                if (!increasing)
                    countInARow += 1;
                else {
                    increasing = false
                    countInARow = 1;
                }
            }
            if (nextMove)
            prevMove = p1Moves[i];
            if (countInARow === 4)
                return p1Moves[0].player;
        }
        return false;
    }

    /**
     * TODO figure out the count incremetor
     * @param {} move 
     * @param {*} moveList 
     * @param {*} direction 
     */
    seeIfPieceIsTouching(move, moveList, direction) {
        //Avove means same column, but increasing row
        const pieceAbove = moveList.filter( m => move.row === m.row + 1 && move.column === m.column);
        const pieceRight = moveList.filter( m => move.row === m.row && move.column === m.column + 1);
        const pieceDiagInc = moveList.filter( m => move.row === m.row + 1 && move.column === m.column + 1);
        const pieceDiagDec = moveList.filter( m => move.row === m.row - 1 && move.column === m.column - 1);

        if (pieceAbove.length > 0)
            this.seeIfPieceIsTouching(pieceAbove[0], moveList.slice(pieceAbove[0]),'column');
        if (pieceRight.length > 0)
            this.seeIfPieceIsTouching(pieceRight[0], moveList.slice(pieceRight[0]),'row');
        if (pieceDiagInc.length > 0)
            this.seeIfPieceIsTouching(pieceDiagInc[0], moveList.slice(pieceDiagInc[0]),'diaginc');
        if (pieceDiagDec.length > 0)
            this.seeIfPieceIsTouching(pieceDiagDec[0], moveList.slice(pieceDiagDec[0]),'diagdec');
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

    /**
     * Check to see if the game is finished
     */
    isFinished(){
        return this._isFinished;
    }
}








// /**
//  *  REFACTOR
//  * @param {} moves 
//  * @param {*} vertical 
//  */
//     _checkLines(moves, direction) {
//         const options = vertical ? this._columnCount : this._rowCount;
//         const filterByField = vertical ? 'column' : 'row';
//         for ( let i = 0; i < options; i++ ) {
//             //Get all players pieces on a column
//             let sameLinePieces = moves.filter( x => x.row === i);
//             if (sameLinePieces.length < 4)
//             continue
//             else {
//                 if (_checkIfPiecesAreConnected())
//                     return moves[0].player
//             }
//                 }
//        return false;
//     }

//     _checkIfPiecesAreConnected(moves, direction){
//         let sortedMoves = [];
//         let property = '';
//         switch(direction) {
//             case 'horizontal':
//                 sortedMoves = moves.sort(this._rowSorter);
//                 property = 'column';
//                 break;
//             case 'vertical':
//                 sortedMoves = moves.sort(this._columnSorter);
//                 property = 'row';
//                 break;
//             case 'diagonal':
//                 sortedMoves = moves.sort(this._rowSorter);
//                 property = 'row';
//                 break;
//             default:
//                 break;
//         }
    
//         for (let i = 0; i < sortedMoves.length; i++){
            
//         }

//     }
    
//     //////////////////////////////////////////