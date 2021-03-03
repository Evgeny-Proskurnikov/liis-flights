import React from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

function SuccessModal({ isOpen, onClose, openAuthModal }) {
  const handleClick = () => {
    openAuthModal();
  }

  return (
    <ModalWithForm 
      title='Пользователь успешно зарегистрирован!' 
      name='success' 
      modalState={isOpen ? 'modal_opened' : ''} 
      onClose={onClose}
      children={
        <span className="modal__link modal__link_type_success" onClick={handleClick}>Войти</span>
      }
    />
  );
}

export default SuccessModal;
