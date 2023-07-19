import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {v4 as uuidv4} from "uuid";
import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner';
import { MdDownloadForOffline } from 'react-icons/md';

function PinDetail({user}) {
  const [pins, setPins] = useState(null);
  const [pinDetail, setpinDetail] = useState(null)
  const [comment, setComment] = useState('')
  const [addingComment, setAddingComment] = useState(false)
  const {pinId} = useParams();
  

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId) 
    if(query) {
      client.fetch(query)
      .then((data) => {
        setpinDetail(data[0])
        if(data[0]) {
          query = pinDetailMorePinQuery(data[0])
          client.fetch(query)
          .then((res) => setPins(res))
          .catch(err => console.log(err))
        }
      })
    }
  }
  useEffect(() => {
    fetchPinDetails()
  }, [pinId])
  if(!pinDetail) return <Spinner message="Loading pin..." />
  const addComment = () => {
    if(comment.length > 0) {
      setAddingComment(true)
      client.patch(pinId)
      .setIfMissing({comments: []})
      .insert('after', 'comments[-1]', [{
        _key: uuidv4(),
        _type: 'comment',
        comment,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        }
      }])
      .commit()
      .then(() => {
        fetchPinDetails();
        setComment('');
        setAddingComment(false);
      })
    }

  }
  return (
    <>
      <div className='flex flex-col m-auto bg-white xl:flex-row' style={{maxWidth: '1400px', borderRadius: '32px'}}>
        <div className='flex items-center justify-center flex-initial md:items-start'>
          <img src={pinDetail?.image && urlFor(pinDetail.image).url()} alt="user-post" className='rounded-b-lg rounded-t-3xl' style={{width: '500px', height: '500px'}} />
        </div>
        <div className='flex-1 w-full p-5 md:w-2/3 xl:w-1/2 xl:min-w-620'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <a  href={`${pinDetail.image.asset.url}?dl=`} className='flex flex-col items-center justify-center text-xl text-black bg-white rounded-full outline-none opacity-75 w-9 h-9 hover:opacity-100 hover:shadow-md' download onClick={(e)=> e.stopPropagation()}>
                <MdDownloadForOffline />
              </a>
            </div>
            <a href={pinDetail.destination} target="_blank" rel='noreferrer'>
              {pinDetail.destination}
            </a>
          </div>
          <div>
            <h1 className='mt-3 text-4xl font-bold break-words'>{pinDetail.title}</h1>
            <p className='mt-3'>{pinDetail.about}</p>
          </div>
          <Link to={`/user-profile/${pinDetail.postedBy?._id}`} className='flex items-center justify-center gap-2 mt-5 bg-white rounded-lg'>
                  <img className='object-cover w-10 h-10 rounded-full' src={urlFor(pinDetail.postedBy?.image).width(50).url()} alt="user-profile" />
                  <p className='text-base font-semibold text-black capitalize'>{pinDetail.postedBy?.name}</p>
          </Link>
          <h2 className='mt-5 text-2xl'>Comments</h2>
          <div className='overflow-y-auto max-h-370'>
            {pinDetail.comments.map((comment, i)=> (
              <div key={i} className='flex items-center gap-2 mt-5 bg-white rounded-lg'>
                <img src={comment.postedBy.image} alt="user-profile" className='w-10 h-10 rounded-full cursor-pointer'/>
                <div className='flex flex-col'>
                  <p className='font-bold'>{comment.postedBy.userName}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex flex-wrap gap-3 mt-6'>
            <Link to={`/user-profile/${pinDetail.postedBy?._id}`}>
                    <img className='w-10 h-10 rounded-full cursor-pointer' src={urlFor(pinDetail.postedBy?.image).width(50).url()} alt="user-profile" />
            </Link>
            <input type="text" className='flex-1 p-2 border-2 border-gray-100 outline-none rounded-2xl focus:border-gray-300' 
              value={comment} onChange={addComment} placeholder='Add a comment' />
            <button className='p-2 font-semibold text-black bg-gray-100 rounded-2xl' type='button' onClick={()=> setAddingComment(true)}>
            {addingComment? 'Posting the comment' : 'Post'}
            </button>
          </div>
        </div>
      </div>
      {pins ? (
        <>
          <h2 className='mt-8 mb-4 text-2xl font-bold text-center'>
            More Like this
          </h2>
          <MasonryLayout pins={pins} />
        </>
        ) : <Spinner message="Loading more pins..." />
      }
    </>
  )
}

export default PinDetail