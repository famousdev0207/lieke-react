export function userLogin(userName) {
        
            return {
				type: "USER_LOGIN_FULFILLED",
				payload: {
					id: 1,
					name: userName,
				}
			}
}