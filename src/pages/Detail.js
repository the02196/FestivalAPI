import React from 'react'
import { useLocation } from 'react-router-dom'
import { styled } from 'styled-components';
import { Map, MapMarker, Roadview } from 'react-kakao-maps-sdk'

function Detail() {
  const location = useLocation();
  const data = location.state;
  console.log(location)
  return (
    <>
      <h3>{data.TITLE}</h3>
      <img src={data.MAIN_IMG_NORMAL} alt={data.TITLE} title={data.TITLE}></img>
      
      <Map center={
        {
          lat: data.LAT,
          lng: data.LNG
        }
      } style={{width: "100%", height: "360px"}}>
        <MapMarker position={
            {
              lat: data.LAT,
              lng: data.LNG
            }
        }>
        </MapMarker>
      </Map>
      <Roadview style={{width: "100%", height: "360px"}} position={  {
          lat: data.LAT,
          lng: data.LNG,
          radius: 50
        }}></Roadview>
      
      <p style={{textAlign: "justify", width: "500px", lineHeight: 2}}>{data.ITEMCNTNTS}</p>
    </>
  )
}

export default Detail