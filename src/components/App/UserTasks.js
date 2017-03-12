import React from 'react';

//Material UI elements
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

//Images
import ActionInfo from 'material-ui/svg-icons/action/info';

class UserTasks extends React.Component {
	state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Start"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
     		<Paper zDepth={1} className="taskCard">
  		      <List>
            <Subheader>Newest games</Subheader>
              <ListItem primaryText="Game" rightIcon={<ActionInfo />} onTouchTap={this.handleOpen}/>
              <ListItem primaryText="Game" rightIcon={<ActionInfo />} onTouchTap={this.handleOpen}/>
              <ListItem primaryText="Game" rightIcon={<ActionInfo />} onTouchTap={this.handleOpen}/>
            </List>
            <Divider />
            <List>
            <Subheader>Latest scores</Subheader>
              <ListItem primaryText="Game" rightIcon={<ActionInfo />} onTouchTap={this.handleOpen}/>
              <ListItem primaryText="Game" rightIcon={<ActionInfo />} onTouchTap={this.handleOpen}/>
              <ListItem primaryText="Game" rightIcon={<ActionInfo />} onTouchTap={this.handleOpen}/>
            </List>
  		  </Paper>
        <Dialog
          title="Game Name"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoDetectWindowHeight={false}
          autoScrollBodyContent={false}
          contentStyle={{
            width: '100%',
            maxWidth: '450px',
            maxHeight: '100% !important'
          }}
          bodyStyle={{
             maxHeight: '100% !important'
          }}
          style={{
             paddingTop:'0 !important',
             marginTop:'-65px !important',
             bottom: '0 !important',
             overflow: 'scroll !important',
             height: 'auto !important'
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut urna justo, fermentum at mauris at, tempus maximus lorem. Integer eu egestas ipsum. Curabitur sed libero quis turpis sagittis faucibus id in quam. Nulla facilisi. Integer nisl quam, facilisis ac eleifend quis, varius et ex.
        </Dialog>
      </div>
    );
  }
}

export default UserTasks;