// DeletePhoto.js
import React, { useState } from 'react';
import { deletePhoto } from '../api';

import{ Modal, Button }from "react-bootstrap";
import { useNavigate } from "react-router-dom"

import axios from 'axios';
const DeletePhoto = () => {
  const Navigate = useNavigate() 
  const [photoId, setPhotoId] = useState('');  
  const closeButton=()=>{Navigate('/')}
  const handleDelete = async () => {
    try {
      await deletePhoto(photoId);
      setPhotoId((id) => photoId.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  return (
    <div>
      <h2>Delete Photo</h2>
      <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Remove profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>are you sure to delete</p>
        </Modal.Body>

        <Modal.Footer key={photoId._id} >
          <Button onClick={closeButton} variant="success">Close</Button>
          <Button onClick={()=>handleDelete(photoId._id)} variant="danger">Delete</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div> </div>
  );
};

export default DeletePhoto;
