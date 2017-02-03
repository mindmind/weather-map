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
