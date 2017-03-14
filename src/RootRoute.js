import React from 'react';
import { Router, Route, browserHistory, hashHistory, useRouterHistory, createHistory } from 'react-router';

import App from './components/App';
import Game from './components/Game';
import Blocks from './components/Blocks';
import Admin from './components/Admin';


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
    return (
      <Router history={browserHistory}>
          <Route path="/" component={App} />
          <Route path="/game" component={Game} />
          <Route path="/blocks" component={Blocks} />
          <Route path="/admin" component={Admin} />
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootRoute);