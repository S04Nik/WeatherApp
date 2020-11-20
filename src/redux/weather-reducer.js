import {weatherAPI} from '../api/api.js'
const LOAD_CARDS='LOAD_CARDS'
const LOAD_CARDS_DESCRIPTION='LOAD_CARDS_DESCRIPTION'
const INITIALIZED='INITIALIZED'
const SET_LOCATION_NAME='SET_LOCATION_NAME'
const LOAD_LOCATION='LOAD_LOCATION'
// const FORMATING_DATA='FORMATING_DATA'
let initialState={
   Initialized:false,
   LocationName:{city:null,country:null},
   Location:0,
   WeatherCards:[
    {dayOfWeek:null,
    day:null,
    month:null,
    min_t: null,
    max_t: null,
    urlIcon:null
    }],
    CardsDescription:[{}]
}

export const weatherReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case LOAD_LOCATION:
            return{...state,Location:{lat: action.cord.lat, lng:action.cord.lng}}
        case LOAD_CARDS:
            return{...state,WeatherCards:[...action.info]};
        case LOAD_CARDS_DESCRIPTION:
            return{...state,CardsDescription:[...action.info]}
        case SET_LOCATION_NAME:
            return{...state,LocationName:{...action.Name}}
        case INITIALIZED:
            return{...state,Initialized:true}

            default:return state;
    }   
}
export default weatherReducer;
export const SetPaginationCards=(info)=>({type:LOAD_CARDS,info})
export const InitializeApp=()=>({type:INITIALIZED})
export const SetLocationName=(Name)=>({type:SET_LOCATION_NAME,Name})
export const SetPaginationCardsDescription=(info)=>({type:LOAD_CARDS_DESCRIPTION,info})
export const SetCoordinates=(cord)=>({type:LOAD_LOCATION,cord})

const formatDataDaily=(data)=>{
let itr=0;
    return data.map(el=>{
        const months=[ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];
        const days=['Sunday','Monday','Tuesday','Wednesday',
        'Thursday','Friday','Saturday'];
        let url=`http://openweathermap.org/img/w/${el.weather[0].icon}.png`;
        let dateExample=new Date(el.dt*1000);
        let sunrise=new Date(el.sunrise*1000);
        let sunset=new Date(el.sunset*1000);
        if(itr===5)
        {
            return {dayOfWeek:days[dateExample.getDay()],
                day:dateExample.getDate(),
                month:months[dateExample.getMonth()+1],
                min_t: Math.trunc(el.temp.min),
                max_t: Math.trunc(el.temp.max),
                urlIcon:url,
                description:false,
                sunrise:{hours:sunrise.getHours(),minutes:sunrise.getMinutes()},
                sunset:{hours:sunset.getHours(),minutes:sunset.getMinutes()}
            }
        }
        itr++;
        return {dayOfWeek:days[dateExample.getDay()],
                day:dateExample.getDate(),
                month:months[dateExample.getMonth()+1],
                min_t: Math.trunc(el.temp.min),
                max_t: Math.trunc(el.temp.max),
                urlIcon:url,
                description:true,
                sunrise:{hours:sunrise.getHours(),minutes:sunrise.getMinutes()},
                sunset:{hours:sunset.getHours(),minutes:sunset.getMinutes()}
            }
    })
}
const formatDataHourly=(data)=>{
    const degreePerDirection = 360 / 8;
    const days=['Sunday','Monday','Tuesday','Wednesday',
        'Thursday','Friday','Saturday'];
    return data.map(el=>{
        let url=`http://openweathermap.org/img/w/${el.weather[0].icon}.png`;
        let dateExample=new Date(el.dt*1000);
        let offsetAngle=el.wind_deg + degreePerDirection / 2;
        return {hours:dateExample.getHours(),               
                dayOfWeek:days[dateExample.getDay()],
                main_t:Math.trunc(el.main.temp),
                t_feels_like: Math.trunc(el.main.feels_like),
                pressure:el.main.pressure,
                humidity: el.main.humidity,
                description:el.weather[0].description,
                wind_direction:(offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection) ? "N"
                : (offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection) ? "NE"
                  : (offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection) ? "E"
                    : (offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection) ? "SE"
                      : (offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection) ? "S"
                        : (offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection) ? "SW"
                          : (offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection) ? "W"
                            : "NW",
                wind_speed:el.wind_speed,
                urlIcon:url
                }
    })
}

export const GetWeatherByCoord=(Cord)=>{
    return(dispatch)=>{
        weatherAPI.getWeatherForecastDaily(Cord)
        .then(response=>{
            if(response.status===200)
            {
                let formatedData=formatDataDaily(response.data.daily);
                formatedData=formatedData.slice(0,response.data.daily.length-1)
                // dispatch(SetCityName());
                dispatch(SetPaginationCards(formatedData));

            }else
            {console.log(`ERROR (weather-reducer) : ${response.status}`)}})
            weatherAPI.getWeatherForecastHourly(Cord)
            .then(response=>{
                if(response.status===200)
                {
                dispatch(SetPaginationCardsDescription(formatDataHourly(response.data.list)));
                dispatch(InitializeApp());
                }else
                {console.log(`ERROR (weather-reducer) : ${response.status}`)
            }
        })

}}
export const setLocationData=(Cord)=>{
    return(dispatch)=>{
        weatherAPI.getCityName(Cord)
        .then(response=>{
            if(!response.data.results[0].components.city)
            {
                dispatch(SetLocationName({city:response.data.results[0].components.state,
                    country:response.data.results[0].components.country}));
            }else
            dispatch(SetLocationName({city:response.data.results[0].components.city,
                country:response.data.results[0].components.country}))});
        dispatch(SetCoordinates(Cord));
    }

}