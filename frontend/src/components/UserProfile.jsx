import { googleLogout } from '@react-oauth/google'
import React, { useEffect, useState } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const randomImg = 'https://source.unsplash.com/1600x900/?nature,photography,technology'
const activeBtnStyles = 'text-white bg-red-500 font-bold p-2 rounded-full w-20 outline-none'
const notActiveBtnStyles = 'text-black bg-primary mr-4 font-bold p-2 rounded-full w-20 outline-none'
function UserProfile() {
  const [user, setUser] = useState(null)
  const [pins, setPins] = useState(null)
  const [text, setText] = useState('Created')
  const [activeBtn, setActiveBtn] = useState('created')
  const navigate = useNavigate()
  const userId = useParams()

  useEffect(() => {
    const query = userQuery(userId.id)
    client.fetch(query).then((data) => {
      setUser(data[0])
    })
  }, [userId])


  if(!user) {
    return <Spinner message="Loading profile..."/>
  }

  return (
    <div className='relative items-center justify-center h-full pb-2'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col items-center justify-center'>
            <img src={randomImg} className='object-cover w-full shadow-lg h-370 2xl:h-510' alt="banner-pic" />
            <img src={user.image} className='object-cover w-20 h-20 -mt-10 rounded-full shadow-lg' alt="user-pic" />
            <h1 className='mt-3 text-3xl font-bold text-center'>{user.name}</h1>
            <div className="absolute top-0 right-0 z-10 p-2">
              {userId === user._id && (
                <button type='button'  className='p-3 bg-white rounded-lg shadow-md outline-none cursor-pointer' onClick={() => googleLogout()}>
                  <AiOutlineLogout className='text-xl' />
                </button>
              )}
            </div>
          </div>
          <div className='text-center mb-7'>
            <button type='button' className='text-lg font-medium text-gray-500' 
              onClick={(e) => {
                setText(e.target.textContent)
                setActiveBtn('created')
              }} 
              className={activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}
                ></button>

          </div>
        </div>  
      </div>  
    </div>
  )
}

export default UserProfile