import React, { useState } from "react";

const ROWS = 10;
const COLS = 5;

const getColName = (col) => String.fromCharCode(65 + col); // A, B, C...

const Day23 = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => "")
    )
  );

  // Get cell value safely
  const getCellValue = (ref) => {
    const col = ref.charCodeAt(0) - 65;
    const row = parseInt(ref.slice(1)) - 1;

    if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
      const value = grid[row][col];
      return isNaN(value) ? 0 : Number(value);
    }
    return 0;
  };

  // Evaluate formulas like =A1+B2
  const evaluate = (value) => {
    if (!value.startsWith("=")) return value;

    try {
      const expr = value
        .substring(1)
        .replace(/[A-Z][0-9]+/g, (match) => getCellValue(match));

      return eval(expr);
    } catch {
      return "ERR";
    }
  };

  const handleChange = (row, col, value) => {
    const newGrid = grid.map((r) => [...r]);
    newGrid[row][col] = value;
    setGrid(newGrid);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Mini Spreadsheet</h2>

      <div style={styles.table}>
        {/* Header Row */}
        <div style={styles.row}>
          <div style={styles.headerCell}></div>
          {Array.from({ length: COLS }).map((_, col) => (
            <div key={col} style={styles.headerCell}>
              {getColName(col)}
            </div>
          ))}
        </div>

        {/* Data Rows */}
        {grid.map((rowData, row) => (
          <div key={row} style={styles.row}>
            <div style={styles.headerCell}>{row + 1}</div>

            {rowData.map((cell, col) => (
              <input
                key={col}
                value={cell}
                onChange={(e) =>
                  handleChange(row, col, e.target.value)
                }
                style={styles.cell}
                placeholder={evaluate(cell)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day23;

// Styles (Spreadsheet-like UI)
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f6f8",
  },
  title: {
    textAlign: "center",
    marginBottom: "15px",
    color: "#1e293b",
  },
  table: {
    display: "inline-block",
    border: "1px solid #cbd5e1",
    backgroundColor: "#fff",
  },
  row: {
    display: "flex",
  },
  headerCell: {
    width: "80px",
    height: "35px",
    border: "1px solid #cbd5e1",
    backgroundColor: "#e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  cell: {
    width: "80px",
    height: "35px",
    border: "1px solid #e2e8f0",
    padding: "5px",
    outline: "none",
  },
};