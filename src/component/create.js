import axios from 'axios';

const API_URL = 'http://localhost:3000/images'
export const createPhoto = async (photoData) => {
  try {
    const response = await axios.post(API_URL, photoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
