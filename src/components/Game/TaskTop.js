import React from 'react';

//Material UI elements
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

class TaskTop extends React.Component {
	
  	
    
  render() {
    return (
   		<Paper zDepth={1} className="topCard">
		     <h3 className="userName">Game name</h3>
		</Paper>
    );
  }
}

export default TaskTop;