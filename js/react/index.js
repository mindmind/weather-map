import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import cities from './reducers/cities'

import WeatherMapApp from './components/WeatherMapApp'

const reducer = combineReducers({
  cities
});

let initialState = {cities: []}
	
const store = createStore(reducer,initialState);

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

store.subscribe(mainRender);
mainRender();



