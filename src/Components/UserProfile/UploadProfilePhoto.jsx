import { updateProfile } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { AuthUserContext } from '../../Assert/context/AuthContextApi';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../helper/Spinner';


const UploadProfilePhoto = () => {
    let[PhotoFile,setPhotoFile]=useState("");
    let[PhotoPreview,setPhotoPreview]=useState(null)
    let{authUser}=useContext(AuthUserContext)
   let navigate= useNavigate()
   let [isLoading,setisLoading]=useState(false)

    let handleFileInputChange=(e)=>{
        let file=e.target.files[0]
        // console.log(file)
        // URL.createobjectURL(file)
        URL.createObjectURL(file)
        setPhotoPreview(URL.createObjectURL(file))
        setPhotoFile(file)
    }
    let handleSubmit= async (e)=>{
        e.preventDefault();
        setisLoading(true)
        try {
            if(!PhotoFile){
                toast.error("please select a file before uploading")
                return;
            }
            //converting image into binary data
            // formData()->API
            let fileData = new FormData();
            fileData.append("file",PhotoFile)
            fileData.append("upload_preset","music-application");
            fileData.append("cloud_name","debk2afrp");
            // upload your binary data to th cloudinary

            let response= await fetch("https://api.cloudinary.com/v1_1/debk2afrp/image/upload",{
                method:"POST",
                body:fileData
            });
            let result =await response.json();
            let imageUrl =result.url
            // update the profile
            await updateProfile(authUser,{
                photoURL:imageUrl
            });
            toast.success("successfully updated")
            navigate("/user/profile")
            
        } catch (error) {
            toast.error(error.code.slice(5))
            
        }      
        isLoading(false)
                
    }
return (
    <section  className='w-[70vw] h-[calc(100vh-70px)] flex flex-col justify-center items-center text-white'>
        <article className='w-[35%] bg-gray-900 flex flex-col justify-center items-center rounded-md'>
            <header className='w-full'>

                <h1 className='text-3xl text-center text-white font-bold uppercase py-3 px-4'>
                  Upload Profile Photo
                </h1>
                </header>
                {PhotoPreview===null?<><div className='w-[150px] h-[150px] border rounded-full border-white flex justify-center items-center bg-gray-500'>
                    No File selected
                    
                </div></>:<><img src={PhotoPreview} alt="" className='w-[150px] h-[150px] border rounded-full border-white flex justify-center items-center bg-gray-500'/></>}
                </article>     
                <main className='w-[35%] bg-gray-900'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col justify-center my-3 px-6'>
                            <label htmlFor="profile" className='font-semibold text-lg p-2'>Upload your profile picture here</label>
                            <input type="file" name="PhotoFile" id="profile" className='border py-2 px-4 border-gray-400 border-dotted file:bg-white file:text-black file:p-1 file-rounded file:cursor-pointer cursor-pointer' onChange={handleFileInputChange} />
                        </div>
                        <div className='flex justify-center items-center mt-3 mb-5'>
                        <button className='py-2 px-6 bg-blue-600 hover:bg-blue-700 cursor-pointer text-lg font-semibold rounded-lg'>Upload Profile</button>
                        </div>
                    </form>
                    </main> 
                    {isLoading && (<section className='w-[100%] h-[100vh] bg-black/50 fixed top-0 '>
                    <Spinner/> 
                    </section>)}
    </section>

)
}

export default UploadProfilePhoto