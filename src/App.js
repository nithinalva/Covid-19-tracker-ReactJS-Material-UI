
import { FormControl,MenuItem,Select ,Card, CardContent} from '@material-ui/core';
import './App.css';
import {useEffect, useState} from 'react'
import axios from 'axios'
import { Infobox } from './components/Infobox';
import {Map} from './components/Map'
import { Table } from './components/Table';
import { sortData } from './util';
import { LineGraph } from './components/LineGraph';
// https://disease.sh/docs/#/COVID-19%3A%20Worldometers/get_v3_covid_19_all

function App() {

  const [Countries,setCountries]=useState([]);
const [country,setcountry]=useState('worldwide')
const [CurrentInfo,setCurrentInfo]=useState([])
const [tableData,settableData]=useState([])
const [mapCenter,setmapCenter]=useState({
    lat:34.80746,lng:-40.4796           //cnter of the pacific ocean
})
const [MapData,setMapData]=useState([])
const [zoom,setzoom]=useState(3)


const [casesTypes,setcasesTypes]=useState('cases')
useEffect(() => {

  const fetchAll=async()=>{

  
  const countryDefault=await axios('https://disease.sh/v3/covid-19/all')

  try{
    setCurrentInfo(countryDefault.data)
   

  }catch(err){

    console.log(err)
  }
}
  fetchAll()
},[])


  const fetchData=async()=> {

  

    const response=await axios.get('https://disease.sh/v3/covid-19/countries')
    try{
      // console.log(response.data)
        //TODO:
        console.log(response.data)
     
      const fetchData=response.data.map((cnt)=>({

        name:cnt.country,
        value:cnt.countryInfo.iso2
      }))

    
      setCountries(fetchData)

      const sortedData=sortData(response.data)
      settableData(sortedData)

      setMapData(response.data)
    }catch(err){
      console.log(err)
    }
  }
  
  

  useEffect(() => {

   fetchData();
   
  }, [])


  const onCountryChange= async(event)=>
{
  const countryCode=event.target.value;
  setcountry(countryCode)

  const url=countryCode==='worldwide'? "https://disease.sh/v3/covid-19/all": `https://disease.sh/v3/covid-19/countries/${countryCode}`
  console.log(url)

  try{
      const count=await axios(url)
    setCurrentInfo(count.data)
      setmapCenter({lat:count.data.countryInfo.lat,lng:count.data.countryInfo.long})
      setzoom(4)

  }catch(err){

    console.log(err)
  }
}

  return (
      <div className="app">
        <div className="app__left">
        <div className="app__header">
       <h1>COVID-19 TRACKER</h1>
      <FormControl className="app__dropdown">   {/* BOM css */}
      <Select  variant="outlined" value={country} onChange={onCountryChange}>
        <MenuItem value="worldwide" >WorldWide</MenuItem>
        {Countries.map((country,index)=>(
        <MenuItem value={country.value} key={index}>{country.name}</MenuItem>
        ))}
       

      </Select>
      </FormControl>
      </div>

      <div className="app__status">
        <Infobox title="CONFIRMED CASES" cases={CurrentInfo.todayCases} total={CurrentInfo.cases} onClick={()=>setcasesTypes("cases")}></Infobox>
        <Infobox title="RECOVERED " cases={CurrentInfo.todayRecovered} total={CurrentInfo.recovered} onClick={()=>setcasesTypes("recovered")}></Infobox>
        <Infobox title="DEATHS" cases={CurrentInfo.todayDeaths} total={CurrentInfo.deaths} onClick={()=>setcasesTypes("deaths")}></Infobox>
      </div>

      <Map center={mapCenter} zoom={zoom} countries={MapData} casesTypes={casesTypes}/>
      </div>

       
      <Card className="app__right">  
      {/* rightstuff */}
          <CardContent>
            <h1>Live cases by country</h1> 
            <Table countries={tableData}/>
            <h3>World Wide new cases</h3>
            <LineGraph/>
          </CardContent>

      </Card>
    </div>
  );
}

export default App;
