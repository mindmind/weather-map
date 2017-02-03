const currentInfobox = (state = null, action) => {
	switch (action.type) {
		case 'SET_CURRENT_INFOBOX':
			return action.infobox
		default:
			return state;
	}
};

export default currentInfobox