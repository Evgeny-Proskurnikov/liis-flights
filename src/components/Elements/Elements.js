import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import FlightCard from '../FlightCard/FlightCard'

function Elements({
  cards,
  loggedIn,
  addToFavorite,
  removeFromFavorite,
  spinnerState,
}) {  
  return (
    <div className="elements">
      {cards.map(el => {
        return <FlightCard
          card={el}
          key={uuidv4()}
          loggedIn={loggedIn}
          addToFavorite={addToFavorite}
          removeFromFavorite={removeFromFavorite}
          spinnerState={spinnerState}
        />
      })}
    </div>
  )
}

export default Elements;
