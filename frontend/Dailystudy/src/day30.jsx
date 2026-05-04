import { useEffect, useState } from "react";
import "./day30.css";

const GRID_SIZE = 20;

const getRandomFood = (snake) => {
  let newFood;
  while (true) {
    newFood = [
      Math.floor(Math.random() * GRID_SIZE),
      Math.floor(Math.random() * GRID_SIZE),
    ];
    const onSnake = snake.some(
      ([x, y]) => x === newFood[0] && y === newFood[1]
    );
    if (!onSnake) break;
  }
  return newFood;
};

export default function Day30() {
  const [snake, setSnake] = useState([[10, 10]]);
  const [direction, setDirection] = useState([0, 1]);
  const [food, setFood] = useState(getRandomFood([[10, 10]]));
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // 🎮 Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection((prev) =>
            prev[0] === 1 ? prev : [-1, 0]
          );
          break;
        case "ArrowDown":
          setDirection((prev) =>
            prev[0] === -1 ? prev : [1, 0]
          );
          break;
        case "ArrowLeft":
          setDirection((prev) =>
            prev[1] === 1 ? prev : [0, -1]
          );
          break;
        case "ArrowRight":
          setDirection((prev) =>
            prev[1] === -1 ? prev : [0, 1]
          );
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // 🐍 Game loop
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const newHead = [
          prevSnake[0][0] + direction[0],
          prevSnake[0][1] + direction[1],
        ];

        // ❌ Wall collision
        if (
          newHead[0] < 0 ||
          newHead[0] >= GRID_SIZE ||
          newHead[1] < 0 ||
          newHead[1] >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // ❌ Self collision
        for (let part of prevSnake) {
          if (part[0] === newHead[0] && part[1] === newHead[1]) {
            setGameOver(true);
            return prevSnake;
          }
        }

        let newSnake = [newHead, ...prevSnake];

        // 🍎 Food eaten
        if (
          newHead[0] === food[0] &&
          newHead[1] === food[1]
        ) {
          setFood(getRandomFood(newSnake));
          setScore((s) => s + 1);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [direction, food, gameOver]);

  // 🔄 Restart
  const restartGame = () => {
    setSnake([[10, 10]]);
    setDirection([0, 1]);
    setFood(getRandomFood([[10, 10]]));
    setGameOver(false);
    setScore(0);
  };

  // 🧱 Grid render
  const grid = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const isSnake = snake.some(([x, y]) => x === i && y === j);
      const isHead =
        snake[0][0] === i && snake[0][1] === j;
      const isFood = food[0] === i && food[1] === j;

      let className = "cell";
      if (isSnake) className += " snake";
      if (isHead) className += " snake-head";
      if (isFood) className += " food";

      grid.push(<div key={`${i}-${j}`} className={className}></div>);
    }
  }

  return (
    <div className="game-container">
      <h1 className="title">Snake 3D Glow</h1>
      <h2 className="score">Score: {score}</h2>

      <div className="board">{grid}</div>

      {gameOver && (
        <div className="game-over">
          <h2>Game Over</h2>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
}