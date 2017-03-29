import React from 'react';

//Styles


//Material Ui
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';


const GameDiaolog = (props) => { 
  	return (
    	<Dialog
          title="OUTSTANDING"
          modal={true}
          open={props.open}
        >
          Only actions can close this dialog.
    	</Dialog>
  	);
};

export default GameDiaolog;
