import React from 'react'
import { connect } from 'react-redux'

import { saveCity } from '../actions'

const mapStateToProps = (state) => {
  return {
  	currentPlace: state.currentPlace,
  	showButton: state.cities.every((city)=>{
  		return city.place_id != state.currentPlace.place_id
  	})
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  	saveCity: (city) => {
  		dispatch(saveCity(city))
  	}
  }
}

class AddCityButton extends React.Component {
	render() {
		return (
			<button className="weathermap__addcity" onClick={() => this.props.saveCity(this.props.currentPlace)} style={{display:this.props.showButton ? 'block' : 'none'}}>Add City</button>
		)
	}
}

let Out = connect(mapStateToProps,mapDispatchToProps)(AddCityButton);

export default Out