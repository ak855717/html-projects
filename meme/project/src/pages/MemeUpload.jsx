// src/pages/MemeUpload.jsx
import { useState } from 'react';
import axios from 'axios';

const MemeUpload = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [preview, setPreview] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('caption', caption);

    try {
      await axios.post('/api/upload-meme', formData);
      alert('Meme uploaded successfully!');
    } catch (error) {
      console.error('Error uploading meme:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Upload Meme</h1>
      <input type="file" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" className="mt-4 max-w-xs" />}
      <input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Add a caption"
        className="mt-4 p-2 border rounded"
      />
      <button onClick={handleSubmit} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Upload
      </button>
    </div>
  );
};

export default MemeUpload;