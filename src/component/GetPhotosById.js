// PhotoList.js
import React, { useState, useEffect } from 'react';
import { getPhotos, getPhotoById } from '../api';
import { Link } from 'react-router-dom'
import {Button,Card,Image , DropdownButton,Dropdown,Form,Row,Col,Container,Modal} from 'react-bootstrap';
import handleItemClick from './PhotoList'
import { useParams } from 'react-router-dom';
import { CiBoxList } from "react-icons/ci";
import { useNavigate } from "react-router-dom"
const PhotoListById = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(null); // Added state for a single photo
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const params = useParams();
 // const { state } = window.location;
  const Navigate = useNavigate() 
  // Access item data from the route state
 // const photo = state && state.photo;
  const closeButton=()=>{Navigate('/')}
  useEffect(() => {
    const fetchPhotos = async (photoId) => {
      const data = await getPhotoById(photoId );
      setPhotos(data);
  
   
   }; 
    fetchPhotos();
  }, []);
  console.log(getPhotoById, "dataa", ) 
 // console.log(( id.photos),"fetch")
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
     
    name: "",
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
      
      <h2>Details for Item {  itemDetails.id
}</h2>
       {  (
        <div>
          {/*  <p>Name: {photo.name}</p>
          <p>Name: {photo.description}</p>
          <p>Name: {photo.imageUrl}</p>
         Add other details here */}
        </div>
      )}
      {params.id}
      {params._id}
      {params.name}
   
      {/* Display details for the selected photo */}
      {sortedPhotos && (sortedPhotos.map((photo,index)=>(
         <div
         className="modal show"
         style={{ display: 'block', position: 'initial' }}
       >
         <Modal.Dialog>
           <Modal.Header closeButton>
           <Card.Title>{photo.name} {params.id.name} </Card.Title>
           </Modal.Header>
   
           <Modal.Body >
           
      <Image    src={photo.imageUrl} fluid />
     
 
           </Modal.Body>
   
           <Modal.Footer>
           <Card.Body>
        
        <Card.Text >
       <h6>description</h6>{photo.description} 
       Created <h6>{photo.createdAt.slice(0,10)}</h6> 
        </Card.Text>
       
       
      </Card.Body>
       <Button variant="success" onClick={() => handleDownload(photo.imageUrl, photo.title)}>
            Download
          </Button>
             <Button variant="secondary">Close</Button>
              <DropdownButton icon={<CiBoxList />}  >

      <Dropdown.Item  >    <Link to={`/update/${photo._id}`}>Update</Link> </Dropdown.Item>
      <Dropdown.Item className='bg-danger text-white b-2' href="/delete:id">Delete</Dropdown.Item>
  
    </DropdownButton>
           </Modal.Footer>
         </Modal.Dialog>
       </div>
      )))}
    </div>
  );
};

export default PhotoListById;
