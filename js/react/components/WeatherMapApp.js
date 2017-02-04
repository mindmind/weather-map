import React from 'react'
import { connect } from 'react-redux'

import CitiesList from './CitiesList'
import SearchBox from './SearchBox'
import AddCityButton from './AddCityButton'

const mapStateToProps = (state) => {
	return {
		cities: state.cities,
		currentPlace: state.currentPlace
	}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class WeatherMapApp extends React.Component {

		componentDidUpdate(){
			localStorage.cities = JSON.stringify(this.props.cities)
			let currentPlace4Local = this.props.currentPlace
			currentPlace4Local.infobox = null
			localStorage.currentPlace = JSON.stringify(currentPlace4Local)
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
