import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css'
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Shower from './img/Shower.png'
import CloudBackground from './img/Cloud-background.png'
import moment from 'moment'

function Home() {
    const [weather, setWeatherState] = useState('')
    const [tem, setTem] = useState('')
    // const [location, setLocation] = useState('')

    useEffect(() => {
      const getWeather = async () => {
        const res = await axios.get(
          "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/1118370"
        );
        console.warn("★★★★★");
        console.warn(res.data);
        // console.warn(res.data.consolidated_weather[0].weather_state_name)
        setWeatherState(res.data.consolidated_weather[0].weather_state_name);
        setTem(res.data.consolidated_weather[0].the_temp)
        // setLocation(res.data)
      };
      getWeather();
    }, []);

    return (
        <div className='home'>
            <div className='home__left'>
                <div className='left__upper'>
                    <input className='left__search' placeholder = 'Search for places' type='text'/> 
                    <GpsFixedIcon style={{fontSize: 40, color: '#6E707A'}} />
                </div>
                <div className='left__secondPart'>
                    <img 
                        className='left__middleImage'
                        src = {Shower} 
                    />

                    <img
                        className = 'left__edgeImage'
                        src = {CloudBackground}                
                    />
                </div>

                <div className='left__tem'>
                    <big>{parseInt(tem)}</big>
                    <small>°C</small>
                    <p>{weather}</p>
                </div>

                <div className='left__bottom'>
                    <p>Today  ・  {moment().format('ddd, D MMM')}</p>
                    <p><LocationOnIcon/> Tokyo </p>
                </div>
            </div>

            <div className='home__right'>

            </div>
        </div>
    )
}

export default Home
