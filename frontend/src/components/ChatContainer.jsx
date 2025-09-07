import React, { useContext, useEffect, useRef, useState } from 'react';
import assets from '../assets/assets';
import { formatMessageTime } from '../lib/utils';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ChatContainer = () => {
  const {
    messages,
    selectedUser,
    setSelectedUser,
    sendMessage,
    getMessages,
  } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const [input, setInput] = useState('');
  const scrollEnd = useRef();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    await sendMessage({ text: input.trim() });
    setInput('');
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      {/* --------------- HEADER --------------- */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt=""
          className="w-8 rounded-full"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
          )}
        </p>
        <img
          src={assets.arrow_icon}
          alt="arrow icon"
          className="md:hidden max-w-7 cursor-pointer"
          onClick={() => setSelectedUser(null)}
        />
        <img
          src={assets.help_icon}
          alt="help icon"
          className="max-md:hidden max-w-5"
        />
      </div>

      {/* --------------- CHAT --------------- */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {messages.map((msg, index) => {
          const isSender = msg.senderId === authUser._id;
          return (
            <div
              key={index}
              className={`flex flex-col ${isSender ? "items-end" : "items-start"} mb-4`}
            >
              <div
                className={`max-w-[70%] break-words rounded-lg p-2 text-white text-sm ${msg.image
                    ? "p-0"
                    : isSender
                      ? "bg-violet-500/30 rounded-br-none"
                      : "bg-violet-500/30 rounded-bl-none"
                  }`}
              >
                {msg.image ? (
                  <img
                    src={msg.image}
                    alt="message"
                    className="max-w-[230px] rounded-lg border border-gray-700"
                  />
                ) : (
                  msg.text
                )}
              </div>

              <div
                className={`text-[10px] text-gray-400 mt-1 ${isSender ? "text-right" : "text-left"
                  }`}
              >
                {formatMessageTime(msg.createdAt)}{" "}
                {isSender && msg.seen && <span className="text-green-400 ml-1">✓</span>}
              </div>
            </div>
          );
        })}

        <div ref={scrollEnd}></div>
      </div>

      {/* --------------- BOTTOM INPUT AREA --------------- */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
        <div className="flex-1 flex items-center bg-gray-100/10 px-3 rounded-full">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => (e.key === 'Enter' ? handleSendMessage(e) : null)}
            type="text"
            placeholder="Send a message"
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400 bg-transparent"
          />
          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/png, image/jpg, image/gif, image/jpeg"
            hidden
          />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt="send image icon"
              className="w-5 mr-2 cursor-pointer"
            />
          </label>
        </div>
        <img
          src={assets.send_button}
          alt="send button"
          className="w-7 cursor-pointer"
          onClick={handleSendMessage}
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={assets.logo_icon} alt="logo" className="max-w-16" />
      <p className="text-lg font-medium text-white">
        Chat anytime, anywhere
      </p>
    </div>
  );
};

export default ChatContainer;
