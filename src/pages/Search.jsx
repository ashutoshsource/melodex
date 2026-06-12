import { useState, useEffect } from "react";
import { fetchData } from "../utils/api";
import TrackRow from "../components/TrackRow";
import ArtistCard from "../components/ArtistCard";
import { useMusic } from "../context/MusicContext";

const Search = ({ query, onArtistClick }) => {
  const [results, setResults] = useState({ tracks: [], artists: [], albums: [] });
  const [tab, setTab] = useState("tracks");
  const [loading, setLoading] = useState(false);
  const { setNowPlaying, setPlaying } = useMusic();

  useEffect(() => {
    if (!query.trim()) {
      setResults({ tracks: [], artists: [], albums: [] });
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      Promise.all([
        fetchData({ method: "track.search", track: query, limit: 12 }),
        fetchData({ method: "artist.search", artist: query, limit: 8 }),
      ]).then(([tracks, artists]) => {
        setResults({
          tracks: tracks.results?.trackmatches?.track || [],
          artists: artists.results?.artistmatches?.artist || [],
        });
        setLoading(false);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const playTrack = (track) => {
    setNowPlaying(track);
    setPlaying(true);
  };

  return (
    <div className="p-8 pb-32">
      <h1 className="text-3xl font-bold text-white mb-6">Search</h1>

      {!query.trim() ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-white text-lg font-bold mb-1">Find your music</p>
          <p className="text-zinc-400 text-sm">Search for artists or tracks above</p>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {["tracks", "artists"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-full text-sm font-bold capitalize transition-all
                  ${tab === t
                    ? "bg-green-500 text-black"
                    : "bg-zinc-800 text-zinc-400 hover:text-white"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-zinc-400">Searching...</p>
          ) : tab === "tracks" ? (
            results.tracks.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🎵</div>
                <p className="text-white text-lg font-bold">No tracks found</p>
              </div>
            ) : (
              <div className="flex flex-col">
                {results.tracks.map((track, i) => (
                  <TrackRow
                    key={track.name + i}
                    track={track}
                    index={i}
                    onPlay={playTrack}
                    onArtistClick={onArtistClick}
                  />
                ))}
              </div>
            )
          ) : (
            results.artists.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🎤</div>
                <p className="text-white text-lg font-bold">No artists found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {results.artists.map((artist) => (
                  <ArtistCard
                    key={artist.name}
                    artist={artist}
                    onClick={() => onArtistClick(artist.name)}
                  />
                ))}
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

export default Search;