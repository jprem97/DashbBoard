import React from "react";
import "./TeamMember.css";

function TeamMemberView({ globalStatus, setGlobalStatus, tasks, setTasks }) {
  const statuses = ["Working", "Break", "Meeting", "Offline"];

  const updateTaskProgress = (taskId, delta) => {
    setTasks(
      tasks.map(t =>
        t.id === taskId
          ? {
              ...t,
              progress: Math.min(100, Math.max(0, t.progress + delta)),
              completed: t.progress + delta >= 100
            }
          : t
      )
    );
  };

  return (
    <div className="tm-container">
      <h2>Team Member View</h2>

      <div className="tm-status-box">
        <h3>Update Your Status</h3>
        <div className="tm-status-buttons">
          {statuses.map(s => (
            <button
              key={s}
              className={`tm-status-btn ${
                globalStatus === s ? "tm-active" : ""
              }`}
              onClick={() => setGlobalStatus(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="tm-tasks-box">
        <h3>Your Tasks</h3>

        {tasks.map(t => (
          <div key={t.id} className={`tm-card ${t.completed ? "tm-done" : ""}`}>
            <div className="tm-header">
              <h4>{t.title}</h4>
              <span>{t.dueDate}</span>
            </div>

            <div className="tm-progress-container">
              <div className="tm-progress-bar">
                <div
                  className="tm-progress-fill"
                  style={{ width: `${t.progress}%` }}
                ></div>
              </div>
              <span>{t.progress}%</span>
            </div>

            <div className="tm-controls">
              <button
                onClick={() => updateTaskProgress(t.id, -10)}
                disabled={t.progress === 0}
              >
                -
              </button>
              <button
                onClick={() => updateTaskProgress(t.id, 10)}
                disabled={t.progress === 100}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamMemberView;
