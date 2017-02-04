import loadScript from 'load-script'

const HOST = 'https://maps.googleapis.com/maps/api/js'
const KEY = 'AIzaSyAEm-OBT3TV_eMxfcFErrFEJ4Z_cVWe4eQ'
const URL = `${HOST}?key=${KEY}&language=en&region=GB&libraries=places`

const GoogleMapApi = (
  success = () => {},
  error = () => {}
) => {
  if (window.google) {
    success()
  } else {
    loadScript(URL, (err,script) => {
      const callback = err ? error : success
      callback(script)
    })
  }
}

export default GoogleMapApi