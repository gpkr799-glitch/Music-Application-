

import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { __DB } from '../Backend/FireBaseConfiguration';
import { FaMusic } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import Spinner from '../Helper/Spinner';    

const PopularAlbums = () => {
    let [albums, setAlbums] = useState(null);

    useEffect(() => {
        let fetchAlbums = async () => {
            try {
                let albumCollectionRef = collection(__DB, "Music_Album");
                let getAlbums = await getDocs(albumCollectionRef);

                let albumData = getAlbums.docs.map((album) => ({
                    ...album?.data(),
                    songs: album?.data()?.songs || []
                }))

                setAlbums(albumData);
            } catch (error) {
                console.log("error:", error);
            }
        };
        fetchAlbums();
    }, []);

    return (
        <section className='w-[80vw]'>
            {albums ? (<article className='w-full'>
                <header className='w-full p-5 flex items-center gap-3'>
                    <span className='text-3xl text-white'><FaMusic /></span>
                    <h1 className='text-3xl font-bold text-white'>Popular Albums</h1>
                </header>
                <main className='w-full'>

                    <div className='flex items-center gap-5 px-6'>
                        {albums.map((album, index) => (
                            <NavLink 
                            to={`album-details/${album?.albumTitle}`} 
                            key={index}
                            state={album}
                            >
                                <div className='w-[200px] h-[340px] bg-black/50 p-4 rounded-lg hover:bg-black hover:ring-1 hover:ring-[wheat]'>
                                    <img
                                        src={album?.albumThumbnail}
                                        alt={album?.albumTitle}
                                        className='w-full h-[240px] object-cover rounded-md hover:scale-105 transition-all duration-100 ease-linear ' />
                                    <h1 className='flex justify-center items-center text-white  transition- mt-2 rounded text-xl font-semibold py-3 text-center'>{album?.albumTitle}</h1>
                                </div>
                            </NavLink>
                        ))}
                    </div>

                </main>
            </article>) : (<section className='w-[100%] h-[100vh] fixed top-0 left-[7%]'>
                <Spinner />
            </section>)}

        </section>
    )
}

export default PopularAlbums;