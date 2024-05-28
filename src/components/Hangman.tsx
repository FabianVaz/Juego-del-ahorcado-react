import { useState, useEffect } from 'react';

interface HangmanProps {
  words: string[];
  hints: { [word: string]: string };
}

const Hangman = ({ words, hints }: HangmanProps) => {
  const [selectedWord, setSelectedWord] = useState<string>(words[0]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  useEffect(() => {
    setSelectedWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
    setErrorCount(0);
    setTimeElapsed(0);
  }, [words]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const displayWord = selectedWord.split('').map((letter) => {
    if (guessedLetters.includes(letter)) {
      return letter;
    } else {
      return '_';
    }
  });

  const handleGuess = (letter: string) => {
    if (!guessedLetters.includes(letter) && /^[a-zA-Z]$/.test(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!selectedWord.includes(letter)) {
        setErrorCount((prev) => prev + 1);
      }
    }
  };

  const restartGame = () => {
    setSelectedWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
    setErrorCount(0);
    setTimeElapsed(0);
  };

  return (
    <div>
      <p>{displayWord.join(' ')}</p>
      <p>Hint: {hints[selectedWord]}</p>
      <input
        maxLength={1}
        onChange={(e) => {
          handleGuess(e.target.value.toLowerCase());
          e.target.value = '';
        }}
      />
      {(displayWord.join('') === selectedWord || errorCount > 5) && (
        <button onClick={restartGame}>Select New Word</button>
      )}
      <p>Error count: {errorCount}</p>
      {displayWord.join('') === selectedWord && <p>You won this round</p>}
      {errorCount > 5 && <p>You lost this round</p>}
      <p>Time elapsed: {timeElapsed} seconds</p>
    </div>
  );
};

export default Hangman;
