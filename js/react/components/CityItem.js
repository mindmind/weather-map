import React from 'react'
import { connect } from 'react-redux'

import { changePlace, removeCity } from '../actions'

const mapStateToProps = (state) => {
	return {
		map: state.map
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
  	changePlace : (position,city,map) => {
  		map.setCenter(position)
  		dispatch(changePlace(city))
  	},
  	removeCity : (city_id) => {
  		dispatch(removeCity(city_id))
  	}
  }
}

class CityItem extends React.Component {
	render() {
		let city = this.props.city,
			id = city.place_id,
			pos = city.geometry.location
		return (
			<div className="weathermap__cityitem">
				<span className="weathermap__cityselect" onClick={() => {this.props.changePlace(pos,city,this.props.map)}}>{city.name}</span>
				<div className="weathermap__cityremove" onClick={() => {this.props.removeCity(city.place_id)}}></div>
			</div>
		)
	}
}

let Out = connect(mapStateToProps,mapDispatchToProps)(CityItem);

export default Out