import React from 'react';

//Styles
import './Timer.css';

//Material Ui
import Paper from 'material-ui/Paper';


const Timer = (props) => { 
  return (
    <div className="pie">
      <div className="pie__block pie__block--leftTop"></div>
      <div className="pie__block pie__block--topRight"></div>
      <div className="pie__block pie__block--rightBottom"></div>
      <div className="pie__block pie__block--bottomLeft"></div>
    </div>
  );
};

export default Timer;


