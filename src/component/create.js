import axios from 'axios';

const API_URL = 'http://your-backend-url/api/photos';

export const createPhoto = async (photoData) => {
  try {
    const response = await axios.post(API_URL, photoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
