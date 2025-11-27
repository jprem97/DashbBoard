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

  const defaultStatus = [
    { id: 1, status: "working", task: "some work" },
    { id: 3, status: "not working", task: "some work" },
    { id: 5, status: "working", task: "some work" },
    { id: 2, status: "working", task: "some work" },
    { id: 4, status: "not working", task: "some work" }
  ];

  const defaultTasks = [
    { id: 1, title: "Task A", dueDate: "2025-01-01", progress: 20, completed: false },
    { id: 2, title: "Task B", dueDate: "2025-01-02", progress: 50, completed: false },
    { id: 3, title: "Task C", dueDate: "2025-01-05", progress: 0, completed: false }
  ];

  const [status, setStatus] = useState(defaultStatus);
  const [globalStatus, setGlobalStatus] = useState("Working");
  const [tasks, setTasks] = useState(defaultTasks);

  const updateTask = () => {
    setStatus(prev =>
      prev.map(item =>
        item.id === Number(id) ? { ...item, task: task } : item
      )
    );
  };

  const resetMember = () => {
    setMemberId("");
    setGlobalStatus("Working");
    setTasks(defaultTasks);
  };

  const resetLead = () => {
    setId("");
    setTask("");
    setShowNotWorking(false);
    setStatus(defaultStatus);
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
        <div className="member-section">
          {!memberId && (
            <input
              type="number"
              placeholder="Enter Your Member ID"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              className="input-box"
            />
          )}

          {memberId && (
            <>
              <button onClick={resetMember} className="reset-btn">
                Reset Member View
              </button>

              <TeamMemberView
                memberId={Number(memberId)}
                globalStatus={globalStatus}
                setGlobalStatus={setGlobalStatus}
                tasks={tasks.filter(t => t.id === Number(memberId))}
                setTasks={setTasks}
                status={status}
                setStatus={setStatus}
              />
            </>
          )}
        </div>
      ) : (
        <div className="lead-section">
          <List status={visibleStatus} />

          <input
            type="number"
            placeholder="Enter Member ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="input-box"
          />

          <input
            type="text"
            placeholder="Enter new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="input-box"
          />

          <button onClick={updateTask} className="primary-btn">
            Update Task
          </button>

          <button
            onClick={() => setShowNotWorking(s => !s)}
            className="primary-btn"
          >
            {showNotWorking ? "Show All" : "Show Not Working"}
          </button>

          <button onClick={resetLead} className="reset-btn">
            Reset Team Lead View
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
