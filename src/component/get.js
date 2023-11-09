import axios from 'axios';

const API_URL = 'http://your-backend-url/api/photos';

export const getPhotos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};
