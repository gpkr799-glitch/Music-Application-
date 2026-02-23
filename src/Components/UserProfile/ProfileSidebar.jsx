import React from 'react'
import { NavLink } from 'react-router-dom'
import { RiAccountBoxFill } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa";
import { MdAddPhotoAlternate } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

const ProfileSidebar = () => {
  return  <aside className='basis-[17%] bg-gray-900 h-[calc(100vh-70px)]'>
    <nav className='w-full'>
        <ul className="w-full p-5 flex flex-col" >
            <li><NavLink to={"/user/Profile"} className={"bg-blue-600 flex items-center py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer mb-4 gont-semibold"}>
                <span className="text-xl"><RiAccountBoxFill/> </span>
                <span>My Account</span>
                </NavLink>
            </li>
            <li><NavLink to={"/user/Profile/add-profile"} className={"bg-blue-600 flex items-center py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer mb-4 gont-semibold"}>
                <span className="text-xl"><FaUserPlus/></span>
                <span>Add Profile</span>
                </NavLink>
            </li>
            <li><NavLink to={"/user/Profile/upload-profile-photo"} className={"bg-blue-600 flex items-center py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer mb-4 gont-semibold"}>
                <span className="text-xl"><MdAddPhotoAlternate/></span>
                <span>Upload Profile Photo</span>
                </NavLink>
            </li>
            <li><NavLink to={"/user/Profile/change-password"} className={"bg-blue-600 flex items-center py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer mb-4 gont-semibold"}>
                <span className="text-xl"><RiLockPasswordFill/></span>
                <span>Change Password</span>
                </NavLink>
            </li>
            <li><NavLink to={"/user/Profile/delete-account"} className={"bg-blue-600 flex items-center py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer mb-4 gont-semibold"}>
                <span className="text-xl">< MdDelete/></span>
                <span>Delete Account</span>
                </NavLink>
            </li>
        </ul>
    </nav>
  </aside>
}

export default ProfileSidebar