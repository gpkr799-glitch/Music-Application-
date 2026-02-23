import React from 'react'
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSolidAlbum } from "react-icons/bi";

const AlbumLandingSideBar = () => {
  return (
    <aside className='basis-[15%] bg-gray-700 min-h-[calc(100vh-70px)] fixed top-[70px]'>
       <nav className='w-full px-5 py-3'>
        <ul className='w-full flex flex-col'>
            <li className='py-2 px-6 bg-rose-600 rounded flex items-center gap-2'>
                <span className='text-xl'><GiHamburgerMenu/></span>
                <span className='text-lg tracking-wider'>Explore</span>
            </li>
            <li>
                <NavLink to={"/"} end className={({isActive}) => `${isActive ? "bg-blue-600 hover:bg-blue-600" :""} py-2 px-6 hover:bg-blue-600 cursor-pointer flex items-center gap-2 rounded`}>
                    <BiSolidAlbum/>
                    <span>Popular Album</span>
                </NavLink>
            </li>
        </ul>
       </nav>
    </aside>
  )
}

export default AlbumLandingSideBar