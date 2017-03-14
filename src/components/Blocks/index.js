import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import { browserHistory } from 'react-router';


//Material UI
import RaisedButton from 'material-ui/RaisedButton';


//styles
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import allroundersBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import  './Blocks.css';

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
  goToTask = () => {
    browserHistory.push('/');
  }
  render() {
    const { className, ...props } = this.props;
    const muiTheme = getMuiTheme({}, {
      palette: {
        primary1Color: '#005C97',
      }
    });
      
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)} >
        <div>
          <div className="grid">
              <div className="row">
                <div className="square one"><h3 className="word">Word1</h3></div>
                <div className="square two"><h3 className="word">Word3</h3></div>
              </div>
              <div className="row">
                <div className="square two"><h3 className="word">Word1</h3></div>
                <div className="square one"><h3 className="word">Word4</h3></div>
              </div>
              <div className="row">
                <div className="square two"><h3 className="word">Word4</h3></div>
                <div className="square one"><h3 className="word">Word2</h3></div>
              </div>
              <div className="row">
                <div className="square one"><h3 className="word">Word3</h3></div>
                <div className="square two"><h3 className="word">Word2</h3></div>
              </div>
          </div>
          <div className="backBtn">
            <RaisedButton
              label="Back"
              primary={true}
              onTouchTap={this.goToTask}
            />
          </div>
        </div>
       </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);