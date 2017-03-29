import React from 'react';

//Styles
import './Word.css';

//Material UI - Icons
import Life from 'material-ui/svg-icons/action/favorite';
import EmptyLife from 'material-ui/svg-icons/action/favorite-border';
import {red500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';

//Styles
import './Lifes.css'


const styles = {

  largeIcon: {
    width: 30,
    height: 30,
  },
  large: {
    width: 60,
    height: 60,
    padding: 15,
  },

};

const Lifes = (props) => { 
  return (
    <div className="lifesBox">

      
    	
      <IconButton
	      iconStyle={styles.largeIcon}
	      style={styles.large}
	    >
          {props.lifes >= 1 ? (
            <Life color={red500}/>
          ) : (
            <EmptyLife color={red500}/>
          )}

      </IconButton>
      <IconButton
        iconStyle={styles.largeIcon}
        style={styles.large}
      >
          {props.lifes >= 2 ? (
            <Life color={red500}/>
          ) : (
            <EmptyLife color={red500}/>
          )}

      </IconButton>
      <IconButton
        iconStyle={styles.largeIcon}
        style={styles.large}
      >
          {props.lifes >= 3 ? (
            <Life color={red500}/>
          ) : (
            <EmptyLife color={red500}/>
          )}

      </IconButton>

    </div>
  );
};

export default Lifes;
