import React, { useState } from "react";

const ROWS = 20;
const COLS = 20;

const Day26 = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => "#ffffff")
    )
  );

  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#2563eb");
  const [mode, setMode] = useState("draw"); // draw | erase

  // Paint cell
  const paintCell = (row, col) => {
    setGrid((prev) => {
      const newGrid = prev.map((r) => [...r]);
      newGrid[row][col] = mode === "erase" ? "#ffffff" : color;
      return newGrid;
    });
  };

  const handleMouseDown = (row, col) => {
    setIsDrawing(true);
    paintCell(row, col);
  };

  const handleMouseEnter = (row, col) => {
    if (!isDrawing) return;
    paintCell(row, col);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    setGrid(
      Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => "#ffffff")
      )
    );
  };

  return (
    <div style={styles.container} onMouseUp={handleMouseUp}>
      <h2 style={styles.title}>Grid Drawing Canvas</h2>

      {/* Controls */}
      <div style={styles.controls}>
        <input
          type="color"
          value={color}
          onChange={(e) => {
            setMode("draw");
            setColor(e.target.value);
          }}
        />

        <button
          onClick={() => setMode("draw")}
          style={{
            ...styles.button,
            backgroundColor: mode === "draw" ? "#2563eb" : "#e5e7eb",
            color: mode === "draw" ? "#fff" : "#000",
          }}
        >
          Draw
        </button>

        <button
          onClick={() => setMode("erase")}
          style={{
            ...styles.button,
            backgroundColor: mode === "erase" ? "#ef4444" : "#e5e7eb",
            color: mode === "erase" ? "#fff" : "#000",
          }}
        >
          Erase
        </button>

        <button onClick={clearCanvas} style={styles.button}>
          Clear
        </button>
      </div>

      {/* Grid */}
      <div style={styles.grid}>
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              onMouseDown={() => handleMouseDown(r, c)}
              onMouseEnter={() => handleMouseEnter(r, c)}
              style={{
                ...styles.cell,
                backgroundColor: cell,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Day26;

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f3f4f6",
    textAlign: "center",
  },
  title: {
    marginBottom: "10px",
    color: "#1f2937",
  },
  controls: {
    marginBottom: "15px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  button: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: `repeat(${COLS}, 20px)`,
    justifyContent: "center",
  },
  cell: {
    width: "20px",
    height: "20px",
    border: "1px solid #e5e7eb",
  },
};