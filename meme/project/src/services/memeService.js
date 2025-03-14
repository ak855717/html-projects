// src/services/memeService.js
import axios from 'axios';

export const fetchMemes = async (page) => {
  const response = await axios.get(`/api/memes?page=${page}`);
  return response.data;
};