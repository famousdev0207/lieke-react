import React, { PropTypes, Component } from 'react'
import { browserHistory } from 'react-router';

//styles
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress';
//redux
import { connect } from 'react-redux';
import { userLogin } from '../../actions/userAction';
import { bindActionCreators } from 'redux';
import store from '../../store'



import createBrowserHistory from 'history/lib/createBrowserHistory'

import classnames from 'classnames'
import './Login.css'
import Logo from '../../images/logo.png'


function mapStateToProps(state) {
  return {
    user: state.userReducer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      userLogin: (a) => { dispatch(userLogin(a)) }
  }
}


function Loading(props) {
  let isLogging = props.isLogging;
  if (isLogging == true) {
    return <CircularProgress size={90} thickness={7} />;
  }
  return <div>
              <TextField
                hintText="Login" 
                value={this.state.userName} 
              />
              <br/>
              <TextField
                hintText="Password"  
              />
        </div>;
}

class Login extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      userName: '',
      loading: false,
      height: window.innerHeight
    }
    this.handleChange = this.handleChange.bind(this);
  }
  static contextTypes = {
        router: React.PropTypes.object
  }

  handleChange(event) {
    this.setState({userName: event.target.value});
  }

  logger() {
    console.log(this.props.user);
  }
  userLogin(e) {
     e.preventDefault()
    this.props.userLogin(this.state.userName);
    this.setState({loading: true});
    let that = this;
    if (this.state.userName == "admin") {
        setTimeout(function(){
           browserHistory.push('/admin');
        }, 1000);
    }
    else {
        setTimeout(function(){
           browserHistory.push('/');
        }, 1000);
    }
   
}


  render() {
    console.log(this.props);
    const muiTheme = getMuiTheme({}, {
      palette: {
        primary1Color: '#005C97',
        textColor: '#fff'
      }
    });
    const { className, ...props } = this.props;
    const styles = {
      card: {
        textAlign: 'center',
        postion: 'fixed',
        top: 0,
        left: 0,
        paddingTop: '30vh',
        height: this.state.height,
        overflow: 'hidden',
        color: "#fff"
      },
      fff: {
        color: "#fff"
      },
      hint: {
        color: "rgba(255,255,255,0.3)"
      }
    };
    
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)} >
        <Card style={styles.card}  zDepth={0} className="loginCard">
          
          
            <img src={Logo} className="logoLogin"/>
          <form onSubmit={this.userLogin.bind(this)}>
            {this.state.loading ? <CircularProgress size={40} thickness={7} color={'#fff'}/> : ''}
            <CardText>
              <div>
                  <TextField
                    hintText="Login" 
                    value={this.state.userName} 
                    onChange={this.handleChange}
                    className="loginInput"
                    hintStyle={styles.hint}
                  />
                  <br/>
                  <TextField
                    hintText="Password"  
                    type="password"
                    className="loginInput"
                    hintStyle={styles.hint}
                  />
            </div>

            </CardText>
            <CardActions>
              <FlatButton type="submit" label="Login" className="loginBtn"/>
            </CardActions>
          </form>
        </Card>

        
        
        
       </MuiThemeProvider>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);