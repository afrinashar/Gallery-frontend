// PhotoList.js
import React, { useState, useEffect } from 'react';
import { getPhotos } from '../api';
import {Button,Card, Modal,Form,Row,Col,Container,DropdownButton,Dropdown,Image} from 'react-bootstrap';
//import Card from 'react-bootstrap/Card';
import PhotoListById from './GetPhotosById'
import { Link } from 'react-router-dom';
import { CiBoxList } from "react-icons/ci";
import Pagination from 'react-bootstrap/Pagination';
 import handleViewDetails from './GetPhotosById'
const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState("");
  useEffect(() => {
    const fetchPhotos = async () => {
      const data = await getPhotos();
      setPhotos(data);
  
    };
    fetchPhotos();
  }, []);
  const handleClose = () => setShow(false);
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

  var handleItemClick = (photo) => {
   setEdit(photo)
  //  const{(edit) }= edit

 setShow(true)
 };
console.log( edit,(edit.name),"id")


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
<div className='d-inline p-2 '>
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


<Col key={photo._id} xs={12} sm={6} md={3}>
    <Link   > <a  key={photo._id} style={{ width: '18rem' }}  action onClick={() => handleItemClick(photo)}    className='custom-card'> 
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

<PhotoListById  handleItemClick={handleItemClick}  
photos={photos}
setShow={setShow}
show={show}
/>
<Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
         
          <Modal.Title> {edit.name} </Modal.Title>
        </Modal.Header>
        <Modal.Body> <Image    src={edit.imageUrl} fluid /> </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={() => handleDownload(edit.imageUrl, edit.title)}>
            Download
          </Button>
          
              <DropdownButton icon={<CiBoxList />}  >

      <Dropdown.Item  >    <Link to={`/update/${edit._id}`}>Update</Link> </Dropdown.Item>
      <Dropdown.Item className='bg-danger text-white b-2' href="/delete:id">Delete</Dropdown.Item>
  
    </DropdownButton>
        </Modal.Footer>
      </Modal>
 
 
 
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
