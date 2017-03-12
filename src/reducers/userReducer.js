export default function reducer(state={
	user: {
		id: null,
		name: '',
	},
	logging: false,
	logged: false,
}, action) {
	switch (action.type) {
		case "USER_LOGIN": {
			return {...state, logging:true}
		}
		case "USER_LOGIN_REJECTED": {
			return {...state, logging:false, error: action.payload}
		}
		case "USER_LOGIN_FULFILLED": {
			return {
				...state,
				user: action.payload,
				logging:false,
				logged: true,
			}
		}
		default:
     		return state
	}	
}