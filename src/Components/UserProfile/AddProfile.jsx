import React, { useContext, useState } from 'react';
import languages from './Json/languages.json'
import cities from "./Json/cities.json"
import states from "./Json/states.json"
import contries from "./Json/countries.json"
import { doc, setDoc } from 'firebase/firestore';
import { __DB } from '../../Backend/FireBaseConfiguration';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthUserContext } from '../../Assert/context/AuthContextApi';
import toast from 'react-hot-toast';


const Addprofile = () => {
  let {authUser}=useContext(AuthUserContext)
  let navigate=useNavigate()
  let Location = useLocation();
  
  let[userDetails,setUserDetails]=useState({
    userName: Location?.state?.userName,
    contactNumber: Location?.state?.contactNumber,
    gender: Location?.state?.gender,
    dob: Location?.state?.dob,
    age: Location?.state?.age,
    lang: Location?.state?.lang,
    country: Location?.state?.country,
    state: Location?.state?.state,
    city: Location?.state?.city,
    address: Location?.state?.address,
    role:"user"
  })

  let {
    userName,contactNumber,gender,dob,age,lang,country,state,city,address,role
  }=userDetails

  let handleInputChange=(e)=>{
    let name=e.target.name
    let value=e.target.value
    setUserDetails({...userDetails,[name]:value});
  }

  let handleSubmit=async (e)=>{
    
    e.preventDefault();
    try{
      //extracting 4 properties from the authUser
      let {displayName,photoURL,email,uid}=authUser
      //create an object to send inside the database
      //payload object-payload is nothing but the actual object send to the database
      //in the programming language the actual object is called as payload

      let payload={
        ...userDetails,
        displayName,
        photoURL,
        email,
        uid,
      }
      //step1:create a document reference inside the database(cloud firestore)
      let user_profile_collection= doc(__DB,"user_details",uid)
      //step2: set or store the data inside the data base
      await setDoc(user_profile_collection,payload);
      navigate("/user/profile")
      toast.success("user details has been uploaded")

    }catch(error){
      toast.error(error.code.slice(5));
      console.log("error while uploading data:",error);
    }
  }
  
  return (
    <section className="w-[100%] h-[calc(100vh-70px)] flex flex-col justify-center items-center">
      <article className="w-[80%] bg-[black] border  border-[gray]  p-6 rounded-lg shadow-lg">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">Add Profile</h1>
        </header>
        <form  className="grid grid-cols-3 gap-6" onSubmit={handleSubmit}>

          <div className="flex flex-col">
            <label htmlFor="userName" className="text-gray-300 mb-2">
              User Name:
            </label>
            <input
              type="text"
              id="userName"
              name='userName'
              value={userName}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="py-2 px-4 rounded-lg border border-white text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="contactNumber" className="text-gray-300 mb-2">
              Contact Number:
            </label>
            <input
              type="tel"
              id="contactNumber"
              name='contactNumber'
              value={contactNumber}
              onChange={handleInputChange}
              placeholder="Enter your contact number"
              className="py-2 px-4 rounded-lg border border-white text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="gender" className="text-gray-300 mb-2">
              Gender:
            </label>
            <div>
              <input type="radio" name="gender" id="male" value="male" onChange={handleInputChange} checked={gender === "male"}/>Male &nbsp; &nbsp;
              <input type="radio" name="gender" id="female" value="female" onChange={handleInputChange} checked={gender === "female"}/>Female
              
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="dob" className="text-gray-300 mb-2">
              Date of Birth:
            </label>
            <input
              type="date"
              id="dob"
              name='dob'
              value={dob}
              onChange={handleInputChange}
              className="py-2 px-4 rounded-lg border border-white text-white focus:outline-none focus:ring-2 focus:ring-white"
              
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="age" className="text-gray-300 mb-2">
              Age:
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={handleInputChange}
              placeholder="Enter your age"
              className="py-2 px-4 rounded-lg border border-white text-white focus:outline-none focus:ring-2 focus:ring-white"
              
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lang" className="text-gray-300 mb-2">
              Language:
            </label>
            <input
              type="text"
              id="lang"
              name='lang'
              value={lang}
              onChange={handleInputChange}
              placeholder="Enter your language"
              className="py-2 px-4 rounded-lg border border-white text-white focus:outline-none focus:ring-2 focus:ring-white"
              list='langlist'
            />
            <datalist id='langlist'>
              {
                languages.map((languages,index)=>{
                  return<option key={index}>{languages}</option>
                })
              }
            </datalist>
          </div>

          <div className="flex flex-col">
            <label htmlFor="country" className="text-gray-300 mb-2">
              Country:
            </label>
            <input
              type="text"
              id="country"
              name='country'
              value={country}
              onChange={handleInputChange}
              placeholder="Enter your country"
              className="py-2 px-4 rounded-lg border border-white text-white focus:outline-none focus:ring-2 focus:ring-white"
              list='conuntry'
            />
            <datalist id='country'>
            {
                contries.map((contries,index)=>{
                  return<option key={index}>{contries}</option>
                })
              }
            </datalist>
          </div>

          <div className="flex flex-col">
            <label htmlFor="state" className="text-gray-300 mb-2">
              State:
            </label>
            <input
              type="text"
              id="state"
              name='state'
              value={state}
              onChange={handleInputChange}
              placeholder="Enter your state"
              className="py-2 px-4 rounded-lg border border-white text-white focus:outline-none focus:ring-2 focus:ring-white"
              list='statelist'
            />
            <datalist id='statelist'>
            {
                states.map((states,index)=>{
                  return<option key={index}>{states}</option>
                })
              }
            </datalist>
          </div>

          <div className="flex flex-col">
            <label htmlFor="city" className="text-gray-300 mb-2">
              City:
            </label>
            <input
              type="text"
              id="city"
              name='city'
              value={city}
              onChange={handleInputChange}
              placeholder="Enter your city"
              className="py-2 px-4 rounded-lg border border-white text-white focus:outline-none focus:ring-2 focus:ring-white"
              list='citylist'
            />
            <datalist id='citylist'>
            {
                cities.map((cities,index)=>{
                  return<option key={index}>{cities}</option>
                })
              }
            </datalist>
          </div>

          <div className="flex flex-col col-span-3">
            <label htmlFor="address" className="text-gray-300 mb-2">
              Address:
            </label>
            <textarea
              id="address"
              name='address'
              value={address}
              onChange={handleInputChange}
              placeholder="Enter your address"
              className="py-2 px-4 rounded-lg border border-white text-white focus:outline-none focus:ring-2 focus:ring-white"
              rows="3"
              list='langlist'
            ></textarea>
          </div>

          <div className="col-span-3 flex justify-center">
            <button
              type="submit"
              className="py-2 px-4 rounded-lg border border-white text-blue-600 focus:outline-none focus:ring-2 focus:ring-white"
            >
              Add Profile
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default Addprofile;