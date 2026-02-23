import React, { useContext } from 'react'
import AlbumLandingSideBar from './AlbumLandingSideBar'
import AlbumLandingContent from './AlbumLandingContent'
import { GlobalAudioPLayer } from '../Assert/context/AudioPlayerContext'
import CustomAudioPlayer from 'react-pro-audio-player'





const AlbumLandingContainer = () => {
  let {
    songs, setSongs, isPlaying, setIsPlaying, currentSongIndex, setCurrentSongIndex,
  } = useContext(GlobalAudioPLayer)
  return (
    <section className="w-[100vw] h-min-[calc(100vh-70px)] flex">
        <AlbumLandingSideBar/>
        <AlbumLandingContent/>
        {
          currentSongIndex !==null && (<div className='w-full fixed bottom-0'>
             <CustomAudioPlayer
          songs={songs}
          isPlaying={isPlaying}
          currentSongIndex={currentSongIndex}
          onPlayPauseChange={setIsPlaying}
          onSongChange={setCurrentSongIndex}
          songUrlKey="songFile"
          songNameKey="songTitle"
          songThumbnailKey="songThumbnail" 
          songSingerKey="songSingers"
        />
          </div>)
        }
    </section>
  )
}

export default AlbumLandingContainer