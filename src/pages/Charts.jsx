import { useState, useEffect } from "react";
import { fetchData } from "../utils/api";
import TrackRow from "../components/TrackRow";
import { useMusic } from "../context/MusicContext";

const Charts = ({ onArtistClick }) => {
  const [tracks, setTracks] = useState([]);
  const [country, setCountry] = useState("IN");
  const [loading, setLoading] = useState(true);
  const { setNowPlaying, setPlaying } = useMusic();

  const countries = [
    { code: "IN", name: "🇮🇳 India" },
    { code: "US", name: "🇺🇸 USA" },
    { code: "GB", name: "🇬🇧 UK" },
    { code: "JP", name: "🇯🇵 Japan" },
    { code: "KR", name: "🇰🇷 Korea" },
  ];

  useEffect(() => {
    setLoading(true);
    fetchData({ method: "geo.getTopTracks", country, limit: 20 }).then((data) => {
      setTracks(data.tracks?.track || []);
      setLoading(false);
    });
  }, [country]);

  const playTrack = (track) => {
    setNowPlaying(track);
    setPlaying(true);
  };

  return (
    <div className="p-8 pb-32">
      <h1 className="text-3xl font-bold text-white mb-6">📈 Charts</h1>

      {/* Country Selector */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {countries.map((c) => (
          <button
            key={c.code}
            onClick={() => setCountry(c.code)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all
              ${country === c.code
                ? "bg-green-500 text-black"
                : "bg-zinc-800 text-zinc-400 hover:text-white"
              }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Tracks */}
      {loading ? (
        <div className="flex flex-col gap-2">
          {Array(10).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-3 py-2.5 animate-pulse">
              <div className="w-6 h-4 bg-zinc-700 rounded" />
              <div className="w-11 h-11 bg-zinc-700 rounded-md" />
              <div className="flex-1">
                <div className="h-3 bg-zinc-700 rounded w-1/2 mb-2" />
                <div className="h-3 bg-zinc-700 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : tracks.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📊</div>
          <p className="text-white text-lg font-bold">No chart data available</p>
          <p className="text-zinc-400 text-sm">Try a different country</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {tracks.map((track, i) => (
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

export default Charts;