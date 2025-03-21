import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
    >
      {children}
    </button>
  );
};

export { Button };
