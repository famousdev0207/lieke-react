import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';

//Images
import UserImg from '../../images/max.jpg';

//Icons
import IconButton from 'material-ui/IconButton';
import UserIcon from 'material-ui/svg-icons/social/person';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';

export default class UserManager extends React.Component {
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
      />
    ];

    return (
      <div>
        <IconButton tooltip="Manage students" onTouchTap={this.handleOpen}>
            <UserIcon color='#005C97'/>
        </IconButton>
        <Dialog
          title="Manage students"
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
          <div>
              <TextField
                hintText="Student's email"
                className="inviteInput"
              />
              <FlatButton
                label="Invite"
                primary={true}
                keyboardFocused={true}
              />
          </div>
          <List>
            <ListItem
              primaryText="Brendan Lim"
              rightIcon={<DeleteIcon />}
              leftAvatar={<Avatar src={UserImg} />}
            />
            <ListItem
              primaryText="Eric Hoffman"
              rightIcon={<DeleteIcon />}
              leftAvatar={<Avatar src={UserImg} />}
            />
            <ListItem
              primaryText="Grace Ng"
              rightIcon={<DeleteIcon />}
              leftAvatar={<Avatar src={UserImg} />}
            />
            <ListItem
              primaryText="Kerem Suer"
              rightIcon={<DeleteIcon />}
              leftAvatar={<Avatar src={UserImg} />}
            />
            <ListItem
              primaryText="Raquel Parrado"
              rightIcon={<DeleteIcon />}
              leftAvatar={<Avatar src={UserImg} />}
            />
          </List>
         </Dialog>
      </div>
    );
  }
}