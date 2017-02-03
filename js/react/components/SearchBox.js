import React from 'react'
import { connect } from 'react-redux'

import { changePlace } from '../actions'

const mapStateToProps = (state) => {
	return {
		map: state.map
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
  	changePlace : (place) => {
  		dispatch(changePlace(place))
  	}
  }
}

class SearchBox extends React.Component {

	componentDidMount(){
		let that = this,
			google = window.google,
			$input = document.getElementById('searchbox'),
			searchBox = new google.maps.places.SearchBox($input)
  		searchBox.addListener('places_changed', function() {
  			let newPlace = searchBox.getPlaces()[0],
  				newPosition = newPlace.geometry.location,
  				html = 'ляляля',
        		infowindow = new google.maps.InfoWindow({
    				content: html,
    				position: newPosition
				})
				that.props.changePlace(newPlace)
				that.props.map.setCenter(newPosition)
				infowindow.open(that.props.map)
		})

	}

	render(){
		return (
			<input className="weathermap__searchbox" id="searchbox" placeholder="find city" />
		)
	}
}

let Out = connect(mapStateToProps,mapDispatchToProps)(SearchBox);

export default Out