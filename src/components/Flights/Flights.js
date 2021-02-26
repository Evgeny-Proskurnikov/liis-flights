import React from 'react';
import Carousel from '../Carousel/Carousel';
import FlightDate from '../FlightDate/FlightDate';
import Nav from '../Nav/Nav';
import FlightsList from '../FlightsList/FlightsList';

function Flights({ cards, loggedIn, addToFavorite, removeFromFavorite, spinnerState, carouselImages }) {
  return (
    <section className="flights">
      <div className="flights__header">
        <Nav />
        <FlightDate />
      </div>
      <Carousel images={carouselImages}/>
      <FlightsList cards={cards}/>
    </section>
  )
}

export default Flights;
