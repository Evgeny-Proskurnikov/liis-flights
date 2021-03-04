import { React, useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as auth from '../../utils/auth';
import { formatDate, today } from '../../utils/utils';
import Header from '../Header/Header';
import Main from '../Main/Main';
import AuthModal from '../AuthModal/AuthModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import SuccessModal from '../SuccessModal/SuccessModal';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Flights from '../Flights/Flights';
import { images } from '../../utils/data';
import { addFlightCardsSuccess, fetchFavoriteCards, removeItems, } from '../../actions';

function App({ getFavoriteCards, addCardsToStore }) {
  const [ authModalState, setAuthModalState ] = useState(false);
  const [ regModalState, setRegModalState ] = useState(false);
  const [ successModalState, setSuccessModalState ] = useState(false);
  const [ blurState, setBlurState ] = useState(false);
  const [ formLoadingState, setFormLoadingState ] = useState(false);
  const [ headerSpinnerState, setHeaderSpinnerState ] = useState(false);
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ isUserExist, setUserExist ] = useState(false);
  const [ currentUser, setCurrentUser ] = useState({});
  const [ carouselImages, setCarouselImages ] = useState(images);
  const [ date, setDate ] = useState(formatDate(today));
  const history = useHistory();

  useEffect(() => {
    // получаем массив ключей localStorage, если в массиве есть cards
    // достаём из хранилища карточки и записываем в стейт
    if (Object.keys(localStorage).includes('cards')) {
      const storedCards = JSON.parse(localStorage.getItem('cards'));
      addCardsToStore(storedCards);
    }
    tokenCheck();
  }, []) // eslint-disable-line

  // открытие модальных окон
  function openAuthModal() {
    closeAllPopups();
    setAuthModalState(true);
    setEscListener();
    setBlurState(true);
  }
  function openRegModal() {
    closeAllPopups();
    setRegModalState(true);
    setEscListener();
    setBlurState(true);
  }
  function openSuccessModal() {
    closeAllPopups();
    setSuccessModalState(true);
    setEscListener();
  }

  // добавление обработчика закрытия модалок на ESC
  function setEscListener() {
    document.addEventListener('keyup', handleEscPopupClose);
  }

  // закрытие всех модальных окон
  function closeAllPopups() {
    setAuthModalState(false);
    setRegModalState(false);
    setSuccessModalState(false);
    setBlurState(false);
    document.removeEventListener('keyup', handleEscPopupClose);
  }

  // закрытие модалки на Esc
  function handleEscPopupClose(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  // записываем дату из календаря в стейт
  function handleSetDate(date) {
    setDate(formatDate(date));
  }

  // регистрация пользователя
  function handleRegister({ name, email, password }) {
    setUserExist(false);
    setFormLoadingState(true);

    auth.register({ name, email, password })
      .then(user => {
        if (user) {
          openSuccessModal();
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
      .catch(err => {
        if (err.status === 409) {
          setUserExist(true);
        }
        console.log(err);
      })
      .finally(() => setFormLoadingState(false));
  }

  // логин пользователя
  function handleLogin({ email, password }) {
    setFormLoadingState(true);
    function authorizeHandler(user) {
      setCurrentUser(user);
      setLoggedIn(true);
      closeAllPopups();
      history.push('/flights');
    }

    auth.authorize({ email, password })
      .then(res => {
        if (res) {
          localStorage.setItem('token', res.token);
          getFavoriteCards();
          const storageUser = JSON.parse(localStorage.getItem('user'));
          if (!storageUser) {
            return auth.getUserData(res.token)
              .then(user => {
                if (user.email) {
                  authorizeHandler(user);
                }
              })
              .catch(err => console.log(err));
          }
          if (storageUser.email === email) {
            return authorizeHandler(storageUser);
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setFormLoadingState(false));
  }

  // проверка токена
  function tokenCheck() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      setHeaderSpinnerState(true);
      auth.getUserData(jwt)
        .then(res => {
          if (res.email) {
            getFavoriteCards();
            setCurrentUser(res);
            setLoggedIn(true);
            history.push('/flights');
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => setHeaderSpinnerState(false));
    }
  }

  // выйти из аккаунта, очистить локальное хранилище
  function handleLogOut() {
    setLoggedIn(false);
    localStorage.clear();
  }

  return (
    <div className='page'>
      <Header 
        onLogin={openAuthModal}
        loggedIn={loggedIn}
        onLogout={handleLogOut}
        spinnerState={headerSpinnerState}
        currentUser={currentUser}
      />
      <Switch>
        <Route exact path='/'>
          <Main blurState={blurState} />
        </Route>
        <ProtectedRoute
          exact
          path='/flights'
          loggedIn={loggedIn}
          mainComponent={Main}
          mainClass='main_type_flights'
          children={
            <Flights 
              carouselImages={carouselImages} 
              handleSetDate={handleSetDate}
              date={date}
            />
          }
        />
      </Switch>
      
      <AuthModal
        isOpen={authModalState}
        onClose={closeAllPopups}
        openRegModal={openRegModal}
        onLogin={handleLogin}
        formLoadingState={formLoadingState}
      />
      <RegisterModal
        isOpen={regModalState}
        onClose={closeAllPopups}
        openAuthModal={openAuthModal}
        onRegister={handleRegister}
        isUserExist={isUserExist}
        formLoadingState={formLoadingState}
      /> 
      <SuccessModal isOpen={successModalState} onClose={closeAllPopups} openAuthModal={openAuthModal} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  stateCards: state.cardsData
});

const mapDispatchToProps = (dispatch) => ({
  getFavoriteCards: () => dispatch(fetchFavoriteCards()),
  addCardsToStore: (cards) => dispatch(addFlightCardsSuccess(cards)),
  removeStoreItems: () => dispatch(removeItems()),
});

export default (connect(mapStateToProps, mapDispatchToProps))(App);
