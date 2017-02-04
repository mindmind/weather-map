import 'whatwg-fetch'

const GetInfoBox = (map,place,callback) => {
  let weather = null

  const getWeather = () => {
      let pos = place.pos,  
            url = 'http://api.openweathermap.org/data/2.5/weather?lat='+pos.lat+'&lon='+pos.lng+'&units=metric&appid=bd9421558322b6d233924c2c619282a8'
            fetch(url)
            .then(function(response) {
                    return response.json()
                }).then(function(data) {
                  weather = data
                  getInfoWindow()
                })
         }

  const getInfoWindow = () => {
          let google = window.google,
            city = place.name,
            temp = weather.main.temp,
            hum = weather.main.humidity,
            press = weather.main.pressure,
            html = '<strong style="display:block;margin-bottom:-10px;">'+city+'</strong><br/>temperature: '+temp+'°C<br/>humidity: '+hum+'%<br>pressure: '+press,
            infowindow = new google.maps.InfoWindow({
            content: html,
            position: place.pos
        })
        infowindow.open(map)
        callback(infowindow)
        }

  getWeather()

}

export default GetInfoBox