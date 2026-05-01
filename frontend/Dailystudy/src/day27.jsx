import React, { useState } from "react";

const Day27 = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [step, setStep] = useState(0);
  const [xTurn, setXTurn] = useState(true);

  const currentBoard = history[step];

  // Winner logic
  const calculateWinner = (board) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];

    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line: [a, b, c] };
      }
    }
    return null;
  };

  const result = calculateWinner(currentBoard);

  // Handle move
  const handleClick = (index) => {
    if (currentBoard[index] || result) return;

    const newBoard = [...currentBoard];
    newBoard[index] = xTurn ? "X" : "O";

    const newHistory = history.slice(0, step + 1);

    setHistory([...newHistory, newBoard]);
    setStep(newHistory.length);
    setXTurn(!xTurn);
  };

  // Undo
  const undoMove = () => {
    if (step === 0) return;
    setStep(step - 1);
    setXTurn(step % 2 === 0);
  };

  // Restart
  const restartGame = () => {
    setHistory([Array(9).fill(null)]);
    setStep(0);
    setXTurn(true);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Tic Tac Toe</h2>

      <div style={styles.board}>
        {currentBoard.map((cell, i) => {
          const isWinning = result?.line.includes(i);

          return (
            <div
              key={i}
              onClick={() => handleClick(i)}
              style={{
                ...styles.cell,
                backgroundColor: isWinning ? "#bbf7d0" : "#fff",
              }}
            >
              {cell}
            </div>
          );
        })}
      </div>

      <div style={styles.info}>
        {result
          ? `Winner: ${result.winner}`
          : `Turn: ${xTurn ? "X" : "O"}`}
      </div>

      <div style={styles.buttons}>
        <button onClick={undoMove}>Undo</button>
        <button onClick={restartGame}>Restart</button>
      </div>
    </div>
  );
};

export default Day27;

// 🎨 Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
  },
  title: {
    marginBottom: "20px",
    color: "#1e293b",
  },
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 100px)",
    gap: "5px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  cell: {
    width: "100px",
    height: "100px",
    fontSize: "32px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #334155",
    cursor: "pointer",
    backgroundColor: "#fff",
  },
  info: {
    marginBottom: "10px",
    fontSize: "18px",
    color: "#1e293b",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
};