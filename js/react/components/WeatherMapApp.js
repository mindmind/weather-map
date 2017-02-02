import React from 'react'
import Promise from 'bluebird'

import GoogleMapApi from './GoogleMapApi'

class WeatherMapApp extends React.Component {

		getCurrentCoords() {
			let that = this,
            	options = {
                	enableHighAccuracy: false,
                	timeout: 5000,
                	maximumAge: 0
            	}
            navigator.geolocation.getCurrentPosition((pos) => { 
            	that.coords = pos.coords
            	that.getMap()
            }, (err) => { console.warn('ERROR: ' + err) }, options);
        }

        getMap() {
        	let that = this
            GoogleMapApi(() => {
                let google = window.google
                that.position = { lat: that.coords.latitude, lng: that.coords.longitude }
                that.map = new google.maps.Map(document.getElementById('map'), {
                    center: that.position,
                    scrollwheel: false,
                    zoom: 8,
                    disableDefaultUI: true,
                    zoomControl: true
                })
                console.log(that.position)
                that.getWeather()
            })

        }

        getWeather() {
        	let that = this
            fetch('http://api.openweathermap.org/data/2.5/weather?lat='+this.coords.latitude+'&lon='+this.coords.longitude+'&appid=bd9421558322b6d233924c2c619282a8')
            .then(function(response) {
                    return response.json()
                }).then(function(data) {
                	that.weather = data
                	console.log(data)
                	that.getInfoWindow()
                })
        }

        getInfoWindow() {
        	let that = this,
        		google = window.google,
        		city = that.weather.name,
        		temp = that.weather.main.temp-273.15,
        		hum = that.weather.main.humidity,
        		press = that.weather.main.pressure,
        		html = '<strong>'+city+'</strong><br/>temperature: '+temp+'°C<br/>humidity: '+hum+'%<br>pressure: '+press,
        		infowindow = new google.maps.InfoWindow({
    				content: html,
    				position: that.position
				})
				infowindow.open(that.map);
        }

        componentDidMount() {
            this.getCurrentCoords();
        }

        render() {
            return ( < div id = "map"
                style = {
                    { height: '100%' }
                } > HelloWorld! < /div>)
            }
        }

        export default WeatherMapApp
