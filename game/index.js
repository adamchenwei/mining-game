'use strict';
import { Board } from './board.js';
import Block from './block.js';

let gameBoard = new Board(30,15,20,startGame);
const startGame =(reRenderState) => {
  console.log('start')
  if (reRenderState === 'lose') {
    console.log('rerender!!!!');
    window.document.body.getElementsByClassName('gameTable__container')[0].remove();
    gameBoard.clearAll();
  } else {
    gameBoard = new Board(30,15,20,startGame.bind(this));
  }

  const holder = document.createElement('section');
  holder.className = 'gameTable__container';
  console.log(gameBoard.spots);
  let spots = gameBoard.spots.slice(0);
  let blockIdsList = [];
  let boardTemplate = ``;
  for (let columnCount = 0; columnCount < gameBoard.height; columnCount ++) {
    for (let rowCount = 0; rowCount < gameBoard.width; rowCount ++) {
      const blockId = `${columnCount+1}${rowCount+1}`;
      const pickedSpot = spots.shift();
      if (pickedSpot) {
        blockIdsList.push({
          blockId,
          pickedSpot,
        });
        const block = new Block(1,
          1,
          pickedSpot.cleared,
          pickedSpot.mine,
          blockId,
          [],
          gameBoard.endIt.bind(gameBoard)
        ).render();
        if (block) {
          holder.appendChild(block);
        }
      }
    }
  }

  window.document.body.appendChild(holder);
}

startGame();