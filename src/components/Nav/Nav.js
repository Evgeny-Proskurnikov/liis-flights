import React from 'react';

function Nav({ travelRoute }) {
  return (
    <nav className="nav">
      <p className="nav__link">Вылеты</p>
      <div className="nav__arrow"/>
      <p className="nav__link">SVO - JFK</p>
    </nav>
  )
}

export default Nav;
