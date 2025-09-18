<?php
namespace AlexSimonovGit\Hangman\Controller;

use AlexSimonovGit\Hangman\View\View;
use function cli\prompt;

class Controller {
public static function startGame() {
    View::showWelcome();

    $words = ["planet", "bridge", "guitar", "window", "forest", "school"];
    $word = $words[array_rand($words)];

    $guessed = [];
    $mistakes = 0;
    $maxMistakes = 6;

    while ($mistakes < $maxMistakes) {
        View::showWord($word, $guessed);
        View::showHangman($mistakes);

        $letter = strtolower(prompt("Введи букву"));

        if (strlen($letter) !== 1 || !ctype_alpha($letter)) {
            echo "Введите одну букву!\n";
            continue;
        }

        if (in_array($letter, $guessed)) {
            echo "Ты уже вводил эту букву!\n";
            continue;
        }

        $guessed[] = $letter;

        if (!str_contains($word, $letter)) {
            $mistakes++;
        }

        $allGuessed = true;
        foreach (str_split($word) as $ch) {
            if (!in_array($ch, $guessed)) {
                $allGuessed = false;
                break;
            }
        }

        if ($allGuessed) {
            View::showWord($word, $guessed);
            View::gameOver(true, $word);
            return;
        }
    }

    View::showHangman($mistakes);
    View::gameOver(false, $word);
}
}