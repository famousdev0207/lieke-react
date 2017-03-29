import React from 'react';

//Styles
import './Word.css';

//Material Ui
import Paper from 'material-ui/Paper';


const Word = (props) => { 
  return (
    <Paper zDepth={1} className="wordBox">
          <div>{ props.word }</div>
	</Paper>
  );
};

export default Word;
