import React from 'react';
import './ForgotPasswordModal.css';

const ForgotPasswordModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>¿Olvidaste tu contraseña?</h2>
        <p>Acércate a la área de TICs o ponte en contacto con el ingeniero a cargo.</p>
        <p>Ing. Alejandro</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
