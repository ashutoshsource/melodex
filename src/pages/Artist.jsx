import { useState, useEffect } from "react";
import { fetchData } from "../utils/api";
import TrackRow from "../components/TrackRow";
import ArtistCard from "../components/ArtistCard";
import { useMusic } from "../context/MusicContext";

const Artist = ({ artistName, onBack, onArtistClick }) => {
  const [info, setInfo] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setNowPlaying, setPlaying } = useMusic();

  useEffect(() => {
    if (!artistName) return;
    setLoading(true);

    Promise.all([
      fetchData({ method: "artist.getInfo", artist: artistName }),
      fetchData({ method: "artist.getTopTracks", artist: artistName, limit: 10 }),
      fetchData({ method: "artist.getSimilar", artist: artistName, limit: 6 }),
    ]).then(([infoData, tracksData, similarData]) => {
      setInfo(infoData.artist);
      setTopTracks(tracksData.toptracks?.track || []);
      setSimilar(similarData.similarartists?.artist || []);
      setLoading(false);
    });
  }, [artistName]);

  const playTrack = (track) => {
    setNowPlaying(track);
    setPlaying(true);
  };

  const getImage = (images) => {
    if (!images) return null;
    const large = images.find((i) => i.size === "extralarge") || images.find((i) => i.size === "large");
    return large?.["#text"] || null;
  };

  if (loading) {
    return (
      <div className="p-8 pb-32">
        <div className="h-64 bg-zinc-800 rounded-2xl animate-pulse mb-8" />
        <div className="flex flex-col gap-2">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="h-16 bg-zinc-800 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="p-8 pb-32">
        <button onClick={onBack} className="bg-zinc-800 text-zinc-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
          ← Back
        </button>
        <div className="text-center py-20">
          <div className="text-5xl mb-4">😕</div>
          <p className="text-white text-lg font-bold">Artist not found</p>
        </div>
      </div>
    );
  }

  const heroImg = getImage(info.image);
  const tags = info.tags?.tag || [];
  const bio = info.bio?.summary?.replace(/<[^>]*>/g, "").slice(0, 300);

  return (
    <div className="p-8 pb-32">

      {/* Back Button */}
      <button onClick={onBack} className="bg-zinc-800 text-zinc-400 hover:text-white px-4 py-2 rounded-full text-sm font-bold mb-6 transition-all">
        ← Back
      </button>

      {/* Hero */}
      <div className="relative h-64 rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-end">
        {heroImg && (
          <img src={heroImg} alt={info.name} className="absolute inset-0 w-full h-full object-cover opacity-40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="relative p-6">
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-2">Artist</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">{info.name}</h1>
          <p className="text-zinc-400 text-sm mt-2">
            {Number(info.stats?.listeners).toLocaleString("en-IN")} monthly listeners
          </p>
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.slice(0, 6).map((tag) => (
            <span key={tag.name} className="bg-zinc-800 text-zinc-400 text-xs font-semibold px-3 py-1.5 rounded-full">
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Bio */}
      {bio && (
        <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-2xl">{bio}…</p>
      )}

      {/* Top Tracks */}
      {topTracks.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Popular Tracks</h2>
          <div className="flex flex-col">
            {topTracks.map((track, i) => (
              <TrackRow
                key={track.name + i}
                track={{ ...track, artist: { name: info.name } }}
                index={i}
                onPlay={playTrack}
                onArtistClick={onArtistClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* Similar Artists */}
      {similar.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Similar Artists</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {similar.map((artist) => (
              <ArtistCard
                key={artist.name}
                artist={artist}
                onClick={() => onArtistClick(artist.name)}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Artist;