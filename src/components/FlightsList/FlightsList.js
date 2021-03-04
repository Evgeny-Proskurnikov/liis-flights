import React from 'react';
import { connect } from 'react-redux'
import { formatTitle } from '../../utils/utils';
import Elements from '../Elements/Elements';
import Spinner from '../Spinner/Spinner';

function FlightsList({ stateCards, loading }) {
  const favoriteCards = stateCards.filter(c => c.isMarked === true)

  return (
    <section className="flights-list">
      <p className="flights-list__favorites">
        Добавлено в Избранное:&ensp;
        <span className="flights-list__favcounter">{favoriteCards.length}</span>
        &ensp;{formatTitle(favoriteCards)}
      </p>
      {loading ? <Spinner /> : <Elements />}
    </section>
  )
}

const mapStateToProps = (state) => ({
  stateCards: state.cardsData,
  loading: state.loading,
});

export default (connect(mapStateToProps))(FlightsList);
