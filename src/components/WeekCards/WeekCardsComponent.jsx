import React, { useState } from 'react'
import s from './weekCards.module.css'
const WeekCardsComponent=(props)=>{
    const [activeCard, setActiveCard] = useState(1);
    return(
    <div className={s.MainBlock}>
        <div className={s.paginationCards}>

        {props.cards.map(el=>{return<>
        <div className={s.paginationCards__Card} onClick={()=>setActiveCard(el.paginationNumber)}>
            <span>{el.dayOfWeek}</span>
            <span className={el.dayOfWeek==='Sunday' && s.dayOf|| el.dayOfWeek==='Saturday' && s.dayOf}>
            {el.day}</span>
            <span>{el.month}</span>
            <div>
                <img className={s.paginationCards__Icon} src={el.urlIcon} alt='weatherIcon'></img>
            </div>

           <div  className={s.paginationCards__TemprMain}>
           <div className={s.paginationCards__Tempr}>       
                    min 
                    <span>{el.min_temp>0&&"+"}{el.min_temp}°</span>

            </div>
            <div className={s.paginationCards__Tempr}>       
                    max 
                    <span>{el.min_temp>0&&"+"}{el.max_temp}°</span>
            </div>
           </div>
        </div>
        </>})}
        </div>
        {
            activeCard&&<div className={s.WeatherDescription}>
           <div className={s.Description_titles}>
               <p>Температура, °C</p>
               <p>чувствуется как</p>
               <p>Давление, мм</p>
               <p>Влажность, %</p>
               <p>Ветер, м/сек</p>
           </div>
               <table className={s.WeatherDescription__Table}>
                   <thead>
                   <tr>
                    {             
                        props.cards[activeCard-1].description.map(el=>{
                            return<td className={s.table_cell}>
                            { el.time}:00
                            </td>
                        })
                    }
                    </tr>
                   </thead>
                   <tbody>
                   <tr>
                       {
                        props.cards[activeCard-1].description.map(el=>{
                            return<td className={s.table_cell}>
                               <img className={s.paginationCards__Icon} src={ el.urlIcon}/>
                            </td>
                        })
                       }
                    </tr>
                    <tr>
                        {
                            props.cards[activeCard-1].description.map(el=>{
                            return<td className={s.table_cell}>
                                {el.t_main>0&&'+'}{el.t_main}°
                            </td>
                        })
                        }
                    </tr>
                    <tr>
                        {
                            props.cards[activeCard-1].description.map(el=>{
                            return<td className={s.table_cell}>
                            {el.t_feels_like>0&&"+"}{el.t_feels_like}°
                            </td>
                        })
                        }
                    </tr>
                    <tr>
                        {
                            props.cards[activeCard-1].description.map(el=>{
                            return<td className={s.table_cell}>
                              {el.pressure}
                            </td>})
                        }
                    </tr>
                    <tr>
                        {
                            props.cards[activeCard-1].description.map(el=>{
                            return<td className={s.table_cell}>
                              {el.humidity}
                            </td>})
                        }
                    </tr>
                    <tr>
                        {
                            props.cards[activeCard-1].description.map(el=>{
                            return<td className={s.table_cell}>
                                {el.wind.speed}                              
                            </td>
                        })
                        }
                    </tr>
                    <tr>
                        {
                            props.cards[activeCard-1].description.map(el=>{
                            return<td className={s.table_cell}>
                                {el.wind.direction}                              
                            </td>
                        })
                        }
                    </tr>
                   </tbody>
               </table>
            </div>
        }

    </div>
)}
export default WeekCardsComponent 