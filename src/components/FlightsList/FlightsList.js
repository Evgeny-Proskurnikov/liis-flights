import React from 'react';
import { formatTitle } from '../../utils/utils';
import Elements from '../Elements/Elements';
import Spinner from '../Spinner/Spinner';

function FlightsList({ cards, addToFavorite, removeFromFavorite, spinnerState }) {
  const favoriteCards = cards.filter(c => c.isMarked === true)

  return (
    <section className="flights-list">
      <p className="flights-list__favorites">
        Добавлено в Избранное:&ensp;
        <span className="flights-list__favcounter">{favoriteCards.length}</span>
        &ensp;{formatTitle(favoriteCards)}
      </p>
      {spinnerState ?
        <Spinner />
        :
        <Elements
          cards={cards}
          addToFavorite={addToFavorite}
          removeFromFavorite={removeFromFavorite}
          spinnerState={spinnerState}
        />
      }
    </section>
  )
}

export default FlightsList;
