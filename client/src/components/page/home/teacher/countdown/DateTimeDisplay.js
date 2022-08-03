import React from 'react'

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (

    <div className={isDanger ? 'countdown danger' : 'countdown'}>

      <p>{value}{type}</p>
    </div>
  )
}

export default DateTimeDisplay