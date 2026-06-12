import { useMusic } from "../context/MusicContext";

const NowPlayingBar = () => {
  const { nowPlaying, playing, setPlaying } = useMusic();

  if (!nowPlaying) return null;

  const getImage = (images) => {
    if (!images) return null;
    const large = images.find((i) => i.size === "large");
    return large?.["#text"] || images[images.length - 1]?.["#text"] || null;
  };

  const img = getImage(nowPlaying.image);
  const artistName = nowPlaying.artist?.name || nowPlaying.artist || "";

  return (
    <div className="fixed bottom-0 left-56 right-0 bg-zinc-900 border-t border-zinc-800 px-8 py-3 flex items-center justify-between z-50">
      
      {/* Track Info */}
      <div className="flex items-center gap-3 w-64">
        {img ? (
          <img src={img} alt={nowPlaying.name} className="w-12 h-12 rounded-lg object-cover" />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-zinc-700 flex items-center justify-center text-xl">
            🎵
          </div>
        )}
        <div>
          <p className="text-white text-sm font-semibold truncate">{nowPlaying.name}</p>
          <p className="text-zinc-400 text-xs truncate">{artistName}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button className="text-zinc-400 hover:text-white text-xl transition-all">⏮</button>
        <button
          onClick={() => setPlaying(!playing)}
          className="w-10 h-10 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center text-black font-bold text-lg transition-all"
        >
          {playing ? "⏸" : "▶"}
        </button>
        <button className="text-zinc-400 hover:text-white text-xl transition-all">⏭</button>
      </div>

      {/* Right side */}
      <div className="w-64 text-right">
        <p className="text-zinc-500 text-xs">Last.fm Preview</p>
      </div>

    </div>
  );
};

export default NowPlayingBar;