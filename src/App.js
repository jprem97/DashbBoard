import React, { useState } from "react";
import List from "./screen/List";
import TeamMember from "./screen/TeamMember";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("home");
  const [id, setId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [task, setTask] = useState("");
  const [showBreak, setShowBreak] = useState(false);

  const defaultStatus = [
    { id: 1, status: "working", task: "some work" },
    { id: 3, status: "break", task: "some work" },
    { id: 5, status: "working", task: "some work" },
    { id: 2, status: "working", task: "some work" },
    { id: 4, status: "break", task: "some work" }
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

  const resetLead = () => {
    setId("");
    setTask("");
    setShowBreak(false);
    setStatus(defaultStatus);
  };

  const resetMember = () => {
    setMemberId("");
    setGlobalStatus("Working");
    setTasks(defaultTasks);
  };

  const visibleStatus = showBreak
    ? status.filter(item => item.status === "break")
    : status;

  return (
    <div className="app-container">
      {screen === "home" && (
        <div className="home-page">
          <h1>Select User Type</h1>
          <button className="primary-btn" onClick={() => setScreen("lead")}>
            Team Lead
          </button>
          <button className="primary-btn" onClick={() => setScreen("member")}>
            Team Member
          </button>
        </div>
      )}

      {screen === "member" && (
        <div className="member-section">
          <button className="back-btn" onClick={() => setScreen("home")}>
            ⬅ Back
          </button>

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

              <TeamMember
                memberId={Number(memberId)}
                globalStatus={globalStatus}
                setGlobalStatus={setGlobalStatus}
                tasks={tasks}
                setTasks={setTasks}
                status={status}
                setStatus={setStatus}
              />
            </>
          )}
        </div>
      )}

      {screen === "lead" && (
        <div className="lead-section">
          <button className="back-btn" onClick={() => setScreen("home")}>
            ⬅ Back
          </button>

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
            onClick={() => setShowBreak(s => !s)}
            className="primary-btn"
          >
            {showBreak ? "Show All" : "Show Break"}
          </button>

          <button onClick={resetLead} className="reset-btn">
            Reset Lead View
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
