import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <motion.div className="flex space-x-2">
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className="w-6 h-6 bg-blue-500 rounded-full"
            initial={{ y: 0 }}
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2, // Delay each dot for a wave effect
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Loader;
