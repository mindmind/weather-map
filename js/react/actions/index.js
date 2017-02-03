export const changePlace = (place) => {
  return {
    type: 'CHANGE_PLACE',
    place
  }
}

export const saveCity = (city) => {
  return {
    type: 'SAVE_CITY',
    city
  }
}

export const removeCity = (_id) => {
  return {
    type: 'REMOVE_CITY',
    _id
  }
}

export const setCurrentInfobox = (infobox) => {
  return {
    type: 'SET_CURRENT_INFOBOX',
    infobox
  }
}

export const setInputValue = (value) => {
  return {
    type: 'SET_INPUT_VALUE',
    value
  }
}