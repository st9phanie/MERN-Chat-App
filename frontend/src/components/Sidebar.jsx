import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import assets from '../assets/assets';

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages
  } = useContext(ChatContext);

  const { logout, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState('');

  const navigate = useNavigate();

  // 🔧 FIXED: Correct filtering (was `filteredUsers`, not a function)
  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <div
      className={`bg-[#8185B2]/10 h-full p-5 overflow-y-scroll text-white ${
        selectedUser ? 'max-md:hidden' : ''
      }`}
    >
      {/* ---------- TOP BAR ---------- */}
      <div className='pb-5'>
        <div className='flex justify-between items-center'>
          <img src={assets.logo} alt='logo' className='max-w-40' />

          <div className='relative py-2 group'>
            <img
              src={assets.menu_icon}
              alt='menu icon'
              className='max-h-5 cursor-pointer'
            />
            <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
              <p
                onClick={() => navigate('/profile')}
                className='cursor-pointer text-sm'
              >
                Edit Profile
              </p>
              <hr className='my-2 border-t border-gray-500' />
              <p
                className='cursor-pointer text-sm text-red-400'
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
              >
                Log out
              </p>
            </div>
          </div>
        </div>

        {/* ---------- SEARCH ---------- */}
        <div className='bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5'>
          <img src={assets.search_icon} alt='Search' className='w-3' />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type='text'
            placeholder='Search Users...'
            className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1'
          />
        </div>
      </div>

      {/* ---------- USER LIST ---------- */}
      <div className='flex flex-col'>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => {setSelectedUser(user);setUnseenMessages(prev=>({...prev, [user._id]:0}))}}
              className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${
                selectedUser?._id === user._id && 'bg-[#282142]/50'}`}
            >
              <img
                src={user?.profilePic || assets.avatar_icon}
                alt='profile picture'
                className='w-[35px] aspect-square rounded-full object-cover'
              />
              <div className='flex flex-col leading-5'>
                <p>{user.fullName}</p>
                {onlineUsers.includes(user._id) ? (
                  <span className='text-green-400 text-xs'>Online</span>
                ) : (
                  <span className='text-neutral-400 text-xs'>Offline</span>
                )}
              </div>

              {/* 🔧 FIXED: Show actual unseen count, not index */}
              {unseenMessages[user._id] > 0 && (
                <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>
                  {unseenMessages[user._id]}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className='text-sm text-gray-400 text-center mt-5'>No users found</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
