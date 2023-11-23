import React, { useState, useEffect } from 'react';
import { updatePhoto, getPhotos } from '../api';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UpdatePhoto = ({ photoId }) => {
  const Navigate = useNavigate();
  const [photoData, setPhotoData] = useState({
    name: '',
    description: '',
    // Add other properties as needed
  });

  useEffect(() => {
    // Fetch photo data when the component mounts
    const fetchPhotoData = async () => {
      try {
        const response = await getPhotos(photoId);
        setPhotoData(response.data); // Assuming getPhoto returns photo data
      } catch (error) {
        console.error('Error fetching photo data:', error);
      }
    };

    fetchPhotoData();
  }, [photoId]);

  const closeButton = () => {
    Navigate('/');
  };

  const handleUpdate = async () => {
    try {
      await updatePhoto(photoId, photoData);
      console.log(photoId, photoData);
      closeButton(); // Close the modal or navigate to another page
    } catch (error) {
      console.error('Error updating photo:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPhotoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Update Photo</h2>
      <div className="modal show" style={{ display: 'block', position: 'initial' }}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Edit Photo</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={photoData.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={photoData.description}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* Add other form fields as needed */}
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={closeButton} variant="secondary">
              Close
            </Button>
            <Button onClick={handleUpdate} variant="primary">
              Update
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  );
};

export default UpdatePhoto;
