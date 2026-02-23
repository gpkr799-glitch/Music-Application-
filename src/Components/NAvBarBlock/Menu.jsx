import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { FiLogOut } from "react-icons/fi";
import { AuthUserContext } from '../../Assert/context/AuthContextApi';
import { BackendUserContext } from '../../Assert/context/FetchUserContext';

const Menu = () => {
  let {authUser,Logout}=useContext(AuthUserContext);
  console.log(authUser);

  let {userData}=useContext(BackendUserContext);
  let role= userData?.role;
  console.log(role);
  

  //for unkonwn user
  let AnonymousUser=()=>{
    return<>
      <li><NavLink to={"/auth/login"} className={ ({isActive})=>`${isActive ? "bg-[#adadad]":""} px-4 py-2 font-semibold text-black rounded-lg cursor-pointer`}>Login</NavLink></li>
      <li><NavLink to={"/auth/register"} className={ ({isActive})=>`${isActive ? "bg-[#adadad]":""} px-4 py-2 font-semibold text-black rounded-lg cursor-pointer`}>Register</NavLink></li>
    </>
  };
  //for verified user
  let AuthenticatedUser = () => {
    return <>
    {role ==="admin" &&(<li><NavLink to={"/admin"}  end className={ ({isActive})=>`${isActive ? "bg-[#adadad] ":""} px-4 py-2 font-semibold text-black rounded-lg cursor-pointer flex`}>Admin</NavLink></li>)}
      <li>
        <NavLink to={"/user/profile"} className={ ({isActive})=>`${isActive ? "bg-[#adadad] ":""} px-4 py-2 font-semibold text-black rounded-lg cursor-pointer flex`}>
        <span className='flex gap-2'>
          {authUser?.displayName}
          <img className='w-[30px] h-[30px] rounded-full ' src={authUser?.photoURL}/>
        </span>
        </NavLink>
      </li>
      <li>
        <button onClick={()=>{Logout()}
        } className={`px-4 py-2 font-semibold hover:bg-red-500 text-black rounded-lg cursor-pointer`}>
          <span>
            Logout
          </span>
          <span className='flex justify-center items-center gap-2 cursor-pointer '>
            <FiLogOut />
          </span>
        </button>
      </li>
    </>
  }
  return (
    <aside className='basis-[40%] h-[70px]'>
        <ul className='flex justify-evenly items-center h-[70px]'>
            <li><NavLink to={"/"} className={ ({isActive})=>`${isActive ? "bg-[#adadad]":""} px-4 py-2 font-semibold text-black rounded-lg cursor-pointer`}>Home</NavLink></li>
            {authUser===null?<AnonymousUser/>:<AuthenticatedUser/>}
        </ul>
    </aside>
  )
}

export default Menu