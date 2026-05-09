import { useEffect, useState } from "react";
import "./day32.css";

const SIZE = 4;

const createEmptyBoard = () =>
  Array(SIZE)
    .fill()
    .map(() => Array(SIZE).fill(0));

const randomTile = (board) => {
  let emptyCells = [];

  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (board[i][j] === 0) {
        emptyCells.push([i, j]);
      }
    }
  }

  if (emptyCells.length === 0) return board;

  const [x, y] =
    emptyCells[Math.floor(Math.random() * emptyCells.length)];

  board[x][y] = Math.random() < 0.9 ? 2 : 4;

  return board;
};

const initializeBoard = () => {
  let board = createEmptyBoard();
  board = randomTile(board);
  board = randomTile(board);
  return board;
};

export default function Day32() {
  const [board, setBoard] = useState(initializeBoard());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // 🔄 Rotate board clockwise
  const rotateBoard = (matrix) => {
    let newBoard = createEmptyBoard();

    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        newBoard[j][SIZE - 1 - i] = matrix[i][j];
      }
    }

    return newBoard;
  };

  // ⬅️ Move left logic
  const moveLeft = (board) => {
    let newBoard = [];
    let moved = false;
    let gainedScore = 0;

    for (let row of board) {
      let filtered = row.filter((num) => num !== 0);

      for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
          filtered[i] *= 2;
          gainedScore += filtered[i];
          filtered[i + 1] = 0;
        }
      }

      filtered = filtered.filter((num) => num !== 0);

      while (filtered.length < SIZE) {
        filtered.push(0);
      }

      if (filtered.join("") !== row.join("")) {
        moved = true;
      }

      newBoard.push(filtered);
    }

    return { newBoard, moved, gainedScore };
  };

  const handleMove = (direction) => {
    if (gameOver) return;

    let rotated = [...board.map((row) => [...row])];

    // Rotate board depending on direction
    if (direction === "UP") {
      rotated = rotateBoard(rotateBoard(rotateBoard(rotated)));
    } else if (direction === "RIGHT") {
      rotated = rotateBoard(rotateBoard(rotated));
    } else if (direction === "DOWN") {
      rotated = rotateBoard(rotated);
    }

    let { newBoard, moved, gainedScore } =
      moveLeft(rotated);

    // Rotate back
    if (direction === "UP") {
      newBoard = rotateBoard(newBoard);
    } else if (direction === "RIGHT") {
      newBoard = rotateBoard(rotateBoard(newBoard));
    } else if (direction === "DOWN") {
      newBoard = rotateBoard(
        rotateBoard(rotateBoard(newBoard))
      );
    }

    if (moved) {
      let updatedBoard = randomTile(newBoard);

      setBoard(updatedBoard);
      setScore((s) => s + gainedScore);

      checkGameOver(updatedBoard);
    }
  };

  // ❌ Game Over
  const checkGameOver = (board) => {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (board[i][j] === 0) return;
      }
    }

    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE - 1; j++) {
        if (board[i][j] === board[i][j + 1]) return;
      }
    }

    for (let j = 0; j < SIZE; j++) {
      for (let i = 0; i < SIZE - 1; i++) {
        if (board[i][j] === board[i + 1][j]) return;
      }
    }

    setGameOver(true);
  };

  // 🎮 Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          handleMove("LEFT");
          break;
        case "ArrowRight":
          handleMove("RIGHT");
          break;
        case "ArrowUp":
          handleMove("UP");
          break;
        case "ArrowDown":
          handleMove("DOWN");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener("keydown", handleKey);
  });

  // 🔄 Restart
  const restartGame = () => {
    setBoard(initializeBoard());
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <h1>2048 Glow</h1>

      <h2>Score: {score}</h2>

      <div className="board">
        {board.flat().map((cell, index) => (
          <div
            key={index}
            className={`tile tile-${cell}`}
          >
            {cell !== 0 ? cell : ""}
          </div>
        ))}
      </div>

      {gameOver && (
        <div className="game-over">
          <h2>Game Over</h2>

          <button onClick={restartGame}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
}