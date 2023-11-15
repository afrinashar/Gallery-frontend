// PhotoList.js
import React, { useState, useEffect } from 'react';
import { getPhotos } from '../api';
import {Button,Card,Form,Row,Col,Container} from 'react-bootstrap';
//import Card from 'react-bootstrap/Card';
import handleViewDetails from './GetPhotosById'
const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
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

  // Pagination logic
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Search logic
  const filteredPhotos = photos.filter((photo) =>
    photo.title
    //.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
   
    );
    // Sorting logic
 const sortedPhotos = [...filteredPhotos].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    return order * a.title.localeCompare(b.title);
  });
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
      <h2>Photo Gallery</h2>

      {/* Search bar */}
      <Form.Control
      xs={4} sm={3} md={2}
              type="text"
              placeholder="Search..."
              className=" mr-sm-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
     

      {/* Sorting dropdown */}
      <select onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Sort A-Z</option>
        <option value="desc">Sort Z-A</option>
      </select>

      <Container  >
<Row className="justify-content-md-center d-flex flex-col"> {/* Display photos */}
      { photos?  photos.map((photo) => (
       <> 


<Col key={photo.id} xs={12} sm={6} md={3}>
     <a  key={photo.id} style={{ width: '18rem' }}  className='custom-card'> 
     <div className='card'>
      <img variant="top" src={photo.imageUrl} />
      <div className='card-body'>
        <div className='card-title'>{photo.title}</div>
        <div className='card-text'>
        {photo.description}
        {photo.createdAt}
        </div>
         <Button onClick={handleViewDetails}></Button>
      </div></div>
      </a> </Col>
     </> ))
      
    
      :""}
  </Row> </Container>
      {/* Pagination */}
      <div>
        {Array.from({ length: Math.ceil(filteredPhotos.length / photosPerPage) }).map(
          (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default PhotoList;
