import React from 'react'
import { Outlet } from 'react-router-dom';

const AdminContent = () => {
  return (
    <div className='text-black basis-[85%]'>
        <Outlet/>
    </div>
  )
}

export default AdminContent;