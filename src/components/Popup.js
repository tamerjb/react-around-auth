import React from 'react';
import { useEffect } from 'react';

const Popup = ({ isOpen, name, onClose, children }) => {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''} popup_type_${name}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        {children}
        <button
          className={`popup__close-button ${`popup__close-button_type_${name}`}`}
          type='button'
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Popup;
