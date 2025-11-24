import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children }) => {
    // if (!isOpen) return null; // Removed to allow CSS transitions

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{title}</h3>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <button className="modal-close-btn" onClick={onClose}>
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default Modal;
