import React from 'react';
import './ForgotPasswordModal.css';

const ForgotPasswordModal = ({ onClose }) => {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('soporte.tics@hep.gob.ec');
    alert('Correo electrónico copiado al portapapeles');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>¿Olvidaste tu contraseña?</h2>
        <p>
          Escríbenos a{' '}
          <span className="copy-email" onClick={handleCopyEmail}>
            soporte.tics@hep.gob.ec
          </span>
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
