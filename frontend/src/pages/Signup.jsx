import React, { useState, useContext } from 'react';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [isDataSubmitted, setIsDataSubmitted] = useState(false);
    const navigate = useNavigate()

    const { login } = useContext(AuthContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!isDataSubmitted) {
            // Step 1: basic info
            if (!fullName || !email || !password) return;
            setIsDataSubmitted(true);
            return;
        }

        // Step 2: bio
        if (!bio) return;
        login('signup', { fullName, email, password, bio });
    };

    return (
        <div className='min-h-screen  bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

            {/* LEFT SIDE: Logo */}
            <img src={assets.logo_big} alt="logo" className='w-[min(30vw,250px)]' />

            {/* RIGHT SIDE: Signup form */}
            <form onSubmit={onSubmitHandler} className='border-2 bg-white/10 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg w-[400px]'>
                <h2 className='font-medium text-2xl flex justify-between items-center'>
                    Sign up
                    {isDataSubmitted && (
                        <img
                            src={assets.arrow_icon}
                            alt="arrow icon"
                            className='w-5 cursor-pointer'
                            onClick={() => setIsDataSubmitted(false)}
                        />
                    )}
                </h2>

                {!isDataSubmitted && (
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        type="text"
                        className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        placeholder='Full Name'
                        required
                    />
                )}

                {(!isDataSubmitted) && (
                    <>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder='Email Address'
                            required
                            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder='Password'
                            required
                            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        />
                    </>
                )}

                {isDataSubmitted && (
                    <textarea
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                        rows={4}
                        className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        placeholder='Bio'
                        required
                    ></textarea>
                )}

                <button
                    type="submit"
                    className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'
                >
                    {isDataSubmitted ? 'Continue' : 'Create Account'}
                </button>

                <div className='flex items-center gap-2 text-sm text-gray-500'>
                    <input type="checkbox" required />
                    <p>Agree to the terms of use & privacy policy.</p>
                </div>

                <p className='text-sm text-gray-500 text-center'> Already have an account?{" "} <span onClick={() => navigate("/login")} className='font-medium text-violet-500 cursor-pointer' > Log in </span> </p>
            </form>
        </div>
    );
};

export default Signup;
