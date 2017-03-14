import React from 'react';

import CountUp from 'react-countup';

//Material UI elements
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

//Images
import UserImg from '../../images/max.jpg';
import LogoImg from '../../images/logo.png';

//redux
import { connect } from 'react-redux';
import { userLogin } from '../../actions/userAction';
import { bindActionCreators } from 'redux';
import store from '../../store'



function mapStateToProps(state) {
  return {
    user: state.userReducer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      //userLogin: (a) => { dispatch(userLogin(a)) }
  }
}



class UserTop extends React.Component {
	
  	
    
  render() {
    return (
   		<Paper zDepth={1} className="userCard">
        <div className="logoMain">
          <img src={LogoImg} className="logo"/>
        </div>
		    <Avatar
	          src={UserImg}
	          size={150}
            className="avatar"
	        />
	        <h3 className="userName">Max Prokopenko</h3>
          <h1> <CountUp start={0} end={195} /> </h1>
          <p className="score"> MY SCORE </p>
		</Paper>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTop);