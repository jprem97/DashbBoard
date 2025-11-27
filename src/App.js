import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "./screen/List";
import TeamMember from "./screen/TeamMember";
import { updateMemberTask, resetMembers } from "./features/statusSlice";
import { resetTasks } from "./features/tasksSlice";
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [id, setId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [task, setTask] = useState("");
  const [showBreak, setShowBreak] = useState(false);

  const status = useSelector(state => state.members);
  const tasks = useSelector(state => state.tasks);
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

  const visibleStatus = showBreak ? status.filter(item => item.status === "break") : status;

  return (
    <div className="app-container">
      {screen === "home" && (
        <div className="home-nav">
          <h1 className="nav-title">Team Management Portal</h1>
          <div className="nav-buttons">
            <button className="nav-btn" onClick={() => setScreen("lead")}>Team Lead</button>
            <button className="nav-btn" onClick={() => setScreen("member")}>Team Member</button>
          </div>
        </div>
      )}

      {screen === "member" && (
        <div className="member-section">
          <button className="back-btn" onClick={() => setScreen("home")}>⬅ Back</button>

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
              <button onClick={resetMember} className="reset-btn">Reset Member View</button>
              <TeamMember
                memberId={Number(memberId)}
                globalStatus={status.find(m => m.id === Number(memberId))?.status || "Working"}
                setGlobalStatus={(s) => dispatch(setMemberStatusLocal(s, Number(memberId)))}
                tasks={tasks.filter(t => t.userId === Number(memberId))}
                setTasks={() => {}}
                status={status}
                setStatus={() => {}}
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

          <button onClick={updateTask} className="primary-btn">Update Task</button>

          <button onClick={() => setShowBreak(s => !s)} className="primary-btn">
            {showBreak ? "Show All" : "Show Break"}
          </button>

          <button onClick={resetLead} className="reset-btn">Reset Lead View</button>
        </div>
      )}
    </div>
  );
}

function setMemberStatusLocal(statusValue, memberId) {
  return (dispatch) => {
    dispatch({ type: "members/setMemberStatus", payload: { id: memberId, status: statusValue } });
  };
}
