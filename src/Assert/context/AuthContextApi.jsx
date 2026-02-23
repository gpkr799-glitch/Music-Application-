import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { __AUTH } from "../../Backend/FireBaseConfiguration.js"; // Ensure __AUTH is correctly initialized

// Step 1: Create Context
export let AuthUserContext = createContext(null);

// Initialize Firebase Auth (ensure __AUTH is an instance of getAuth())
const auth = __AUTH; // If __AUTH is already getAuth(), use __AUTH instead.

const AuthContextApi = ({ children }) => {
    let [authUser, setAuthUser] = useState(null); // FIXED: Default state should be null

    useEffect(() => {
        // Listen to authentication state changes
        const unsubscribe = onAuthStateChanged(__AUTH, (userInfo) => {
            if (userInfo) {
                window.localStorage.setItem("UserToken", userInfo.accessToken);
                setAuthUser(userInfo);
            } else {
                setAuthUser(null);
                window.localStorage.removeItem("UserToken");
            }
        });

        // Cleanup on unmount
        return () => unsubscribe();
    }, []);

    // Logout Functionality
    let Logout = async () => {
        try {
            await signOut(__AUTH);
            window.localStorage.removeItem("UserToken");
            toast.success("Logout Successfully");
            setTimeout(() => {
                window.location.assign("/");
            }, 1000);
        } catch (error) {
            toast.error(error.code.slice(5));
        }
    };

    return (
        <AuthUserContext.Provider value={{ authUser, Logout }}>
            {children}
        </AuthUserContext.Provider>
    );
};

export default AuthContextApi;