import React, { useState } from "react";
import List from "./screen/About";

function App() {
  const [id, setId] = useState("");
  const [task, setTask] = useState("");

 
  const [status, setStatus] = useState([
    { id: 1, status: "working", task: "some work" },
    { id: 3, status: "working", task: "some work" },
    { id: 5, status: "working", task: "some work" },
    { id: 2, status: "working", task: "some work" },
    { id: 4, status: "working", task: "some work" },
  ]);

 
  const updateTask = () => {
    setStatus(prev =>
      prev.map(item =>
        item.id === Number(id)
          ? { ...item, task: task }
          : item
      )
    );
  };

  return (
    <div>
      <List status={status} />

      <div>
        <input
          type="number"
          placeholder="id"
          value={id}
          onChange={e => setId(e.target.value)}
        />

        <input
          type="text"
          placeholder="new task"
          value={task}
          onChange={e => setTask(e.target.value)}
        />

        <button onClick={updateTask}>Update Task</button>
      </div>
    </div>
  );
}

export default App;
