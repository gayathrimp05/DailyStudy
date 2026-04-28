import React, { useState } from "react";

const ROWS = 10;
const COLS = 5;

const getColName = (col) => String.fromCharCode(65 + col);

const Day24 = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => "")
    )
  );

  const [activeCell, setActiveCell] = useState({ row: 0, col: 0 });

  // getting cell reference like A1
  const getCellRef = (row, col) => `${getColName(col)}${row + 1}`;

  // geting numeric value from reference
  const getCellValue = (ref) => {
    const col = ref.charCodeAt(0) - 65;
    const row = parseInt(ref.slice(1)) - 1;

    if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
      const value = grid[row][col];
      return isNaN(value) ? 0 : Number(value);
    }
    return 0;
  };

  // Evaluationformulas
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

  // Updation of cell
  const updateCell = (row, col, value) => {
    const newGrid = grid.map((r) => [...r]);
    newGrid[row][col] = value;
    setGrid(newGrid);
  };

  const { row, col } = activeCell;
  const currentValue = grid[row][col];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Mini Spreadsheet</h2>

      {/* Formula Bar */}
      <div style={styles.formulaBar}>
        <span style={styles.cellRef}>
          {getCellRef(row, col)}
        </span>

        <input
          style={styles.formulaInput}
          value={currentValue}
          onChange={(e) =>
            updateCell(row, col, e.target.value)
          }
          placeholder="Enter value or formula..."
        />
      </div>

      {/* Table */}
      <div style={styles.table}>
        {/* Header */}
        <div style={styles.row}>
          <div style={styles.headerCell}></div>
          {Array.from({ length: COLS }).map((_, c) => (
            <div key={c} style={styles.headerCell}>
              {getColName(c)}
            </div>
          ))}
        </div>

        {/* Rows */}
        {grid.map((rowData, r) => (
          <div key={r} style={styles.row}>
            <div style={styles.headerCell}>{r + 1}</div>

            {rowData.map((cell, c) => {
              const isActive =
                row === r && col === c;

              return (
                <input
                  key={c}
                  value={isActive ? cell : evaluate(cell)}
                  onFocus={() => setActiveCell({ row: r, col: c })}
                  onChange={(e) =>
                    updateCell(r, c, e.target.value)
                  }
                  style={{
                    ...styles.cell,
                    border: isActive
                      ? "2px solid #2563eb"
                      : "1px solid #e2e8f0",
                    backgroundColor: isActive
                      ? "#eff6ff"
                      : "#fff",
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

export default Day24;

//Styling
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8fafc",
  },
  title: {
    textAlign: "center",
    marginBottom: "15px",
    color: "#1e293b",
  },
  formulaBar: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
    background: "#fff",
    padding: "10px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
  },
  cellRef: {
    fontWeight: "bold",
    color: "#2563eb",
    width: "50px",
  },
  formulaInput: {
    flex: 1,
    padding: "8px",
    border: "1px solid #cbd5e1",
    borderRadius: "4px",
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