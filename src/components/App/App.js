import { React, useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import * as auth from '../../utils/auth';
import flightsRequest from '../../utils/SkyscannerApi';
import apiRequest from '../../utils/api';
import { formatDate, formatEnDate, today } from '../../utils/utils';
import Header from '../Header/Header';
import Main from '../Main/Main';
import AuthModal from '../AuthModal/AuthModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Flights from '../Flights/Flights';
import { images } from '../../utils/data';


function App() {
  const [ authModalState, setAuthModalState ] = useState(false);
  const [ regModalState, setRegModalState ] = useState(false);
  const [ blurState, setBlurState ] = useState(false);
  const [ cards, setCards ] = useState([]);
  const [ favoriteCards, setFavoriteCards ] = useState([]);
  const [ formLoadingState, setFormLoadingState ] = useState(false);
  const [ headerSpinnerState, setHeaderSpinnerState ] = useState(false);
  const [ spinnerState, setSpinnerState ] = useState(false);
  const [ loggedIn, setLoggedIn ] = useState(true);
  const [ isUserExist, setUserExist ] = useState(false);
  const [ currentUser, setCurrentUser ] = useState('Evgeny');
  const [ carouselImages, setCarouselImages ] = useState(images);
  const [ date, setDate ] = useState(formatDate(today));
  const history = useHistory();

  useEffect(() => {
    // получаем массив ключей localStorage, если в массиве есть cards
    // достаём из хранилища карточки и записываем в стейт
    if (Object.keys(localStorage).includes('cards')) {
      const storedCards = JSON.parse(localStorage.getItem('cards'));
      setCards(storedCards);
    }
    // tokenCheck();
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

  // добавление обработчика закрытия модалок на ESC
  function setEscListener() {
    document.addEventListener('keyup', handleEscPopupClose);
  }

  // закрытие всех модальных окон
  function closeAllPopups() {
    setAuthModalState(false);
    setRegModalState(false);
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

  // поиск рейсов
  function handleGetFlights(date) {
    setSpinnerState(true);
    flightsRequest.getFlights(date)
      .then(res => {
        console.log(res)
        if (res.Quotes.length === 0) {
          console.log('Рейсы не найдены');
          return;
        }
        const cards = res.Quotes.map(el => {
          const originPlace = res.Places.find(i => i.PlaceId === el.OutboundLeg.OriginId);
          const destinationPlace = res.Places.find(i => i.PlaceId === el.OutboundLeg.DestinationId);
          const departureDate = formatEnDate(el.OutboundLeg.DepartureDate);
          const carrier = res.Carriers.find(i => i.CarrierId === el.OutboundLeg.CarrierIds[0]);

          return {
            departure: `${originPlace.CityName} (${originPlace.IataCode})`,
            arrival: `${destinationPlace.CityName} (${destinationPlace.IataCode})`,
            date: departureDate,
            time: '13:00',
            airlines: carrier.Name,
            price: `${el.MinPrice} ${res.Currencies[0].Symbol}`,
            isMarked: false
          }
        });
        localStorage.setItem('cards', JSON.stringify(cards));
        setCards(cards);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setSpinnerState(false));
  }

  // добавление карточки в избранное
  function handleAddToFavorite(card) {
    // отделяем ненужные поля деструктуризацией
    const { __v, isMarked, ...favCard } = card;
    
    apiRequest.saveArticle(favCard)
      .then((newCard) => {  
        const markedCard = {...newCard, isMarked: true};
        setFavoriteCards([markedCard, ...favoriteCards]);

        // создаем новый массив чтобы не мутировать стейт
        // по индексу заменяем в массиве карточку
        const refreshedCards = [...cards];
        const index = cards.findIndex(el => el.link === card.link);
        refreshedCards.splice(index, 1, markedCard);
        setCards(refreshedCards);
        localStorage.setItem('cards', JSON.stringify(refreshedCards));
      })
      .catch(err => {
        console.log(err);
      });
  }
 
  // удаление избранной карточки
  function removeFromFavorite(card) {
    apiRequest.deleteArticle(card._id)
      .then(res => {
        console.log(res)
        // filter возвращает новый массив элементов удовлетворяющих условию
        const newFavoriteCards = favoriteCards.filter(c => c._id !== card._id);
        setFavoriteCards(newFavoriteCards);

        const { _id, ...newCard } = card;
        const refreshedCards = [...cards];
        const index = cards.findIndex(el => el.link === card.link);
        refreshedCards.splice(index, 1, {...newCard, isMarked: false});
        setCards(refreshedCards);
        localStorage.setItem('cards', JSON.stringify(refreshedCards)); 
      })
      .catch(err => console.log(err));
  }

  // регистрация пользователя
  function handleRegister({ name, email, password }) {
    setUserExist(false);
    setFormLoadingState(true);

    auth.register({ name, email, password })
      .then(user => {
        if (user) {
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
      // setCurrentUser(user);
      setLoggedIn(true);
      closeAllPopups();
      history.push('/saved-news');
    }

    auth.authorize({ email, password })
      .then(res => {
        if (res) {
          localStorage.setItem('token', res.token);
          // getFavoriteCards();
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
            // getFavoriteCards();
            // setCurrentUser(res);
            setLoggedIn(true);
            history.push('/');
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
        <Route exact path='/flights'>
          <Main
            loggedIn={loggedIn}
            children={
              <Flights 
                loggedIn={loggedIn} 
                carouselImages={carouselImages} 
                cards={cards}
                handleSetDate={handleSetDate}
                date={date}
                handleGetFlights={handleGetFlights}
                spinnerState={spinnerState}
              />
            } 
          />
        </Route>
        {/* <ProtectedRoute
          exact
          path='/flights'
          loggedIn={loggedIn}
          headerComponent={Main}
        /> */}
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
    </div>
  );
}

export default App;
