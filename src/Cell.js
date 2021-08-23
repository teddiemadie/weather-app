import React from 'react'
import './Cell.css'

function Cell({day,image,maxTemp,minTemp}) {
    return (
        <div className='right__cell'>
            <p>{day}</p>
            <img
                className='right__img'
                src = {image}
            />
            <div className='right__maxAndMinTemp'>
                <p className='right__maxTemp'>{maxTemp}°C</p>
                <p className='right__minTemp'>{minTemp}°C</p>
            </div>

        </div>
    )
}

export default Cell
