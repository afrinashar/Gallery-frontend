// UpdatePhoto.js
import React, { useState } from 'react';
import { updatePhoto } from '../api';

const UpdatePhoto = () => {
  const [photoData, setPhotoData] = useState({
    // initialize your form fields
    title: '',
    imageUrl: '',
    // other fields...
  });
  const [photoId, setPhotoId] = useState(''); // set the initial photo ID

  const handleUpdate = async () => {
    try {
      const updatedPhoto = await updatePhoto(photoId, photoData);
      // Handle success, e.g., show a success message or redirect
    } catch (error) {
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div>
      <h2>Update Photo</h2>
      <form>
        {/* Render your form inputs and handle changes */}
        <input
          type="text"
          placeholder="Title"
          value={photoData.title}
          onChange={(e) => setPhotoData({ ...photoData, title: e.target.value })}
        />
        {/* Add other input fields as needed */}
        <button type="button" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdatePhoto;
