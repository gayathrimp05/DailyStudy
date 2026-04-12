import { useState } from "react";

function Day08() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);

  function handleClick(index) {
    if (board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isX ? "X" : "O";

    setBoard(newBoard);
    setIsX(!isX);
  }

  function checkWinner(b) {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8], 
      [0,4,8],[2,4,6]          
    ];

    for (let [a, b1, c] of lines) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        return b[a];
      }
    }
    return null;
  }

  const winner = checkWinner(board);

  return (
    <div>
      <h2>Tic Tac Toe</h2>

      <h3>{winner ? `Winner: ${winner}` : `Turn: ${isX ? "X" : "O"}`}</h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 60px)" }}>
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            style={{ width: 60, height: 60, fontSize: 20 }}
          >
            {cell}
          </button>
        ))}
      </div>

      <button onClick={() => setBoard(Array(9).fill(null))}>
        Reset
      </button>
    </div>
  );
}

export default Day08;