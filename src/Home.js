import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css'
import Cell from './Cell'
import getImagePath from './util'
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CloudBackground from './img/Cloud-background.png'
import moment from 'moment'

function Home() {

    const [weatherState, setWeatherState] = useState('')
    const [tem, setTem] = useState('')
    const [location, setLocation] = useState('')
    const [img, setImg] = useState('')
    const arr = new Array()
    const [arrState, setArrState] = useState([])

    //declare the right screen's functions
    const [ws,setWs] = useState('')
    const [humidity, setHumidity] = useState('')
    const [visibility, setVisibility] = useState('')
    const [ap, setAp] = useState('') 
    
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

                //the right screen
                setWs(res.data.consolidated_weather[0].wind_speed)
                setHumidity(res.data.consolidated_weather[0].humidity)
                setVisibility(res.data.consolidated_weather[0].visibility)
                setAp(res.data.consolidated_weather[0].air_pressure)
                
                console.warn('weather==>', weatherState)
                
                let path = getImagePath(res.data.consolidated_weather[0].weather_state_name)
                setImg(path)
                                                        
                //Giai quyet man hinh ben phai
                console.warn('chay toi day roi')

                for (let i = 1; i<=5; i++) {
                    const obj = {day:null, weather_state: null, image: null, max_temp: null, min_temp: null}
                    obj.day = res.data.consolidated_weather[i].applicable_date
                    obj.weather_state = res.data.consolidated_weather[i].weather_state_name
                    obj.image = getImagePath(obj.weather_state)
                    obj.max_temp = res.data.consolidated_weather[i].max_temp
                    obj.min_temp = res.data.consolidated_weather[i].min_temp
                    arr.push(obj)
                    // console.warn(i)
                }

                setArrState(arr)
                // setArrState([{image: Shower}])


                console.warn(arr[0].image)
      };
      getWeather();
    }, []);

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
                    
                </div>
 
                <div className='right__weatherNextFiveDays'>
                    {arrState.map(i => (
                        <Cell
                            day = {moment(i.day).format('ddd, D MMM')}
                            image = {i.image}
                            maxTemp = {parseInt(i.max_temp)}
                            minTemp = {parseInt(i.min_temp)}
                        />
                    ))}
                </div>

                <div className='right__highLights'>
                    <p>Today's Highlights</p>
                    <div className='right__windStatusAndHumidity'>
                        <div className='right__windStatus'>
                            <p className='right__title'>Wind status</p>
                            <big className='right__value'>{parseInt(ws)}</big>
                            <small className='right__unit'>mph</small>
                        </div>

                        <div className='right__humidity'>
                            <p className='right__title'>Humidity</p>
                            <big className='right__value'>{parseInt(humidity)}</big>
                            <small className='right__unit'>%</small>
                        </div>
                    </div>

                    <div className='right__visibilityAndAirPressure'>
                        <div className='right__visibility'>
                            <p className='right__title'>Visibility</p>
                            <big className='right__value'>{parseInt(visibility)}</big>
                            <small className='right__unit'> miles</small>
                        </div>

                        <div className='right__airPressure'>
                            <p className='right__title'>Air Pressure</p>
                            <big className='right__value'>{parseInt(ap)}</big>
                            <small className='right__unit'> mb</small>
                        </div>
                    </div>
                </div>
            </div>
    )
        </div>
    )
}

export default Home
