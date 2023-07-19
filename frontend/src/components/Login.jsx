import React, {useState} from 'react';
import {GoogleLogin} from '@react-oauth/google';
import {useNavigate} from 'react-router-dom'
//import {FcGoogle} from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logo.png';
import { client } from '../client';
const Login = () => {
    const navigate = useNavigate();
    const [loggedIn,
        setLoggedIn] = useState(false);

    const onSuccess = (response) => {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response.profileObj));
        const { name, googleId, imageUrl } = response.profileObj;
        const doc = {
          _id: googleId,
          _type: 'user',
          userName: name,
          image: imageUrl
        }
        setLoggedIn(true);
        client.createIfNotExists(doc)
        .then(() => {
            navigate('/', { replace: true }); 
          })
    };

    const onFailure = (error) => {
        console.log(error);
    };

    return (
        <div className="flex flex-col items-center justify-start w-screen h-screen bg-slate-500">
            <div className='relative w-full h-full'>
                <video
                    src={shareVideo}
                    type="video/mp4"
                    autoPlay
                    loop
                    muted
                    className="object-cover w-full h-full"/>
                <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-blackOverlay'>
                    <div className='p-5'><img src={logo} width="130px" alt="logo"/></div>
                    <div className='p-5 bg-white shadow-2xl rounded-xl'>{loggedIn
                            ? (
                                <h1>Welcome!</h1>
                            )
                            : (<GoogleLogin className='p-3 rounded-lg outline-none cursor-pointer' onSuccess={onSuccess} onError={onFailure}/>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
