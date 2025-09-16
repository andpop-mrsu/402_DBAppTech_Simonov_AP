<?php
namespace AlexSimonovGit\Hangman\View;

class View {
    public static function showWelcome() {
        echo "=============================\n";
        echo "  Добро пожаловать в 'Виселицу'!\n";
        echo "=============================\n\n";
    }

    public static function showWord(string $word, array $guessedLetters) {
        $output = '';
        foreach (str_split($word) as $letter) {
            $output .= in_array($letter, $guessedLetters) ? $letter . ' ' : '_ ';
        }
        echo $output . "\n";
    }

    public static function showHangman(int $mistakes) {
        $stages = [
            "",
            " O ",
            " O \n | ",
            " O \n/| ",
            " O \n/|\\",
            " O \n/|\\\n/  ",
            " O \n/|\\\n/ \\",
        ];
        echo $stages[$mistakes] . "\n";
    }

    public static function gameOver(bool $won, string $word) {
        if ($won) {
            echo "\nПоздравляем! Ты выиграл!\n";
        } else {
            echo "\nТы проиграл :( Загаданное слово: $word\n";
        }
    }
}
