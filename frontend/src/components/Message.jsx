import React from "react";

const Message = ({ type, message }) => {
  if (!message) return null;

  return (
    <div
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white text-center max-w-md
        ${type === "success" ? "bg-green-500" : "bg-red-500"}
      `}
    >
      {message}
    </div>
  );
};

export default Message;
