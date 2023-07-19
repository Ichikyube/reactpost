/* eslint-disable react/prop-types */
import React from 'react'
import { Circles } from 'react-loader-spinner'

function Spinner({ message }) {
  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='m-5'>
            <Circles  
                height="50"
                width="200"
                color="#00BFFF"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                timeout={3000}
                />
        </div>
        <p className='px-2 text-lg text-center'>{message}</p>
    </div>
  )
}

export default Spinner