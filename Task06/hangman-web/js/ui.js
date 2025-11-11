export function drawHangman(stage) {
  const states = [
    `+---+\n |   \n |   \n |   \n=====`,
    `+---+\n |   O\n |   \n |   \n=====`,
    `+---+\n |   O\n |   |\n |   \n=====`,
    `+---+\n |   O\n |  /|\n |   \n=====`,
    `+---+\n |   O\n |  /|\\\n |   \n=====`,
    `+---+\n |   O\n |  /|\\\n |  /\n=====`,
    `+---+\n |   O\n |  /|\\\n |  / \\\n=====`
  ];
  document.getElementById('hangman-drawing').innerText = states[stage];
}

export function showWord(word) {
  const container = document.getElementById('word-display');
  container.innerHTML = '';
  for (let ch of word) {
    const span = document.createElement('span');
    span.textContent = ch === '_' ? '' : ch.toUpperCase();
    container.appendChild(span);
  }
}

export function updateMessage(msg) {
  document.getElementById('message').textContent = msg;
}

export function createKeyboard(onClick) {
  const container = document.getElementById('letters');
  container.innerHTML = '';
  for (let i = 97; i <= 122; i++) {
    const btn = document.createElement('button');
    btn.textContent = String.fromCharCode(i);
    btn.addEventListener('click', () => onClick(btn.textContent));
    container.appendChild(btn);
  }
}
