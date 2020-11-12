import * as axios from 'axios'

export const weatherAPI={
    getFiveDays(cityName='Zhytomyr')
    {
        return axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=7208f6ca5ead42e790b6908a55cdc727`)
        .then(response=>
        (axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.results[1].geometry.lat}&lon=${response.data.results[1].geometry.lng}&exclude=minutely,alerts,current&appid=0edd0ebd1ffc098e4d957c67a97375bc`))
        )
    }
   
}