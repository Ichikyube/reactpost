import React, {useEffect, useRef, useState} from 'react';
import {HiMenu} from 'react-icons/hi';
import {AiFillCloseCircle} from 'react-icons/ai';
import {Link, Route, Routes} from 'react-router-dom';

import {Sidebar, UserProfile} from '../components';
import Pins from './pins';
import {userQuery} from '../utils/data';
import {client} from '../client';
import logo from '../assets/logo.png';
import { fetchUser } from '../utils/fetchUser';

function Home() {
    const [toggleSidebar,
        setToggleSidebar] = useState(false);
    const userInfo = fetchUser();
    const scrollRef = useRef(null);
    const [user,
        setUser] = useState(null);
    useEffect(() => {
        const query = userQuery(userInfo
            ?.googleId);
        client
            .fetch(query)
            .then((data) => {
                setUser(data[0]);
            })
    }, [])
    useEffect(() => {
      scrollRef.current.scrollTo(0, 0);
    }, [])
    
    return (
        <div className="flex flex-col w-screen h-screen duration-75 ease-out bg-gray-100 md:flex-row transition-height">
            <div className='flex-initial hidden h-screen md:flex md:w-1/4'>
                <Sidebar user={user && user}/>
            </div>
            <div className='flex flex-row md:hidden'>
                <div className='flex flex-row justify-between w-full p-2'>
                    <HiMenu
                        fontSize={40}
                        className='cursor-pointer'
                        onClick={() => {
                        setToggleSidebar(true)
                    }}/>
                    <Link to='/'>
                        <img src={logo} alt="logo" className='w-28'/>
                    </Link>
                    <Link to={`user-profile/${user
                        ?._id}`}>
                        <img src={user
                            ?.image} alt="user-photo" className='w-28'/>
                    </Link>
                </div>
                {toggleSidebar && (
                    <div
                        className='fixed z-10 w-4/5 h-screen overflow-y-auto bg-white shadow-md animate-slide-in'>
                        <div className='absolute flex justify-end w-full p-2'>
                            <AiFillCloseCircle
                                fontSize={40}
                                className='cursor-pointer'
                                onClick={() => {
                                setToggleSidebar(false)
                            }}/>
                        </div>
                        <Sidebar user={user && user} closeToggle={setToggleSidebar}/>
                    </div>
                )}
            </div>
            <div className='flex-1 h-screen pb-2 overflow-y-scroll' ref={scrollRef}>
                <Routes>
                    <Route path='/' element={<Pins user={user && user} />}/>
                    <Route path='/user-profile/:userId' element={<UserProfile user={user && user}/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default Home