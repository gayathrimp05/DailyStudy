import React, { useState } from "react";

const ROWS = 10;
const COLS = 5;

const getColName = (col) => String.fromCharCode(65 + col);

const Day23 = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => "")
    )
  );

  const [activeCell, setActiveCell] = useState(null); // {row, col}

  // Get value from reference like A1
  const getCellValue = (ref) => {
    const col = ref.charCodeAt(0) - 65;
    const row = parseInt(ref.slice(1)) - 1;

    if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
      const value = grid[row][col];
      return isNaN(value) ? 0 : Number(value);
    }
    return 0;
  };

  // Evaluate formulas
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
        {/* Header */}
        <div style={styles.row}>
          <div style={styles.headerCell}></div>
          {Array.from({ length: COLS }).map((_, col) => (
            <div key={col} style={styles.headerCell}>
              {getColName(col)}
            </div>
          ))}
        </div>

        {/* Rows */}
        {grid.map((rowData, row) => (
          <div key={row} style={styles.row}>
            <div style={styles.headerCell}>{row + 1}</div>

            {rowData.map((cell, col) => {
              const isActive =
                activeCell?.row === row && activeCell?.col === col;

              return (
                <input
                  key={col}
                  value={isActive ? cell : evaluate(cell)}
                  onFocus={() => setActiveCell({ row, col })}
                  onBlur={() => setActiveCell(null)}
                  onChange={(e) =>
                    handleChange(row, col, e.target.value)
                  }
                  style={{
                    ...styles.cell,
                    border: isActive
                      ? "2px solid #2563eb"
                      : "1px solid #e2e8f0",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day23;

// Styles
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
    padding: "5px",
    outline: "none",
  },
};