import React, { useState } from 'react'
import s from './header.module.css'
import PlacesAutocomplete from 'react-places-autocomplete';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

let HeaderComponent=(props)=>
{
    const [address,setAddress]=useState('');
    const reduxSelect=(value)=>
    {
        let handleSelect=props.handleSelect;
        handleSelect(value);
        setAddress('');
    }
    const reduxSubmit=(value)=>
    {
        let handleSubmit=props.handleSubmit;
        handleSubmit(value);
        setAddress('');
    }
    const reduxChange=(value)=>
    {
         props.handleChange(value);
        setAddress(value);
    }

    return(<header className={s.shapka}>
    <div className={s.shapka__container}>
    <div className={s.firstRow}>
    <NavLink to={'/WeatherMain'}> 
    <img className={s.firstRow__sLogo} 
    src='https://scdn.fwdcdn.com/desc_main/img/sinoptic-logo-x2.png' alt='LOGO'/></NavLink>  
    <SearchForm value={address} 
    handleSelect={reduxSelect}
    onSubmit={reduxSubmit}
    handleChange={reduxChange}
    reduxChange={reduxChange}
    />
    </div>
    <div className={s.secondRow}>
    {props.locationName!==undefined&&
    <h1 className={s.secondRow__City}>{props.locationName.city},{props.locationName.country}</h1>}
    <span className={s.secondRow__Map}><NavLink to={'/WeatherMap'}>
    <img className={s.secondRow__MapIcon} src='https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-512.png' alt={'icon'}/></NavLink></span>
    </div>
    </div>    
    </header>    
    )
}

let SearchForm=(props)=>{
    return(<>
        <form className={s.firstRow__formSearch} onSubmit={props.handleSubmit}>
        <PlacesAutocomplete value={props.value} 
        onChange={props.handleChange}
        onClick={props.handleSelect} 
        onSelect={props.handleSelect}> 
        {({ getInputProps, suggestions, getSuggestionItemProps, loading })=>
        <div className={s.firstRow__searchArea}>
        <input value={props.value}
        component={'input'}
        name={'location'}
        className={s.firstRow__input}
        onChange={props.handleChange}
        {...getInputProps({placeholder: 'Search Places ...'})}></input>
        <div className={s.firstRow__allSuggestions}>
        {loading?<div className={s.firstRow__inputSugestion}>...loading</div>:null} 
        {suggestions.map((suggestion)=>{

            return <div className={suggestion.active?s.firstRow__inputSugestion_active:s.firstRow__inputSugestion}
            {...getSuggestionItemProps(suggestion)}>
            <span>{suggestion.description}</span>
            </div>
        })}
    </div>
    </div>}
    </PlacesAutocomplete>
        <button className={s.firstRow__submit}>
        <img className={s.firstRow__submiticon} src='https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_search_48px-512.png' alt='search'/></button>
        </form>
    </>
    )
}

// let SearchReduxForm=reduxForm({
//     form:'searchLocation',
// })(SearchForm)

HeaderComponent = connect(state => {
    return{}
    // const hasLocation = selector(state, 'location')
    // return {hasLocation, enableReinitialize: true}
  })(HeaderComponent)
  

export default HeaderComponent