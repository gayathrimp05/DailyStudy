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

  // Get value from reference (A1)
  const getCellValue = (ref) => {
    const col = ref.charCodeAt(0) - 65;
    const row = parseInt(ref.slice(1)) - 1;

    if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
      const val = grid[row][col];
      const num = parseFloat(val);
      return isNaN(num) ? 0 : num;
    }
    return 0;
  };

  const getRangeValues = (start, end) => {
  const startCol = start.charCodeAt(0) - 65;
  const startRow = parseInt(start.slice(1)) - 1;

  const endCol = end.charCodeAt(0) - 65;
  const endRow = parseInt(end.slice(1)) - 1;

  let values = [];

  for (let r = startRow; r <= endRow; r++) {
    for (let c = startCol; c <= endCol; c++) {
      const val = grid[r][c];
      const num = parseFloat(val);
      values.push(isNaN(num) ? 0 : num);
    }
  }

  return values;
};
  // Safer evaluation
 const evaluate = (value) => {
  if (!value || !value.startsWith("=")) return value;

  try {
    let expr = value.substring(1);

    // 🔹 Handle SUM(A1:E1)
    expr = expr.replace(/SUM\(([A-Z][0-9]+):([A-Z][0-9]+)\)/g,
      (_, start, end) => {
        const values = getRangeValues(start, end);
        return values.reduce((sum, v) => sum + v, 0);
      }
    );

    // 🔹 Handle normal refs like A1
    expr = expr.replace(/[A-Z][0-9]+/g, (match) =>
      getCellValue(match)
    );

    // Safety check
    if (!/^[0-9+\-*/().\s]+$/.test(expr)) return "ERR";

    return Function(`return (${expr})`)();
  } catch {
    return "ERR";
  }
};

  const updateCell = (row, col, value) => {
    setGrid((prev) => {
      const newGrid = prev.map((r) => [...r]);
      newGrid[row][col] = value;
      return newGrid;
    });
  };

  const { row, col } = activeCell;
  const currentValue = grid[row][col] || "";

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Mini Spreadsheet</h2>

      {/* Formula Bar */}
      <div style={styles.formulaBar}>
        <span style={styles.cellRef}>
          {getColName(col)}
          {row + 1}
        </span>

        <input
          style={styles.formulaInput}
          value={currentValue}
          onChange={(e) =>
            updateCell(row, col, e.target.value)
          }
        />
      </div>

      {/* Grid */}
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
                activeCell.row === r && activeCell.col === c;

              return (
                <input
                  key={c}
                  value={
                    isActive
                      ? cell
                      : evaluate(cell)?.toString() || ""
                  }
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

// Styles
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
    color: "#1e293b",
  },
};