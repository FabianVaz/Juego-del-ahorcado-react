import { useState, useEffect } from 'react';

interface HangmanProps {
  words: string[];
  hints: { [word: string]: string };
}

const Hangman = ({ words, hints }: HangmanProps) => {
  const [selectedWord, setSelectedWord] = useState<string>(words[0]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0); // Estado para mantener el tiempo transcurrido

  useEffect(() => {
    setSelectedWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
    setErrorCount(0);
    setTimeElapsed(0); // Reiniciar el tiempo cuando se cambie de palabra
  }, [words]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1);
    }, 1000); // Actualizar el contador cada segundo

    return () => clearInterval(timer); // Limpiar el intervalo cuando el componente se desmonte
  }, []);

  const displayWord = selectedWord.split('').map((letter, index) => {
    if (guessedLetters.includes(letter)) {
      return letter;
    } else {
      return '_';
    }
  });

  const handleGuess = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
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
    setTimeElapsed(0); // Reiniciar el tiempo cuando se reinicie el juego
  };

  return (
    <div>
      <p>{displayWord.join(' ')}</p>
      <p>Hint: {hints[selectedWord]}</p>
      <input maxLength={1} onChange={(e) => handleGuess(e.target.value)} />
      {(displayWord.join('') === selectedWord || errorCount > 5) && (
        <button onClick={restartGame}>Select New Word</button>
      )}
      <p>Error count: {errorCount}</p>
      {displayWord.join('') === selectedWord && (
        <p>You won in this round</p>
      )}
      <p>Time elapsed: {timeElapsed} seconds</p>
      
    </div>
  );
};

export default Hangman;
