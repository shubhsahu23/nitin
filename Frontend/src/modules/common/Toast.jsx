import React, { useEffect } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const Toast = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div
      className={`fixed top-5 right-5 z-[9999] flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl animate-slideIn max-w-md
        ${type === "success"
          ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/40 text-green-100"
          : "bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-400/40 text-red-100"
        }`}
    >
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isSuccess ? "bg-green-500/30" : "bg-red-500/30"
      }`}>
        {isSuccess ? (
          <CheckCircleIcon className="h-5 w-5 text-green-300" />
        ) : (
          <XCircleIcon className="h-5 w-5 text-red-300" />
        )}
      </div>
      <span className="font-medium text-sm leading-relaxed flex-1">{message}</span>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="ml-2 text-gray-300 hover:text-white transition-all duration-200 hover:scale-110 p-1 rounded-full hover:bg-white/10"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
