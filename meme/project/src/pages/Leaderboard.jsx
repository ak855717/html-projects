// src/pages/Leaderboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [topMemes, setTopMemes] = useState([]);

  useEffect(() => {
    axios.get('/api/leaderboard/memes').then((response) => setTopMemes(response.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      <div>
        {topMemes.map((meme) => (
          <div key={meme.id}>{meme.caption}</div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;