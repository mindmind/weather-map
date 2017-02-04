import React from 'react'
import { connect } from 'react-redux'

import { changePlace, removeCity, setCurrentInfobox } from '../actions'

import GetInfoBox from '../assets/GetInfoBox'

const mapStateToProps = (state) => {
	return {
		map: state.map,
		currentInfobox: state.currentInfobox
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
  	changePlace : (position,city,map,currentInfobox) => {
  		map.setCenter(position)
  		currentInfobox.close()
  		GetInfoBox(map,city,(answer)=>{
  			dispatch(changePlace(city))
  			dispatch(setCurrentInfobox(answer))
  		})
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
			pos = city.pos
		return (
			<div className="weathermap__cityitem">
				<span className="weathermap__cityselect" onClick={() => {this.props.changePlace(pos,city,this.props.map,this.props.currentInfobox)}}>{city.name}</span>
				<div className="weathermap__cityremove" onClick={() => {this.props.removeCity(city.place_id)}}></div>
			</div>
		)
	}
}

let Out = connect(mapStateToProps,mapDispatchToProps)(CityItem);

export default Out