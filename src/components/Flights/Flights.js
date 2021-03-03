import React from 'react';
import Carousel from '../Carousel/Carousel';
import FlightDate from '../FlightDate/FlightDate';
import Nav from '../Nav/Nav';
import FlightsList from '../FlightsList/FlightsList';

function Flights({
  cards,
  addToFavorite,
  removeFromFavorite,
  spinnerState,
  carouselImages,
  handleSetDate,
  date,
  handleGetFlights
}) {
  return (
    <section className="flights">
      <div className="flights__header">
        <Nav />
        <FlightDate handleSetDate={handleSetDate} date={date} handleGetFlights={handleGetFlights} />
      </div>
      <Carousel images={carouselImages}/>
      <FlightsList
        cards={cards}
        spinnerState={spinnerState}
        addToFavorite={addToFavorite}
        removeFromFavorite={removeFromFavorite}
      />
    </section>
  )
}

export default Flights;
