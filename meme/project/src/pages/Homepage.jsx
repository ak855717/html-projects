import React, { useEffect, useState } from "react";
import axios from "axios";
import MemeCard from "../components/MemeCard";
import DarkModeToggle from "../components/DarkModeToggle";

const Home = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const fetchTrendingMemes = async () => {
      const response = await axios.get("https://api.imgflip.com/get_memes");
      setMemes(response.data.data.memes.slice(0, 10)); // Show top 10 memes
    };
    fetchTrendingMemes();
  }, []);

  return (
    <div className="p-4">
      <DarkModeToggle />
      <h1 className="text-3xl font-bold mb-4">Trending Memes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {memes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>
    </div>
  );
};

export default Home;