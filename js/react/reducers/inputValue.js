const inputValue = (state = 'find city', action) => {
	switch (action.type) {
		case 'SET_INPUT_VALUE':
			return action.value
		default:
			return state;
	}
};

export default inputValue