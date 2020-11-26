import React from "react";
import uuid from "react-uuid";

function Sidebar({ sizes, filterSizes }) {
  return (
    <ul className="flex mx-auto">
      {sizes.map((size) => (
        <li key={uuid()}>
          <button
            className={`m-4 px-4 py-2 border-2 border-gray-900 focus:outline-none rounded-full hover:bg-gray-800 hover:text-white ${
              size.checked ? "bg-black text-yellow-400" : ""
            }`}
            onClick={() => filterSizes(size.label)}
          >
            {size.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Sidebar;
