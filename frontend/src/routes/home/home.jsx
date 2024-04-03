import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RiNotificationBadgeFill } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { BiNotification } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { Effect } from "react-notification-badge";
import NotificationBadge from 'react-notification-badge';

import { setActiveUser } from '../../redux/activeUserSlice.js';
import { setShowNotifications, setShowProfile } from '../../redux/profileSlice.js';
import { fetchChats, setNotifications , setActiveChat} from '../../redux/chatsSlice';

import { searchUsers, validUser } from '../../api/auth.js';
import { accessCreate } from "../../api/chat.js";
import { getSender } from '../../utils/logics.js';

import Chat from '../chat/chat.jsx';
import Profile from "../../components/profile.jsx";
import Group from '../../components/group.jsx';
import Contacts from '../../components/contacts.jsx';
import Search from '../../components/group/search.jsx';

import './home.css';

const Home = () => {
  const dispatch = useDispatch();

  const { showProfile, showNotifications } = useSelector((state) => state.profile);
  const { notifications } = useSelector((state) => state.chats);
  const activeUser = useSelector((state) => state.activeUser);

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const isValid = async () => {
      const data = await validUser();
      if(data){
        const user = {
          id: data?.user?._id,
          email: data?.user?.email,
          profilePic: data?.user?.profilePic,
          bio: data?.user?.bio,
          name: data?.user?.name
        }
        dispatch(setActiveUser(user));
      }
    };
    isValid();
  }, [dispatch, activeUser]);

  useEffect(() => {
    const searchChange = async () => {
      setIsLoading(true);
      const response = await searchUsers(search);
      if(response){
        setSearchResults(response.data);
      }
      setIsLoading(false);
    }
    searchChange();
  }, [search]);

  const onChangeHandler = async (event) => {
    setSearch(event.target.value);
  };

  const handleClick = async (event) => {
    await accessCreate({ userId: event._id });
    dispatch(fetchChats());
    setSearch("");
  };

  return (
    <>

      <div className="bg-[#282C35!] scrollbar-hide z-10 h-[100vh]  lg:w-[90%] lg:mx-auto overflow-y-hidden shadow-2xl">
        <div className='flex'>
          {
            !showProfile ?
              <div className="md:flex md:flex-col min-w-[360px] h-[100vh] md:h-[98.6vh] bg-[#ffff] relative">
                <div className='h-[61px] px-4'>
                  <div className='flex'>
                    <a className='flex items-center relative  -top-4 block h-[90px]' href='/'>
                      <h3 className='text-[20px] text-[#1f2228] font-body font-extrabold tracking-wider'>Messages</h3>
                    </a>
                  </div>
                  <div className='absolute top-4 right-5 flex items-center gap-x-3'>
                    <button onClick={() => dispatch(setShowNotifications(!showNotifications))}>
                      <NotificationBadge
                        count={notifications.length}
                        effect={Effect.SCALE}
                        style={{ width: "15px", height: "15px", fontSize: "9px", padding: "4px 2px 2px 2px" }}
                      />
                      {
                        showNotifications ? <RiNotificationBadgeFill style={{ width: "25px", height: "25px", color: "#319268" }} /> : <BiNotification style={{ color: "#319268", width: "25px", height: "25px" }} />
                      }
                    </button>
                    <div className={`${showNotifications ? "overflow-y-scroll scrollbar-hide tracking-wide absolute top-10 -left-32 z-10 w-[240px] bg-[#fafafa] px-4 py-2 shadow-2xl" : "hidden"}`}>
                      <div className='text-[13px]'>
                        {!notifications.length && "No new messages"}
                      </div>
                        {
                          notifications.map((notification, index) => {
                            return (
                              <div onClick={() => {
                                dispatch(setActiveChat(notification.chatId))
                                dispatch(setNotifications(notifications.filter((data) => data !== notification)))
                              }} key={index} className='text-[12.5px] text-black px-2 cursor-pointer' >
                                {notification.chatId.isGroup ? `New Message in ${notification.chatId.chatName}` : `New Message from ${getSender(activeUser, notification.chatId.users)}`}
                              </div>
                            )
                          })
                        }
                    </div>
                      <button onClick={() => dispatch(setShowProfile(true))} className='flex items-center gap-x-1 relative'>
                        <img className='w-[28px] h-[28px] rounded-[25px]' src={activeUser?.profilePic} alt="" />
                        <IoIosArrowDown style={{ color: "#616c76", height: "14px", width: "14px" }} />
                      </button>
                  </div>
                </div>
                <div>
                  <div className='-mt-6 relative pt-6 px-4'>
                    <form onSubmit={(event) => event.preventDefault()}>
                      <input onChange={onChangeHandler} className='w-[99.5%] bg-[#f6f6f6] text-[#111b21] tracking-wider pl-9 py-[8px] rounded-[9px] outline-0' type="text" name="search" placeholder="Search" />
                    </form>
                    <div className='absolute top-[36px] left-[27px]'>
                      <BsSearch style={{ color: "#c4c4c5" }} />
                    </div>
                    <Group />
                    <div style={{ display: search ? "" : "none" }} className='h-[100vh] absolute z-10 w-[100%] left-[0px] top-[70px] bg-[#fff] flex flex-col gap-y-3 pt-3 px-4'>
                      <Search searchResults={searchResults} isLoading={isLoading} handleClick={handleClick} search={search} />
                    </div>
                  </div>
                  <Contacts />
                </div>
              </div> : <Profile className="min-w-[100%] sm:min-w-[360px] h-[100vh] bg-[#fafafa] shodow-xl relative" />
          }
          <Chat className="chat-page relative lg:w-[100%] h-[100vh] bg-[#fafafa]" />
        </div>
      </div >
    </>
  )
}

export default Home;
