import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

//Icons
import UserIcon from 'material-ui/svg-icons/social/person';
import DashboardIcon from 'material-ui/svg-icons/action/view-module';

//COmponents
import UserManager from './UserManager'
import GameManager from './GameManager'

//Material UI
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {deepOrange700} from 'material-ui/styles/colors';



export default class TopBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <Toolbar className='main'>
        <ToolbarGroup>
          
        </ToolbarGroup>
        <ToolbarGroup>
          <UserManager />
          <GameManager />
           
         
          
          <ToolbarSeparator />

          <IconButton tooltip="Dashboard">
            <DashboardIcon color='#005C97'/>
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}