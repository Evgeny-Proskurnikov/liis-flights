import React from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ModalForm from '../ModalForm/ModalForm';

function AuthModal({ isOpen, onClose, onLogin, formLoadingState, openRegModal }) {
  return (
    <ModalWithForm 
      title='Вход' 
      name='auth' 
      modalState={isOpen ? 'modal_opened' : ''} 
      onClose={onClose}
      children={
        <ModalForm 
          formLoadingState={formLoadingState} 
          openModal={openRegModal}
          onLogin={onLogin}
        />
      }
    />
  );
}

export default AuthModal;
