import React from 'react'
import LUXURYLOGO from "../../Assert/LUXURYLOGO.png"

const Logo = () => {
  return (
    <aside className="basis-[15%] ">
        <figure className="w-full h-[70px] flex justify-center">
            <img src={LUXURYLOGO} alt="LUXURYLOGO  " />
        </figure>
    </aside>
  )
}

export default Logo;