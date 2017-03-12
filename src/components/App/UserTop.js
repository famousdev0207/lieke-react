import React from 'react';

//Material UI elements
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

//Images
import UserImg from '../../images/max.jpg';

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
		    <Avatar
	          src={UserImg}
	          size={150}
	        />
	        <h3 className="userName">Max Prokopenko</h3>
		</Paper>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTop);