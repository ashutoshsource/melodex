import { useState } from "react";
import { MusicProvider, useMusic } from "./context/MusicContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import NowPlayingBar from "./components/NowPlayingBar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Charts from "./pages/Charts";
import Liked from "./pages/Liked";
import Artist from "./pages/Artist";

function AppContent() {
  const [page, setPage] = useState("home");
  const [artistName, setArtistName] = useState(null);
  const [query, setQuery] = useState("");
  const { toast } = useMusic();

  const goToArtist = (name) => {
    setArtistName(name);
    setPage("artist");
  };

  const goBack = () => {
    setArtistName(null);
    setPage("home");
  };

  return (
    <div className="bg-black min-h-screen">
      <Sidebar page={page} setPage={setPage} />

      <div className="ml-56">
        <Navbar query={query} setQuery={setQuery} setPage={setPage} />

        {page === "home" && <Home onArtistClick={goToArtist} />}
        {page === "search" && <Search query={query} onArtistClick={goToArtist} />}
        {page === "charts" && <Charts onArtistClick={goToArtist} />}
        {page === "liked" && <Liked onArtistClick={goToArtist} />}
        {page === "artist" && (
          <Artist artistName={artistName} onBack={goBack} onArtistClick={goToArtist} />
        )}
      </div>

      <NowPlayingBar />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-500 text-black px-6 py-3 rounded-full text-sm font-bold z-50 shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <MusicProvider>
      <AppContent />
    </MusicProvider>
  );
}

export default App;