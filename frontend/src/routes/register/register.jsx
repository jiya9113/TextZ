import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { BsEmojiLaughing, BsEmojiExpressionless } from "react-icons/bs";
import { toast } from 'react-toastify';

import { registerUser, validUser } from "../../api/auth";

const defaultInput = {
    firstName : "",
    lastName : "",
    email : "",
    password : ""
}

const Register = () => {
    const [formField, setFormField] = useState(defaultInput);
    const [isLoading, setIsLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const { firstName, lastName, email, password } = formField;

    const navigate = useNavigate();

    const onChangeHandler = (event) =>{
        setFormField({...formField,[event.target.name]: event.target.value});
    }

    const formSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        if(email.includes("@")  && password.length > 6){
            const response = await registerUser(formField);
            if(response){
              if(response.data?.token){
                localStorage.setItem("userToken", response.data.token);
                toast.success("Successfully Registered!");
                setIsLoading(false);
                navigate("/chats");
              }
              else{
                  setIsLoading(false);
                  toast.error("Invalid Credentials!");
              }
            }
        }
        else{
            setIsLoading(false);
            toast.warning("Provide Valid Credentials!");
            setFormField({...formField, password : ""});
        }
    }

    return (
    <div className='bg-[#121418] w-[100vw] h-[100vh] flex justify-center items-center'>
      <div className='w-[90%] sm:w-[400px] pl-0 ml-0 h-[400px] sm:pl-0 sm:ml-9 mt-10 relative'>
        <div className='absolute -top-7 left-0'>
          <h3 className=' text-[25px] font-bold tracking-wider text-[#fff]'>Register</h3>
          <p className='text-[#fff] text-[12px] tracking-wider font-medium'>Have Account ? <Link className='text-[rgba(0,195,154,1)] underline' to="/login">Sign in</Link></p>
        </div>
        <form className='flex flex-col gap-y-3 mt-[12%]' onSubmit={formSubmit}>
          <div className='flex gap-x-2 w-[100%]'>
            <input onChange={onChangeHandler} className='bg-[#222222] h-[50px] pl-3 text-[#ffff] w-[49%] sm:w-[47%]' type="text" name="firstName" placeholder='First Name' value={firstName} required />
            <input onChange={onChangeHandler} className='bg-[#222222] h-[50px] pl-3 text-[#ffff] w-[49%] sm:w-[47%]' type="text" name="lastName" placeholder='Last Name' value={lastName} required />
          </div>
          <div>
            <input onChange={onChangeHandler} className='bg-[#222222] h-[50px] pl-3 text-[#ffff] w-[100%] sm:w-[96.3%]' type="email" name="email" placeholder="Email" value={email} required />
          </div>
          <div className='relative flex flex-col gap-y-3'>
            <input onChange={onChangeHandler} className='bg-[#222222] h-[50px] pl-3 text-[#ffff] w-[100%] sm:w-[96.3%]' type={showPass ? "text" : "password"} name="password" placeholder="Password" value={password} required />
            {
              !showPass ? <button type='button'><BsEmojiLaughing onClick={() => setShowPass(!showPass)} className='text-[#fff] absolute top-3 right-4 sm:right-6 w-[30px] h-[25px]' /></button> : <button type='button'> <BsEmojiExpressionless onClick={() => setShowPass(!showPass)} className='text-[#fff] absolute top-3 right-4 sm:right-6 w-[30px] h-[25px]' /></button>
            }
          </div>
          <button style={{ background: "linear-gradient(90deg, rgba(0,195,154,1) 0%, rgba(224,205,115,1) 100%)" }} className='w-[100%]  sm:w-[96.3%] h-[50px] font-bold text-[#121418] tracking-wide text-[17px] relative' type='submit'>
            <div style={{ display: isLoading ? "" : "none" }} className='absolute -top-[53px] left-[29.5%] sm:-top-[53px] sm:left-[87px]'>
              <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_h9kds1my.json" background="transparent" speed="1" style={{ width: "200px", height: "160px" }} loop autoplay></lottie-player>
            </div>
            <p style={{ display: isLoading ? "none" : "block" }} className='test-[#fff]'>Regsiter</p>
          </button>
        </form>
      </div>
    </div>
    )
}

export default Register;