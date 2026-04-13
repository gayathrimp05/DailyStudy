import { useState } from "react";

function Day09() {
  const [habit, setHabit] = useState("");
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState("all");

  function addHabit() {
    if (!habit) return;
    setList([...list, { text: habit, done: false }]);
    setHabit("");
  }

  function toggle(i) {
    const newList = [...list];
    newList[i].done = !newList[i].done;
    setList(newList);
  }

  const filtered = list.filter((item) => {
    if (filter === "done") return item.done;
    if (filter === "pending") return !item.done;
    return true;
  });

  return (
    <div style={{
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      textAlign: "center",
      fontFamily: "Arial"
    }}>
      <h2>Habit Tracker</h2>

      <input
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        placeholder="Add habit"
        style={{
          padding: "8px",
          width: "65%",
          marginRight: "10px"
        }}
      />

      <button onClick={addHabit} style={{ padding: "8px 12px" }}>
        Add
      </button>

      <div style={{ marginTop: "15px", display: "flex", gap: "10px", justifyContent: "center"}}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("done")}>Done</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {filtered.map((item, i) => (
          <div
            key={i}
            onClick={() => toggle(i)}
            style={{
              padding: "10px",
              margin: "5px 0",
              borderRadius: "5px",
              background: item.done ? "#d4edda" : "#f8f9fa",
              cursor: "pointer"
            }}
          >
            {item.done ? "✓" : "⬜"} {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Day09;