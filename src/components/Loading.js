import React from 'react'
import load from './load.gif'

const Loading=()=>{
    return (
      <div className='text-center my-3'>
        <img src={load} alt='loading'></img>
      </div>
    )
  
}

export default Loading