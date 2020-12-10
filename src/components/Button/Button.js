import React from "react";
import './Button.css'

function Button({ title, type, className }) {
  return (
    <button
      type={type}
      className={`button__wrapper darkGreyBackground ${className}`}
    >
      {title}
    </button>
  );
}

export default Button;