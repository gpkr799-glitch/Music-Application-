import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import { __AUTH } from '../Backend/FireBaseConfiguration';
import { toast } from 'react-hot-toast';  // Ensure this import
import Spinner from '../Helper/Spinner';

const ResetPassword = () => {
    let navigate = useNavigate();
    let [email, setEmail] = useState("");
    let [isLoading, setIsLoading] = useState(false);

    let handleInputChange = (e) => {
        let value = e.target.value;
        setEmail(value);
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Send password reset email
            await sendPasswordResetEmail(__AUTH, email);
            toast.success(`Reset Password email has been sent to ${email}`);
            navigate("/auth/login");
        } catch (error) {
            // Handle error, show a user-friendly message
            const errorMessage = error.code ? error.code.slice(5).replace(/-/g, ' ') : 'An unexpected error occurred.';
            toast.error(errorMessage);
        }
        setIsLoading(false);
    };

    return (
        <section className="text-black w-[100vw] min-h-[90vh] flex justify-center items-center">
            <article className="w-[30%] bg-gray-700 p-5 rounded-xl">
                <header className="text-center text-3xl font-bold py-3">
                    <h1>Reset Password</h1>
                </header>
                <form onSubmit={handleSubmit}> {/* Change onClick to onSubmit */}
                    <div className="flex flex-col mb-4 p-3 relative">
                        <label htmlFor="email" className="font-semibold text-lg mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="outline-none border border-gray-500 p-2 rounded-lg"
                            name="email"
                            onChange={handleInputChange}
                            value={email}
                            
                            required
                        />
                        <span className="absolute bottom-[25px] right-[20px] text-lg cursor-pointer">
                            <FaUser />
                        </span>
                    </div>

                    <div className="flex flex-col mb-4 p-3">
                        <button
                            type="submit"
                            className="bg-blue-600 py-2 text-lg rounded-lg cursor-pointer font-semibold hover:bg-blue-700"
                            disabled={isLoading}  // Disable button while loading
                        >
                            Reset Password
                        </button>
                    </div>

                    <div className="flex justify-center items-center">
                        <NavLink
                            to="/auth/login"
                            className="hover:text-blue-500 hover:underline"
                        >
                            Cancel
                        </NavLink>
                    </div>
                </form>
            </article>
            {isLoading && (<section className="w-[100%] h-[100vh] bg-black/50 fixed top-0">
        <Spinner/>
      </section>)}
        </section>
    );
};

export default ResetPassword;
