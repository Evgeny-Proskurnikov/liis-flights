import React from 'react';
import ModalRegForm from '../ModalRegForm/ModalRegForm';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

function RegisterModal({ isOpen, onClose, onRegister, formLoadingState, openAuthModal, isUserExist }) {
  return (
    <ModalWithForm 
      title='Регистрация' 
      name='register' 
      modalState={isOpen ? 'modal_opened' : ''} 
      onClose={onClose}
      children={
        <ModalRegForm
          onRegister={onRegister} 
          formLoadingState={formLoadingState} 
          openModal={openAuthModal}
          isUserExist={isUserExist}
        />
      }
    />
  );
}

export default RegisterModal;
