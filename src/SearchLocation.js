import React, { useEffect, useState } from 'react'
import './SearchLocation.css'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import axios from 'axios';
import MatchedPlace from './MatchedPlace';

function SearchLocation({setIsShown,setLocationId}) {
    const hideSearchBar = () => {
        setIsShown(false)
    }

    const [iconIsShown, setIconIsShown] = useState(true)
    const hideIcon = () => {
        setIconIsShown(false)
        console.warn('hello',iconIsShown)
    }

    const [location,setLocation] = useState('')
    const [arrLocation, setArrLocation] = useState([])
    const handleSubmitSearchLocation = (event) => {
        event.preventDefault();
        const getLocation = async () => {
            const res = await axios.get(
                "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query="+location
            );
            // res.data.map(i => {
            //     console.warn(i.title)
            // })
            setArrLocation(res.data)
        };
        getLocation(); 
    }
    const handleChangeText = (event) => {
        console.warn('Location is', event.target.value)
        setLocation(event.target.value)
    }

    return (
        // <div style={bgc === 'red'?{backgroundColor: 'blue'}:{backgroundColor:'yellow'}} className='searchLocation'>
        <div className='searchLocation'>
            <CloseRoundedIcon style={{margin:'10px', color:'#E7E7EB'}} onClick={hideSearchBar}/>
            <form 
                className='searchBarAndButton' 
                onSubmit={handleSubmitSearchLocation}
                >
            {iconIsShown && (<SearchRoundedIcon style={{fontSize: 30, color:'#616475',position:'absolute',left: 20, top: '20%'}}/>) }
                <input
                    type="text"
                    className='searchBar'
                    onClick={hideIcon} 
                    placeholder = 'Search Location'
                    onChange={handleChangeText}
                />
                {/* <button type='submit' className='searchButton'>Search</button> */}
                <input 
                type = "submit" 
                value = "Submit" 
                className='searchButton'
                />

            </form>
            <div className='suggestedPlaces'>
                { arrLocation.map(i => (
                    <MatchedPlace
                        setIsShown = {hideSearchBar}
                        setLocationId = {setLocationId}
                        id = {i.woeid} 
                        title = {i.title}
                    />
                ))}
                {/* <button className='matchedPlace'>London</button>
                <button className='matchedPlace'>Barcelona</button>
                <button className='matchedPlace'>Long Beach</button> */}
            </div>
        </div>
    )
    // else return {}
}

export default SearchLocation 
