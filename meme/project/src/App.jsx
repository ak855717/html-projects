import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MemeExplorer from "./pages/MemeExplorer";
import MemeUpload from "./pages/MemeUpload";
import MemeDetails from "./pages/MemeDetails";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<MemeExplorer />} />
        <Route path="/upload" element={<MemeUpload />} />
        <Route path="/meme/:id" element={<MemeDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;