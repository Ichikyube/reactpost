import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io';
import { RiHomeFill } from 'react-icons/ri';
import logo from '../assets/logo.png'

const isNotActiveSidebar = 'flex items-center gap-3 px-5 pt-1 my-6 text-gray-500 capitalize transition-all duration-200 ease-in-out hover:text-black w-190'
const isActiveSidebar = 'flex items-center gap-3 px-5 pt-1 my-6 text-black capitalize transition-all duration-200 ease-in-out w-190 font-extrabold border-2 border-black'
const Categories = [
  { name: 'Animals'},
  { name: 'Wallpapers'},
  { name: 'Photography'},
  { name: 'Gaming'},
  { name: 'Coding'},  
  { name: 'Other'},  
]
function Sidebar({user, closeToggle}) {
  const handleCloseSideBar = () => {
    if(closeToggle) closeToggle(false)
  }
  return ( 
    <div className='flex flex-col justify-between h-full overflow-y-scroll bg-white shadow-md hide-scrollbar min-w-210'>
        <div className='flex flex-col'>
          <Link to='/' className='flex items-center gap-2 px-5 pt-1 my-6 w-190' onClick={handleCloseSideBar}>
            <img src={logo} alt="logo" className='w-full' />
          </Link>
          <div className='flex flex-col gap-5'>
            <NavLink to='/' className={({isActive}) => `${isActive ? isActiveSidebar : isNotActiveSidebar}`} onClick={handleCloseSideBar}>
              <RiHomeFill />Home
            </NavLink>
            <h3 className='px-5 mt-2 text-base 2xl:text-xl'>Discover Categories</h3>
            {Categories.slice(0, Categories.length - 1).map((category) => (
              <NavLink to={`/category/${category.name}`} key={category.name} 
                className={({isActive}) => ` ${isActive ? isActiveSidebar : isNotActiveSidebar}`} onClick={handleCloseSideBar}>
                  {category.name}
              </NavLink>
            ))}
          </div>
        </div>
        {user && (  
          <link to={`user-profile/${user.id}`} className='flex items-center gap-2 p-2 px-5 pt-1 mx-3 my-5 mb-3 bg-white rounded-lg shadow-lg' onClick={handleCloseSideBar}>
            <img src={user.image} className='w-10 h-10 rounded-full' alt="user-profile" />
            <p>{user.username}</p>
          </link>
        )}  
  </div>
)}

export default Sidebar