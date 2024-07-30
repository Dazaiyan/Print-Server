import React from 'react';
import './ForgotPasswordModal.css';

const ForgotPasswordModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>¿Olvidaste tu contraseña?</h2>
        <p>
          Escríbenos a <a href="mailto:soporte.tics@hep.gob.ec">soporte.tics@hep.gob.ec</a>
          <br />
          o a las
          <br />
          extensiones 8201 - 8209.
        </p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
