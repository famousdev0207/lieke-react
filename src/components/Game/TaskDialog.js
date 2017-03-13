import React from 'react';

//Material UI elements
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

//Components
import TextField from 'material-ui/TextField';


class TaskDialog extends React.Component {
	
  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      open: true,
      width: window.innerWidth - 40,
      stepIndex: 0,
    };
  }
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  }
    
  render() {
  	const styles = {
  		input: {
  			width: '70px',
  			marginLeft: '10px',
  			marginRight: '10px',
  			fontSize: "12px",
		},
  		text: {
  			fontSize: "12px",
  			marginLeft: "0 !important"
  		}
  	};
  	const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Done"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ];
    return (
           <div>
		           <div style={styles.text}>
		         		Lorem ipsum 
			                <TextField
			                    hintText="Hint Text"
			                    style={styles.input}
			                    
			                />
		                 dolor sit amet.
		           </div>
		           <div style={styles.text}>
		         		Lorem ipsum 
			                <TextField
			                    hintText="Hint Text"
			                    style={styles.input}
			                    
			                />
		                 dolor sit amet.
		           </div>
		           <div style={styles.text}>
		         		Lorem ipsum 
			                <TextField
			                    hintText="Hint Text"
			                    style={styles.input}
			                    
			                />
		                 dolor sit amet.
		           </div>
		           <div style={styles.text}>
		         		Lorem ipsum 
			                <TextField
			                    hintText="Hint Text"
			                    style={styles.input}
			                    
			                />
		                 dolor sit amet.
		           </div>
		     </div>
	     	
        
    );
  }
}

export default TaskDialog;