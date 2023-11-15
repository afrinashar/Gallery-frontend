// DeletePhoto.js
import React, { useState } from 'react';
import { deletePhoto } from '../api';

const DeletePhoto = () => {
  const [photoId, setPhotoId] = useState('');  

  const handleDelete = async () => {
    try {
      await deletePhoto(photoId);
       
    } catch (error) {
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div>
      <h2>Delete Photo</h2>
      <form>
        {/* Render input for photo ID and handle changes */}
        <input
          type="text"
          placeholder="Photo ID"
          value={photoId}
          onChange={(e) => setPhotoId(e.target.value)}
        />
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default DeletePhoto;
