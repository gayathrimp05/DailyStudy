import { useEffect, useState } from "react";
import "./day31.css";

const GRID_SIZE = 9; // 3x3 grid

export default function Day31() {
  const [moleIndex, setMoleIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(800); // controls difficulty

  // 🎯 Random mole movement
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * GRID_SIZE);
      setMoleIndex(randomIndex);
    }, speed);

    return () => clearInterval(interval);
  }, [speed, gameOver]);

  // ⏱ Timer
  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver]);

  // ⚡ Difficulty scaling
  useEffect(() => {
    if (score > 0 && score % 5 === 0) {
      setSpeed((s) => Math.max(300, s - 100));
    }
  }, [score]);

  // 🪓 Hit mole
  const handleClick = (index) => {
    if (index === moleIndex) {
      setScore((s) => s + 1);
      setMoleIndex(null);
    }
  };

  // 🔄 Restart
  const restartGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setSpeed(800);
    setMoleIndex(null);
  };

  return (
    <div className="game-container">
      <h1>Whack-a-Mole</h1>
      <h2>Score: {score}</h2>
      <h3>Time: {timeLeft}s</h3>

      <div className="grid">
        {Array.from({ length: GRID_SIZE }).map((_, index) => (
          <div
            key={index}
            className={`cell ${index === moleIndex ? "mole" : ""}`}
            onClick={() => handleClick(index)}
          ></div>
        ))}
      </div>

      {gameOver && (
        <div className="game-over">
          <h2>Game Over</h2>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
}