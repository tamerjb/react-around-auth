import React, { useState, useEffect } from "react";
import { api } from "../utils/api";

const Card = (props) => {
  const [likesCount, setLikesCount] = useState(0);

  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <li className="card">
      <button
        type="button"
        aria-label="delete card"
        className="card__image-trash"
      />
      <img
        src={props.card.link}
        alt={props.card.name}
        className="card__image"
        onClick={handleClick}
      />
      <div className="card__info">
        <h2 className="card__info-title">{props.card.name}</h2>
        <div className="card__like-container">
          <button
            className="card__like-button"
            type="button"
            aria-label="like card"
          />
          <span className="card__like-count">{likesCount}</span>
        </div>
      </div>
    </li>
  );
};
export default Card;
