import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import {Line} from 'react-chartjs-2'
export const LineGraph = () => {

    const [data,setdata]=useState({})
    const fetchData=async()=>{

        try{

            const response=await axios.get('https://disease.sh/v3/covid-19/historical/all')
            console.log(response.data)
            setdata(response.data)
        }catch(err){
            console.log(err);
        }
    }

useEffect(() => {

    fetchData()
}, [])
    return (
        <div>
            <Line/>

        </div>
    )
}
