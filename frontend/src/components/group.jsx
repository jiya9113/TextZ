import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { BsPlusLg } from "react-icons/bs";
import { Modal, Box } from "@mui/material";
import { RxCross2 } from "react-icons/rx";

import { fetchChats } from '../redux/chatsSlice';

import { searchUsers } from '../api/auth';
import { createGroup } from '../api/chat';


import Search from './group/search';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2
};

const Group = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [chatName, setChatName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const searchChange = async () => {
      setIsLoading(true);
      const response  = await searchUsers(search);
      if(response){
        setSearchResults(response.data);
      }
      setIsLoading(false);
    }
    searchChange();
  }, [search]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearch("");
    setSelectedUsers([]);
  };

  const onChangeHandler = async (event) => {
    setSearch(event.target.value);
  };

  const handleClick = (user) => {
    if(selectedUsers.includes(user)){
      return;
    }
    setSelectedUsers([...selectedUsers, user]);
  };

  const deleteSelectedUser = (user) => {
    setSelectedUsers(selectedUsers.filter((ele) => ele._id !== user._id));
  };

  const handleSubmit = async () => {
    if (selectedUsers.length >= 2) {
      await createGroup({
        chatName,
        users: JSON.stringify(selectedUsers.map((user) => user._id))
      });
      dispatch(fetchChats());
      handleClose();
    }
  };

  
  return (
    <>
      <button className='mt-1 transition duration-150 ease-in-out' onClick={handleOpen}>
        <div className='flex justify-start border-r-2'>
          <button className='text-[11px] font-normal tracking-wide flex items-center gap-x-1 bg-[#f6f6f6] text-[#1f2228] py-1 -mb-7 mt-2  px-2'>New Group <BsPlusLg /></button>
        </div>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <h5 className='text-[18px] text-[#111b21] font-medium text-center'>Create A Group</h5>
          <form onSubmit={(event) => event.preventDefault()} className='flex flex-col gap-y-3 mt-3'>
            <input onChange={(event) => setChatName(event.target.value)} className="border-[#c4ccd5] border-[1px] text-[13.5px] py-[4px] px-2 w-[100%]" type="text" name="chatName" placeholder="Group Name" required />
            <input onChange={onChangeHandler} className="border-[#c4ccd5] border-[1px] text-[13.5px] py-[4px] px-2 w-[100%]" type="text" name="users" placeholder="add users" />
            <div className='flex -mt-2'>
              {
                selectedUsers?.map((user) => {
                  return (
                    <button key={user} onClick={() => deleteSelectedUser(user)} className='flex items-center gap-x-1 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400'>
                      <span >{user.name}</span>
                      <RxCross2 />
                    </button>
                  )
                })
              }
            </div>
            <Search isLoading={isLoading} handleClick={handleClick} search={search} searchResults={searchResults} />
            <div className='flex justify-end mt-3'>
              <button onClick={handleSubmit} className='bg-[#0086ea] text-[#fff] text-[15px] font-medium px-2 py-1 tracking-wide' type='submit'>Create</button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  )
};

export default Group;