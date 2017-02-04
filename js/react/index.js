import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose } from 'redux'

import map from './reducers/map'
import cities from './reducers/cities'
import currentPlace from './reducers/currentPlace'
import currentInfobox from './reducers/currentInfobox'
import inputValue from './reducers/inputValue'

import WeatherMapApp from './components/WeatherMapApp'

import GoogleMapApi from './assets/GoogleMapApi'
import GetInfoBox from './assets/GetInfoBox'

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
					cities: 'cities' in localStorage ? JSON.parse(localStorage.cities) : [],
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
  						initialState.currentPlace = {
  							place_id : googleItem.place_id,
  							name: googleItem.name,
  							pos: {
  								lat: googleItem.geometry.location.lat(),
  								lng: googleItem.geometry.location.lng()
  							}
  						}
  					}
  				})
  			})

  			GetInfoBox(initialState.map,initialState.currentPlace,mapIsReady);

  		})

  	})

}

const mapIsReady = (answer) => { //После того как получили карту

	let infowindow = answer

	initialState.currentInfobox = infowindow
	initialState.currentPlace.infobox = infowindow

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

if ('currentPlace' in localStorage) {
	currentPosition = JSON.parse(localStorage.currentPlace).pos //если в localStorage сохранены координаты последнего просмотренного города
	gotCoords()
} else { // если нет, то
	getCurrentCoords() //Получаем текущие координаты пользователя
}




