export function postnordUpdate(postnord) {
            return {
				type: "POSTNORD_UPDATE",
				payload: postnord
			}
}
export function bringUpdate(bring) {
            return {
				type: "BRING_UPDATE",
				payload: bring
			}
}
export function innightUpdate(innight) {
            return {
				type: "INNIGHT_UPDATE",
				payload: innight
			}
}
export function endShift(data) {
			const config = {
			    method: 'POST',
			    headers: {
			      'Content-Type': 'application/json',
			      Accept: 'application/json',
			    },
			    body: JSON.stringify(creds),
			  };
            return {
				type: "INNIGHT_UPDATE",
				payload: innight
			}
}