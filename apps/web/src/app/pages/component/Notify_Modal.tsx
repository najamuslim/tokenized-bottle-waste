import React from "react";

interface ModalProps {
  message: string | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{message}</h2>
        <button onClick={onClose} className="modal-close-btn">
          Close
        </button>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background-color: white;
          padding: 50px;
          border-radius: 8px;
          text-align: center;
        }
        .modal-close-btn {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .modal-close-btn:hover {
          background-color: #003566;
        }
      `}</style>
    </div>
  );
};

export default Modal;
