import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import map from './reducers/map'
import cities from './reducers/cities'
import currentPlace from './reducers/currentPlace'
import currentInfobox from './reducers/currentInfobox'
import inputValue from './reducers/inputValue'

import WeatherMapApp from './components/WeatherMapApp'

import GoogleMapApi from './assets/GoogleMapApi'

const reducer = combineReducers({
  map,
  cities,
  currentPlace,
  currentInfobox,
  inputValue
});

let currentPosition = { lat: 25.18, lng: 83 } //если пользователь запретит доступ к его геолокации

let weather = null

let initialState = {
					map: null,
					cities: [],
					currentPlace: null,
					currentInfobox: null,
					inputValue: 'find city'
}

const getCurrentCoords = () => {
	let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }
    navigator.geolocation.getCurrentPosition((pos) => { 
        		currentPosition = { lat: pos.coords.latitude, lng: pos.coords.longitude }
            	gotCoords()
            }, (err) => { 
            	console.warn('ERROR: ' + err)
            	gotCoords() //если не получили текущие координаты все равно продолжаем
            }, options)
}

const gotCoords = () => { //После того как получили координаты

	GoogleMapApi(() => { // Подгружаем GoogleMaps API
		let google = window.google,
			map = new google.maps.Map(document.getElementById('map'), {
                    center: currentPosition,
                    scrollwheel: false,
                    zoom: 8,
                    disableDefaultUI: true,
                    zoomControl: true
                })
		initialState.map = map; //создаем карту и отправлем ее в стейт

		let	service = new google.maps.places.PlacesService(initialState.map),
			googleLatLng = new google.maps.LatLng(currentPosition.lat,currentPosition.lng),
			request = {
		    	location: googleLatLng,
		    	radius: '1'
			}

  		service.nearbySearch(request, (answer)=>{
  			answer.forEach((googleItem)=>{
  				googleItem.types.forEach((googleType)=>{
  					if(googleType == 'locality') {
  						initialState.currentPlace = googleItem
  					}
  				})
  			})

  			getWeather()

  		})

  		const getWeather = () => {
			let pos = {
        			lat: initialState.currentPlace.geometry.location.lat(),
        			lng: initialState.currentPlace.geometry.location.lng()
        		},	
        		url = 'http://api.openweathermap.org/data/2.5/weather?lat='+pos.lat+'&lon='+pos.lng+'&units=metric&appid=bd9421558322b6d233924c2c619282a8'
            fetch(url)
            .then(function(response) {
                    return response.json()
                }).then(function(data) {
                	weather = data
                	getInfoWindow()
                })
         }

        const getInfoWindow = () => {
        	let google = window.google,
        		city = initialState.currentPlace.name,
        		temp = weather.main.temp,
        		hum = weather.main.humidity,
        		press = weather.main.pressure,
        		html = '<strong>'+city+'</strong><br/>temperature: '+temp+'°C<br/>humidity: '+hum+'%<br>pressure: '+press,
        		infowindow = new google.maps.InfoWindow({
    				content: html,
    				position: initialState.currentPlace.geometry.location
				})
				infowindow.open(initialState.map)
				initialState.currentInfobox = infowindow
				initialState.currentPlace.infobox = infowindow

				mapIsReady()
        }

    })

}

const mapIsReady = () => { //После того как получили карту
	const store = createStore(reducer,initialState)

	const mainRender = () => {
		console.log('State');
		console.log('--------------');
		console.log(store.getState());
		render(
			<Provider store={store}>
			    <WeatherMapApp/>
			</Provider>
			,
			document.getElementById('root')
		)
		
	}

	store.subscribe(mainRender)
	mainRender()
}

getCurrentCoords() //Получаем текущие координаты пользователя



