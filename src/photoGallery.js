import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
 
import { createPhoto } from './component/create';
import { updatePhoto } from './component/update';
import { deletePhoto
 } from './component/delete';
 import { getPhotos } from './component/get';
function PhotoGallery() {
  const [photos, setPhotos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoData, setPhotoData] = useState({
    title: '',
    description: '',
    imageUrl:''
    // other photo data fields
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('title');

  const fetchPhotos = async () => {
    try {
      const data = await getPhotos();
      setPhotos(data.photos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [page, limit, search, sort]);

  // ... Other functions for create, update, delete, and handleClose

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>Add Photo</Button>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="title">Title</option>
          <option value="date">Date</option>
          {/* Add options for other fields to sort by */}
        </select>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            {/* Add table headers for other fields */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {photos?photos.map((photo) => (
            <tr key={photo._id}>
              <td>{photo.name}</td>
              <td>{photo.description}</td>
              <td>{photo.imageUrl}</td>
              {/* Add table cells for other fields */}
              <td>
                <Button onClick={() => (photo._id)}>Delete</Button>
                <Button
                  onClick={() => {
                    setSelectedPhoto(photo);
                    setPhotoData({
                      title: photo.name,
                      description: photo.description,
                      imageUrl:photo.imageUrl
                      // set other photo data fields
                    });
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))
        :"NO DATA FOUND"}
        </tbody>
      </Table>
    {photos?photos.map((photo) => (  <div class="card" key={photo._id} style={{width: "18rem"}}>
  <img class="card-img-top" src=".../100px180/?text=Image cap" alt="Card image cap"></img>
  <div class="card-body">
    <p class="card-text"> {photo.name} 
              {photo.description} 
             {photo.imageUrl}Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <Button onClick={() => (photo._id)}>Delete</Button>
                <Button
                  onClick={() => {
                    setSelectedPhoto(photo);
                    setPhotoData({
                      title: photo.name,
                      description: photo.description,
                      imageUrl:photo.imageUrl
                      // set other photo data fields
                    });
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>
  </div>
</div>)): (  <div class="card"   style={{width: "18rem"}}>
  <img class="card-img-top" src=".../100px180/?text=Image cap" alt="Card image cap"></img>
  <div class="card-body">
    <p class="card-text">  dname 
                description
            imageUrl Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <Button  >Delete</Button>
                <Button
                 
                >
                  Edit
                </Button>
  </div>
</div>)
}

      <Button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous Page
      </Button>
      <Button onClick={() => setPage(page + 1)}>Next Page</Button>

      {/* Modal for Create/Update */}
      {/* ... The modal code remains the same as in the previous response */}
    </div>
  );
}

export default PhotoGallery;
