// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';

import { createHashHistory } from 'history'
import RootRoute from './RootRoute';

import './index.css';

//Tap
import tap from 'react-tap-event-plugin';

//redux
import { Provider } from 'react-redux'
import store from './store'

tap();
const app = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
  	<RootRoute />
  	
  </Provider>, app);