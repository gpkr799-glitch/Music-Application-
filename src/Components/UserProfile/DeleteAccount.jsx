import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthUserContext } from "../../Assert/context/AuthContextApi";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "firebase/auth";



const DeleteAccount = () => {

  let {authUser} = useContext(AuthUserContext)
  let navigate = useNavigate();
  let [confirmText, setConfirmText] = useState("");

  let handleInputChange = (e) =>{
    let value = e.target.value;
    setConfirmText(value);
  }

  let handlesubmit = async (e) =>{
    e.preventDefault();
    try {
      //! logic for deleting the user
      if(confirmText!=="DELETE"){
        toast.error("Please enter the DELETE text")
      }

      // await deleteUser(authUser)

      setTimeout(() => {
        navigate("/auth/register")
      })
      toast.success("User has been deleted successfully");
    } catch (error) {
      toast.error(error.code.slice(5));
    }
  }

  return (
    <section className="w-full h-[calc(100vh-70px)] flex flex-col justify-center items-center text-white">
      <article className="w-[60%] bg-gray-900 rounded-t-md px-4">
        <header className="w-[100%]">
          <h1 className="text-3xl font-bold uppercase py-8 px-4">
            Deleting Account
          </h1>
        </header>
        <div className="py-2 px-4 text-lg">
          <p>
            Deleting your account will remove all of your information from our
            database.
          </p>
          <p>This action cannot be recovered.</p>
        </div>
      </article>
      <main className="w-[60%] bg-gray-900 px-4">
        <form onSubmit={handlesubmit}>
          <div className="py-2 px-4 text-lg">
            <label htmlFor="confirmText">
              To confirm this, type
              <code className="bg-gray-700 mx-2">"DELETE"</code>
            </label>
          </div>
          <div className="mb-6 px-4 py-2 text-lg flex justify-between items-center">
            <input
              type="text"
              name="confirmText"
              id="confirmText"
              className="px-2 py-2 bg-white outline-none rounded-md font-semibold focus:ring-2 focus:ring-red-600 text-red-600"
              value={confirmText}
              onChange={handleInputChange}
            />
           <button
              className={`py-2 px-20 rounded-md ${
                confirmText === "DELETE"
                  ? "bg-red-600 hover:bg-red-700 cursor-pointer"
                  : "bg-gray-600 cursor-not-allowed"
              } `}
              disabled={confirmText !== "DELETE"}
            >
              Delete
            </button>
          </div>
        </form>
      </main>
    </section>
  );
};

export default DeleteAccount;