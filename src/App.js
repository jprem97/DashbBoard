import React, { useState } from "react";
import List from "./screen/List";
import TeamMemberView from "./screen/TeamMember";
import "./App.css";

function App() {
  const [mode, setMode] = useState("lead");
  const [id, setId] = useState("");
  const [memberId, setMemberId] = useState(""); 
  const [task, setTask] = useState("");
  const [showNotWorking, setShowNotWorking] = useState(false);

  const [status, setStatus] = useState([
    { id: 1, status: "working", task: "some work" },
    { id: 3, status: "not working", task: "some work" },
    { id: 5, status: "working", task: "some work" },
    { id: 2, status: "working", task: "some work" },
    { id: 4, status: "not working", task: "some work" }
  ]);

  const [globalStatus, setGlobalStatus] = useState("Working");

  const [tasks, setTasks] = useState([
    { id: 1, title: "Task A", dueDate: "2025-01-01", progress: 20, completed: false },
    { id: 2, title: "Task B", dueDate: "2025-01-02", progress: 50, completed: false },
    { id: 3, title: "Task C", dueDate: "2025-01-05", progress: 0, completed: false }
  ]);

  const updateTask = () => {
    setStatus(prev =>
      prev.map(item =>
        item.id === Number(id) ? { ...item, task: task } : item
      )
    );
  };

  const visibleStatus = showNotWorking
    ? status.filter(item => item.status === "not working")
    : status;

  return (
    <div className="app-container">
      <div className="mode-buttons">
        <button onClick={() => setMode("lead")}>Team Lead View</button>
        <button onClick={() => setMode("member")}>Team Member View</button>
      </div>

      {mode === "member" ? (
        <>
          {!memberId && (
            <input
              type="number"
              placeholder="Enter Your Member ID"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
            />
          )}

          {memberId && (
            <TeamMemberView
              memberId={Number(memberId)}
              globalStatus={globalStatus}
              setGlobalStatus={setGlobalStatus}
              tasks={tasks.filter((t) => t.id === Number(memberId))}
              setTasks={setTasks}
              status={status}
              setStatus={setStatus}
            />
          )}
        </>
      ) : (
        <>
          <List status={visibleStatus} />

          <input
            type="number"
            placeholder="Enter ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button onClick={updateTask}>Update Task</button>

          <button onClick={() => setShowNotWorking((s) => !s)}>
            {showNotWorking ? "Show All" : "Show Not Working"}
          </button>
        </>
      )}
    </div>
  );
}

export default App;
