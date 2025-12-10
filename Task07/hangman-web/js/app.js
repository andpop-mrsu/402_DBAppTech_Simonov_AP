import { Game } from './game.js';
import * as ui from './ui.js';
import { saveGame, updateGame, saveAttempt, getAllGames, getAttempts } from './db.js';

let game;
let gameId = null;

const words = ['banana', 'apple', 'orange', 'cherry', 'grape'];

async function startNewGame() {
  game = new Game(words);

  ui.drawHangman(0);
  ui.showWord(game.displayWord);
  ui.updateMessage("Start guessing!");
  ui.createKeyboard(handleGuess);

  // Создаём запись о новой игре
  const newGame = {
    player: "Player",
    word: game.word,
    date: new Date().toISOString(),
    result: "unfinished"
  };

  await saveGame(newGame);

  // Получаем ID игры
  const games = await getAllGames();
  gameId = games[games.length - 1].id;
}

async function handleGuess(letter) {
  const result = game.guess(letter);

  // сохраняем попытку
  await saveAttempt({
    game_id: gameId,
    letter,
    outcome: result ? "hit" : "miss"
  });

  ui.showWord(game.displayWord);
  ui.drawHangman(game.wrong.size);

  if (game.isWin) {
    ui.updateMessage("🎉 You won!");
    disableButtons();

    await updateGame({
      id: gameId,
      player: "Player",
      word: game.word,
      date: new Date().toISOString(),
      result: "win"
    });

  } else if (game.isLose) {
    ui.updateMessage(`💀 You lost! Word: ${game.word}`);
    disableButtons();

    await updateGame({
      id: gameId,
      player: "Player",
      word: game.word,
      date: new Date().toISOString(),
      result: "lose"
    });
  }
}

function disableButtons() {
  document.querySelectorAll('#letters button').forEach(b => b.disabled = true);
}

// Показ списка игр
document.getElementById('show-games').onclick = async () => {
  const games = await getAllGames();

  let html = "<h3>Список игр</h3>";
  games.forEach(g => {
    html += `<p>ID: ${g.id} — слово: ${g.word} — результат: ${g.result}</p>`;
  });

  document.getElementById("games-list").innerHTML = html;
};

// Воспроизведение
document.getElementById('replay-game').onclick = async () => {
  const id = Number(prompt("Введите ID игры:"));
  const attempts = await getAttempts(id);

  let html = `<h3>Игра #${id}</h3>`;
  attempts.forEach(a => {
    html += `<p>Буква: ${a.letter}, результат: ${a.outcome}</p>`;
  });

  document.getElementById("replay").innerHTML = html;
};

document.getElementById('new-game').addEventListener('click', startNewGame);
startNewGame();
