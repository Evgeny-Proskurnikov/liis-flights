import React from 'react';
import { v4 as uuid } from 'uuid';
import { connect } from 'react-redux'
import FlightCard from '../FlightCard/FlightCard'

function Elements({ stateCards }) {  
  return (
    <div className="elements">
      {stateCards.map(el => {
        return <FlightCard
          card={el}
          key={uuid()}
        />
      })}
    </div>
  )
}

const mapStateToProps = (state) => ({
  stateCards: state.cardsData,
});

export default (connect(mapStateToProps))(Elements);
