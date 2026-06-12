const ArtistCard = ({ artist, onClick }) => {
  const getImage = (images) => {
    if (!images) return null;
    const large = images.find((i) => i.size === "large");
    return large?.["#text"] || images[images.length - 1]?.["#text"] || null;
  };

  const img = getImage(artist.image);

  return (
    <div
      onClick={onClick}
      className="bg-zinc-900 hover:bg-zinc-800 rounded-xl p-4 cursor-pointer transition-all hover:-translate-y-1 text-center"
    >
      {/* Artist Image */}
      {img && img !== "" ? (
        <img
          src={img}
          alt={artist.name}
          className="w-24 h-24 rounded-full object-cover mx-auto mb-3"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-zinc-700 flex items-center justify-center mx-auto mb-3 text-3xl">
          🎤
        </div>
      )}

      {/* Name */}
      <p className="text-white text-sm font-bold truncate">{artist.name}</p>

      {/* Listeners */}
      {artist.listeners && (
        <p className="text-zinc-400 text-xs mt-1">
          {Number(artist.listeners).toLocaleString("en-IN")} listeners
        </p>
      )}
    </div>
  );
};

export default ArtistCard;