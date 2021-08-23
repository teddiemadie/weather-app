import Shower from './img/Shower.png'
import LightRain from './img/LightRain.png'
import LightCloud from './img/LightCloud.png'
import Clear from './img/Clear.png'
import Hail from './img/Hail.png'
import Sleet from './img/Sleet.png'
import Snow from './img/Snow.png'
import Thunderstorm from './img/Thunderstorm.png'
import HeavyCloud from './img/HeavyCloud.png'
import HeavyRain from './img/HeavyRain.png'


function getImagePath(weatherState) {
    
    switch(weatherState) {
        case 'Light Rain':
            // console.warn('ran light rain')
            return (LightRain)
        case 'Light Cloud':
            // console.warn('ran light cloud')
            return (LightCloud)
        case 'Heavy Cloud':
            // console.warn('ran heavy cloud')
            return (HeavyCloud)
        case 'Heavy Rain':
            // console.warn('ran heavy rain')
            return (HeavyRain)
        case 'Thunderstorm':
            // console.warn('ran thunderstorm')
            return (Thunderstorm)
        case 'Showers':
            console.warn('ran shower')
            return (Shower)
        case 'Clear':
            // console.warn('ran clear')
            return (Clear)
        case 'Hail':
            // console.warn('ran hail')
            return (Hail)
        case 'Sleet':
            // console.warn('ran sleet')
            return (Sleet)
        case 'Snow':
            // console.warn('ran snow')
            return (Snow)
                                                
}
}

export default getImagePath