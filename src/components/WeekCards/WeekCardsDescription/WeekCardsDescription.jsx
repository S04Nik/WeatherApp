import React, { useState } from 'react'
import s from '../weekCards.module.css'
import E  from '../../../assets/E.png'
import NE  from '../../../assets/NE.png'
import SE  from '../../../assets/SE.png'
import S  from '../../../assets/S.png'
import W  from '../../../assets/W.png'
import SW  from '../../../assets/SW.png'
import NW  from '../../../assets/NW.png'
import N  from '../../../assets/N.png'


const WeekCardsDescription=(props)=>{
    let [timer,setTimer]=useState(new Date());
    // component didmount / willupdate
    React.useEffect(()=>{
        let timer=setInterval(()=>{tick()},10000);
        return function cleanUp(){
            clearInterval(timer);
        }
    });
    function tick() {
        setTimer(new Date());
       }
    
    let fillTable=(condition)=>{
        let tmp=0;
        return props.description.map(el=>{
        if(el.dayOfWeek===props.activeCard)
        {
            if(props.arrayOfHeaders.includes(el.hours))
            {
                tmp++;
                switch(condition)
                {               
                    case 'hours':{
                        return(<td className={s.table_cell_time} key={`hours ${tmp}`}>
                            { el.hours===13?14:el.hours}:00
                            </td>)
                    }
                    case 'icon':{
                    
                        if(el.hours===timer.getHours()|| el.hours===timer.getHours()-2||
                        el.hours===timer.getHours()-1||el.hours===timer.getHours()+1)
                        {
                            console.log(el.hours+'___________ICON');
                            if(props.daysInweek[timer.getDay()]===el.dayOfWeek)
                            {
                                return (<td className={s.table_cell_CurrentTime} key={`icon ${tmp}`}>
                                    <img className={s.paginationCards__Icon} src={el.urlIcon} alt='weather icon'/>
                                    </td>);
                            }
                        }       return (<td className={s.table_cell}  key={`icon ${tmp}`}>
                                <img className={s.paginationCards__Icon} src={el.urlIcon} alt='weather icon'/>
                                </td>)
                    }
                    case 'main_t':{
                        if(el.hours===timer.getHours()||el.hours===timer.getHours()-2||el.hours===timer.getHours()-1||el.hours===timer.getHours()+1)
                        {
                            if(props.daysInweek[timer.getDay()]===el.dayOfWeek)
                            {
                            return (<td className={`${s.table_cell_CurrentTime} ${s.table_cell_tempr}`}
                             key={`main_t ${tmp}`}>
                                {el.main_t>0&&'+'}{el.main_t}°
                                </td>)
                            }
                        }
                        return(<td className={s.table_cell_tempr}  key={`main_t ${tmp}`}>
                            {el.main_t>0&&'+'}{el.main_t}°
                            </td>)                   
                    }
                    case 't_feels_like':{
                        if(el.hours===timer.getHours()||el.hours===timer.getHours()-2||el.hours===timer.getHours()-1||el.hours===timer.getHours()+1)
                        {
                            if(props.daysInweek[timer.getDay()]===el.dayOfWeek)
                            {
                            return(<td className={s.table_cell_CurrentTime} key={`t_feels_like ${tmp}`}>
                                {el.t_feels_like>0&&"+"}{el.t_feels_like}°
                                </td>)
                            }
                        }
                        return(<td className={s.table_cell} key={`t_feels_like ${tmp}`}>
                            {el.t_feels_like>0&&"+"}{el.t_feels_like}°
                            </td>)
                    }
                    case 'pressure':{
                        if(el.hours===timer.getHours()||el.hours===timer.getHours()-2||el.hours===timer.getHours()-1||el.hours===timer.getHours()+1)
                        {
                            if(props.daysInweek[timer.getDay()]===el.dayOfWeek)
                            {
                            return<td className={s.table_cell_CurrentTime} key={`pressure ${tmp}`}>
                            {el.pressure}
                            </td>
                            }
                        }
                            return<td className={s.table_cell} key={`pressure ${tmp}`}>
                            {el.pressure}
                            </td>                 
                    }
                    case 'humidity':{
                        if(el.hours===timer.getHours()||el.hours===timer.getHours()-2||el.hours===timer.getHours()-1||el.hours===timer.getHours()+1)
                        {
                            if(props.daysInweek[timer.getDay()]===el.dayOfWeek)
                            {
                            return<td className={s.table_cell_CurrentTime} key={`humidity ${tmp}`}>
                            {el.humidity}
                            </td>
                            }
                        }
                            return<td className={s.table_cell} key={`humidity ${tmp}`}>
                            {el.humidity}
                            </td>                    
                    }
                    case 'wind_speed':{
                        if(el.hours===timer.getHours()||el.hours===timer.getHours()-2||el.hours===timer.getHours()-1||el.hours===timer.getHours()+1)
                        {
                            if(props.daysInweek[timer.getDay()]===el.dayOfWeek)
                            {    
                            return<td className={s.table_cell_CurrentTime} key={`wind_speed ${tmp}`}>
                            {el.wind_speed}
                            </td>
                            }
                        }
                            return<td className={s.table_cell} key={`wind_speed ${tmp}`}>
                            {el.wind_speed}
                            </td>
                    }
                    case 'wind_direction':{
                        if(el.hours===timer.getHours()||el.hours===timer.getHours()-2||el.hours===timer.getHours()-1||el.hours===timer.getHours()+1)
                        {
                            if(props.daysInweek[timer.getDay()]===el.dayOfWeek)
                            { 
                            return<td className={s.table_cell_CurrentTime} key={`wind_direction ${tmp}`}>
                            <img className={s.DescriptionTsble_windDirection}
                            src={el.wind_direction==='N'?N:el.wind_direction==='NE'?NE:
                            el.wind_direction==='NW'?NW:el.wind_direction==='S'?S:
                            el.wind_direction==='E'?E:el.wind_direction==='W'?W:
                            el.wind_direction==='SE'?SE:el.wind_direction==='SW'?SW:null} alt='direction icon'></img>                     
                            </td>
                            }
                        }
                            return<td className={s.table_cell} key={`wind_direction ${tmp}`}>
                            <img className={s.DescriptionTsble_windDirection}
                            src={el.wind_direction==='N'?N:el.wind_direction==='NE'?NE:
                            el.wind_direction==='NW'?NW:el.wind_direction==='S'?S:
                            el.wind_direction==='E'?E:el.wind_direction==='W'?W:
                            el.wind_direction==='SE'?SE:el.wind_direction==='SW'?SW:null} alt='direction icon'></img>
                            </td>
                    }
                    default : return null
                }
            }
        }})
    }
return(<>{
    props.activeCard&&<div className={s.WeatherDescription}>
    <div className={s.leftSide__Container}>
    <div className={s.leftSide}>
    <div className={s.leftSide_time }>
    <span className={s.leftSide_spanSmall}>
    Погода сегодня в <span className={s.leftSide_spanBig}>
    {timer.getMinutes()>=10?timer.getHours() +':'+ timer.getMinutes():
    timer.getHours() +':0'+ timer.getMinutes()}</span>
    </span>
    </div>
        
        <div className={s.leftSide_sunGoes}>
        <span  className={s.leftSide_spanSmall}>Восход<p className={s.leftSide_spanBig }> {props.sunrise.hours+':'}{props.sunrise.minutes}</p></span> 
        <span className={s.leftSide_spanSmall}>Закат<p  className={s.leftSide_spanBig }> {props.sunset.hours+':'}{props.sunset.minutes}</p></span> 
        </div>
    
    </div>
    </div>

    <div className={s.WeatherDescription__Container}>
    <div className={s.Description__titles}>
               <p className={s.Descr_Title}>Температура, °C</p>
               <p  className={s.Descr_Title}>чувствуется как</p>
               <p  className={s.Descr_Title}>Давление, мм</p>
               <p  className={s.Descr_Title}>Влажность, %</p>
               <p  className={s.Descr_Title}>Ветер, м/сек</p>
           </div>
    <table>
        <thead>
            <tr>
            {fillTable('hours')}
            </tr>
            </thead>
        <tbody>
            <tr className={s.DescriprionTable_str}>
            {fillTable('icon')}
            </tr>
            <tr className={s.DescriprionTable_str}>
            {fillTable('main_t')}
            </tr>
            <tr className={s.DescriprionTable_str}>
            {fillTable('t_feels_like')}
            </tr>
            <tr className={s.DescriprionTable_str}>
            {fillTable('pressure')}
            </tr>
            <tr className={s.DescriprionTable_str}>
            {fillTable('humidity')}
            </tr>
            <tr className={s.DescriprionTable_str}>
            {fillTable('wind_speed')}                        
            </tr>
            <tr className={s.DescriprionTable_str}>
            {fillTable('wind_direction')}                    
            </tr>     
        </tbody>
    </table>          
    </div>
    </div>
}
</>)}

export default WeekCardsDescription