import React from 'react'
import { connect } from 'react-redux';
import WeekCardsComponent from './WeekCardsComponent';
import {SetCoordinates,GetWeatherByCoord,setLocationData} from './../../redux/weather-reducer'
class WeekCardsContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={firstConnection:false}
    }
    componentDidMount(){
        if ("geolocation" in navigator) {
            getLocation(this.props.SetCoordinates,this.props.setLocationData);
            function getLocation(SetCord,setLocationName){ 
                return navigator.geolocation.getCurrentPosition(function(position) {
                    setLocationName({lat:position.coords.latitude,lng:position.coords.longitude});
                    SetCord({lat:position.coords.latitude,lng:position.coords.longitude})});
             }

        }
    }
    shouldComponentUpdate(nextProps,nextState){
        if(this.props.location!==nextProps.location&&this.state.firstConnection===false)
        {
            this.props.GetWeatherByCoord(nextProps.location);
            this.setState({firstConnection:true})
            return true;
        }else
        if(nextProps!==this.props)
        {
            return true;
        }else
        if(nextState!==this.state)
        {
            return true;
        }
        return false

    }
    render(){
        if(this.props.initialized===true && this.props.weatherCards!==null)
        return(<>
        <WeekCardsComponent cards={this.props.weatherCards}
         description={this.props.cardsDescription}
         daysInweek={this.props.daysInweek}
         arrayOfHeaders={this.props.arrayOfHeaders}
         />
        </>)
        else
        return(<></>)
    }
}
let mapStateToProps=(state)=>({
    initialized:state.weatherPage.Initialized,
    weatherCards:state.weatherPage.WeatherCards,
    cardsDescription:state.weatherPage.CardsDescription,
    location:state.weatherPage.Location,
    arrayOfHeaders:state.weatherPage.arrayOfHeaders,
    daysInweek:state.weatherPage.daysInweek
})

export default connect(mapStateToProps,
    {SetCoordinates,GetWeatherByCoord,setLocationData})(WeekCardsContainer)