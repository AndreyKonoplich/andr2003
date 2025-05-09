import React, { useEffect, useState } from 'react';

import 'styles/modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  coordinates: L.LatLng[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, coordinates }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(true); 
      const timer = setTimeout(() => {
        setIsClosing(false);
      }, 300); 

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <div className={`modal-overlay ${isClosing ? 'modal-overlay--fade-out' : ''}`}>
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
