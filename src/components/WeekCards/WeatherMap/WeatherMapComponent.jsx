import React from 'react'
import {MapContainer,Marker, Popup, TileLayer } from 'react-leaflet';
import './map.css';
const WeatherMapComponent=(props)=>{
  console.log(true);
 return(
<MapContainer center={[58.505, 28.091]} zoom={13} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  {/* <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker> */}
</MapContainer>


)
}

export default WeatherMapComponent;