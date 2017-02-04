import React from 'react'
import { connect } from 'react-redux'

import { changePlace, setCurrentInfobox, setInputValue } from '../actions'

import GetInfoBox from '../assets/GetInfoBox'

const mapStateToProps = (state) => {
	return {
		map: state.map,
		cities: state.cities,
		currentInfobox: state.currentInfobox,
		inputValue: state.inputValue
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
  	changePlace : (place,infobox) => {
  		dispatch(changePlace(place))
  		dispatch(setCurrentInfobox(infobox))
  		dispatch(setInputValue(''))
  	},
  	changeText : (event) => {
  		dispatch(setInputValue(event.target.value))
  	},
  	cancel: () => {
  		dispatch(setInputValue(''))
  	}
  }
}

class SearchBox extends React.Component {

	componentDidMount(){
		let that = this,
			google = window.google,
			$input = document.getElementById('searchbox'),
			searchBox = new google.maps.places.Autocomplete($input,{types: ['(cities)']})
  		searchBox.addListener('place_changed', function() {
  			let newPlace = searchBox.getPlace()
  				that.newPlace = {
  					place_id : newPlace.place_id,
  					name: newPlace.name,
  					pos: {
  						lat: newPlace.geometry.location.lat(),
  						lng: newPlace.geometry.location.lng()
  					}
  				}
			GetInfoBox(that.props.map,that.newPlace,(answer)=>{
				let infowindow = answer
				that.newPlace.infobox = infowindow
				that.props.currentInfobox.close()
				that.props.changePlace(that.newPlace,infowindow)
				that.props.map.setCenter(that.newPlace.pos)
				infowindow.open(that.props.map)
			})
		})
	}

	render(){
		return (
			<input className="weathermap__searchbox" id="searchbox" placeholder="find city" onChange={this.props.changeText} value={this.props.inputValue} onFocus={this.props.cancel} />
		)
	}
}

let Out = connect(mapStateToProps,mapDispatchToProps)(SearchBox);

export default Out