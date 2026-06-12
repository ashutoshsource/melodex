const Navbar = ({ query, setQuery, setPage }) => {
  return (
    <div className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur border-b border-zinc-800 px-8 py-4 flex items-center justify-between">
      
      {/* Search Box */}
      <div className="flex items-center gap-3 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 w-80">
        <span className="text-zinc-400 text-sm">🔍</span>
        <input
          type="text"
          placeholder="Search artists, songs, albums..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage("search");
          }}
          onFocus={() => setPage("search")}
          className="bg-transparent text-white text-sm outline-none flex-1 placeholder-zinc-500"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setPage("home"); }}
            className="text-zinc-400 hover:text-white text-lg"
          >
            ×
          </button>
        )}
      </div>

      {/* Liked Songs Button */}
      <button
        onClick={() => setPage("liked")}
        className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 hover:text-white px-4 py-2 rounded-full text-sm font-semibold transition-all"
      >
        ♥ Liked Songs
      </button>

    </div>
  );
};

export default Navbar;