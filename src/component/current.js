import React from 'react'
import './current.css'

function current({current,city}) {
  return (
    <div className='current'>
      <b>{city} Current Weather</b>
      <div className='currentbody'>
        <img  src={current.condition.icon} alt="Icon" />
        <span>{current.condition.text}</span>
        <br />
        <span><b>Temp:</b>{current.temp_c}  deg</span>
        <br />
        <span><b>Feels Like:</b>{current.feelslike_c}  deg</span>
        <br />
        <span><b>Wind :</b>{current.wind_kph}  deg</span>

      </div>


    </div>
    
  )
}

export default current
