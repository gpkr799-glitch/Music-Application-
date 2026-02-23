import React from 'react'
import AdminSidebar from './AdminSideBar';
import AdminContent from './AdminContent';

const AdminContainer = () => {
  return (
    <section className='w-[100vw] flex text-white'>
        <AdminSidebar/>
        <AdminContent/>
    </section>
  )
}

export default AdminContainer;