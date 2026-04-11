import { useState } from "react";

function Day06() {
  const [number] = useState(Math.floor(Math.random() * 10) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");

  function checkGuess() {
    if (!guess) return;

    if (Number(guess) === number) {
      setMessage("Correct!");
    } else if (guess > number) {
      setMessage("its High!");
    } else {
      setMessage("its Low!");
    }
  }

  return (
    <div>
      <h2>Guess a number (1–10)</h2>

      <input
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />

      <button onClick={checkGuess}>Check</button>

      <p>{message}</p>
    </div>
  );
}

export default Day06;