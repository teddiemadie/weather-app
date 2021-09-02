import React from 'react'
import './Cell.css'

function Cell({day,image,maxTemp,minTemp, tempDegree}) {
    return (
        <div className='right__cell'>
            <p>{day}</p>
            <img
                className='right__img'
                src = {image}
            />
            <div className='right__maxAndMinTemp'>
                <p className='right__maxTemp'>{tempDegree === 'C' ? maxTemp+'°C': parseInt(maxTemp*1.8+32)+'°F'}</p>
                <p className='right__maxTemp'>{tempDegree === 'C' ? minTemp+'°C': parseInt(minTemp*1.8+32)+'°F'}</p>
            </div>

        </div>
    )
}

export default Cell
