//components of our application.
import Player from "./components/Player.jsx";
import Song from "./components/Song.jsx";
import Library from "./components/Library.jsx";
import Nav from "./components/Nav.jsx";
//importing styles.
import "./styles/style.scss";
//importing utils.
import data from "./utils/data.js";
import { useState, useRef } from "react";

function App() {
  //audio ref to access DOM element directly.
  const audioRef = useRef(null);
  //state
  const [songs, setSongs] = useState(data);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songTimeInfo, setSongTimeInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  //function that takes audio as input and update state.
  const songTimeHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    //calculating slider animation percentage.
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongTimeInfo({
      ...songTimeInfo,
      currentTime,
      duration,
      animationPercentage: animation,
    });
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);

    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      }, 100); // Adjust the delay as needed
    }
  };

  return (
    <div className={`container ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        setSongs={setSongs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongTimeInfo={setSongTimeInfo}
        songTimeInfo={songTimeInfo}
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
      />
      <Library
        libraryStatus={libraryStatus}
        setSongs={setSongs}
        isPlaying={isPlaying}
        audioRef={audioRef}
        setCurrentSong={setCurrentSong}
        songs={songs}
      />
      <audio
        onLoadedMetadata={songTimeHandler}
        onTimeUpdate={songTimeHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
