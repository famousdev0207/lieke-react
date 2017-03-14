import React, { PropTypes, Component } from 'react';

import {AppBar, IconButton, IconMenu, MenuItem} from 'material-ui';
import classnames from 'classnames';

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
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

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
            title={<img src={LogoImg} className="logo"/>}
          >
            <Notifications />
          </AppBar>
          <TopBar />
      
          <div className="cards">
              <StudentCard />

              <GameCard />

          </div>
         
        </div>
       </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);