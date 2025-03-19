import React, { useEffect, useState } from "react";

const Message = ({ type, message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3500); // Auto-hide after 3s
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-lg shadow-2xl backdrop-blur-md text-white text-center max-w-md 
        transition-all duration-500 ease-in-out opacity-100 scale-100
        ${type === "success" ? "bg-green-500/80" : "bg-red-500/80"}
      `}
    >
      <span className="font-semibold">{type === "success" ? "✅ Success:" : "❌ Error:"}</span> {message}
    </div>
  );
};

export default Message;
