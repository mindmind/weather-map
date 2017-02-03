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

	getWeather() {
			let that = this,
        		pos = {
        			lat: that.newPlace.geometry.location.lat(),
        			lng: that.newPlace.geometry.location.lng()
        		},	
        		url = 'http://api.openweathermap.org/data/2.5/weather?lat='+pos.lat+'&lon='+pos.lng+'&units=metric&appid=bd9421558322b6d233924c2c619282a8'
            fetch(url)
            .then(function(response) {
                    return response.json()
                }).then(function(data) {
                	that.weather = data
                	that.getInfoWindow()
                })
         }

    getInfoWindow() {
        	let that = this,
        		google = window.google,
        		city = that.newPlace.name,
        		temp = that.weather.main.temp,
        		hum = that.weather.main.humidity,
        		press = that.weather.main.pressure,
        		html = '<strong>'+city+'</strong><br/>temperature: '+temp+'°C<br/>humidity: '+hum+'%<br>pressure: '+press,
        		infowindow = new google.maps.InfoWindow({
    				content: html,
    				position: that.newPlace.geometry.location
				})
				that.props.changePlace(that.newPlace)
				that.props.map.setCenter(that.newPlace.geometry.location)
				infowindow.open(that.props.map);
    }

	componentDidMount(){
		let that = this,
			google = window.google,
			$input = document.getElementById('searchbox'),
			searchBox = new google.maps.places.SearchBox($input)
  		searchBox.addListener('places_changed', function() {
  			that.newPlace = searchBox.getPlaces()[0]
			that.getWeather()
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