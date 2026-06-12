import TrackRow from "../components/TrackRow";
import { useMusic } from "../context/MusicContext";

const Liked = ({ onArtistClick }) => {
  const { liked, setNowPlaying, setPlaying } = useMusic();

  const playTrack = (track) => {
    setNowPlaying(track);
    setPlaying(true);
  };

  return (
    <div className="p-8 pb-32">

      {/* Header */}
      <div className="flex items-center gap-5 mb-8">
        <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-green-700 to-green-400 flex items-center justify-center text-5xl">
          ♥
        </div>
        <div>
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Playlist</p>
          <h1 className="text-3xl font-bold text-white">Liked Songs</h1>
          <p className="text-zinc-400 text-sm mt-1">{liked.length} songs</p>
        </div>
      </div>

      {/* Track List */}
      {liked.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">💔</div>
          <p className="text-white text-lg font-bold mb-1">No liked songs yet</p>
          <p className="text-zinc-400 text-sm">Hit the ♡ on any track to save it here</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {liked.map((track, i) => (
            <TrackRow
              key={track.name + i}
              track={track}
              index={i}
              onPlay={playTrack}
              onArtistClick={onArtistClick}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Liked;