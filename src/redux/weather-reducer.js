import {weatherAPI} from '../api/api.js'
const LOAD_CARDS='LOAD_CARDS'
const LOAD_CARDS_DESCRIPTION='LOAD_CARDS_DESCRIPTION'
const INITIALIZED='INITIALIZED'
const SET_LOCATION_NAME='SET_LOCATION_NAME'
const LOAD_LOCATION='LOAD_LOCATION'
const ADD_MISSED_DESCRIPTION='ADD_MISSED_DESCRIPTION'
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
    CardsDescription:[],
    daysInweek:['Sunday','Monday','Tuesday','Wednesday',
    'Thursday','Friday','Saturday'],
    arrayOfHeaders:[2,5,8,11,13,14,17,20,23]
}

export const weatherReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case LOAD_LOCATION:
            return{...state,Location:{lat: action.cord.lat, lng:action.cord.lng}}
        case LOAD_CARDS:
            return{...state,WeatherCards:[...action.info]};
        case LOAD_CARDS_DESCRIPTION:{
            //Removing <React.StrictMode> fixes the whole thing.
            //BUG DOUBLE CALLING REDUCER =  dataX2
            let tmp=[...state.CardsDescription];
            let TmpTmp=tmp.concat(action.info);
                return{...state,CardsDescription:[...TmpTmp]}
        }
        case ADD_MISSED_DESCRIPTION:
            {
                return{...state,CardsDescription:[...action.info]}
            }
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
export const addMissedDescription=(info)=>({type:ADD_MISSED_DESCRIPTION,info})

const formatDataDaily=(data)=>{
let itr=0;
    return data.map(el=>{
        const months=[ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
        const days=['Sunday','Monday','Tuesday','Wednesday',
        'Thursday','Friday','Saturday'];
        let url=`http://openweathermap.org/img/w/${el.weather[0].icon}.png`;
        let dtEx=new Date(el.dt*1000);
        let sunrise=new Date(el.sunrise*1000);
        let sunset=new Date(el.sunset*1000);
        if(itr===5)
        {
            return {dayOfWeek:days[dtEx.getDay()],
                day:dtEx.getDate(),
                month:months[dtEx.getMonth()],
                min_t: Math.trunc(el.temp.min),
                max_t: Math.trunc(el.temp.max),
                urlIcon:url,
                description:false,
                sunrise:{hours:sunrise.getHours(),minutes:sunrise.getMinutes()},
                sunset:{hours:sunset.getHours(),minutes:sunset.getMinutes()}
            }
        }
        itr++;
        return {dayOfWeek:days[dtEx.getDay()],
                day:dtEx.getDate(),
                month:months[dtEx.getMonth()],
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
        let dtEx=new Date(el.dt*1000);    console.log(dtEx.getHours());
        let offsetAngle=el.wind.deg + degreePerDirection / 2;
        return {hours:dtEx.getHours(),               
                dayOfWeek:days[dtEx.getDay()],
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
                wind_speed:el.wind.speed,
                urlIcon:url
        }
    })
}
const formatMissedData=(data)=>{
    const degreePerDirection = 360 / 8;
    const days=['Sunday','Monday','Tuesday','Wednesday',
        'Thursday','Friday','Saturday'];
    return data.map(el=>{
        let url=`http://openweathermap.org/img/w/${el.weather[0].icon}.png`;
        let dtEx=new Date(el.dt*1000);

        let offsetAngle=el.wind_deg + degreePerDirection / 2;
        return {hours:dtEx.getHours()!==2?dtEx.getHours()+1:dtEx.getHours(),               
                dayOfWeek:days[dtEx.getDay()],
                main_t:Math.trunc(el.temp),
                t_feels_like: Math.trunc(el.feels_like),
                pressure:el.pressure,
                humidity: el.humidity,
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

        // загружаем карточки для пагинации
        weatherAPI.getWeatherForecastDaily(Cord)
        .then(response=>{
            if(response.status===200)
            {
                let formatedData=formatDataDaily(response.data.daily);
                formatedData=formatedData.slice(0,response.data.daily.length-1)
                dispatch(SetPaginationCards(formatedData));


            }else{console.log(`ERROR (weather-reducer) : ${response.status}`)}});
            
            weatherAPI.getHistoryWeatherOfCurrentDay(Cord).then(response=>{
                if(response.status===200)
                { 
                    let result=response.data.hourly.filter(el=>{
                        let TMP=new Date(el.dt*1000);
                        let date=new Date((TMP.toUTCString()));
                        let currentDate=new Date();  

                        if(date.getHours()<currentDate.getHours())
                        {
                            let dtEx=new Date(el.dt*1000);
                            dtEx=dtEx.getHours();
                            console.log(dtEx);
                            if([2,4,7,10,13,16,19,22].includes(dtEx))
                            {

                                return{el}
                            }
                        }             
                    })
                    return formatMissedData(result);
               
            }}).then(response=>{dispatch( addMissedDescription(response))})
            .then(response=>{return weatherAPI.getWeatherForecastHourly(Cord)})
                .then(response=>{
                    if(response.status===200)
                    { 
                        dispatch(SetPaginationCardsDescription(formatDataHourly(response.data.list)));                              
                        dispatch(InitializeApp());
                    }else
                    {console.log(`ERROR (weather-reducer) : ${response.status}`)
                }})   


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