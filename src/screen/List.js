import React from "react";
import "./List.css";

export default function List({ status }) {
  return (
    <div className="list-container">
      {status.map(j => (
        <div className="list-item" key={j.id}>
          <div>ID: {j.id}</div>
          <div>Status: {j.status}</div>
          <div>Task: {j.task}</div>
        </div>
      ))}
    </div>
  );
}
