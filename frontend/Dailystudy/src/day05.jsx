import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  function addTask() {
    if (task === "") return;

    setList([...list, task]);
    setTask(""); 
  }

  function deleteTask(index) {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  }

  return (
    <div>
      <h2>Todo List</h2>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
      />

      <button onClick={addTask}>Add</button>

      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => deleteTask(index)}>X </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;