import { combineReducers } from 'redux'

import userReducer from './userReducer'
import shiftReducer from './shiftReducer'
import statsReducer from './statsReducer'

export default combineReducers({
	userReducer,
	shiftReducer,
	statsReducer
})