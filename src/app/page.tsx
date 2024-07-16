"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import VapingRoomsIcon from '@mui/icons-material/VapingRooms';
import DehazeIcon from '@mui/icons-material/Dehaze';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

let WEATHER_API_KEY = "22571363d04f3de6828dfc65fc25be62";

export default function Home() {
  const [place,setPlace] = useState("Nairobi")
  const [placeData,setPlaceData] = useState<any>(null)
  const currentTime = new Date().toLocaleTimeString([],{
    hour: '2-digit',
    minute: '2-digit'
  })

  const getWeatherData = async ()=>{
    if(place && place.length>0){
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=22571363d04f3de6828dfc65fc25be62`
        let res = await fetch(url)
        let data = await res.json();
        console.log("get weather data response: ", data)
        setPlaceData(data)
      }
      catch(err){

      }
    }
  }


  useEffect(() => {
    getWeatherData();
  }, [])
  return (
    <div className={styles.outerdiv}>
      <div className={styles.searchbar}>
        <input type="search" placeholder="City Name" onChange={(e)=> setPlace(e.target.value)} />
        <button onClick={getWeatherData}><SearchIcon /></button>
      </div>

      {
        placeData && 
        <div className={styles.row}>
          <div className={styles.section1}>
            <div className={styles.section11}>
              {
                placeData.weather[0].main === "Clouds" && <FilterDramaIcon className={styles.weathericon}/>
              }
              {
                placeData.weather[0].main === "Haze" && <DehazeIcon className={styles.weathericon}/>
              }
              {
                placeData.weather[0].main === "Smoke" && <VapingRoomsIcon className={styles.weathericon}/>
              }
              {
                placeData.weather[0].main === "Rain" && <ThunderstormIcon className={styles.weathericon}/>
              }
              {
                placeData.weather[0].main === "Snow" && <AcUnitIcon className={styles.weathericon}/>
              }
              {
                placeData.weather[0].main === "Clear" && <WbSunnyIcon className={styles.weathericon}/>
              }

              <p className={styles.temperature}>{(placeData?.main.temp - 273.15).toFixed(1)}<span>C</span> </p>
            </div>
            <div className={styles.section11}>
              <p className={styles.city}>{(placeData?.name)}</p>
              <p className={styles.weathertype}>{(placeData?.weather[0].main)}</p>
            </div>
          </div>
          <div className={styles.timediv}>
            <p className={styles.time}>{currentTime}</p>
          </div>
        </div>
      }

      {
        placeData &&
        <div className={styles.section2}>
          <div className={styles.section21}>
            <p className={styles.head1}>Temperature</p>
            <p className={styles.head2}>{(placeData?.main.temp - 273.15).toFixed(1)}<span>C</span></p>
          </div>

          <div className={styles.section21}>
            <p className={styles.head1}>Temperature Min</p>
            <p className={styles.head2}>{(placeData?.main.temp_min - 273.15).toFixed(1)}<span>C</span></p>
          </div>

          <div className={styles.section21}>
            <p className={styles.head1}>Temperature Max</p>
            <p className={styles.head2}>{(placeData?.main.temp_max - 273.15).toFixed(1)}<span>C</span></p>
          </div>

          <div className={styles.section21}>
            <p className={styles.head1}>Humidity</p>
            <p className={styles.head2}>{placeData?.main.humidity}<span>C</span></p>
          </div>

          <div className={styles.section21}>
            <p className={styles.head1}>Pressure</p>
            <p className={styles.head2}>{placeData?.main.pressure}<span>C</span></p>
          </div>

          <div className={styles.section21}>
            <p className={styles.head1}>Visibility</p>
            <p className={styles.head2}>{placeData?.visibility}<span>C</span></p>
          </div>

          <div className={styles.section21}>
            <p className={styles.head1}>Wind speed</p>
            <p className={styles.head2}>{placeData?.wind.speed}<span>C</span></p>
          </div>
        </div>
      }
    </div>
  );
}
