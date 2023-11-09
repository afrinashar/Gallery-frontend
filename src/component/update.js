import axios from 'axios';

const API_URL = 'http://your-backend-url/api/photos';

export const updatePhoto = async (photoId, photoData) => {
  try {
    const response = await axios.put(`${API_URL}/${photoId}`, photoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
