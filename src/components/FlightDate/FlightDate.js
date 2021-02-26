import React from 'react';
import { useForm } from "react-hook-form";

function FlightDate() {
  const { handleSubmit } = useForm();

  const today = new Date().toISOString().substr(0, 10);

  function onSubmit(data) {
    console.log(data);
  };

  return (
    <form className="date__form" name='date-form' onSubmit={handleSubmit(onSubmit)}>
      <input name="date" type="date" className="date__input" defaultValue={today}/>
    </form>
  )
}

export default FlightDate;
