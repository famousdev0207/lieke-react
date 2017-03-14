import React from 'react';

//notifications 
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import {deepOrange50, deepOrange900, deepOrange500} from 'material-ui/styles/colors';
import {IconButton, IconMenu, MenuItem} from 'material-ui';

//redux
import { connect } from 'react-redux';
import { userLogin } from '../../actions/userAction';
import { bindActionCreators } from 'redux';
import store from '../../store'



const style = {
	color: deepOrange50,
	backgroundColor: deepOrange900,
	top: 12, 
	right: 12,

};


function mapStateToProps(state) {
  return {
  	
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      //userLogin: (a) => { dispatch(userLogin(a)) }
  }
}



class UserTop extends React.Component {
	
  pushView() {
		this.context.router.push('/notifications');
	}	

  static contextTypes = {
        router: React.PropTypes.object
  }

  render() {
    return (
    	<IconButton onTouchTap={() => this.pushView()} style={{ padding: 0 }}>
	              <Badge
	                badgeStyle={{ top: 12, right: 12, backgroundColor:  deepOrange900 }}
	                badgeContent={3}
	                secondary={true}
	                >
	                <NotificationsIcon color={deepOrange50} />
	              </Badge>
	    </IconButton>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTop);