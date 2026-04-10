import { useState } from "react";

function Day06() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  function addTask() {
    if (task === "") return;

    const newTask = {
      text: task,
      completed: false,
    };

    setList([...list, newTask]);
    setTask("");
  }

  function deleteTask(index) {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  }

  function toggleTask(index) {
    const newList = [...list];

    setList(newList);
  }

  return (
    <div>
      <h2>Day06 Todo</h2>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          
        }}
        placeholder="task...."
      />

      <button onClick={addTask}>Add</button>

      <ul>
        {list.map((item, index) => (
          <li key={index}>
            <span
              onClick={() => toggleTask(index)}
              style={{
                textDecoration: item.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {item.text}
            </span>

            <button onClick={() => deleteTask(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Day06;