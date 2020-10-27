const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=340823cbf780dce6954aa9826330396b&query=' + latitude +',' + longitude + '&units=f'
    request({url : url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if(response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
               weatherDescription : response.body.current.weather_descriptions[0],
               temperature: response.body.current.temperature,
               feelslike: response.body.current.feelslike 
            })
        }
    })
}

module.exports = forecast