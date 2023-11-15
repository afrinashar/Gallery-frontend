// PhotoList.js
import React, { useState, useEffect } from 'react';
import { getPhotos, getPhotoById } from '../api';
import {Button,Card,Form,Row,Col,Container,Modal} from 'react-bootstrap';
const PhotoListById = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(null); // Added state for a single photo
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchPhotos = async () => {
      const data = await getPhotos();
      setPhotos(data);
    };
    fetchPhotos();
  }, []);

  // Pagination logic, search logic, sorting logic remain unchanged

  const handleViewDetails = async (photoId) => {
    try {
      const photo = await getPhotoById(photoId);
      setCurrentPhoto(photo);
    } catch (error) {
      console.error('Error fetching photo by ID', error);
    }
  };
  const handleDownload = (imageUrl, title) => {
    // Create a link element
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${title}.jpg`;
    document.body.appendChild(link);

    // Trigger the click event to start the download
    link.click();

    // Clean up the link element
    document.body.removeChild(link);
  };
  return (
    <div>
      {/* Existing code for search, sort, and pagination */}
      
      {/* Display photos with a button to view details */}
      

      {/* Display details for the selected photo */}
      {currentPhoto && (currentPhoto.map((photo)=>(
         <div
         className="modal show"
         style={{ display: 'block', position: 'initial' }}
       >
         <Modal.Dialog>
           <Modal.Header closeButton>
             <Modal.Title>Modal title</Modal.Title>
           </Modal.Header>
   
           <Modal.Body>
           <Card key={photo.id} style={{ width: '18rem' }} onClick={handleViewDetails}>
      <Card.Img variant="top" src={photo.imageUrl} />
      <Card.Body>
        <Card.Title>{photo.title}</Card.Title>
        <Card.Text>
        {photo.description}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
        <Button variant="success" onClick={() => handleDownload(photo.imageUrl, photo.title)}>
            Download
          </Button>
      </Card.Body>
    </Card>
           </Modal.Body>
   
           <Modal.Footer>
             <Button variant="secondary">Close</Button>
             <Button variant="primary">Save changes</Button>
           </Modal.Footer>
         </Modal.Dialog>
       </div>
      )))}
    </div>
  );
};

export default PhotoListById;
