const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=d59287bcdcb8e1ceb7be66a60527916d&query='+latitude + ',' + longitude +'&units=f'
    request({  url, "json": true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if(body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
        
            callback(undefined,body.current.weather_descriptions + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.feelslike + '% chance of rain.')
        }
    })
}

module.exports = forecast;