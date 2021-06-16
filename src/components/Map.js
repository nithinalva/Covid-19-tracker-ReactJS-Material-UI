import React,{useEffect} from "react";
import { Map as LeafletMap, TileLayer, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import '../style/Map.css'
import { showDataOnMap } from "../util";
export const  Map = ({center ,zoom,countries,casesTypes}) => {


  
return (
    
<div className="map">


    <LeafletMap center={center} zoom={zoom} >
        <TileLayer  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>

       
    {showDataOnMap(countries,casesTypes)}
    </LeafletMap>
    
</div>

)
}