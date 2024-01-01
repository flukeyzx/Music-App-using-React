import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleRight,
  faAngleLeft,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const Player = ({
  isPlaying,
  setIsPlaying,
  audioRef,
  setSongTimeInfo,
  songTimeInfo,
  songs,
  setCurrentSong,
  currentSong,
  setSongs,
}) => {
  //useEffect
  useEffect(() => {
    //Update State
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);
  //function that formats time.
  const timeFormater = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  //function that plays the song and updates isPlaying state.
  const songHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  //slide Handler
  const slideHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongTimeInfo({ ...songTimeInfo, currentTime: e.target.value });
  };
  //Skip handler
  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
      } else {
        await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      }
    }
    if (isPlaying) audioRef.current.play();
  };
  //Sliding Animation.
  const slideAnim = {
    transform: `translateX(${songTimeInfo.animationPercentage}%)`,
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{timeFormater(songTimeInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songTimeInfo.duration || 0}
            value={songTimeInfo.currentTime}
            onChange={slideHandler}
            type="range"
          />
          <div style={slideAnim} className="track-animation"></div>
        </div>

        <p>{songTimeInfo ? timeFormater(songTimeInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={songHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
    </div>
  );
};

export default Player;
