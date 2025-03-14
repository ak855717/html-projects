import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import MemeCard from "../components/MemeCard";

const MemeExplorer = () => {
  const [memes, setMemes] = useState([]);
  const [page, setPage] = useState(1);

  const fetchMemes = async () => {
    const response = await axios.get(`https://api.imgflip.com/get_memes`);
    setMemes((prev) => [...prev, ...response.data.data.memes.slice((page - 1) * 10, page * 10)]);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Meme Explorer</h1>
      <InfiniteScroll
        dataLength={memes.length}
        next={fetchMemes}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {memes.map((meme) => (
            <MemeCard key={meme.id} meme={meme} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MemeExplorer;