import React, { useContext } from 'react'
import { AuthUserContext } from '../Assert/context/AuthContextApi'
import { Navigate } from 'react-router-dom';

const PublicRoutes = ({children}) => {
 let {authUser} = useContext(AuthUserContext);

 //! This is for login, register ang reset password
 if (authUser != null){
    return <Navigate to={"/user/profile"}/>
 }else { 
 return <>{children}</>;
 }
}

export default PublicRoutes