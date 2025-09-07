import React from 'react';
import assets, { imagesDummyData } from '../assets/assets';

const RightSidebar = ({ selectedUser }) => {
  if (!selectedUser) return null;

  return (
    <div className={`bg-[#8185b2]/10 text-white w-full relative overflow-y-scroll ${selectedUser ? "max-md:hidden" : ""}`}>
      {/* -------- User Profile -------- */}
      <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
        <img 
          src={selectedUser?.profilePic || assets.avatar_icon} 
          alt={`${selectedUser.fullName} profile`} 
          className='w-20 aspect-square rounded-full object-cover'
        />
        <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
          <span className='w-2 h-2 rounded-full bg-green-500'></span>
          {selectedUser.fullName}
        </h1>
        {selectedUser.bio && (
          <p className='px-10 mx-auto text-center text-sm text-gray-300'>{selectedUser.bio}</p>
        )}
      </div>

      <hr className='border-[#ffffff50] my-4' />

      {/* -------- Media Section -------- */}
      <div className='px-5 text-xs'>
        <p className='text-white font-semibold mb-2'>Shared Media</p>
        <div className='max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'>
          {imagesDummyData.map((url, index) => (
            <div 
              key={index} 
              onClick={() => window.open(url, '_blank')}
              className='cursor-pointer rounded overflow-hidden'
            >
              <img 
                src={url} 
                alt={`Media ${index + 1}`} 
                className='w-full h-full object-cover rounded-md transition-transform duration-200 hover:scale-105'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
