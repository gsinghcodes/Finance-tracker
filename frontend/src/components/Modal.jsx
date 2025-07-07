'use client';
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0000016f] flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute hover:cursor-pointer top-2 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>
        <div className="max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
