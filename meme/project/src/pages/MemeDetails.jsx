import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MemeDetails = () => {
  const { id } = useParams();
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    const fetchMemeDetails = async () => {
      const response = await axios.get(`https://api.imgflip.com/get_memes`);
      const meme = response.data.data.memes.find((m) => m.id === id);
      setMeme(meme);
    };
    fetchMemeDetails();
  }, [id]);

  if (!meme) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{meme.name}</h1>
      <img src={meme.url} alt={meme.name} className="w-full h-96 object-contain" />
    </div>
  );
};

export default MemeDetails;