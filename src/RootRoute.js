import React from 'react';
import { Router, Route, browserHistory, hashHistory, useRouterHistory, createHistory } from 'react-router';

import App from './components/App';
import Game from './components/Game';
import Blocks from './components/Blocks';
import Admin from './components/Admin';
import Login from './components/Login';
import Teacher from './components/Teacher';

//redux
//import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux'
import { connect } from 'react-redux';
import store from './store';


function mapStateToProps(state) {
  return {
    user: state.userReducer

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      
  }
}

class RootRoute extends React.Component {

  render() {
    function requireAuth(nextState, replace) {
        
        //DEVELOPMENT MODE, GOES STRAIGHT TO APP, UNCOMMENT STATMENT BELOW FOR PRODUCTION

      if (!this.props.user.logged) {
        replace({
          pathname: '/login'
        })
      }
    }
    function requireAuthAdmin(nextState, replace) {
        //DEVELOPMENT MODE, GOES STRAIGHT TO APP, UNCOMMENT STATMENT BELOW FOR PRODUCTION
      /*if ((!this.props.user.logged) || (this.props.user.user.name !== "admin")) {
        replace({
          pathname: '/login'
        })
      }*/
    }
    return (
      <Router history={browserHistory}>
          <Route path="/aaa" component={App} onEnter={requireAuth.bind(this)}/>
          <Route path="/login" component={Login} />
          <Route path="/game" component={Game} onEnter={requireAuth.bind(this)} />
          <Route path="/" component={Blocks} />
          <Route path="/home" component={Teacher} />
          <Route path="/admin" component={Admin} onEnter={requireAuthAdmin.bind(this)} />
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootRoute);