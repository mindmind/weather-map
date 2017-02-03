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

let initialState = {
					map: null,
					cities: [],
					currentPosition: { lat: 25, lng: 83 }, // Если вдруг не получим текущие координаты пользователя
					currentPlace: null,
}

const getCurrentCoords = () => {
	let options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
    }
    navigator.geolocation.getCurrentPosition((pos) => { 
        		initialState.currentPosition = { lat: pos.coords.latitude, lng: pos.coords.longitude }
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
                    center: initialState.currentPosition,
                    scrollwheel: false,
                    zoom: 8,
                    disableDefaultUI: true,
                    zoomControl: true
                })

		initialState.map = map; //создаем карту и отправлем ее в стейт
		mapIsReady()
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



