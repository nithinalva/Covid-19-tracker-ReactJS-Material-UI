import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import {Line} from 'react-chartjs-2'
import numeral from "numeral";
const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };
  const buildcharData=(data,casesType="cases")=>{

    let charData=[];
    let lastDataPoint;
    for(let date in data.cases){
        if(lastDataPoint){
            let newDataPoint={
                x:date,
                y:data[casesType][date]-lastDataPoint
            }
 
            charData.push(newDataPoint)
           
        }
        lastDataPoint=data[casesType][date]
    }
    return charData
 }  

export const LineGraph = () => {

    const [data,setdata]=useState({})
  

useEffect(() => {
    const fetchData=async()=>{

        try{

            const response=await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            console.log(response.data)
           
           
            const charData=buildcharData(response.data)
            setdata(charData)
        }catch(err){
            console.log(err);
        }
    }

    fetchData()
}, [])



    return (
        <div className="Graph">
          
                {data?.length > 0 && (
            <Line data={{
                datasets:[
                    {
                        backgroundColor: "rgba(204, 16, 52, 0.5)",
                        borderColor: "#CC1034",
                        data:data,
                    }
                ]
            }} options={options}/>
                )}
        </div>
    )
}
