import React from "react";
import './Input.css'

function Input({label, handle, type, className, name}) {
  return (
    <div className={className}>
      <label className='label' htmlFor={name}>{label}</label>
      <input type={type} className="customInput" name={name}/>
    </div>
  );
}

export default Input;