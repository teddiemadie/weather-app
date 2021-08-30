import React from 'react'
import './SearchLocation.css'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

function SearchLocation({bgc}) {
    return (
        // <div style={bgc === 'red'?{backgroundColor: 'blue'}:{backgroundColor:'yellow'}} className='searchLocation'>
        <div style={{display: bgc}} className='searchLocation'>
            <CloseRoundedIcon/>
            <div className='searchBarAndButton'>
                <input
                    className='searchBar'
                    placeholder = 'Search Location'
                />
            </div>
        </div>
    )
}

export default SearchLocation 
