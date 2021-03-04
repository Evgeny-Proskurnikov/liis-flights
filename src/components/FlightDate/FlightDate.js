import React from 'react';
import { connect } from 'react-redux';
import { fetchSearchCards } from '../../actions';

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

const mapDispatchToProps = (dispatch) => ({
  handleGetFlights: item => dispatch(fetchSearchCards(item)),
});

export default (connect(null, mapDispatchToProps))(FlightDate);