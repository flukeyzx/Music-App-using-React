import LibrarySongs from "./LibrarySongs.jsx";

const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySongs
            songs={songs}
            setCurrentSong={setCurrentSong}
            key={song.id}
            song={song}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
            id={song.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
