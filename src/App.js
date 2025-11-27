import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TeamMember from "./screen/TeamMember";
import List from "./screen/List";
import { updateMemberTask, resetMembers } from "./features/membersSlice";
import { resetTasks } from "./features/tasksSlice";
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [id, setId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [task, setTask] = useState("");
  const [showBreak, setShowBreak] = useState(false);

  const members = useSelector(s => s.members);
  const tasks = useSelector(s => s.tasks);
  const dispatch = useDispatch();

  const updateTask = () => {
    dispatch(updateMemberTask({ id: Number(id), task }));
    setId("");
    setTask("");
  };

  const resetLead = () => {
    setId("");
    setTask("");
    setShowBreak(false);
    dispatch(resetMembers());
    dispatch(resetTasks());
  };

  const resetMember = () => {
    setMemberId("");
  };

  const visibleStatus = showBreak
    ? members.filter(m => m.status === "break")
    : members;

  return (
    <div className="app-container">

      {screen === "home" && (
        <div className="home-nav">
          <h1 className="nav-title">Team Management Portal</h1>
          <div className="nav-buttons">
            <button className="nav-btn" onClick={() => setScreen("lead")}>
              Team Lead
            </button>
            <button className="nav-btn" onClick={() => setScreen("member")}>
              Team Member
            </button>
          </div>
        </div>
      )}

      {screen === "member" && (
        <div className="member-section">
          <button className="back-btn" onClick={() => setScreen("home")}>⬅ Back</button>

          {!memberId && (
            <input
              className="input-box"
              type="number"
              value={memberId}
              placeholder="Enter Member ID"
              onChange={e => setMemberId(e.target.value)}
            />
          )}

          {memberId && (
            <>
              <button className="reset-btn" onClick={resetMember}>Reset Member View</button>

              <TeamMember
                memberId={Number(memberId)}
                globalStatus={
                  members.find(m => m.id === Number(memberId))?.status || "working"
                }
                setGlobalStatus={() => {}}
                tasks={tasks.filter(t => t.userId === Number(memberId))}
              />
            </>
          )}
        </div>
      )}

      {screen === "lead" && (
        <div className="lead-section">
          <button className="back-btn" onClick={() => setScreen("home")}>⬅ Back</button>

          <div className="lead-summary-box">
            <h2>Total Tasks</h2>
            <p className="task-count">{tasks.length}</p>
          </div>

          <List status={visibleStatus} />

          <input
            className="input-box"
            type="number"
            value={id}
            placeholder="Enter ID"
            onChange={e => setId(e.target.value)}
          />

          <input
            className="input-box"
            type="text"
            value={task}
            placeholder="Enter new task"
            onChange={e => setTask(e.target.value)}
          />

          <button className="primary-btn" onClick={updateTask}>Update Task</button>

          <button className="primary-btn" onClick={() => setShowBreak(s => !s)}>
            {showBreak ? "Show All" : "Show Break"}
          </button>

          <button className="reset-btn" onClick={resetLead}>
            Reset Lead View
          </button>
        </div>
      )}
    </div>
  );
}
