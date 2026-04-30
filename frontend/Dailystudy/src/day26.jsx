import React, { useState, useRef } from "react";

const ROWS = 40;
const COLS = 40;

const Day26 = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => "#ffffff")
    )
  );

  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#2563eb");
  const [mode, setMode] = useState("draw");

  const lastCellRef = useRef(null);

  // Paint a single cell
  const paintCell = (row, col) => {
    setGrid((prev) => {
      const newGrid = prev.map((r) => [...r]);
      newGrid[row][col] =
        mode === "erase" ? "#ffffff" : color;
      return newGrid;
    });
  };

  // 🔥 Line interpolation (fills gaps)
  const drawLine = (r0, c0, r1, c1) => {
    const dr = Math.abs(r1 - r0);
    const dc = Math.abs(c1 - c0);
    const sr = r0 < r1 ? 1 : -1;
    const sc = c0 < c1 ? 1 : -1;

    let err = (dr > dc ? dr : -dc) / 2;

    let r = r0;
    let c = c0;

    while (true) {
      paintCell(r, c);
      if (r === r1 && c === c1) break;

      const e2 = err;

      if (e2 > -dr) {
        err -= dc;
        r += sr;
      }
      if (e2 < dc) {
        err += dr;
        c += sc;
      }
    }
  };

  const handleMouseDown = (row, col) => {
    setIsDrawing(true);
    lastCellRef.current = { row, col };
    paintCell(row, col);
  };

  const handleMouseEnter = (row, col) => {
    if (!isDrawing) return;

    const prev = lastCellRef.current;

    if (prev) {
      drawLine(prev.row, prev.col, row, col);
    }

    lastCellRef.current = { row, col };
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    lastCellRef.current = null;
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
      <h2 style={styles.title}>Smooth Drawing Canvas</h2>

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

// 🎨 Styles
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
    gridTemplateColumns: `repeat(${COLS}, 12px)`,
    justifyContent: "center",
  },
  cell: {
    width: "12px",
    height: "12px",
    border: "0.5px solid #f1f5f9",
  },
};