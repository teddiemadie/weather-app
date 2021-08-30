import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css'
import Cell from './Cell'
import getImagePath from './util'
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CloudBackground from './img/Cloud-background.png'
import moment from 'moment'
import PlayCircleFilledRoundedIcon from '@material-ui/icons/PlayCircleFilledRounded';
import SearchLocation from './SearchLocation'

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
    const [locationValue, setLocationValue] = useState('')
    const [locations, setLocations] = useState([
        {
            name: 'Ha Noi'
        },
        {
            name: 'Nhat ban'
        }
    ])
    const [isShown, setIsShown] = useState(false)

    const showSearchBar = () => {
        setIsShown(true)
    }

    const searchLocation = (event) => {
        console.log(event.target.value)
        setLocationValue(event.target.value)

        // call api
    }

    const selectLocation = (item) => {
        console.log(item)
        setLocationValue(item.name)
    }
    
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
    //   console.log('chay vao day')
    }, []);
    console.warn('DO AM NE',parseInt(humidity))
    // setArrState([{image: Shower}])
    // let doAm = '63%'
    let humidpercent = humidity + '%'
    console.warn(humidpercent)
    console.warn('==> arrState: ', arrState)
    const statusBar = {
        backgroundColor: 'yellow',
        height: '10px',
        width: humidpercent
    }
    let bgc;
    if(isShown) {
        bgc='block'
        console.warn('chay vao day roi')
    }else {
        bgc='none'
        console.warn('chay vao day roi 1')
    }
    return (
        <div className='home' >
            
            <div className='home__left' style={isShown === true ?{display:'none'}: {display:'visibility'}}>
               
                <div className='left__upper'>
                    { isShown === false && (<input onClick={showSearchBar} className='left__search' placeholder = 'Search for places' type='text'/> ) }
                    {/* { isShown === true && (<input value={locationValue} onChange={searchLocation} />) } */}
                    {/* { isShown === true && (<SearchLocation onChange={searchLocation} />) } */}
                    { locations && locations.map((i) => {
                        return (
                            <div onClick={() => selectLocation(i)}>{i.name}</div>
                        )
                    }) }
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
            {/* style={{display: 'None'}} */}
            {/* <SearchLocation style={isShown === false ?{display:'none'}: {display:'visibility'}}/> */}
            <SearchLocation bgc={bgc}/>
            <div className='home__right'>
                <div className='right__upper'>
                    <button className='right__cDegree'>°C</button>
                    <button className='right__fDegree'>°F</button>
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
                            <div className='right__windStatusButton'>
                                <PlayCircleFilledRoundedIcon style={{color: 'rgba(255, 255, 255, 0.3)',marginTop:'10px',marginRight:'10px'}}/>
                                <p>WSW</p>
                            </div>
                        </div>

                        <div className='right__humidity'>
                            <p className='right__title'>Humidity</p>
                            <big className='right__value'>{parseInt(humidity)}</big>
                            <small className='right__unit'>%</small>
                            <div style={{}} className='right__humidityScale'>
                                <div style={{ width: '60%', marginTop:'30px', marginLeft:'20%', border: 'solid 1px white', backgroundColor: 'white', borderRadius: '80px'}}>
                                    <div style={statusBar}></div>
                                </div>
                            </div>
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
