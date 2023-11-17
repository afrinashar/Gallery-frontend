// CreatePhoto.js
import React, { useState } from 'react';
import { createPhoto } from '../api';
import { Button, Row, Col, Form, Modal } from "react-bootstrap"
 
import { useNavigate } from "react-router-dom"

const CreatePhoto = () => {
  const Navigate = useNavigate()
  const [photoData, setPhotoData] = useState({
    // initialize your form fields
    name: '',
    description: '',
    imageUrl: '',
  });
  const [showModal, setShow] = useState(true)
  const handleChange = (e) => {
    setPhotoData({ ...photoData, [e.target.name]: e.target.value },
      //URL.createObjectURL(e.target.files[0])
      );
  };
  const handleCreate = async () => {
    try {
      const newPhoto = await createPhoto(photoData)
      .then((response) => response.newPhoto)
      .then((data) => console.log('Image created:', data))
      Navigate('/')
    } catch (error) {
      console.error('Error creating image:', error)
    }
  };
  const closeButton=()=>{Navigate('/')}
  return (
    <div>
     <Modal show={showModal} key={photoData.id} onHide={handleCreate}>
          <Modal.Header >
            <Modal.Title>Create Profile</Modal.Title>
            <button type="button" class="close"  onClick={closeButton()} aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
          </Modal.Header>
      <form onSubmit={handleCreate}>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={photoData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={photoData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            className="form-control"
            id="imageUrl"
            name="imageUrl"
            value={photoData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        </Modal.Body> 
        <Modal.Footer>
              <Button type="button" variant="primary" onClick={handleCreate}>
                Create Image
              </Button>
            </Modal.Footer>
       
      </form>
      </Modal>
    </div>
  );
};

export default CreatePhoto;
