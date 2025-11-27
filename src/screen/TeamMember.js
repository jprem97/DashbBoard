import React from "react";
import { useDispatch } from "react-redux";
import { updateTaskProgress } from "../features/tasksSlice";
import { setMemberStatus } from "../features/statusSlice";
import "./TeamMember.css";

export default function TeamMember({
  memberId,
  globalStatus,
  setGlobalStatus,
  tasks,
  status
}) {
  const dispatch = useDispatch();

  const statuses = ["Working", "Break", "Meeting", "Offline"];

  const changeStatus = (newStatus) => {
    setGlobalStatus(newStatus);
    dispatch(setMemberStatus({ id: memberId, status: newStatus.toLowerCase() }));
  };

  const updateProgress = (taskId, delta) => {
    dispatch(updateTaskProgress({ id: taskId, delta }));
  };

  const getTaskState = (p) => {
    if (p === 0) return "Not Started";
    if (p === 100) return "Completed";
    return "In Progress";
  };

  const getTaskColor = (p) => {
    if (p === 0) return "#b0b0b0";
    if (p === 100) return "#22bb33";
    return "#f8c10f";
  };

  return (
    <div className="tm-container">
      <h2>Team Member View</h2>

      <div className="tm-status-box">
        <h3>Update Your Status</h3>

        <div className="tm-status-buttons">
          {statuses.map((s) => (
            <button
              key={s}
              className={`tm-status-btn ${globalStatus === s ? "tm-active" : ""}`}
              onClick={() => changeStatus(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="tm-tasks-box">
        <h3>Your Tasks</h3>

        {tasks.map((t) => (
          <div key={t.id} className={`tm-card ${t.completed ? "tm-done" : ""}`}>
            <div className="tm-header">
              <h4>{t.title}</h4>
              <span>{t.dueDate}</span>
            </div>

            <div className="tm-task-meter">
              <div className="tm-task-meter-top">
                <span className="tm-state">{getTaskState(t.progress)}</span>
                <span className="tm-percent">{t.progress}%</span>
              </div>

              <div className="tm-meter-bar">
                <div
                  className="tm-meter-fill"
                  style={{
                    width: `${t.progress}%`,
                    backgroundColor: getTaskColor(t.progress)
                  }}
                />
              </div>
            </div>

            <div className="tm-controls">
              <button onClick={() => updateProgress(t.id, -10)} disabled={t.progress === 0}>
                -
              </button>
              <button onClick={() => updateProgress(t.id, 10)} disabled={t.progress === 100}>
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
