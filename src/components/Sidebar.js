import React from "react";
import uuid from "react-uuid";

function Sidebar({ sizes, filterSizes }) {
  return (
    <ul>
      {sizes.map((size) => (
        <li key={uuid()}>
          <button onClick={() => filterSizes(size.label)}>{size.label}</button>
        </li>
      ))}
    </ul>
  );
}

export default Sidebar;
