import React, { createContext, useContext, useEffect, useState,  } from 'react'
import { AuthUserContext } from './AuthContextApi';
import { doc, onSnapshot } from 'firebase/firestore';
import { __DB } from '../../Backend/FireBaseConfiguration';


//! step-1: create context for the backgroung user
export let BackendUserContext=createContext(null);

const FetchUserContext = ({children}) => {
    let {authUser} = useContext(AuthUserContext);
    let uid = authUser?.uid;

    let [userData,setUserData] = useState();
   
    
    useEffect(() => {
        if(!uid) {
            return
        }
        let fetchProfile= () => {
            let user_details_ref = doc(__DB,"user_details",uid);
            onSnapshot(user_details_ref, (userInfo) => {
                if(userInfo.exists()){
                    setUserData(userInfo?.data());
                    console.log(userData)
                } else {
                    console.log("user Profile data not found");
                }
            })
        }
        fetchProfile();
    },[uid])
  return (
    <BackendUserContext.Provider value={{userData}}>
        {children}
    </BackendUserContext.Provider>
  )
}

export default FetchUserContext;