// PhotoList.js
import React, { useState, useEffect } from 'react';
import { getPhotos } from '../api';
import {Button,Card,Form,Row,Col,Container} from 'react-bootstrap';
//import Card from 'react-bootstrap/Card';
import PhotoListById from './GetPhotosById'
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
 
const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(5);
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
  const filteredPhotos = currentPhotos.filter((photo) =>
    photo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(filteredPhotos,"filteredPhotos");


    // Sorting logic
 const sortedPhotos = [...filteredPhotos].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    return order * a.name.localeCompare(b.name);
  });

  const handleItemClick = (photo) => {
console.log((photo.name),(photo._id),(photo.index),"id") 
 };
  
  return (
    <div>
      <h2>Photo Gallery</h2>
<div className='d-inline p-2'>
      {/* Search bar */}
      <Form.Control
      xs={4} sm={3} md={2}
              type="text"
              placeholder="Search..."
              className=" w-25 mr-sm-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
     

      {/* Sorting dropdown */}
      <select  className=' btn btn-primary '  placeholder='SORT' onChange={(e) => setSortOrder(e.target.value)}>
        SORT
        <option value="asc">Sort A-Z</option>
        <option value="desc">Sort Z-A</option>
      </select>
      </div>
      <Container  >
<Row className="justify-content-md-center d-flex flex-col"> {/* Display photos */}
      { sortedPhotos?  sortedPhotos.map((photo,index) => (
       <> 


<Col key={photo.id} xs={12} sm={6} md={3}>
    <Link to={`/${index + 1}`}   > <a  key={photo._id} style={{ width: '18rem' }}  action onClick={() => handleItemClick(photo)}    className='custom-card'> 
     <div className='card'>
      <img variant="top" src={photo.imageUrl} />
      <div className='card-body'>
        <div className='card-title'>{photo.name}</div>
        <div className='card-text'>
        {photo.description}
        {photo.createdAt}
        </div>
        
      </div></div>
      </a> </Link></Col>
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
