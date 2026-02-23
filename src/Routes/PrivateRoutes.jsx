import React, { Children, useContext } from 'react'
import { AuthUserContext } from '../Assert/context/AuthContextApi'
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({Children}) => {
    let {authUser} = useContext(AuthUserContext);

    //! This is for profile container
    if (authUser == null) {
        return <Navigate to={"/auth/login"}/>
    }else {
      return  <>{Children}</>
    }
}

export default PrivateRoutes