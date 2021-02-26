import React from 'react';
import { useForm } from "react-hook-form";
import cn from 'classnames';

function ModalForm({ onLogin, formLoadingState, openModal }) {
  const { register, handleSubmit, errors } = useForm({mode: 'onChange'});

  const handleClick = () => {
    openModal();
  }

  const onSubmit = data => {
    onLogin(data);
  };

  return (
    <form className='modal__form' name='login-form' onSubmit={handleSubmit(onSubmit)} noValidate>
      <h4 className="modal__input-name">Логин:</h4>
      <input
        name="email"
        type="email"
        className={cn('modal__input', { "modal__input_type_error":  errors.email })}
        ref={register({
          required: {value: true, message: 'Заполните это поле'},
          minLength: {value: 5, message: 'Текст должен содержать не менее 5 симв.'},
          pattern: {value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/, message: 'Введите адрес электронной почты'},
        })}
        maxLength="40"
        placeholder="Введите почту"
        autoComplete="off"
      />
      {errors.email && <span className="modal__input-error">{errors.email.message}</span>}

      <h4 className="modal__input-name">Пароль:</h4>
      <input
        name="password"
        type="password"
        className={cn('modal__input', { "modal__input_type_error":  errors.password })}
        ref={register({
          required: {value: true, message: 'Заполните это поле'},
          minLength: {value: 8, message: 'Пароль должен содержать не менее 8 симв.'},
          pattern: {value: /^(?=.*\d)(?=.*[a-z])(?!.*\s).*$/, message: 'Должен содержать прописные латинские буквы, цифры'},
        })}
        maxLength="20"
        placeholder="Введите пароль"
        autoComplete="off"
      />
      {errors.password && <span className="modal__input-error">{errors.password.message}</span>}

      <button
        type="submit"
        className={cn('modal__save-button', { "modal__save-button_inactive": errors.email || errors.password })}
        disabled={errors.email || errors.password}
      >
        {formLoadingState ? 'Загрузка...' : 'Войти'}
      </button>
      <p className="modal__text">или&ensp;
        <span className="modal__link" onClick={handleClick}>Зарегистрироваться</span>
      </p>
    </form>
  );
}

export default ModalForm;
