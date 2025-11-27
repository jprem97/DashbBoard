import React from "react";
import "./List.css";

function List({ status }) {
  return (
    <div className="list-container">
      {status.map((j) => (
        <div key={j.id} className="list-card">
          <div className="list-row"><span>ID:</span> {j.id}</div>
          <div className="list-row"><span>Status:</span> {j.status}</div>
          <div className="list-row"><span>Task:</span> {j.task}</div>
        </div>
      ))}
    </div>
  );
}

export default List;
