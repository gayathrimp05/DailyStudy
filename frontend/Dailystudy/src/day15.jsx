import { useState } from "react";

function Day15() {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState([]);

  function addOption() {
    if (!input.trim()) return;

    setOptions([...options, { text: input, votes: 0 }]);
    setInput("");
  }

  function vote(index) {
    const updated = options.map((opt, i) =>
      i === index ? { ...opt, votes: opt.votes + 1 } : opt
    );
    setOptions(updated);
  }

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Voting App</h2>

        {/* Input */}
        <div style={styles.inputRow}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter option"
            style={styles.input}
          />
          <button onClick={addOption} style={styles.button}>
            Add
          </button>
        </div>

        {/* Options */}
        <div style={{ marginTop: "20px" }}>
          {options.map((opt, i) => {
            const percent =
              totalVotes === 0
                ? 0
                : Math.round((opt.votes / totalVotes) * 100);

            return (
              <div key={i} style={styles.optionCard}>
                <div style={styles.optionHeader}>
                  <span>{opt.text}</span>
                  <span>{percent}%</span>
                </div>

                {/* Progress Bar */}
                <div style={styles.barContainer}>
                  <div
                    style={{
                      ...styles.bar,
                      width: `${percent}%`,
                    }}
                  />
                </div>

                <button
                  onClick={() => vote(i)}
                  style={styles.voteBtn}
                >
                  Vote
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
    fontFamily: "Arial",
  },
  card: {
    width: "400px",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
  },
  optionCard: {
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  optionHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "5px",
  },
  barContainer: {
    height: "8px",
    background: "#eee",
    borderRadius: "5px",
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    background: "#007bff",
    transition: "0.3s",
  },
  voteBtn: {
    marginTop: "8px",
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    background: "#28a745",
    color: "white",
    cursor: "pointer",
  },
};

export default Day15;