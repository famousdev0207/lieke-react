import React from 'react';

//Styles
import './Topic.css';

//Material Ui

const Frase = (props) => { 
  return (
    <div className="fraseBox">
        <div>{ props.text }</div>
    </div>
  );
};

export default Frase;
