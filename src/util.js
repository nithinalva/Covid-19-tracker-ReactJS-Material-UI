import { Circle,Popup } from "react-leaflet"; //important
import numeral from 'numeral'
import React from 'react'

const changeColors={

    cases: {
        hex: "#CC1034",
        // rgb: "rgb(204, 16, 52)",
        // half_op: "rgba(204, 16, 52, 0.5)",      //opacity for the border (optional)
        multiplier: 800,
      },
      recovered: {
        hex: "#7dd71d",
        // rgb: "rgb(125, 215, 29)",

        multiplier: 1200,
      },
      deaths: {
        hex: "#fb4443",
        // rgb: "rgb(251, 68, 67)",
      
        multiplier: 2000,   //size of the circle 
      },    

};

export const sortData=(data)=>
{
    const sortedData=[...data];
    sortedData.sort((a,b)=>{
        if(a.cases>b.cases){
            return -1
        }else{
            return 1
        }
      
    })
    return sortedData;
}


export const showDataOnMap=(data,casesTypes='cases')=>

data.map((country,index )=>(
    <Circle key={index}  center={[country.countryInfo.lat, country.countryInfo.long]}
    color={changeColors[casesTypes].hex} 
    fillColor={changeColors[casesTypes].hex}     fillOpacity={0.4}  radius={
        Math.sqrt(country[casesTypes]) * changeColors[casesTypes].multiplier
      }> 
      <Popup>
        <div className="info">
            <div className="info__flag" style={{backgroundImage:`url(${country.countryInfo.flag})`}}></div>
            <div className="info__country">{country.country}</div>
            <div className="info__confirmed">Confirmed: {numeral(country.cases).format("0,0")}</div>
            <div className="info__recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
            <div className="info__deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
        </div>
           
        </Popup>
    </Circle>  //colour,fill colour,center,gradient
))
    