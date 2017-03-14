import React, { PropTypes, Component } from 'react';

import {AppBar, IconButton, IconMenu, MenuItem} from 'material-ui';
import classnames from 'classnames';
import Drawer from 'material-ui/Drawer';


//Comoponents
import Navigation from './Navigation';
import Notifications from './Notifications';
import TopBar from './TopBar'
import StudentCard from './StudentCard'
import GameCard from './GameCard'
import ChartCard from './ChartCard'

//styles
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import store from '../../store'


//style 
import './Admin.css';
//Images
import LogoImg from '../../images/logo.png';


function mapStateToProps(state) {
  return {
    shift: state.shiftReducer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      //startShift: (a) => { dispatch(startShift(a)) }
  }
}

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});

  render() {
    const muiTheme = getMuiTheme({}, {
      palette: {
        primary1Color: '#005C97',
      }
    });
    const { className, ...props } = this.props;
    const styles = {
      main: {
        overflow: 'hidden !inportant'
      },
    };

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)} >
        <div style={styles.main}>
          <AppBar
            onLeftIconButtonTouchTap={this.handleToggle}
            title={<img src={LogoImg} className="logoAdmin"/>}
          >
            <Notifications />
          </AppBar>
          <TopBar />
      
          <div className="cards">
              <StudentCard />

              <GameCard />

          </div>

          <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
            <MenuItem>Menu Item</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
          </Drawer>
         
        </div>
       </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);