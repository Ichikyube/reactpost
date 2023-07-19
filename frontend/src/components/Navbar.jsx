import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

function Navbar({ searchTerm, setSearchTerm, user }) {
    const navigate = useNavigate();
    //if(!user) return null;
    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     navigate('/login');
    // }
  return (
    <div className='flex w-full gap-2 mt-5 md:gap-5 pb-7'>
        <div className='flex items-center justify-start w-full px-2 bg-white border-none rounded-md outline-none focus-within:shadow-sm'>
            <IoMdSearch fontSize={21} className='ml-1'/>
            <input type="text" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} placeholder='Search...' 
                onFocus={() => navigate('/search')} className='w-full p-2 bg-white outline-none' />
        </div>
        <div className='flex gap-3'>
            <Link to={`user-profile/${user._id}`} className='hidden md:block'>
                <img src={user.image} alt="user" className='rounded-lg w-14' />
            </Link>
            <Link to='create-pin' className='flex items-center justify-center w-12 h-12 text-white bg-black rounded-lg md:w-14 md:h-12'>
                <IoMdAdd />
            </Link>
        </div>
    </div>
  )
}

export default Navbar