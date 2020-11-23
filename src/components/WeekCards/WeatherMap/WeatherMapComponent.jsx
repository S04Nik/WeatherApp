import React from 'react'
import {MapContainer,Marker, Popup, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';
import './map.css';
class WeatherMapComponent extends React.Component{
    render(){
      if(this.props.location)
      {
        return<>
        <MapContainer className='leaflet-container'
        center={[this.props.location.lat, this.props.location.lng]} 
        zoom={10} 
        scrollWheelZoom={true}>   
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        
          <Marker position={[this.props.location.lat, this.props.location.lng]}>
            <Popup>
            <div>
            <img className='PopUp' src={this.props.weatherCard.urlIcon}></img>
              <span className='PopUp'>min:{this.props.weatherCard.min_t} max:{this.props.weatherCard.max_t}</span>
            </div>
             
            </Popup>
          </Marker>
        </MapContainer>
        </>
      }else
      return<></>

    }


}
let mapStateToProps=(state)=>({
    location:state.weatherPage.Location,
    weatherCard:state.weatherPage.WeatherCards[0]
})
let WeatherMapComponentRedux=connect(mapStateToProps,{})(WeatherMapComponent)

export default WeatherMapComponentRedux;