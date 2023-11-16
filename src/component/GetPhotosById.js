// PhotoList.js
import React, { useState, useEffect } from 'react';
import { getPhotos, getPhotoById } from '../api';
import {Button,Card,Form,Row,Col,Container,Modal} from 'react-bootstrap';
import handleItemClick from './PhotoList'
import { useParams } from 'react-router-dom';

const PhotoListById = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(null); // Added state for a single photo
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const { id } = useParams();
  const { state } = window.location;

  // Access item data from the route state
  const photo = state && state.photo;

  useEffect(() => {
    const fetchPhotos = async () => {
      const data = await getPhotos();
      setPhotos(data);
    };
    fetchPhotos();
  }, []);
  console.log(photo,"dataa")
  console.log(( id.photos),"fetch")
  // Pagination logic, search logic, sorting logic remain unchanged
// Pagination logic
const indexOfLastPhoto = currentPage * photosPerPage;
const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

const paginate = (pageNumber) => setCurrentPage(pageNumber);

// Search logic
const filteredPhotos = photos.filter((photo) =>
  photo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredPhotos,"filteredPhotos");


  // Sorting logic
const sortedPhotos = [...filteredPhotos].sort((a, b) => {
  const order = sortOrder === 'asc' ? 1 : -1;
  return order * a.name.localeCompare(b.name);
});
  const handleViewDetails = async (photoId) => {
    try {
      const photo = await getPhotoById(photoId);
      setCurrentPhoto(photo);
    } catch (error) {
      console.error('Error fetching photo by ID', error);
    }
  };
  const itemDetails = {
    id,
    name: `Item ${id}`,
    // Add other item details as needed
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
      
      <h2>Details for Item {  itemDetails.name
}</h2>
      <p>{photo && (
        <div>
          <p>Name: {photo.name}</p>
          <p>Name: {photo.description}</p>
          <p>Name: {photo.imageUrl}</p>
          {/* Add other details here */}
        </div>
      )}</p>
      {/* Display details for the selected photo */}
      {sortedPhotos && (sortedPhotos.map((photo)=>(
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
