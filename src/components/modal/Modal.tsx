import React from 'react';
import { ModalProps } from 'types/interfaces';

import 'styles/modal.css';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, coordinates }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-content__title">Координаты:</h2>
        <ul className="modal-content__list">
          {coordinates.map((latlng, idx) => (
            <li key={idx} className="modal-content__item">
              {latlng.lat.toFixed(6)}, {latlng.lng.toFixed(6)}
            </li>
          ))}
        </ul>
        <div className="modal-content__button-wrapper">
          <button className="modal-content__close-button" onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
