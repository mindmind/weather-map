const cities = (state = [], action) => {
	switch (action.type) {
		case 'SAVE_CITY':
			return state.concat(action.city)
		case 'REMOVE_CITY':
			return state.filter((city)=>{
					return city.place_id != action._id
				})
		default:
			return state;
	}
};

export default cities