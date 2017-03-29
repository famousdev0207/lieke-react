import React from 'react';

//Styles
import './Frase.css';

//Material Ui



const Topic = (props) => { 
  return (
    <div className="topicBox">
        <div className="topicInner">{ props.topic }</div>
    </div>
  );
};

export default Topic;
