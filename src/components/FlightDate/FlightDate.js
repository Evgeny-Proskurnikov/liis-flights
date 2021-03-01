import React from 'react';

function FlightDate({ date, handleSetDate, handleGetFlights }) {
  function handleInputChange(evt) {
    handleSetDate(evt.target.value);
    handleGetFlights(evt.target.value);
  };

  return (
    <div className="date">
      <p className="date__daymonthyear">{date}</p>
      <input name="date" type="date" className="date__input" onChange={handleInputChange}/>
    </div>
  )
}

export default FlightDate;
