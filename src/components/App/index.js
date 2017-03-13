import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

//Material UI
import {AppBar, IconButton, IconMenu, MenuItem} from 'material-ui';

//Components
import UserTop from './UserTop';
import UserTasks from './UserTasks';

//styles
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import allroundersBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import  './App.css';

//redux
import { connect } from 'react-redux';
//import { startShift } from '../../actions/shiftAction';
import { bindActionCreators } from 'redux';
import store from '../../store'
  

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




class App extends Component {
  render() {
    const { className, ...props } = this.props;
    const muiTheme = getMuiTheme({}, {
      palette: {
        primary1Color: '#005C97',
      }
    });
    const styles = {
      main: {
        overflow: 'scroll !important'
      },
      bottom: {
        position:'fixed !important',
        bottom:'0px !important',
        backgroundColor: '#333'
      },
      mainBox: {
        display: 'flex',
        height: '80vh',
        alignItems: 'center',
        justifyContent: 'center'
      },
      box: {
        margin: '0px !important',
        padding: '0px !important'
      }
    };

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)} >
        <div>
          <UserTop />
          <UserTasks />
        </div>
       </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);