import React from 'react'
import { connect } from 'react-redux'

import { saveCity } from '../actions'

const mapStateToProps = (state) => {
  return {
  	currentPlace: state.currentPlace
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
			<button className="weathermap__addcity" onClick={() => this.props.saveCity(this.props.currentPlace)}>Add City</button>
		)
	}
}

let Out = connect(mapStateToProps,mapDispatchToProps)(AddCityButton);

export default Out