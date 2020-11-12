import {weatherAPI} from '../api/api.js'
const LOAD_INFO='LOAD_INFO'
const INITIALIZED='INITIALIZED'
const SET_CITY_NAME='SET_CITY_NAME'
// const FORMATING_DATA='FORMATING_DATA'
let initialState={
   Initialized:false,
   cityName:null,
   weatherInfo:{
    0:{dayOfWeek:null,
    day:null,
    month:null,
    min_t: null,
    max_t: null,
    t_feels_like: null,
    pressure:null,
    humidity: null,
    description:null,
    wind:null},
    size:0
    }
   
}

export const weatherReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case LOAD_INFO:
            return{...state,weatherInfo:{...action.info},Initialized:true};
        case SET_CITY_NAME:
            return{...state,cityName:action.Name}
        case INITIALIZED:
            return{...state,Initialized:true}

            default:return state;
    }   
}
export default weatherReducer;
export const SetWeatherInfo=(info)=>({type:LOAD_INFO,info})
export const InitializeApp=()=>({type:INITIALIZED})
export const SetCityName=(Name)=>({type:SET_CITY_NAME,Name})
// export const FormatData=(newData)=>({type:FORMATING_DATA,newData})


const formatData=(data)=>{

    return data.list.map(el=>{
        const months=[ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];
        const days=['Sunday','Monday','Tuesday','Wednesday',
        'Thursday','Friday','Saturday']
        let url=`http://openweathermap.org/img/w/${el.weather[0].icon}.png`;
        let dateExample=new Date(el.dt_txt);
        let dOw=dateExample.getDay();

        return {dayOfWeek:days[dOw],
                day:dateExample.getDate(),
                month:months[dateExample.getMonth()+1],
                time:dateExample.getHours(),
                main_t:Math.trunc(el.main.temp),
                min_t: Math.trunc(el.main.temp_max),
                max_t: Math.trunc(el.main.temp_min),
                t_feels_like: Math.trunc(el.main.feels_like),
                pressure:el.main.pressure,
                humidity: el.main.humidity,
                description:el.weather[0].description,
                wind:el.wind,
                urlIcon:url
                }
    })
}

export const GetWeather=(cityName)=>{
    return(dispatch)=>{
        dispatch(SetCityName(cityName));
        weatherAPI.getFiveDays(cityName)
        .then(response=>{
            if(response.status===200)
            {
                let formatedData=formatData(response.data);
                formatedData.size=response.data.cnt
                dispatch(SetWeatherInfo(formatedData));
            }else
            {console.log("faild")}
        })
    }  
    }