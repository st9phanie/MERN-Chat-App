import React, { useState, useContext } from 'react';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate()
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!email || !password) return;
    login('login', { email, password });
  };

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

      {/* LEFT SIDE: Logo */}
      <img src={assets.logo_big} alt="logo" className='w-[min(30vw,250px)]' />

      {/* RIGHT SIDE: Login form */}
      <form onSubmit={onSubmitHandler} className='border-2 bg-white/10 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg w-[400px]'>
        <h2 className='font-medium text-2xl'>Login</h2>

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

        <button
          type="submit"
          className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'
        >
          Log in
        </button>
        <p className='text-sm text-gray-500'> Don't have an account?{" "} <span onClick={() => navigate("/signup")} className='font-medium text-violet-500 cursor-pointer' > Sign up </span> </p>
      </form>

    </div>
  );
};

export default Login;
