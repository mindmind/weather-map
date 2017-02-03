import React from 'react'
import { connect } from 'react-redux'

import CityItem from './CityItem'

const mapStateToProps = (state) => {
  return {
  	cities: state.cities
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class CitiesList extends React.Component {
	render() {
		return (
      <div className="weathermap__citieslist">
			{this.props.cities.map(city => 
                <CityItem key={city.place_id} city={city}></CityItem>
            )}
      </div>
		)
	}
}

let Out = connect(mapStateToProps,mapDispatchToProps)(CitiesList);

export default Out