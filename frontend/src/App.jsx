import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './container/Home'
import About from './components/About'
import Contact from './components/Contact'

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
        </Routes>
        )
}

export default App