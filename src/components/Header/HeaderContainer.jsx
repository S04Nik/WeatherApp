import React from 'react'
import HeaderComponent from './HeaderComponent'
import {InitializeApp,setLocationData} from '../../redux/weather-reducer'
import { connect } from 'react-redux';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';


class HeaderContainer extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={ adress:''};
       
    }
     handleSelect=async value=>{
        this.state.adress=value;
        geocodeByAddress(value)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) =>{
        this.props.setLocationData({ lat, lng })
   
        });
   
        // props.SetCityName(value);
    }
    handleSubmit=async data=>{
        this.state.address=data.location
         geocodeByAddress(data.location)
         .then(results=>getLatLng(results[0]))
         .then(result=>this.props.setLocationData(result))
         .then(data=>console.log(data));
        // props.SetCityName(data.location);
    }
    handleChange = address => {
        this.setState({ address });};

    shouldComponentUpdate(nextProps,nextState){

    if(nextProps!==this.props)
    {
        return true;
    }else
    if(nextProps.locationName!==this.props.locationName)
    {
        return true;
    }
    return false
    }
   render(){
       console.log('render',this.props.locationName)
    return(
        <HeaderComponent locationName={this.props.locationName}
        InitializeApp={this.props.InitializeApp}
        location={this.props.location}
        handleSelect={this.handleSelect.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        handleChange={this.handleChange.bind(this)}
        address={this.state.adress}
        setAddress={this.setState.bind(this)}
        />
    )
   }
}
let mapStateToProps=(state)=>({
    locationName:state.weatherPage.LocationName,
    location:state.weatherPage.location
})

export default connect(mapStateToProps,
{InitializeApp,setLocationData})(HeaderContainer)