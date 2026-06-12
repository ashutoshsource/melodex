import { useState, useEffect } from "react";
import { fetchData } from "../utils/api";
import TrackRow from "../components/TrackRow";
import ArtistCard from "../components/ArtistCard";
import { useMusic } from "../context/MusicContext";

const Home = ({ onArtistClick }) => {
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setNowPlaying, setPlaying } = useMusic();

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchData({ method: "chart.getTopTracks", limit: 8 }),
      fetchData({ method: "chart.getTopArtists", limit: 10 }),
    ]).then(([tracks, artists]) => {
      setTopTracks(tracks.tracks?.track || []);
      setTopArtists(artists.artists?.artist || []);
      setLoading(false);
    });
  }, []);

  const playTrack = (track) => {
    setNowPlaying(track);
    setPlaying(true);
  };

  return (
    <div className="p-8 pb-32">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Good Evening 🎧</h1>
        <p className="text-zinc-400 text-sm">Discover the world's most played music</p>
      </div>

      {/* Top Artists */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">🔥 Top Artists</h2>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array(10).fill(0).map((_, i) => (
              <div key={i} className="bg-zinc-900 rounded-xl p-4 text-center animate-pulse">
                <div className="w-24 h-24 rounded-full bg-zinc-700 mx-auto mb-3" />
                <div className="h-3 bg-zinc-700 rounded w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {topArtists.map((artist) => (
              <ArtistCard
                key={artist.name}
                artist={artist}
                onClick={() => onArtistClick(artist.name)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Top Tracks */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">🎵 Top Tracks This Week</h2>
        {loading ? (
          <div className="flex flex-col gap-2">
            {Array(8).fill(0).map((_, i) => (
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
        ) : (
          <div className="flex flex-col">
            {topTracks.map((track, i) => (
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

    </div>
  );
};

export default Home;