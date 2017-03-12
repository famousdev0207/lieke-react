export default function reducer(state={
	shift: {
		id: null,
		reg: null,
		reitti: null,
		user: '',
		startTime: '',
		endTime: '',
	},
	started: false,
	finnished: false,
}, action) {
	switch (action.type) {
		case "START_SHIFT": {
			return {
				...state,
				shift: action.payload,
				started: true,
				finnished: false,
			}
		}
		case "END_SHIFT": {
			let shift = state.shift;
			shift.endTime = action.payload.endTime;
			return {
				...state,
				shift: shift,
				started: false,
				finnished: true,
			}
		}

		default:
     		return state
	}	
}