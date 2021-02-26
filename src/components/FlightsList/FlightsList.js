import React from 'react';
import Elements from '../Elements/Elements';

function FlightsList({ cards, loggedIn, addToFavorite, removeFromFavorite, spinnerState }) {

  return (
    <section className="flights-list">
      <p className="flights-list__favorites">
        Добавлено в Избранное: <span className="flights-list__favcounter">10</span> рейсов
      </p>
      <Elements
        cards={cards}
        loggedIn={loggedIn}
        addToFavorite={addToFavorite}
        removeFromFavorite={removeFromFavorite}
        spinnerState={spinnerState}
      />
    </section>
  )
}

export default FlightsList;
