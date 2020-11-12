import React from 'react'
import { Field, reduxForm } from 'redux-form'
import s from './header.module.css'
const HeaderComponent=(props)=>
{
    const onSubmit=(data)=>
    {
        props.getWeatherData(data.location);
    }
    return(<header className={s.shapka}>
    <div className={s.shapka__firstRow}>   
    <img className={s.shapka__sLogo} 
    src='https://scdn.fwdcdn.com/desc_main/img/sinoptic-logo-x2.png'/>
    <SearchReduxForm onSubmit={onSubmit}/>
    </div>
    <div className={s.shapka__secondRow}>
    <h1 className={s.shapka__City}>Погода в {props.city}</h1>
    <span className={s.shapka__Map}>Map</span>
    </div>    
    </header>    
    )
}


let SearchForm=(props)=>{
    return(<>
        <form className='shapka__formSearch' onSubmit={props.handleSubmit}>
        <Field className='shapka__input' 
        component={'input'}
        name={'location'}
        placeholder='Название населенного пункта,страны или региона'></Field>
        <button className='shapka__submit'>Search</button>
        </form>
    </>
    )
}
const SearchReduxForm=reduxForm({
    form:'searchLocation'
})(SearchForm)
export default HeaderComponent
