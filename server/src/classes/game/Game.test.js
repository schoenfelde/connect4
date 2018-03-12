import chai from 'chai';
const expect = chai.expect;
import Game from './Game';

describe('Game', function() {
  describe('Game Creation', function() {
    it('should create a new game, when instatiating the class', function() {
      const newGame = new Game();
      expect(newGame.numberOfMoves()).to.equal(0);
    })

    it('should create a new game even if a game exists', function() {
      const gameA = new Game();
      gameA.recordMove(3);
      const gameB = new Game();
      expect(gameB.numberOfMoves()).to.equal(0);
    })
  })

  describe('Game Moves', function() {
    it('should have 1 move after recording 1 move', function() {
      const game = new Game();
      game.recordMove(2);
      expect(game.numberOfMoves()).to.equal(1);
    })

    it('should be the correct player for 1 move', function() {
      const game = new Game();
      game.recordMove(2);
      const player = game.getMoves()[0].player;
      expect(player).to.equal(1);
    })

    it('should be the correct row and column for 2nd move', function() {
      const game = new Game();
      game.recordMove(2);
      game.recordMove(2);
      const move = game.getMoves()[1];
      expect(move.row).to.be.equal(1);
    })

    it('should not let you record a move more than the board width', function() {
      const game = new Game();
      expect( () => game.recordMove(8)).to.throw('Column 8 is not a valid move. Please select a column 1 - 7');
    })

    it('should not allow more moves than vertically than rows', function() {
      const game = new Game();
      for (let i = 0; i < 6; i++) {
          game.recordMove(1);
      }
      expect( () => game.recordMove(1)).to.throw('Column 1 is filled! Please select a different column');
    })

    it('should not allow more moves than possible', function() {
      const game = new Game();
      for (let i = 0; i < 7; i++) {
        for ( let j = 0; j < 6; j++){
          game.recordMove(i+1);
        }
      }
      expect( () => game.recordMove(1)).to.throw('Game is finished, no more moves possible!');
    })
  })

  describe('Game Win Conditions', function() {
    it('should win with 4 in a row horizontally', function (){
      const game = new Game();
      game.recordMove(1);
      game.recordMove(1);
      game.recordMove(2);
      game.recordMove(2);
      game.recordMove(3);
      game.recordMove(3);
      game.recordMove(4);
      expect(game.winner).to.be.equal(1)
    })

    it('should win with 4 in a row horizontally, with a middle connect 4', function (){
      const game = new Game();
      game.recordMove(5);
      game.recordMove(1);
      game.recordMove(2);
      game.recordMove(2);
      game.recordMove(3);
      game.recordMove(3);
      game.recordMove(4);
      expect(game.winner).to.be.equal(1)
    })

    it('should win with 4 in a row horizontally, with an end connect 4', function (){
      const game = new Game();
      game.recordMove(7);
      game.recordMove(1);
      game.recordMove(2);
      game.recordMove(2);
      game.recordMove(3);
      game.recordMove(3);
      game.recordMove(4);
      game.recordMove(4);
      game.recordMove(5);
      game.recordMove(5);
      game.recordMove(6);
      expect(game.winner).to.be.equal(1)
    })

    it('should win with 4 in a row horizontally, player 2', function (){
      const game = new Game();
      game.recordMove(1);
      game.recordMove(1);
      game.recordMove(2);
      game.recordMove(2);
      game.recordMove(3);
      game.recordMove(3);
      game.recordMove(1);
      game.recordMove(4);
      game.recordMove(1);
      game.recordMove(4);
      expect(game.winner).to.be.equal(2)
    })

    it('should win with 4 in a row vertically', function (){
      const game = new Game();
      game.recordMove(1);
      game.recordMove(2);
      game.recordMove(1);
      game.recordMove(2);
      game.recordMove(1);
      game.recordMove(3);
      game.recordMove(1);
      expect(game.winner).to.be.equal(1)
    })

    it('should win with 4 in a row vertically, middle of board', function (){
      const game = new Game();
      game.recordMove(2);
      game.recordMove(1);
      game.recordMove(1);
      game.recordMove(2);
      game.recordMove(1);
      game.recordMove(3);
      game.recordMove(1);
      game.recordMove(2);
      game.recordMove(1);
      expect(game.winner).to.be.equal(1)
    })

    it.skip('should win with 4 in a row diagonally', function (){
      const game = new Game();
      game.recordMove(1);
      game.recordMove(2);
      game.recordMove(2);
      game.recordMove(3);
      game.recordMove(3);
      game.recordMove(4);
      game.recordMove(3);
      game.recordMove(4);
      game.recordMove(4);
      game.recordMove(5);
      game.recordMove(4);
      expect(game.winner).to.be.equal(1)
    })

    it('should declare no winner when board is full', function (){
      const game = new Game();
      for (let i = 0; i < 7; i++) {
        for ( let j = 0; j < 6; j++){
          game.recordMove(i+1);
        }
      }
      expect(game.isFinished()).to.be.equal(true)
    })
  })
})