import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { setActiveChat, fetchChats } from '../redux/chatsSlice';

import { getChatName, getChatPhoto, timeSince } from '../utils/logics';

import NoContacts from './ui/no-contacts';

var aDay = 24 * 60 * 60 * 1000;

const MINUTE_MS = 60000;

const Contacts = () => {
  const dispatch = useDispatch();

  const { chats, activeChat } = useSelector((state) => state.chats);
  const activeUser = useSelector((state) => state.activeUser);

  const [time, setTime] = useState([]);

  useEffect(()=>{
    const interval = setInterval(()=>{
      setTime([]);
    },MINUTE_MS);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <>
      <div className='flex flex-col -space-y-1 overflow-y-scroll scrollbar-hide h-[87vh] pb-10'>
        {
          chats?.length > 0 ? chats?.map((chat) => {
            return (
              <div onClick={() => {
                dispatch(setActiveChat(chat));
              }} key={chat._id} className={`flex items-center justify-between sm:gap-x-1 md:gap-x-1 mt-5 ${activeChat._id === chat._id ? "bg-[#fafafa]" : "bg-[#fff]"} cursor-pointer  py-4 px-2`}>
                <div className='flex items-center gap-x-3 sm:gap-x-1 md:gap-x-3'>
                  <img className='w-12 h-12  sm:w-12 sm:h-12 rounded-[30px] shadow-lg object-cover' src={getChatPhoto(chat, activeUser)} alt="" />
                  <div>
                    <h5 className='text-[13.6px] sm:text-[16px] text-[#2b2e33] font-bold'>{getChatName(chat, activeUser)}</h5>
                    <p className='text-[13.6px] sm:text-[13.5px] font-medium text-[#56585c] '>  {chat.latestMessage?.message.length > 30
                      ? chat.latestMessage?.message.slice(0, 30) + "..."
                      : chat.latestMessage?.message
                    }</p>
                  </div>
                </div>
                <div className='flex flex-col items-end gap-y-[8px]'>
                  <p className='text-[12.4px] sm:text-[12px]  font-normal text-[#b0b2b3] tracking-wide'>{timeSince(new Date(Date.parse(chat.updatedAt)))}</p>
                </div>
              </div>
            )
          }) : <NoContacts />
        }
      </div>
    </>
  )
}

export default Contacts;