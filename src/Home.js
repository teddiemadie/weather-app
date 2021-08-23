import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css'
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Shower from './img/Shower.png'
import CloudBackground from './img/Cloud-background.png'
import LightRain from './img/LightRain.png'
import LightCloud from './img/LightCloud.png'
import Clear from './img/Clear.png'
import Hail from './img/Hail.png'
import Sleet from './img/Sleet.png'
import Snow from './img/Snow.png'
import Thunderstorm from './img/Thunderstorm.png'
import HeavyCloud from './img/HeavyCloud.png'
import HeavyRain from './img/HeavyRain.png'
import moment from 'moment'

function Home() {

    const [weatherState, setWeatherState] = useState('')
    const [tem, setTem] = useState('')
    const [location, setLocation] = useState('')
    const [img, setImg] = useState('')
    const arr = new Array()
    const [arrState, setArrState] = useState('')
    
    useEffect(() => {
        const getWeather = async () => {
            const res = await axios.get(
                "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/1118370"
                );
                console.warn("★★★★★");
                console.warn(res.data);
                // console.warn(res.data.consolidated_weather[0].weather_state_name)
                setWeatherState(res.data.consolidated_weather[0].weather_state_name);
                // setWeatherState('Sleet');
                setTem(res.data.consolidated_weather[0].the_temp)
                setLocation(res.data.title)
                
                console.warn('weather==>', weatherState)
                switch(res.data.consolidated_weather[0].weather_state_name) {
                    case 'Light Rain':
                        // console.warn('ran light rain')
                        setImg(LightRain)
                        break
                    case 'Light Cloud':
                        // console.warn('ran light cloud')
                        setImg(LightCloud)
                        break
                    case 'Heavy Cloud':
                        // console.warn('ran heavy cloud')
                        setImg(HeavyCloud)
                        break
                    case 'Heavy Rain':
                        // console.warn('ran heavy rain')
                        setImg(HeavyRain)
                        break
                    case 'Thunderstorm':
                        // console.warn('ran thunderstorm')
                        setImg(Thunderstorm)
                        break
                    case 'Showers':
                        console.warn('ran shower')
                        setImg(Shower)
                        break
                    case 'Clear':
                        // console.warn('ran clear')
                        setImg(Clear)
                        break
                    case 'Hail':
                        // console.warn('ran hail')
                        setImg(Hail)
                        break
                    case 'Sleet':
                        // console.warn('ran sleet')
                        setImg(Sleet)
                        break
                    case 'Snow':
                        // console.warn('ran snow')
                        setImg(Snow)
                        break
                                                            
                }
                                                        
                //Giai quyet man hinh ben phai
                console.warn('chay toi day roi')

                for (let i = 1; i<=5; i++) {
                    const obj = {weather_state: null, image: null, max_temp: null, min_temp: null}
                    obj.weather_state = res.data.consolidated_weather[i].weather_state_name
                    switch(obj.weather_state) {
                        case 'Light Rain':
                            // console.warn('ran light rain')
                            obj.image = LightRain
                            break
                        case 'Light Cloud':
                            // console.warn('ran light cloud')
                            obj.image = LightCloud
                            break
                        case 'Heavy Cloud':
                            // console.warn('ran heavy cloud')
                            obj.image = HeavyCloud
                            break
                        case 'Heavy Rain':
                            // console.warn('ran heavy rain')
                            obj.image = HeavyRain
                            break
                        case 'Thunderstorm':
                            // console.warn('ran thunderstorm')
                            obj.image = Thunderstorm
                            break
                        case 'Showers':
                            console.warn('ran shower')
                            obj.image = Shower
                            break
                        case 'Clear':
                            // console.warn('ran clear')
                            obj.image = Clear
                            break
                        case 'Hail':
                            // console.warn('ran hail')
                            obj.image = Hail
                            break
                        case 'Sleet':
                            // console.warn('ran sleet')
                            obj.image = Sleet
                            break
                        case 'Snow':
                            // console.warn('ran snow')
                            obj.image = Snow
                            break 
                    }
                    obj.max_temp = res.data.consolidated_weather[i].max_temp
                    obj.min_temp = res.data.consolidated_weather[i].min_temp
                    arr.push(obj)
                    // console.warn(i)
                }

                // setArrState(arr)
                setArrState([{image: Shower}])


                console.warn(arr[0].image)
      };
      getWeather();
    }, [arrState, tem]);

    // setArrState([{image: Shower}])

    console.warn('==> arrState: ', arrState)

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
                        src = {img} 
                    />

                    <img
                        className = 'left__edgeImage'
                        src = {CloudBackground}                
                    />
                </div>

                <div className='left__tem'>
                    <big>{parseInt(tem)}</big>
                    <small>°C</small>
                    <p>{weatherState}</p>
                </div>

                <div className='left__bottom'>
                    <p>Today  ・  {moment().format('ddd, D MMM')}</p>
                    <p><LocationOnIcon/> {location} </p>
                </div>
            </div>

            <div className='home__right'>
                <div className='right__upper'>
                    <p>whats up</p>
                </div>
 
                <div className='right__weatherNextFiveDays'>
                    <div className='right__cell'>
                        <p>Tomorrow</p>
                        <img
                            className='right__img'
                            // src = {arrState[0].image}
                        />
                        <div className='maxAndMinTem'>
                            {/* <p>{arr[0].obj.max_temp}</p>
                            <p>{arr[0].obj.min_temp}</p> */}
                        </div>

                    </div>

                    <div className='right__cell'>
                        <p>{moment().add(2, 'days').format('ddd, D MMM')}</p>
                        <img
                            className='right__img'
                            // src = {arrState[1].image}
                        />

                    </div>

                    <div className='right__cell'>
                        <p>{moment().add(3, 'days').format('ddd, D MMM')}</p>
                        <img
                            className='right__img'
                            // src = {arrState[2].image}
                        />

                    </div>

                    <div className='right__cell'>
                        <p>{moment().add(4, 'days').format('ddd, D MMM')}</p>
                        <img
                            className='right__img'
                            // src = {arrState[3].image}
                        />

                    </div>

                    <div className='right__cell'>
                        <p>{moment().add(5, 'days').format('ddd, D MMM')}</p>
                        <img
                            className='right__img'
                            // src = {arrState[4].image}
                        />

                    </div>
                </div>

                <div className='right__highLight'>

                </div>
            </div>
    )
        </div>
    )
}

export default Home
