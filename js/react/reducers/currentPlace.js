const currentPlace = (state = null, action) => {
	switch (action.type) {
		case 'CHANGE_PLACE':
			return action.place
		default:
			return state;
	}
};

export default currentPlace