import React from 'react';
import { formatTitle } from '../../utils/utils';
import Elements from '../Elements/Elements';
import Spinner from '../Spinner/Spinner';

function FlightsList({ cards, loggedIn, addToFavorite, removeFromFavorite, spinnerState }) {
  return (
    <section className="flights-list">
      <p className="flights-list__favorites">
        Добавлено в Избранное: <span className="flights-list__favcounter">{cards.length}</span> {formatTitle(cards)}
      </p>
      {spinnerState ?
        <Spinner />
        :
        <Elements
          cards={cards}
          loggedIn={loggedIn}
          addToFavorite={addToFavorite}
          removeFromFavorite={removeFromFavorite}
          spinnerState={spinnerState}
        />
      }
    </section>
  )
}

export default FlightsList;
