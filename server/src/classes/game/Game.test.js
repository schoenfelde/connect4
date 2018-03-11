import chai from 'chai';
const expect = chai.expect;
import Game from './Game';

describe('Game', function() {
  describe('Game Creation', function() {
    it('should create a new game, when instatiating the class', function() {
      const newGame = new Game();
      expect(newGame.numberOfMoves()).to.equal(0);
    })
  })
})