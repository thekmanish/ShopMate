import React from "react";
import { motion } from "framer-motion";

const steps = ["Cart", "Shipping", "Payment", "Summary"];

export default function CheckoutSteps({ currentStep }) {
  const progressPercent = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="w-full flex justify-center my-10">
      <div className="relative flex items-center w-full max-w-4xl px-4">
        {/* Rope (progress line) */}
        <div className="absolute top-6 left-[12.5%] right-[12.5%] h-1 bg-gray-300 rounded-full z-0 overflow-hidden">
          <motion.div
            className="h-full bg-yellow-400"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </div>

        {/* Step Circles */}
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={index}
              className={`flex-1 z-10 flex flex-col items-center ${
                index === 0 ? "justify-start" : index === steps.length - 1 ? "justify-end" : "justify-center"
              }`}
            >
              <motion.div
                className={`w-12 h-12 flex items-center justify-center rounded-full border-4 text-sm font-bold shadow-lg transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-yellow-400 border-yellow-400 text-black"
                      : isCurrent
                      ? "bg-white border-yellow-400 text-yellow-500"
                      : "bg-gray-300 border-gray-300 text-white"
                  }`}
                whileHover={isCurrent ? { scale: 1.15 } : {}}
              >
                {index + 1}
              </motion.div>
              <div
                className={`mt-2 text-sm font-semibold transition-colors ${
                  isCompleted || isCurrent
                    ? "text-yellow-400"
                    : "text-gray-400"
                }`}
              >
                {step}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
