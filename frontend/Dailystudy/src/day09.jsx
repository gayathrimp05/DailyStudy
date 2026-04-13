import { useState } from "react";

function Day09() {
  const [habit, setHabit] = useState("");
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState("all");

  function addHabit() {
    if (!habit.trim()) return;

    setList([...list, { text: habit, done: false }]);
    setHabit("");
  }

  function toggle(i) {
    const newList = list.map((item, index) =>
      index === i ? { ...item, done: !item.done } : item
    );
    setList(newList);
  }

  const filtered = list.filter((item) => {
    if (filter === "done") return item.done;
    if (filter === "pending") return !item.done;
    return true;
  });

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        textAlign: "center",
        fontFamily: "Arial",
      }}
    >
      <h2>Habit Tracker</h2>

      {/* Input + Add */}
      <div style={{ marginTop: "10px" }}>
        <input
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addHabit()}
          placeholder="Add habit"
          style={{
            padding: "8px",
            width: "65%",
            marginRight: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={addHabit}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "none",
            background: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      {/* Filters */}
      <div
        style={{
          marginTop: "15px",
          display: "flex",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("done")}>Done</button>
      </div>

      {/* List */}
      <div style={{ marginTop: "20px" }}>
        {filtered.map((item, i) => (
          <div
            key={i}
            onClick={() => toggle(i)}
            style={{
              padding: "10px",
              margin: "5px 0",
              borderRadius: "8px",
              background: item.done ? "#d4edda" : "#f8d7da",
              color: "black",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            {item.done ? "✓" : "●"} {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Day09;