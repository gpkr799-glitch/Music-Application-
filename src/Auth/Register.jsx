import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { __AUTH } from '../Backend/FireBaseConfiguration';
import { NavLink, useNavigate } from 'react-router-dom';
import Spinner from '../Helper/Spinner';


const Register = () => {
  let navigate=useNavigate();
  let [userData, setUserData] = useState({
    userName:"",
    Email:"",
    Password:"",
    ConfirmPasssword:""
  })

  let[showPassword1,setShowPassword1] = useState(false);
  let [showPassword2, setshowPassword2] = useState(false);

  let [isLoading,setIsLoading]=useState(false);


  //! Destructuring of an user data
  let {userName,Email,Password,ConfirmPassword}=userData;

  let handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({...userData,[name]: value});
  }

  let handleSubmit= async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if(Password===ConfirmPassword){
        let registeredUser = await createUserWithEmailAndPassword(__AUTH, Email, Password);
      console.log(registeredUser);
     //  ! send email verification
     sendEmailVerification(registeredUser.user);

     updateProfile(registeredUser.user,{
      displayName: userData.userName,
      photoURL:"https://th.bing.com/th/id/OIP.6aJx1Z6XDZSpIw9blsJ4yAHaHw?w=860&h=900&rs=1&pid=ImgDetMain"
     })
  
      toast.success(`Email verification has been sent to your registered ${Email}`);

      toast.success("User has been registered successfully!");
      navigate("/auth/login");
      }else{
        toast.error("Password does not match");
        setUserData({
         password:"",
         confirmPassword:""
        })
      }
 
 } catch (error) {
   toast.error(error.code.slice(5));
 }
 setIsLoading(false);
};

  let togglePassword1 =() =>{
    setShowPassword1(!showPassword1);
  }

  let togglePassword2 = () => {
    setshowPassword2(!showPassword2);
  }
  return (
    <section className="'text-white w-[100vw] min-h-[90vh] flex justify-center items-center'">
      <article className='w-[30%] bg-gray-700 p-5'>
        <header className='text-center text-3xl font-bold py-3'>
          <h1>Register</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col mb-3 p-3'>
            <label htmlFor="userName" className='font-semibold text-lg mb-2'>User Name</label>
            <input type='text' id='userName' placeholder='Enter your name' className='outline-none border border-gray-500 p-2 rounded-lg'
            name='userName'
            value={userName}
            onChange={handleInputChange}/>
          </div>
          <div  className='flex flex-col mb-3 p-3'>
            <label htmlFor="Email" className='font-semibold text-lg mb-2'>Email</label>
            <input type="Email"  id='Email'  placeholder='Enter your Email' className='outline-none border border-gray-500 p-2 rounded-lg'
            name='Email'
            value={Email}
            onChange={handleInputChange}/>
          </div>
          <div  className='flex flex-col mb-3 p-3 relative'>
            <label htmlFor="Password">Password</label>
            <input type={showPassword1 ? "text":"Password"}id='Password' placeholder='Enter your Password' className='outline-none border border-gray-500 p-2 rounded-lg'
            name='Password'
            value={Password}
            onChange={handleInputChange}/>
            <span onClick={togglePassword1} className='absolute bottom-[25px] right-[15px] cursor-pointer ' >
              {showPassword1 ? <IoEye/> : <IoEyeOff/>}
            </span>
          </div>
          <div  className='flex flex-col mb-3 p-3 relative'>
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <input type={showPassword2 ? "text":"Password"} id='ConfirmPassword' placeholder='Enter your ConfirmPassword' className='outline-none border border-gray-500 p-2 rounded-lg'
            name='ConfirmPassword' 
            value={ConfirmPassword}
            onChange={handleInputChange}/>
            <span onClick={togglePassword2} className='absolute bottom-[25px] right-[15px] cursor-pointer ' >
              {showPassword2 ? <IoEye/> : <IoEyeOff/>}
            </span>
          </div>
          <div  className='flex flex-col mb-3 p-3'>
            <button  className='bg-blue-600 py-2 text-lg rounded-lg cursor-pointer font-semibold hover:bg-blue-700' >Register</button>
          </div>
          <div clasName="flex justify-center items-cente">
            <NavLink to={"/auth/login"} className={"hover:text-blue-400 hover:underline"}>Already have an account?</NavLink>
          </div>
        </form>
      </article>
      {isLoading && (<section className="w-[100%] h-[100vh] bg-black/50 fixed top-0">
        <Spinner/>
      </section>)}
    </section>
  )
}

export default Register;