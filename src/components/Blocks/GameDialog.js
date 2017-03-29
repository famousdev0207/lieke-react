import React from 'react';


//Vendor 
import CountUp from 'react-countup';


//Styles
import './GameDialog.css'

//Material Ui
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';

//Images
import Badge from '../../images/badge/1.png'
import FacebookShare from '../../images/share-facebook.png'


const GameDiaolog = (props) => { 
  	return (
    	<Dialog
          title="OUTSTANDING"
          modal={true}
          open={props.open}
          className="dialogBox"
          titleClassName="title"
        >
          <h3>Your points <CountUp start={0} end={props.points} /></h3>
          <img src={Badge} className="badge"/>
          <img src={FacebookShare} className="share"/>
    	</Dialog>
  	);
};

export default GameDiaolog;
