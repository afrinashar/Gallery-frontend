// UpdatePhoto.js
import React, { useState } from 'react';
import { updatePhoto } from '../api';
import { Button, Row, Col, Form, Modal } from "react-bootstrap"
 
import { useNavigate } from "react-router-dom"
const UpdatePhoto = () => {
  const Navigate = useNavigate()
  const [photoData, setPhotoData] = useState({
    // initialize your form fields
    title: '',
    imageUrl: '',
    // other fields...
  });
  const [showModal, setShow] = useState(true)
  const [photoId, setPhotoId] = useState(''); // set the initial photo ID
  const handleChange = (e) => {
    setPhotoData({ ...photoData, [e.target.name]: e.target.value },
      //URL.createObjectURL(e.target.files[0])
      );
  };
  const handleUpdate = async () => {
    try {
     // const newPhoto = await createPhoto(photoData)
     const updatedPhoto = await updatePhoto(photoId, photoData)
      .then((response) => response.newPhoto)
      .then((data) => console.log('Image updated:', data))

      Navigate('/')
      setPhotoData(updatedPhoto)
      ;
      // Handle success, e.g., show a success message or redirect
    } catch (error) {
      // Handle error, e.g., show an error message
    }
  };
  const closeButton=()=>{Navigate('/')}
  return (
    <div>
     <Modal show={showModal} key={photoData._id} onHide={handleUpdate}>
          <Modal.Header >
            <Modal.Title>Update Profile</Modal.Title>
          </Modal.Header>
      <form onSubmit={handleUpdate}>
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
              <Button type="button" variant="primary" onClick={handleUpdate}>
                Update Image
              </Button>
            </Modal.Footer>
       
      </form>
      </Modal>
    </div>
  );
};

export default UpdatePhoto;
