import React from 'react'
import s from '../weekCards.module.css'
const WeekCardsDescription=(props)=>{
    const [Sstyle,setStyle]=React.useState();
    const arrayOfHeaders=[2,5,8,11,14,17,20,23];
    const time=new Date();
    let fillTable=(condition)=>{
        
        return props.description.map(el=>{
        if(el.dayOfWeek===props.activeCard)
        {
            if(arrayOfHeaders.includes(el.hours))
            {
                switch(condition)
                {
                    // придумать как выделять колонки . css не подойдет
                    case 'hours':{
                        return(<td className={s.table_cell_time}>
                            { el.hours}:00
                            </td>)
                    }
                    case 'icon':{
                        return (<td className={s.table_cell}>
                            <img className={s.paginationCards__Icon} src={el.urlIcon} alt='weather icon'/>
                            </td>)
                    }
                    case 'main_t':{
                        return(<td className={s.table_cell_tempr}>
                            {el.main_t>0&&'+'}{el.main_t}°
                            </td>)
                    }
                    case 't_feels_like':{
                        return(<td className={s.table_cell}>
                            {el.t_feels_like>0&&"+"}{el.t_feels_like}°
                            </td>)
                    }
                    case 'pressure':{
                        return<td className={s.table_cell}>
                        {el.pressure}
                        </td>
                    }
                    case 'humidity':{
                        return<td className={s.table_cell}>
                        {el.humidity}
                        </td>
                    }
                    case 'wind_speed':{
                        return<td className={s.table_cell}>
                        {el.wind_speed}
                        </td>
                    }
                    case 'wind_direction':{
                        return<td className={s.table_cell}>
                        {el.wind_direction}
                        </td>
                    }
                    default : return null
                }
            }
        }

        })
    }
    setTimeout(()=>{
        let tmp;
        if(props.description[0].main_t<0)
        {
            tmp=60-(props.description[0].main_t*1.5);
        }else
        if(props.description[0].main_t>=0)
        {
            tmp=60+(props.description[0].main_t*1.5);
        }
        const NewStyle={
            position:'absolute',
            left: '54px',
            bottom: '95px',
            'min-width': '12px',
            'min-height': `${tmp}px`,
            'max-height': `${tmp}px`,
            'background-color':'rgb(189, 14, 14)',
            'z-index': '-1'
        }
        setStyle(NewStyle);
    },5000)
return(<>{
    props.activeCard&&<div className={s.WeatherDescription}>
    <div className={s.leftSide__Container}>
    <div className={s.leftSide}>
    <div className={s.Thermometr}>
    <div className={s.Thermometr_marks}>
        <p className={s.Thermometr_mark}>40__</p>
        <p className={s.Thermometr_mark}>20__</p>
        <p className={s.Thermometr_mark}>0___</p>
        <p className={s.Thermometr_mark}>20__</p>
        <p className={s.Thermometr_mark}>40__</p>
        </div>
        <img className={s.Thermometr_img} src='https://pngimg.com/uploads/thermometer/thermometer_PNG35.png'></img>
        <div  className={s.Thermometr_Liquid}></div>
        <div  className={s.Thermometr_Liquid} style={Sstyle}></div>

    </div>
        {/* <span className={s.leftSide_time }>Погода сегодня в {time.getHours() +':'+ time.getMinutes()}</span> */}
        <div className={s.leftSide_sunGoes}>
        <span>Восход<span>: {props.sunrise.hours+':'}{props.sunrise.minutes} |</span></span> 
        <span>| Закат<span>: {props.sunset.hours+':'}{props.sunset.minutes}</span></span> 
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