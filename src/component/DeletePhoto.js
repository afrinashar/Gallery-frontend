import React, { useState } from 'react';
import { deletePhoto } from '../api';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DeletePhoto = () => {
  const Navigate = useNavigate();
  const [photoId, setPhotoId] = useState('');
  
  const closeButton = () => {
    Navigate('/');
  };
  console.log(photoId,"photo if")
  const handleDelete = async () => {
    try {
      console.log('Deleting photo with ID:', photoId);
      await deletePhoto(photoId);
      console.log(photoId,"photo if")
      //setPhotoId(''); // Clear the photoId after successful deletion
      closeButton(); // Close the modal or navigate to another page
    } catch (error) {
      console.error('Error deleting photo:', error);
      console.log(photoId,"photo if")
    }
  };

  return (
    <div>
      <h2>Delete Photo</h2>
      <div className="modal show" style={{ display: 'block', position: 'initial' }}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Remove profile</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to delete?</p>
          </Modal.Body>

          <Modal.Footer key={photoId._id}>
            <Button onClick={closeButton} variant="success">
              Close
            </Button>
            <Button onClick={handleDelete} variant="danger">
              Delete
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  );
};

export default DeletePhoto;
