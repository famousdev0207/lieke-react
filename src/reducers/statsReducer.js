export default function reducer(state={
	hash: 1,
	postnord: {
		jaot: 0,
		noudot: 0,
		tunt: 0,
		jakam: 0,
	},
	bring: {
		jaot: 0,
		noudot: 0,
		dhl: 0,
		jakam: 0,
	},
	innight: {
		kollit: 0,
		stopit: 0,
	}
}, action) {
	switch (action.type) {
		case "POSTNORD_UPDATE": {
			return {
				...state,
				postnord: action.payload
			}
		}
		case "BRING_UPDATE": {
			return {
				...state,
				bring: action.payload
			}
		}
		case "INNIGHT_UPDATE": {
			return {
				...state,
				innight: action.payload
			}
		}
		default:
     		return state
	}	
}