import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';

//Components
import NewGame from './NewGame'

//Images
import UserImg from '../../images/max.jpg';

//Icons
import GameIcon from 'material-ui/svg-icons/hardware/videogame-asset';
import IconButton from 'material-ui/IconButton';
import AddGame from 'material-ui/svg-icons/action/note-add';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';

export default class CreateGame extends React.Component {
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
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div>
       <TextField
                hintText="Games title"
                className="inviteInput"
       />
        <FlatButton
                label="Create"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleOpen}
        />
        <Dialog
          title="Create game"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoDetectWindowHeight={false}
          autoScrollBodyContent={false}
          contentStyle={{
            width: '100%',
            maxWidth: '850px',
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
          <NewGame />
         </Dialog>
      </div>
    );
  }
}