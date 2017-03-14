import React from 'react';

//Material UI elements
import Paper from 'material-ui/Paper';

//Gauge
import Gauge from 'react-svg-gauge';

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



class Score extends React.Component {
	
  	
    
  render() {
    return (
   		<Paper zDepth={0} className="userCard">
		    
      </Paper>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Score);