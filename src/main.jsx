import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./Global.css"
import { RouterProvider } from 'react-router-dom'
import myRoutes from './Routes/routes'
import AuthContextApi from './Assert/context/AuthContextApi'
import FetchUserContext from './Assert/context/FetchUserContext'
import AudioPlayerContext from './Assert/context/AudioPlayerContext'

ReactDOM.createRoot(document.getElementById("root")).render(
    <>
    <AuthContextApi> 
        <FetchUserContext>
        <AudioPlayerContext>
        <RouterProvider router={myRoutes}/> 
        </AudioPlayerContext>
        </FetchUserContext>
    </AuthContextApi>
    </>
)