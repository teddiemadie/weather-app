import axios from 'axios'
import React from 'react'
import './MatchedPlace.css'

function MatchedPlace({title,setIsShown,setLocationId,id}) {
    const handleAfterClick = () => { //back to home page and get weather data of that place from api
        setIsShown(false)  //back to home page

        //get data from api
        setLocationId(id)
        console.warn('')
    }
    return (
            <button onClick={handleAfterClick} className='matchedPlace'>{title}</button> 
    )
}

export default MatchedPlace
