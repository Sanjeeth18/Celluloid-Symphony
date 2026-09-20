import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";

function ClearHistoryModal({ isOpen, onClose, onConfirm }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md p-6 rounded-2xl bg-[#141226] border border-white/10 shadow-2xl text-center"
          >
            <FiTrash2 size={36} className="mx-auto text-red-400 mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">Clear Watch History?</h3>
            <p className="text-xs text-gray-400 mb-6">
              This will permanently delete your watched titles history across local storage and cloud database.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg"
              >
                Confirm Clear
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ClearHistoryModal;
