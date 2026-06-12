import { createContext, useContext, useState } from "react";

const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [liked, setLiked] = useState([]);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const toggleLike = (track) => {
    const exists = liked.find((l) => l.name === track.name);
    if (exists) {
      setLiked(liked.filter((l) => l.name !== track.name));
      showToast("Removed from Liked Songs");
    } else {
      setLiked([...liked, track]);
      showToast("Added to Liked Songs ♥");
    }
  };

  return (
    <MusicContext.Provider
      value={{
        liked,
        toggleLike,
        nowPlaying,
        setNowPlaying,
        playing,
        setPlaying,
        toast,
        showToast,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};