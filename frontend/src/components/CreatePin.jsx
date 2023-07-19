import React, { useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { client } from '../client'
import Spinner from './Spinner'
import { categories } from '../utils/data'

function CreatePin(user) {
  const [title, setTitle] = useState('')
  const [about, setAbout] = useState('')
  const [destination, setDestination] = useState('')
  const [category, setCategory] = useState(null)
  const [imageAsset, setImageAsset] = useState(null)
  const [wrongImageType, setWrongImageType] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fields, setFields] = useState(null) 

  const navigate = useNavigate();
  const uploadImage = async (e) => {
    const { type } = e.target.files[0]
    if(type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type === 'image/gif' || type === 'image/tiff') {
      setImageAsset(e.target.files[0])
      setWrongImageType(false)
      setLoading(true)
      client.assets.upload('image', e.target.files[0], { contentType: type, filename: e.target.files[0].name  })
      .then((doc) => {
        setImageAsset(doc.url)
        setLoading(false)
      }).catch((err) => {
        console.log('image upload error', err)
      })
    } else {
      setWrongImageType(true)
    } 
  }
  const savePin = () => {
    if (title && about && destination && category && imageAsset?.id) {
      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
        category,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id
          }
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id
        }
      }
      client.create(doc).then(() => {
        navigate('/')
      }).catch((err) => {
        console.log('error', err)
      })
    
    } else {
      setFields(true);
      setTimeout(() => {
        setFields(false)
      }, 2000);
    }
  }
    
  return (
    <div className='flex flex-col items-center justify-center mt-5 lg:h-4/5'>
      {fields && (
        <p className='mb-5 text-xl text-red-500 transition-all duration-150 ease-in'>
          Please fill in all the fields</p>
      )}
      <div className='flex flex-col items-center justify-center w-full p-3 bg-white lg:flex-row lg:p-5 lg:w-4/5'>
        <div className='flex flex-col w-full p-3 bg-secondaryColor'>
          <div className='flex flex-col items-center justify-center w-full p-3 border-2 border-gray-300 border-dotted h-420'>
            {loading && <Spinner />}
            {wrongImageType && <p className='text-red-500'>Wrong type of image</p>}
            {!imageAsset ? (
              <label>
                <div className='flex flex-col items-center justify-center w-full h-full'>
                  <div className='flex flex-col items-center justify-center'>
                    <p className='text-2xl font-bold'>
                      <AiOutlineCloudUpload />
                    </p>
                    <p className='text-lg'>Upload Image</p>
                  </div>
                  <p className='mt-32 text-gray-500'>
                    Recommendation: Use High Quality JPG, PNG, GIF or TIFF but should be less than 20MB
                  </p>
                </div>
                <input type="file" name='upload-image' onChange={uploadImage} className='w-0 h-0' />
              </label>) : (
              <div className='relative w-full h-full'>
                <img src={imageAsset} alt="" className='object-cover w-full h-full' />
                <button type='button' className='absolute p-3 text-xl transition-all duration-500 ease-in-out bg-white rounded-full cursor-pointer top-3 right-3 bottom-3 hover:shadow-md' 
                onClick={() => setImageAsset(null)}>
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className='flex flex-col flex-1 w-full gap-6 mt-5 lg:pl-5'>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Add your title here' 
                className='w-full p-2 text-2xl font-bold border-b-2 border-gray-300 outline-none sm:text-3xl' />
                {user && (
                  <div className='flex flex-col w-full gap-2 my-2'>
                    <img src={user.image} alt="user-profile" className='w-10 h-10 rounded-full' />
                    <p className='font-bold'>{user.userName}</p>
                    </div>
                )}
                <input type="text" value={about} onChange={(e) => setAbout(e.target.value)} 
                placeholder='Add your description here' className='w-full p-2 text-base font-medium border-b-2 border-gray-200 outline-none sm:text-lg' />
                <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} className='w-full p-2 text-base font-medium border-b-2 border-gray-200 outline-none sm:text-lg' />
                <div className='flex flex-col'>
                  <div>
                    <p className='mb-2 text-lg font-semibold sm:text-xl'>Choose your Pin Category</p>
                    <select name="" id="" onChange={(e) => setCategory(e.target.value)} className='w-full p-2 text-base font-medium border-b-2 border-gray-200 outline-none sm:text-lg'>
                      <option value="other" className='bg-white'>Select Category</option>
                      {categories.map((category) => (
                        <option key={category.name} value={category.name} className='text-base text-black capitalize bg-white border-0 outline-none'>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button type='button' className='p-2 text-base font-medium text-white bg-red-500 rounded-full outline-none cursor-pointer hover:bg-red-500 w-28' onClick={savePin}>
                        Save Pin
                     </button>
                  </div>
                </div>
        </div> 
      </div>
    </div>
  )
  
}

export default CreatePin