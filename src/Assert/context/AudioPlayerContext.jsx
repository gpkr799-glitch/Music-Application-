import React, { useState } from 'react'

import { createContext } from 'react'



//! Create context for audio player

export let GlobalAudioPLayer = createContext();



const AudioPlayerContext = ({children}) => {

  const [songs, setSongs] = useState([]);

  const [isPlaying, setIsPlaying] = useState(false);

  const [currentSongIndex, setCurrentSongIndex] = useState(null);

  return (

        <GlobalAudioPLayer.Provider value={{songs, setSongs, isPlaying, setIsPlaying, currentSongIndex, setCurrentSongIndex,}}>

            {children}

        </GlobalAudioPLayer.Provider>

  )

}



export default AudioPlayerContext