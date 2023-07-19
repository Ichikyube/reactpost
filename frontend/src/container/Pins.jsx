import React, { useState } from 'react'
import { Routes, Route, NavLink, Link } from 'react-router-dom'
import { Navbar, PinDetail, CreatePin, Search, Feed } from '../components'

function Pins({user}) {
    const [searchTerm, setSearchTerm] = useState('')
    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }
    const handleClear = () => {
        setSearchTerm('')
    }
    return (
        <div className="px-2 md:px-5">
            <div className='bg-gray-50'>
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />
            </div>
            <div className='h-full'>
                <Routes>
                    <Route path='/' element={<Feed />} />
                    <Route path='/category/:categoryId' element={<Feed />} />
                    <Route path='/create-pin' element={<CreatePin user={user} />} />
                    <Route path='/pins/:pinId' element={<PinDetail user={user} />} /> 
                    <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />} />
                </Routes>
            </div>
        </div>
    )
                        
    
}

export default Pins