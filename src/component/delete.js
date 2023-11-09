import axios from 'axios';

const API_URL = 'http://your-backend-url/api/photos';

export const deletePhoto = async (photoId) => {
  try {
    const response = await axios.delete(`${API_URL}/${photoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
