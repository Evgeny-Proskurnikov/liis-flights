import React from 'react';
import Carousel from '../Carousel/Carousel';
import FlightDate from '../FlightDate/FlightDate';
import Nav from '../Nav/Nav';
import FlightsList from '../FlightsList/FlightsList';

function Flights({
  carouselImages,
  handleSetDate,
  date,
}) {
  return (
    <section className="flights">
      <div className="flights__header">
        <Nav />
        <FlightDate handleSetDate={handleSetDate} date={date} />
      </div>
      <Carousel images={carouselImages}/>
      <FlightsList />
    </section>
  )
}

export default Flights;
