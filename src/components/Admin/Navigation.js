import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconDate from 'material-ui/svg-icons/navigation/apps'; 
import IconHome from 'material-ui/svg-icons/maps/directions-car';
import IconHistory from 'material-ui/svg-icons/action/history';


//redux
import { connect } from 'react-redux';
import { userLogin } from '../../actions/userAction';
import { bindActionCreators } from 'redux';
import store from '../../store'



const homeIcon = <IconHome />;
const historyIcon = <IconHistory />;
const dateIcon = <IconDate />;

class Navigation extends Component {
  state = {
    selectedIndex: 2,
  };

  select = (index) => {
    this.setState({selectedIndex: index});
    console.log(index);
    
    switch(index) {
    case 0:
        this.context.router.push('/'); 
        break;
    case 1:
        this.context.router.push('/log'); 
        break;
    case 2:
        this.context.router.push('/calendar'); 
        break;
    default:
        this.context.router.push('/'); 
}
  }

  static contextTypes = {
        router: React.PropTypes.object
  }

  render() {
   
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Home"
            icon={homeIcon}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Log"
            icon={historyIcon}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Calendar"
            icon={dateIcon}
            onTouchTap={() => this.select(2)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default Navigation;
