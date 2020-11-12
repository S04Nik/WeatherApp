import React, { Component } from 'react'
import HeaderComponent from './HeaderComponent'
import {GetWeather,InitializeApp} from '../../redux/weather-reducer'
import { connect } from 'react-redux';

class HeaderContainer extends React.Component{
    componentDidMount(){
        
    }
   render(){
    return(
        <HeaderComponent city={this.props.city}
        getWeatherData={this.props.GetWeather}
        InitializeApp={this.props.InitializeApp}
        />
    )
   }
}
let mapStateToProps=(state)=>({
    city:state.weatherPage.cityName,

})

export default connect(mapStateToProps,
    { GetWeather,InitializeApp})(HeaderContainer)