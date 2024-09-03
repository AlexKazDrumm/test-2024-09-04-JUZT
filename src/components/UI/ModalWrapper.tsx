import React, { ReactNode } from 'react';

interface ModalWrapperProps {
  onClose: () => void;
  children: ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = React.memo(({ onClose, children }) => {
  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
});

export default ModalWrapper;
