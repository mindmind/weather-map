import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import map from './reducers/map'
import cities from './reducers/cities'
import currentPlace from './reducers/currentPlace'

import WeatherMapApp from './components/WeatherMapApp'

import GoogleMapApi from './assets/GoogleMapApi'

const reducer = combineReducers({
  map,
  cities,
  currentPlace
});

let currentPosition = { lat: 25.18, lng: 83 } //если пользователь запретит доступ к его геолокации

let initialState = {
					map: null,
					cities: [],
					currentPlace: null
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
                }),
			service = new google.maps.places.PlacesService(map),
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
  			initialState.map = map; //создаем карту и отправлем ее в стейт
			mapIsReady()
  		})

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



