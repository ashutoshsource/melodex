import { useMusic } from "../context/MusicContext";

const TrackRow = ({ track, index, onPlay, onArtistClick }) => {
  const { liked, toggleLike, nowPlaying } = useMusic();

  const isLiked = liked.some(
    (l) => l.name === track.name
  );
  const isPlaying = nowPlaying?.name === track.name;

  const artistName = track.artist?.name || track.artist || "";

  const getImage = (images) => {
    if (!images) return null;
    const large = images.find((i) => i.size === "large");
    return large?.["#text"] || images[images.length - 1]?.["#text"] || null;
  };

  const img = getImage(track.image);

  return (
    <div
      onClick={() => onPlay(track)}
      className="flex items-center gap-4 px-3 py-2.5 rounded-lg hover:bg-zinc-800 cursor-pointer group transition-all"
    >
      {/* Index */}
      <div className={`w-6 text-center text-sm ${isPlaying ? "text-green-500" : "text-zinc-500"}`}>
        {isPlaying ? "♪" : index + 1}
      </div>

      {/* Image */}
      {img ? (
        <img src={img} alt={track.name} className="w-11 h-11 rounded-md object-cover flex-shrink-0" />
      ) : (
        <div className="w-11 h-11 rounded-md bg-zinc-700 flex items-center justify-center flex-shrink-0 text-lg">
          🎵
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold truncate ${isPlaying ? "text-green-500" : "text-white"}`}>
          {track.name}
        </p>
        <p
          onClick={(e) => { e.stopPropagation(); onArtistClick(artistName); }}
          className="text-xs text-zinc-400 hover:text-white hover:underline cursor-pointer truncate mt-0.5"
        >
          {artistName}
        </p>
      </div>

      {/* Play count */}
      {track.playcount && (
        <div className="text-xs text-zinc-500 w-20 text-right hidden sm:block">
          {Number(track.playcount).toLocaleString("en-IN")}
        </div>
      )}

      {/* Like Button */}
      <button
        onClick={(e) => { e.stopPropagation(); toggleLike(track); }}
        className={`text-lg transition-all ${isLiked ? "text-green-500" : "text-zinc-600 hover:text-white"}`}
      >
        {isLiked ? "♥" : "♡"}
      </button>
    </div>
  );
};

export default TrackRow;