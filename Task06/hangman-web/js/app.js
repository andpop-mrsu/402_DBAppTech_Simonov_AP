import { Game } from './game.js';
import * as ui from './ui.js';

let game;

const words = ['banana', 'apple', 'orange', 'cherry', 'grape'];

function startNewGame() {
  game = new Game(words);
  ui.drawHangman(0);
  ui.showWord(game.displayWord);
  ui.updateMessage("Start guessing!");
  ui.createKeyboard(handleGuess);
}

function handleGuess(letter) {
  game.guess(letter);
  ui.showWord(game.displayWord);
  ui.drawHangman(game.wrong.size);

  if (game.isWin) {
    ui.updateMessage("🎉 You won!");
    disableButtons();
  } else if (game.isLose) {
    ui.updateMessage(`💀 You lost! Word: ${game.word}`);
    disableButtons();
  }
}

function disableButtons() {
  document.querySelectorAll('#letters button').forEach(b => b.disabled = true);
}

document.getElementById('new-game').addEventListener('click', startNewGame);
startNewGame();
