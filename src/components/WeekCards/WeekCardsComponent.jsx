import React, { useState } from 'react'
import s from './weekCards.module.css'
import WeekCardsDescription from './WeekCardsDescription/WeekCardsDescription';
const WeekCardsComponent=(props)=>{
    const [activeCard, setActiveCard] = useState(props.cards[0].dayOfWeek);

    return(
    <div className={s.Container}>
    <div className={s.Container_frame}>
        <div className={s.Container__paginationCards}>
        {
        props.cards.map(el=>{return<div key={el.dayOfWeek}>
        <div className={el.dayOfWeek===activeCard?s.Card_active:s.Card} onClick={()=>{
            if(el.description)setActiveCard(el.dayOfWeek)
            else return false}}>
            <span className={s.Card__dayOfWeek}>{el.dayOfWeek}</span>
            <span className={el.dayOfWeek==='Sunday'|| el.dayOfWeek==='Saturday' ? s.Card__dayOf : s.Card__workingDay }>
            {el.day}</span>
            <span className={s.Card__month}>{el.month}</span>
            <div>
                <img className={s.Card__weatherImg} src={el.urlIcon} alt='weatherIcon'></img>
            </div>
           <div  className={s.Card__tempr}>
           <div className={s.Card__temprMin}>       
                    min 
                    <span>{el.min_t>0&&"+"}{el.min_t}°</span>
            </div>
            <div className={s.Card__temprMax}>
                    max 
                    <span>{el.max_t>0&&"+"}{el.max_t}°</span>
            </div>
           </div>
        </div>
        </div>})}
        </div>
        <WeekCardsDescription activeCard={activeCard} 
        description={props.description}
        sunrise={props.cards[0].sunrise}
        sunset={props.cards[0].sunset}
        daysInweek={props.daysInweek}
        arrayOfHeaders={props.arrayOfHeaders}
        />
        </div>
    </div>
)}
export default WeekCardsComponent 