import React from 'react';
import FlightCard from '../FlightCard/FlightCard'

function Elements({ cards, addToFavorite, removeFromFavorite }) {  
  return (
    <div className="elements">
      {cards.map(el => {
        return <FlightCard
          card={el}
          key={el.price + el.date}
          addToFavorite={addToFavorite}
          removeFromFavorite={removeFromFavorite}
        />
      })}
    </div>
  )
}

export default Elements;
