import React from 'react'
import Masonry from 'react-masonry-css'
import { Pin } from "./index";

const breakPointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1
}

  function MasonryLayout( {pins} ) {
  return (
    <Masonry className='flex animate-slide-fwd'
      breakpointCols={breakPointObj}>
        {pins?.map((pin)=> {
          <Pin key={pin._id} pin={pin}/>
        })}
      </Masonry>
  )
}

export default MasonryLayout