import React from "react";

function List({ status }) {
  return (
    <div
      style={{
        fontSize: 30,
        color: "yellow",
        backgroundColor: "black",
        display: "inline-block",
      }}
    >
      {status.map((j) => (
        <div key={j.id}>
          id: {j.id}
          <br />
          status: {j.status}
          <br />
          task: {j.task}
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}

export default List;
