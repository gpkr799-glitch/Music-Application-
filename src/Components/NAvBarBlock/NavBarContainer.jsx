import React from 'react'
import Menu from './Menu'
import Logo from './Logo'

const NavBarContainer = () => {
  return (
    <header className="w-[100vw] h-[70px] bg-gray-600 flex justify-between items-center fixed z-10">
        <Logo/>
        <Menu/>
    </header>
  )
}

export default NavBarContainer