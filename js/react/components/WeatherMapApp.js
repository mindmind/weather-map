import React from 'react'

import CitiesList from './CitiesList'
import SearchBox from './SearchBox'
import AddCityButton from './AddCityButton'

class WeatherMapApp extends React.Component {

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

export default WeatherMapApp
