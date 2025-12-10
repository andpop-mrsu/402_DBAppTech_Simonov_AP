export class Game {
  constructor(words) {
    this.words = words;
    this.maxAttempts = 6;
    this.reset();
  }

  reset() {
    this.word = this.words[Math.floor(Math.random() * this.words.length)];
    this.guessed = new Set();
    this.wrong = new Set();
  }

  /**
   * Делает попытку угадать букву
   * @param {string} letter — введённая буква
   * @returns {boolean|null} — true=угадал, false=ошибка, null=буква была уже использована
   */
  guess(letter) {
    letter = letter.toLowerCase();

    if (this.guessed.has(letter) || this.wrong.has(letter)) {
      return null; 
    }

    if (this.word.includes(letter)) {
      this.guessed.add(letter);
      return true; // угадал
    } else {
      this.wrong.add(letter);
      return false; // ошибся
    }
  }

  get displayWord() {
    return [...this.word]
      .map(ch => (this.guessed.has(ch) ? ch : "_"))
      .join("");
  }

  get isWin() {
    return !this.displayWord.includes("_");
  }

  get isLose() {
    return this.wrong.size >= this.maxAttempts;
  }
}
