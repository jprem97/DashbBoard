import React from "react";
import "./TeamMember.css";

function TeamMemberView({
  memberId,
  globalStatus,
  setGlobalStatus,
  tasks,
  setTasks,
  status,
  setStatus
}) {
  const statuses = ["Working", "Break", "Meeting", "Offline"];

  const changeStatus = (newStatus) => {
    setGlobalStatus(newStatus);
    setStatus(
      status.map((item) =>
        item.id === memberId ? { ...item, status: newStatus.toLowerCase() } : item
      )
    );
  };

  const updateTaskProgress = (taskId, delta) => {
    setTasks(
      tasks.map((t) =>
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
              <span className="tm-meter-text">{getTaskState(t.progress)}</span>

              <div className="tm-meter-bar">
                <div
                  className="tm-meter-fill"
                  style={{
                    width: `${t.progress}%`,
                    backgroundColor: getTaskColor(t.progress)
                  }}
                ></div>
              </div>

              <span className="tm-meter-percent">{t.progress}%</span>
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
