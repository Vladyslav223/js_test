import React from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

const Modal = ({ handleCancelClick, handleSubmitClick }) => (
  <div className="overlay">
    <div className="modal">
      <div className="modal__header">
        <p className="modal__header-title">Внимание!</p>

      </div>
      <p className="modal__body">
            Каждый неотвеченный ответ считается неправильным
      </p>
      <div className="modal__footer">
        <button type="button" onClick={handleSubmitClick}>Продолжить</button>
        <button type="button" onClick={handleCancelClick}>Отмена</button>

      </div>
    </div>

  </div>
);

Modal.propTypes = {
  handleSubmitClick: PropTypes.func.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
};

export default Modal;
