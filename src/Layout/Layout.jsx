import React from 'react'
import NavBarContainer from '../Components/NAvBarBlock/NavBarContainer'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const Layout = () => {
  return (
    <div>
      <Toaster />
      <NavBarContainer />
      <Outlet />
    </div>
  )
}

export default Layout