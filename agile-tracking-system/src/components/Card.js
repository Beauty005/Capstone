import React from "react";

const Card = ({ children }) => {
  return (
    <div className="p-4 shadow-lg bg-white rounded-lg border border-gray-200">
      {children}
    </div>
  );
};

const CardContent = ({ children }) => {
  return <div className="p-2">{children}</div>;
};

export { Card, CardContent };
