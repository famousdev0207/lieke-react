import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import { browserHistory } from 'react-router';

//Components
import Word from './Word'
import Frase from './Frase'
import Lifes from './Lifes'
import Topic from './Topic'
import GameDialog from './GameDialog'
import Timer from './Timer'
//Grid
import {Container, Row, Col} from 'react-grid-system'

//Vendor Modules
//import Timer from 'react-timer'


//Material UI
import {RaisedButton} from 'material-ui'


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
  constructor(props) {
    super(props);
    this.state = {
      lifes: 3,
      secondsElapsed: 2
    };
  };

  wordChoose = () => {
    let lifes = this.state.lifes - 1;
    console.log("new lifes " + lifes);
    this.setState({
      lifes: lifes
    })
  };

  tick = () => {
    if ((this.state.secondsElapsed < 30) && (this.state.lifes >=1)) {
      console.log(this.state.secondsElapsed);
      this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    }
    else {
      if (this.state.lifes >=1) {
        let lifes = this.state.lifes - 1;
        this.setState({
          secondsElapsed: 0,
          lifes: lifes
        });
      }
    }
  }

  componentDidMount() {
    if (this.state.lifes >=1) {
      this.interval = setInterval(this.tick, 1000);
    }
  }

  componentWillUnmount() {
    if (this.state.lifes >=1) {
      clearInterval(this.interval);
    }
  }

  render() {
    console.log("render");
    const { className, ...props } = this.props;
    const muiTheme = getMuiTheme({}, {
      palette: {
        primary1Color: '#005C97',
      }
    });

    let OPTIONS = { prefix: 'seconds elapsed!', delay: 100}
      
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)} >
        <div className="mainContainer">

            <Container>
                <Row>
                  <Col md={12} xs={12}>
                    <Lifes lifes={3}/>
                  </Col>
                </Row>
            </Container>
        </div>
       </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);