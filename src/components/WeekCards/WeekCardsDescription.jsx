import React from 'react'
import s from './weekCards.module.css'
const WeekCardsDescription=(props)=>{
    let changecolumns=(props,direction='forward')=>
    {
        let backItr=0,forwardItr=0;
        // требуется рефакторинг . много повторов кода
        return(<>
        <tr>
            {
             props.description.map(el=>{
                if(el.dayOfWeek===props.activeCard)
                if(el.hours%2)
                if(direction==='back')
                {backItr++;
                return<td className={s.table_cell}>
                <img className={s.paginationCards__Icon} src={ el.urlIcon}/>
                </td> }
                else
                if(direction==='forward')
                {
                    forwardItr++;
                    return<td className={s.table_cell}>
                    <img className={s.paginationCards__Icon} src={ el.urlIcon}/>
                    </td>
                   
                }
             })                        
            }
         </tr>
         {/* <tr>
            {
            props.description.map(el=>{
            if(el.dayOfWeek===props.activeCard)
            if(el.hours%2)
            return<td className={s.table_cell}>
            {el.main_t>0&&'+'}{el.main_t}°
            </td>
            })                           
            }
        </tr>
        <tr>
        { props.description.map(el=>{
        if(el.dayOfWeek===props.activeCard)
        if(el.hours%2)
        return<td className={s.table_cell}>
        {el.t_feels_like>0&&"+"}{el.t_feels_like}°
        </td>
        })                               
        }
        </tr>
        <tr>
        { props.description.map(el=>{
            if(el.dayOfWeek===props.activeCard)
            if(el.hours%2)
            return<td className={s.table_cell}>
            {el.pressure}
            </td>
        })                               
        }
        </tr>
        <tr>
        { props.description.map(el=>{
            if(el.dayOfWeek===props.activeCard)
            if(el.hours%2)
            return<td className={s.table_cell}>
            {el.humidity}
            </td>})}
        </tr>
        <tr>
        { props.description.map(el=>{
            if(el.dayOfWeek===props.activeCard)
            if(el.hours%2)
            return<td className={s.table_cell}>
            {el.wind_speed}  
            </td>})}                        
        </tr>
        <tr>
            { props.description.map(el=>{
                if(el.dayOfWeek===props.activeCard)
                if(el.hours%2)
                return<td className={s.table_cell}>
                {el.wind_direction}    
                </td>})}                    
        </tr>      */}
         </>)
         
    }
    return(
        <>{
            props.activeCard&&<div className={s.WeatherDescription}>

           <div className={s.Description_titles}>
               <p>Температура, °C</p>
               <p>чувствуется как</p>
               <p>Давление, мм</p>
               <p>Влажность, %</p>
               <p>Ветер, м/сек</p>
           </div>
           <div className={s.WeatherDescription__scrollable}>
           <table className={'table table-striped'+s.WeatherDescription__Table}>
                   <thead>
                   <tr>
                    {             
                        props.description.map(el=>{
                            if(el.dayOfWeek===props.activeCard)
                            if(el.hours%2)
                            return<td className={s.table_cell}>
                            { el.hours} : 00
                            </td>
                        })
                    }
                    </tr>
                   </thead>
                   <tbody>
                  { changecolumns(props)}
                   </tbody>
               </table>          
           </div>
            <button onClick={changecolumns}>{'>'}</button>

        </div>
        }</>
)}
export default WeekCardsDescription