export function startShift(reg, reitti, user, startTime) {
        
            return {
				type: "START_SHIFT",
				payload: {
					id: 1,
					reg: reg,
					reitti: reitti,
					user: user,
					startTime: startTime,
					endTime: '',
				}
			}
}
export function finnishShift(endTime) {
        
            return {
				type: "END_SHIFT",
				payload: {
					id: 1,
					endTime: endTime,
				}
			}
}