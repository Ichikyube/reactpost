/* eslint-disable react/prop-types */
import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from "uuid";

import {MdDownloadForOffline} from 'react-icons/md';
import {AiTwotoneDelete} from 'react-icons/ai';
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs';

import {client, urlFor} from '../client'
import { fetchUser } from '../utils/fetchUser';

function Pin({
    pin: {
        postedBy,
        _id,
        image,
        destination,
        save
    }
}) {
    const navigate = useNavigate();
    const [postHovered, setPostHovered] = React.useState(false);
    const [savingPost, setSavingPost] = React.useState(false);
    const user = fetchUser();
    const alreadySaved = !!(save?.filter((item) => item.postedBy._id === user.googleId))?.length;
    const savePin = (id) => {
        if (alreadySaved) {
            setSavingPost(true);
        } 
            
        
        client.patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
            _key: uuidv4(),
            userId: user.googleId,
            postedBy: {
                _type: 'postedBy',
                _ref: user.googleId
            }
        }]).commit()
        .then(() => {
            window.location.reload();
            setSavingPost(false);
        })
    }
    const deletePin = (id) => {
        client.delete(id)
        .then(() => {
            window.location.reload();
        })
    }
    return (
        <div className='m-2'>
            <div
                className='relative w-auto overflow-hidden transition-all duration-500 ease-in-out rounded-lg cursor-zoom-in hover:shadow-lg'
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-detail/${_id}`)}>
                <img
                className='w-full h-12 rounded-lg'
                src={urlFor(image)
                .width(250)
                .url()}
                alt="user-post"/>
                {postHovered && (
                    <div className='absolute top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-between w-full h-full p-1 pt-2 pb-2 pr-2 bg-black/50' style={{ height: '100%'  }}>
                        <div className='flex items-center justify-between w-full'>
                            <div className='flex gap-2'>
                                <a className='flex flex-col items-center justify-center text-xl text-black bg-white rounded-full outline-none opacity-75 w-9 h-9 hover:opacity-100 hover:shadow-md' 
                                    href={`${image?.asset?.url}?dl=`} download  onClick={(e)=> e.stopPropagation()}>
                                    <MdDownloadForOffline />
                                </a>
                            </div>
                            {alreadySaved?.length !== 0 ? 
                            (<button type='button' className='flex items-center justify-center px-5 py-1 text-base font-bold text-white bg-red-500 outline-none opacity-50 hover:opacity-100 hover:shadow-md rounded-3xl w-9 h-9'>{save?.length}    Saved</button>) : 
                            (<button type='button' className='flex items-center justify-center px-5 py-1 text-base font-bold text-white bg-red-500 outline-none opacity-50 hover:opacity-100 hover:shadow-md rounded-3xl w-9 h-9' 
                            onClick={(e) => { 
                                e.stopPropagation();
                                savePin(_id);
                            }} >{savingPost? 'saving' : 'Save'}</button>)
                            }
                        </div>
                        <div className='flex items-center justify-between w-full gap-2'>   
                            {destination && (
                                <a href={destination} target='_blank' rel='noreferrer' className='flex flex-col items-center justify-center p-2 pl-4 pr-4 text-xl font-bold text-black bg-white rounded-full outline-none opacity-75 w-9 h-9 hover:opacity-100 hover:shadow-md'>
                                    <BsFillArrowUpRightCircleFill />
                                    {destination.length > 20? destination.slice(8, 20) : destination.slice(8)}
                                </a> 
                            )}
                            {postedBy?._id === user.googleId && (
                                <button type='button' 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deletePin(_id);
                                        }}
                                    className='flex items-center justify-center px-5 py-1 text-base font-bold bg-white outline-none opacity-50 text-dark hover:opacity-100 hover:shadow-md rounded-3xl w-9 h-9'>
                                        <AiTwotoneDelete />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Link to={`/user-profile/${postedBy?._id}`} className='flex items-center justify-center gap-2 mt-2'>
                <img className='w-10 h-10 rounded-full' src={urlFor(postedBy?.image).width(50).url()} alt="user-profile" />
                <p className='text-base font-semibold text-black capitalize'>{postedBy?.name}</p>
            </Link>
                    
        </div>
    )
}

export default Pin