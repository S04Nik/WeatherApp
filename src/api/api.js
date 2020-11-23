import * as axios from 'axios'

export const weatherAPI={
    async getWeatherForecastDaily(data)
    {

        return await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lng}&exclude=minutely,alerts,current&units=metric&appid=0edd0ebd1ffc098e4d957c67a97375bc`);

    },
    async getWeatherForecastHourly(data)
    {
        return await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.lng}&units=metric&appid=0edd0ebd1ffc098e4d957c67a97375bc`);
    },
    async getCityName(Cord){
        return await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${Cord.lat}+${Cord.lng}&key=7208f6ca5ead42e790b6908a55cdc727`)
    },
    async getHistoryWeatherOfCurrentDay(data) // need to pay money 
    {
        const now = new Date();

        now.setHours(2,0,0);
        const timeStamp=(Math.round(now.getTime() / 1000));
        console.log(timeStamp);
        //${Math.floor(Date.now() / 1000)}
        return await axios.get( `https://api.openweathermap.org/data/2.5/onecall/timemachine?&units=metric&exclude=current&lat=${data.lat}&lon=${data.lng}&dt=${Math.round(now.getTime() / 1000)}&appid=0edd0ebd1ffc098e4d957c67a97375bc`)
   //    `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${data.lat}&lon=${data.lng}&dt=${Math.floor(Date.now() / 1000)}&appid=0edd0ebd1ffc098e4d957c67a97375bc`)
    }
}

// https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=17.575957&lon=0.439453&dt=1605830400&appid=0edd0ebd1ffc098e4d957c67a97375bc