import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { __DB } from "../../Backend/FireBaseConfiguration"
import { addDoc, collection } from "firebase/firestore";


const CreateAlbum = () => {
  let navigate = useNavigate();

  //! State for Album Details
  let [albumDetails, setAlbumDetails] = useState({
    albumTitle: "",
    albumLang: "",
    albumType: "",
    albumDesc: "",
    albumReleaseDate: "",
    albumSongsCount: "",
    albumThumbnail: "",
    albumStarcast: "",
    albumDirector: "",
    songs: [],
  });

  //! Destructuring the album details properties
  let {
    albumTitle,
    albumLang,
    albumType,
    albumDesc,
    albumReleaseDate,
    albumSongsCount,
    albumThumbnail,
    albumStarcast,
    albumDirector,
    songs,
  } = albumDetails;

  //! State for Song Details
  let [songDetails, setSongDetails] = useState([
    {
      songTitle: "",
      songSingers: "",
      songMusicDirector: "",
      songThumbnail: "",
      songFile: "",
    },
  ]);

  //! State for isLoading
  let [isLoading, setIsLoading] = useState(false);

  //! Handle Change for Album Details Inputs (text, number, date) Fields
  let handleAlbumInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setAlbumDetails({ ...albumDetails, [name]: value });
  };

  //! Handle Change for Album Details Input (file) Field
  let handleAlbumFileChange = (e) => {
    let file = e.target.files[0];
    setAlbumDetails({
      ...albumDetails,
      albumThumbnail: file,
    });
  };

  //! Handle Change for Song Details Inputs (text fields only)
  let handleSongInputChange = (index, e) => {
    let name = e.target.name;
    let value = e.target.value;
    let updatedSongs = [...songDetails];
    updatedSongs[index][name] = value;
    setSongDetails(updatedSongs);
  };

  //! Handle Change for Song Details Inputs (file fields only)
  let handleSongFileChange = (index, e) => {
    let file = e.target.files[0];
    let name = e.target.name;
    let updatedSongs = [...songDetails];

    if(name === "songThumbnail") {
      updatedSongs[index].songThumbnail = file;
    } else if (name === "songFile"){
      updatedSongs[index].songFile = file;
    }

    setSongDetails(updatedSongs);
  };

  //! Handle Submit
  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      //! Step-1: First we will upload the album thumbnail on cloudinary
      let uploadedAlbumThumbnailUrl = "";
      if (albumThumbnail) {

        //convert album thumbnail (image) into binary data
        let albumData = new FormData();
        albumData.append("file", albumThumbnail);
        albumData.append("upload_preset", "Music_Album");
        albumData.append("cloud_name", "debk2afrp");

        //upload album thumbnail to the cloudinary
        let response = await fetch("https://api.cloudinary.com/v1_1/debk2afrp/image/upload",
          {
            method: "POST",
            body: albumData
          }
        );

        let albumThumbnailResult = await response.json();
        uploadedAlbumThumbnailUrl = albumThumbnailResult.url;
        console.log("album thumbnail:", uploadedAlbumThumbnailUrl);

      }

      //! Step-2: Second We will upload song thumbnail and song files on cloudinary
      let songData = [];
      await Promise.all(
        songDetails.map(async (song, index) => {
          let uploadedSongThumbnailUrl = "";
          if (song.songThumbnail) {
            //add song thumbnail to the file (.mp3)
            //to the formData -> API
            let songFileData = new FormData();
            songFileData.append("file", song.songThumbnail);
            songFileData.append("upload_preset", "Music_Album");
            songFileData.append("cloud_name", "debk2afrp");

            //upload song thumbnail and to te cloudinary 
            //fetch -> API
            let response = await fetch("https://api.cloudinary.com/v1_1/debk2afrp/image/upload",
              {
                method: "POST",
                body: songFileData
              }
            );
            let uploadedSongThumbnailResult = await response.json();
            uploadedSongThumbnailUrl = uploadedSongThumbnailResult.url;
            console.log("song thumbnail", uploadedSongThumbnailUrl);

          }

          //upload song file login
          let uploadedSongFileUrl = "";
          let songDataObject = {};
          if (song.songFile) {
            //add the song file data to the song file API
            let songFileData = new FormData();
            songFileData.append("file", song.songFile);
            songFileData.append("upload_preset", "Music_Album");
            songFileData.append("cloud_name", "debk2afrp");

            let response = await fetch("https://api.cloudinary.com/v1_1/debk2afrp/upload",
              {
                method: "POST",
                body: songFileData
              }
            );
            let uploadedSongFileResult = await response.json();
            uploadedSongFileUrl = uploadedSongFileResult.url;
            console.log("song file", uploadedSongFileUrl);

            songDataObject = {
              songFile: uploadedSongFileResult.url,
              duration: (() => {
                let seconds = Math.floor(uploadedSongFileResult.duration);
                let minutes = Math.floor(seconds / 60);
                let remainingSeconds = seconds % 60;
                return `${minutes}:${remainingSeconds
                  .toString()
                  .padStart(2, "0")}`
              })(),
              size:(uploadedSongFileUrl.bytes / (1024 * 1024)).toFixed(2) + " MB",

            }
          }

          //push the song data inside the songdate array
          songData.push({
            ...songDataObject,
            songThumbnail:uploadedSongThumbnailUrl,
            songTitle:song.songTitle,
            songSingers:song.songSingers,
            songMusicDirector:song.songMusicDirector
          })
        })
      )

      //! Create a payload object
      let payload = {
        ...albumDetails,
        albumThumbnail:uploadedAlbumThumbnailUrl,
        songs:songData
      }

      //! Step-3: Finally, we will upload all the data inside the database (Cloud Firestore)
      let albumCollection = collection(__DB, "Music_Album")
      await addDoc(albumCollection,payload);

      toast.success("Album created successfully");
      navigate("/");
    } catch (error) {
      // toast.error(error.code.slice(5));
      //! For those getting error in slice
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  //! Add Song Functionality
  let addsong = () => {
    setSongDetails([
      ...songDetails,
      {
        songTitle: "",
        songSingers: "",
        songMusicDirector: "",
        songFile: "",
        songThumbnail: ""
      }
    ])
  }

  //! Remove Song Functionality
  let removesong = (index) => {
    let removedSongs = songDetails.filter((ele, i) => i !== index);
    setSongDetails(removedSongs);
  }

  return (
    <section className="w-full flex flex-col justify-center items-center p-6">
      {/* //? Starting of Add Album Code */}
      <article className="w-full bg-gray-900 rounded-t-md">
        <header>
          <h1 className="text-3xl text-center uppercase font-bold py-6">
            Add Album
          </h1>
        </header>
      </article>
      <main className="w-full bg-gray-700 rounded-b-md">
        <form onSubmit={handleSubmit} className="w-full py-2 px-4">
          <div className="flex justify-around py-2">
            <div className="w-[350px] flex flex-col">
              <label
                htmlFor="albumTitle"
                className="text-lg font-semibold mb-1"
              >
                Album Title
              </label>
              <input
                type="text"
                name="albumTitle"
                id="albumTitle"
                className="border border-gray-400 py-2 rounded bg-gray-300 text-black text-lg px-2 outline-none"
                value={albumTitle}
                onChange={handleAlbumInputChange}
              />
            </div>
            <div className="w-[350px] flex flex-col">
              <label htmlFor="albumLang" className="text-lg font-semibold mb-1">
                Album Language
              </label>
              <input
                type="text"
                name="albumLang"
                id="albumLang"
                className="border border-gray-400 py-2 rounded bg-gray-300 text-black text-lg px-2 outline-none"
                value={albumLang}
                onChange={handleAlbumInputChange}
              />
            </div>
            <div className="w-[300px] flex flex-col">
              <label htmlFor="albumType" className="text-lg font-semibold mb-1">
                Album Type
              </label>
              <input
                type="text"
                name="albumType"
                id="albumType"
                className="border border-gray-400 py-2 rounded bg-gray-300 text-black text-lg px-2 outline-none"
                value={albumType}
                onChange={handleAlbumInputChange}
              />
            </div>
          </div>
          <div className="flex justify-center py-2">
            <div className="w-[950px] flex flex-col">
              <label htmlFor="albumDesc" className="text-lg font-semibold mb-1">
                Album Description
              </label>
              <textarea
                name="albumDesc"
                id="albumDesc"
                className="border border-gray-400 h-[80px] rounded bg-gray-300 text-black text-lg px-2 outline-none"
                value={albumDesc}
                onChange={handleAlbumInputChange}
              ></textarea>
            </div>
          </div>
          <div className="flex justify-around py-2">
            <div className="w-[300px] flex flex-col">
              <label
                htmlFor="albumReleaseDate"
                className="text-lg font-semibold mb-1"
              >
                Album Release Date
              </label>
              <input
                type="date"
                name="albumReleaseDate"
                id="albumReleaseDate"
                className="border border-gray-400 py-2 rounded bg-gray-300 text-black text-lg px-2 outline-none"
                value={albumReleaseDate}
                onChange={handleAlbumInputChange}
              />
            </div>
            <div className="w-[300px] flex flex-col">
              <label
                htmlFor="albumSongsCount"
                className="text-lg font-semibold mb-1"
              >
                Number of Songs
              </label>
              <input
                type="number"
                name="albumSongsCount"
                id="albumSongsCount"
                className="border border-gray-400 py-2 rounded bg-gray-300 text-black text-lg px-2 outline-none"
                value={albumSongsCount}
                onChange={handleAlbumInputChange}
              />
            </div>
            <div className="w-[300px] flex flex-col">
              <label
                htmlFor="albumThumbnail"
                className="text-lg font-semibold mb-1"
              >
                Upload Album Thumbnail
              </label>
              <input
                type="file"
                name="albumThumbnail"
                id="albumThumbnail"
                className="border border-gray-400 py-2 rounded bg-gray-300 text-black text-lg px-2 outline-none file:bg-gray-800 cursor-pointer file:cursor-pointer file:text-white file:rounded file:p-1 file:text-sm"
                onChange={handleAlbumFileChange}
                accept="image/*"
              />
            </div>
          </div>
          <div className="flex py-2">
            <div className="w-[300px] flex flex-col ml-7">
              <label
                htmlFor="albumStarcast"
                className="text-lg font-semibold mb-1"
              >
                Album Starcast
              </label>
              <input
                type="text"
                name="albumStarcast"
                id="albumStarcast"
                className="border border-gray-400 py-2 rounded bg-gray-300 text-black text-lg px-2 outline-none"
                value={albumStarcast}
                onChange={handleAlbumInputChange}
              />
            </div>
            <div className="w-[300px] flex flex-col ml-13">
              <label
                htmlFor="albumDirector"
                className="text-lg font-semibold mb-1"
              >
                Album Director
              </label>
              <input
                type="text"
                name="albumDirector"
                id="albumDirector"
                className="border border-gray-400 py-2 rounded bg-gray-300 text-black text-lg px-2 outline-none"
                value={albumDirector}
                onChange={handleAlbumInputChange}
              />
            </div>
          </div>
          {/* //? Ending of Add Album Code  */}
          {/* //? Starting of Add Songs Details Code */}
          <article className="w-full flex flex-col items-center mt-4">
            <header className="w-[80vw] bg-gray-900 rounded">
              <h1 className="text-3xl text-center uppercase font-bold py-3">
                Add Songs
              </h1>
            </header>
            {songDetails.map((song, index) => (
              <section
                key={index}
                className="bg-gray-800 w-[95%] flex flex-col m-auto mt-3 rounded-lg"
              >
                <header>
                  <h1 className="text-2xl font-semibold px-4 py-2">
                    Song-{index + 1}
                  </h1>
                </header>
                <article className="py-2 px-4">
                  <div className="flex justify-around py-2 mb-2">
                    <div className="w-[250px] flex flex-col">
                      <label
                        htmlFor="songTitle"
                        className="text-lg font-semibold mb-1"
                      >
                        Song Title
                      </label>
                      <input
                        type="text"
                        name="songTitle"
                        id="songTitle"
                        className="border border-gray-400 py-2 rounded bg-gray-300 text-black text-lg px-2 outline-none"
                        value={song.songTitle}
                        onChange={(e) => handleSongInputChange(index, e)}
                      />
                    </div>
                    <div className="w-[250px] flex flex-col">
                      <label
                        htmlFor="songSingers"
                        className="text-lg font-semibold mb-1"
                      >
                        Song Singer(s)
                      </label>
                      <input
                        type="text"
                        name="songSingers"
                        id="songSingers"
                        className="border border-gray-400 py-2 rounded bg-gray-300 text-black text-lg px-2 outline-none"
                        value={song.songSingers}
                        onChange={(e) => handleSongInputChange(index, e)}
                      />
                    </div>
                    <div className="w-[250px] flex flex-col">
                      <label
                        htmlFor="songMusicDirector"
                        className="text-lg font-semibold mb-1"
                      >
                        Song Music Director
                      </label>
                      <input
                        type="text"
                        name="songMusicDirector"
                        id="songMusicDirector"
                        className="border border-gray-400 py-2 rounded bg-gray-300 text-black text-lg px-2 outline-none"
                        value={song.songMusicDirector}
                        onChange={(e) => handleSongInputChange(index, e)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-around py-2">
                    <div className="w-[400px] flex flex-col">
                      <label
                        htmlFor="songThumbnail"
                        className="text-lg font-semibold mb-1"
                      >
                        Upload Song Thumbnail
                      </label>
                      <input
                        type="file"
                        name="songThumbnail"
                        id="songThumbnail"
                        className="border border-gray-400 py-2 rounded bg-gray-300 text-black text-lg px-2 outline-none file:bg-gray-800 cursor-pointer file:cursor-pointer file:text-white file:rounded file:p-1 file:text-sm"
                        onChange={(e) => handleSongFileChange(index, e)}
                        placeholder="Enter your song Thumbnail"
                        accept="image/*"
                      />
                    </div>
                    <div className="w-[400px] flex flex-col">
                      <label
                        htmlFor="songFile"
                        className="text-lg font-semibold mb-1"
                      >
                        Upload Song File (.mp3)
                      </label>
                      <input
                        type="file"
                        name="songFile"
                        id="songFile"
                        className="border border-gray-400 py-2 rounded bg-gray-300 text-black text-lg px-2 outline-none file:bg-gray-800 cursor-pointer file:cursor-pointer file:text-white file:rounded file:p-1 file:text-sm"
                        onChange={(e) => handleSongFileChange(index, e)}
                        accept="audio/*"
                      />
                    </div>
                  </div>
                </article>
                <section className="flex justify-between">
                  
                  {/* //? Starting of Add Song Code */}
                  <aside className="flex px-8 mb-4">
                    {songDetails.length === index + 1 && (
                      <div onClick={addsong} className="bg-blue-600 flex items-center gap-2 hover:bg-green-600 cursor-pointer py-2 px-4 rounded">
                        <span className="font-semibold">Add Song</span>
                        <span className="text-lg">
                          <IoIosAddCircle />
                        </span>
                      </div>
                    )}
                  </aside>
                  {/* //? Ending of Add Song Code */}

                  {/* //? Starting of Remove Song Code */}
                  <aside className="flex px-8 mb-4">
                    {songDetails.length !== 1 && (
                      <div onClick={() => removesong(index)} className="bg-blue-600 flex items-center gap-2 hover:bg-red-600 cursor-pointer py-2 px-4 rounded">
                        <span className="font-semibold">Remove Song</span>
                        <span className="text-lg">
                          <IoIosRemoveCircle />
                        </span>
                      </div>
                    )}
                  </aside>
                  {/* //? Ending of Remove Song Code */}
                </section>
              </section>
            ))}
          </article>
          {/*//? Ending of Add Songs Details Code */}
          {/* //? Form Submit Button Code */}
          <article className="my-5 w-full flex justify-center items-center">
            <button className="w-[95%] py-2 text-lg font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg mt-2 cursor-pointer">
              {isLoading ? "Uploading..." : "Add Album"}
            </button>
          </article>
        </form>
      </main>
    </section>
  );
};

export default CreateAlbum;