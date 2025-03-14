// src/pages/UserProfile.jsx
import { useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    bio: 'Meme enthusiast',
    profilePicture: 'https://via.placeholder.com/150',
  });

  const handleUpdateProfile = () => {
    alert('Profile updated!');
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <img src={user.profilePicture} alt="Profile" className="w-24 h-24 rounded-full" />
      <input
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        className="p-2 border rounded"
      />
      <textarea
        value={user.bio}
        onChange={(e) => setUser({ ...user, bio: e.target.value })}
        className="p-2 border rounded"
      />
      <button onClick={handleUpdateProfile} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Save
      </button>
    </div>
  );
};

export default UserProfile;