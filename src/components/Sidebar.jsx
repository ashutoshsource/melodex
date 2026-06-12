import { useMusic } from "../context/MusicContext";

const Sidebar = ({ page, setPage }) => {
  const { liked } = useMusic();

  const navItems = [
    { icon: "🏠", label: "Home", key: "home" },
    { icon: "🔍", label: "Search", key: "search" },
    { icon: "📈", label: "Charts", key: "charts" },
  ];

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-56 bg-black border-r border-zinc-800 flex flex-col py-6 z-50">
      
      {/* Logo */}
      <div className="px-6 mb-8 flex items-center gap-2">
        <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
          ♪
        </div>
        <span className="text-white font-bold text-xl">Melodex</span>
      </div>

      {/* Nav Links */}
      <div className="px-3 flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setPage(item.key)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all w-full text-left
              ${page === item.key
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      {/* Library */}
      <div className="px-3 mt-8">
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest px-3 mb-2">
          Library
        </p>
        <button
          onClick={() => setPage("liked")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all w-full text-left
            ${page === "liked"
              ? "bg-zinc-800 text-white"
              : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
        >
          <span className="text-lg">💚</span>
          Liked Songs
          {liked.length > 0 && (
            <span className="ml-auto bg-green-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
              {liked.length}
            </span>
          )}
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;