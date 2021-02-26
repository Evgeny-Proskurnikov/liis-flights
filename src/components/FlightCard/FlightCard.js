import React from "react";
import cn from "classnames";

function NewsCard({
  card,
  addToFavorite,
  removeFromFavorite,
  loggedIn,
}) {
  const favBtnClass = cn(
    "card__favorite-btn", 
    { "card__favorite-btn_marked": card.isMarked }
  );

  function handleClick() {
    card.isMarked ? removeFromFavorite(card) : addToFavorite(card);
  }

  return (
    <div className="card">
      <div className="card__image"/>
      <div className="card__container">
        <div className="card__route">
          <p className="card__maintext">{card.departure}</p>
          <div className="card__arrow"/>
          <p className="card__maintext">{card.arrival}</p>
        </div>
        <div className="card__date">
          <p className="card__text">{card.date}</p>
          <div className="card__dash"/>
          <p className="card__text">{card.time}</p>
        </div>
        <p className="card__text">{card.airlines}</p>
      </div>
      <button className={favBtnClass} type="button"/>
      <p className="card__price">Price: <span className="card__count">{card.price}</span></p>
    </div>
  );
}

export default NewsCard;
