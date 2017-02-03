import React from 'react'
import { connect } from 'react-redux'

import CitiesList from './CitiesList'
import SearchBox from './SearchBox'
import AddCityButton from './AddCityButton'

const mapStateToProps = (state) => {
	return {
		map: state.map,
		place: state.currentPlace,
		addCityButton: state.addCityButton
	}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class WeatherMapApp extends React.Component {

		getWeather() {
			let that = this,
        		pos = {
        			lat: that.props.place.geometry.location.lat(),
        			lng: that.props.place.geometry.location.lng()
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
        		city = that.props.place.name,
        		temp = that.weather.main.temp,
        		hum = that.weather.main.humidity,
        		press = that.weather.main.pressure,
        		html = '<strong>'+city+'</strong><br/>temperature: '+temp+'°C<br/>humidity: '+hum+'%<br>pressure: '+press,
        		infowindow = new google.maps.InfoWindow({
    				content: html,
    				position: that.props.place.geometry.location
				})
				infowindow.open(that.props.map);
        }

        componentDidMount() {
            this.getWeather()
        }

        render() {
            return (
            	<div>
            		<CitiesList/>
            		<SearchBox/>
            		<AddCityButton/>
            	</div>
            )
        }
}

let Out = connect(mapStateToProps,mapDispatchToProps)(WeatherMapApp);

export default Out
