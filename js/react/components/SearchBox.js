import React from 'react'
import { connect } from 'react-redux'

import { changePlace, setCurrentInfobox, setInputValue } from '../actions'

const mapStateToProps = (state) => {
	return {
		map: state.map,
		cities: state.cities,
		currentInfobox: state.currentInfobox,
		inputValue: state.inputValue
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
  	changePlace : (place,infobox) => {
  		dispatch(changePlace(place))
  		dispatch(setCurrentInfobox(infobox))
  		dispatch(setInputValue(''))
  	},
  	changeText : (event) => {
  		dispatch(setInputValue(event.target.value))
  	},
  	cancel: () => {
  		dispatch(setInputValue(''))
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
			that.newPlace.infobox = infowindow
			that.props.currentInfobox.close()
			that.props.changePlace(that.newPlace,infowindow)
			that.props.map.setCenter(that.newPlace.geometry.location)
			infowindow.open(that.props.map)
	}

	componentDidMount(){
		let that = this,
			google = window.google,
			$input = document.getElementById('searchbox'),
			searchBox = new google.maps.places.Autocomplete($input,{types: ['(cities)']})
  		searchBox.addListener('place_changed', function() {
  			that.newPlace = searchBox.getPlace()
			that.getWeather()
		})
	}

	render(){
		return (
			<input className="weathermap__searchbox" id="searchbox" placeholder="find city" onChange={this.props.changeText} value={this.props.inputValue} onFocus={this.props.cancel} />
		)
	}
}

let Out = connect(mapStateToProps,mapDispatchToProps)(SearchBox);

export default Out