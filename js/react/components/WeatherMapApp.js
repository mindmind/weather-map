import React from 'react'
import Promise from 'bluebird'

import GoogleMapApi from './GoogleMapApi'

class WeatherMapApp extends React.Component {

		getCurrentCoords() {
            let options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
            navigator.geolocation.getCurrentPosition((pos) => { 
            	this.coords = pos.coords
            	this.getMap()
            }, (err) => { console.warn('ERROR: ' + err) }, options);
        }

        getMap() {
            GoogleMapApi(() => {
                let google = window.google
                let map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: this.coords.latitude, lng: this.coords.longitude },
                    scrollwheel: false,
                    zoom: 8
                })
                this.getWeather()
            })

        }

        getWeather() {
            fetch('http://api.openweathermap.org/data/2.5/weather?lat='+this.coords.latitude+'&lon='+this.coords.longitude+'&appid=bd9421558322b6d233924c2c619282a8')
            .then(function(response) {
                    return response.json()
                }).then(function(data) {
                	let temp = data.main.temp-273.15
                    console.log(data)
                    alert('Температура: '+temp);
                })
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
