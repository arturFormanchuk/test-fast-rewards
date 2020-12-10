import React from "react";
import './Card.css'

function Card({ className, children }) {

  return (
    <div className={`card__wrapper greyBackground ${className}`}>
      { children }
    </div>
  );
}

export default Card;