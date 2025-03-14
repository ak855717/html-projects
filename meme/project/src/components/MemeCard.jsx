import React from "react";
import { motion } from "framer-motion";

const MemeCard = ({ meme }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="border rounded-lg overflow-hidden shadow-lg"
    >
      <img src={meme.url} alt={meme.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{meme.name}</h2>
      </div>
    </motion.div>
  );
};

export default MemeCard;