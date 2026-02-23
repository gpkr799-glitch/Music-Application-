import React from 'react'
import { Outlet } from 'react-router-dom'

const AlbumLandingContent = () => {
  return (
    <div className='basis-[85%] h-[calc(100vh-70px)] ml-[200px] mt-[100px] z-0'>
        <Outlet/>
    </div>
  )
}

export default AlbumLandingContent