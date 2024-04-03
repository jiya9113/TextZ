import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { IoArrowBack } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { toast } from 'react-toastify';

import { setShowProfile } from '../redux/profileSlice';
import { setUserNameAndBio } from '../redux/activeUserSlice';

import { updateUser } from '../api/auth';

import InputEdit from './profile/input-edit';

const Profile = (props) => {
  const dispatch = useDispatch();

  const { showProfile } = useSelector((state) => state.profile);
  const activeUser = useSelector((state) => state.activeUser);

  const [formField, setFormField] = useState({
    name: activeUser.name,
    bio: activeUser.bio
  });

  const logoutUser = () => {
    toast.success("Logout Successful!");
    localStorage.removeItem("userToken");
    window.location.href = "/login";
  };
  
  const onChangeHandler = (event) => {
    setFormField({ ...formField, [event.target.name]: event.target.value });
  };

  const submit = async () => {
    dispatch(setUserNameAndBio(formField));
    toast.success("Updated!");
    await updateUser(activeUser.id, formField);
  }

  return (
    <div style={{ transition: showProfile ? "0.3s ease-in-out" : "" }} className={props.className}>
      <div className='absolute  w-[100%]'>
        <div className='bg-[#166e48] pt-12 pb-3'>
          <button onClick={() => dispatch(setShowProfile(false))} className='flex items-center'>
            <IoArrowBack style={{ color: "#fff", width: "30px", height: "20px" }} />
            <h6 className='text-[16px] text-[#fff] font-semibold'>Profile</h6>
          </button>
        </div>
        <div className=' pt-5'>
          <div className='flex items-center flex-col'>
            <img className='w-[150px] h-[150px] rounded-[100%] -ml-5' src={activeUser?.profilePic} alt="" />
          </div>
          <InputEdit type="name" handleChange={onChangeHandler} input={formField.name} handleSubmit={submit} />
          <div>
            <div className='py-5 px-4'>
              <p className='text-[10px] tracking-wide text-[#3b4a54] '>
                This is not your username or pin. This name will be visible to your contacts
              </p>
            </div>
          </div>
          <InputEdit type="bio" handleChange={onChangeHandler} input={formField.bio} handleSubmit={submit} />
        </div>
        <div onClick={logoutUser} className='flex items-center justify-center mt-5 cursor-pointer shadow-2xl'>
          <IoMdLogOut className='text-[#e44d4d] w-[27px] h-[23px]' />
          <h6 className='text-[17px] text-[#e44d4d] font-semibold'>Logout</h6>
        </div>
      </div>
    </div>
  )
};

export default Profile;