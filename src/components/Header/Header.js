import React from 'react';
import Spinner from '../Spinner/Spinner';

function Header({ 
  onLogin,
  loggedIn,
  onLogout,
  spinnerState,
  currentUser
}) {

  function handleAuthClick() {
    loggedIn ? onLogout() : onLogin();
  }
  
  return (
    <header className='header'>
      <p className='header__logo'>SimpleFlightCheck</p>

      {spinnerState ? 
        <Spinner typeClass='spinner_type_header' />
        :
        <button type='button' className='header__auth-btn' onClick={handleAuthClick}>
          {loggedIn ? currentUser : 'Авторизоваться'}
          {loggedIn && <span className='header__logout'/>}
        </button>
      }
    </header>
  )
}

export default Header;
