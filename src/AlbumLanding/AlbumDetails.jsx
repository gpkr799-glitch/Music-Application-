import { collection } from "firebase/firestore";
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { GlobalAudioPLayer } from "../Assert/context/AudioPlayerContext";

const AlbumDetails = () => {
  let location = useLocation();
  let {songs, setSongs, isPlaying, setIsPlaying, currentSongIndex, setCurrentSongIndex,} = useContext(GlobalAudioPLayer);
  console.log(location);

  let albumData = location?.state;
  console.log("Album Data:", albumData);

  let songlist = location?.state.songs;
  console.log("Song List", songlist);

  //! create one function which will handle the songs

  let handleSongChange = (index) => {
    setSongs(songlist);
    setCurrentSongIndex(index);
    if(currentSongIndex === index) {
      setIsPlaying(!isPlaying)
    }else {
      setIsPlaying(true);
    }
  }

  return (
    // Etract the album details only from the state
    <section className="w-full h-[calc(100vh-70px)] text-white flex flex-col items-center">
      {/* album details */}
      <article className="w-[95%] flex gap-2 h-[400px] bg-gray-700 pt8 px-8 py-5 rounded-md hover:bg-gray-900 hover:ring-1 hover:ring-blue-600 transition-all duration-75 ease-linear">
        {/* left aside -album thumbnail*/}
        <aside className="basis-[30%] h-[350px] p-1 relative">
          <img
            src={albumData?.albumThumbnail}
            alt={albumData?.albumTitle}
            className="w-full h-[350px] rounded-md "
          />
          {/* <span className="py-1 px-3 bg-red-200 rounded absolute top-0 right-[-13px] ">{albumData?.albumType}</span> */}
        </aside>
        {/* righr aside -album details*/}
        <aside className="basis-[70%] h-[350px] ">
          <h1 className="text-5xl text-white font-bold items tracking-wider px-2 py-3  ">
            {albumData?.albumTitle}
          </h1>
          <p className="px-2 py-1 text-justify">
            <span className="text-lg font-semibold mr-1 ">Descrition: </span>
            <span className="text-gray-200 italic ">
              {albumData?.albumDesc}
            </span>
          </p>
          <p className="px-2 py-1 text-justify">
            <span className="text-lg font-semibold mr-1 ">Release Data: </span>
            <span className="text-gray-200 italic ">
              {albumData?.albumReleaseDate}
            </span>
          </p>
          <p className="px-2 py-1 text-justify">
            <span className="text-lg font-semibold mr-1 ">Language: </span>
            <span className="text-gray-200 italic ">
              {albumData?.albumLang}
            </span>
          </p>
          <p className="px-2 py-1 text-justify">
            <span className="text-lg font-semibold mr-1 ">Starcast: </span>
            <span className="text-gray-200 italic ">
              {albumData?.albumStarcast}
            </span>
          </p>
          <p className="px-2 py-1 text-justify">
            <span className="text-lg font-semibold mr-1 ">
              Album Director:{" "}
            </span>
            <span className="text-gray-200 italic ">
              {albumData?.albumDirector}
            </span>
          </p>
          <p className="px-2 py-1 text-justify">
            <span className="text-lg font-semibold mr-1 ">
              Number of tracks:{" "}
            </span>
            <span className="text-gray-200 italic ">
              {albumData?.albumSongsCount}
            </span>
          </p>
        </aside>
      </article>
      <main className="mt-5 w-full mb-8 rounded-b-md">
        <header className="w-full">
          <h1 className="text-3xl font-semibold py-2 px-8">Song Collection</h1>
        </header>
        <table className="ml-8 w-[95%] mb-10 ">
          <thead>
            <tr className="bg-gray-900 ">
              <td className="py-2 px-2 text-lg font-semibold rounded-t-md">
                Track No
              </td>
              <td className="py-2 px-2 text-lg font-semibold rounded-t-md">
                Poster
              </td>
              <td className="py-2 px-2 text-lg font-semibold rounded-t-md">
                Title
              </td>
              <td className="py-2 px-2 text-lg font-semibold rounded-t-md">
                Singers
              </td>
              <td className="py-2 px-2 text-lg font-semibold rounded-t-md">
                Music Directors
              </td>
              <td className="py-2 px-2 text-lg font-semibold rounded-t-md">
                Duration
              </td>
              <td className="py-2 px-2 text-lg font-semibold rounded-t-md">
                Size
              </td>
            </tr>
          </thead>
          <tbody>
            {songlist.length > 0 ? (
              songlist.map((song, index) => {
                return (
                  <tr key={index} onClick={() =>handleSongChange(index)} className="bg-gray-700 hover:bg-gray-900 cursor-pointer transition-all duration-75 ease-in-out">
                    <td className="text-center">{index + 1}</td>
                    <td>
                      <img
                        src={song?.songThumbnail}
                        alt={song?.songTitle}
                        className="w-[60px] h-[60px] mt-2 flex justify-center items-center rounded-md"
                      />
                    </td>
                    <td className="px-2">{song?.songTitle}</td>
                    <td className="p-1">{song?.songSingers}</td>
                    <td className="p-2">{song?.songMusicDirector}</td>
                    <td className="text-center p-2">{song?.duration}</td>
                    <td className="text-cente p-2r">{song?.size}</td>
                  </tr>
                );
              })
            ) : (
              <p>Song collection not found</p>
            )}
          </tbody>
          <tfoot></tfoot>
        </table>
      </main>
    </section>
  );
};

export default AlbumDetails;  