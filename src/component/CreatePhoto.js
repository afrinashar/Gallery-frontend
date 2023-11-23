// // CreatePhoto.js
// import React, { useState } from 'react';
  import { createPhoto } from '../api';
// import { Button, Row, Col, Form, Modal } from "react-bootstrap"
 
 import { useNavigate } from "react-router-dom"

// const CreatePhoto = () => {
  
//   const [photoData, setPhotoData] = useState({
//     // initialize your form fields
//     name: '',
//     description: '',
//     imageUrl: '',
//   });
//   const [showModal, setShow] = useState(true)
//   const handleChange = (e) => {
//     setPhotoData({ ...photoData, [e.target.name]: e.target.value },
//       //URL.createObjectURL(e.target.files[0])
//       );
//   };
//   const handleCreate = async () => {
//     try {
//       const newPhoto = await createPhoto(photoData)
//       .then((response) => response.newPhoto)
//       .then((data) => console.log('Image created:', data))
//       Navigate('/')
//     } catch (error) {
//       console.error('Error creating image:', error)
//     }
//   };
//   const closeButton=()=>{Navigate('/')}
//   return (
//     <div>
//      <Modal show={showModal} key={photoData.id} onHide={handleCreate}>
//           <Modal.Header >
//             <Modal.Title>Create Profile</Modal.Title>
//             <button type="button" class="close"  onClick={closeButton()} aria-label="Close">
//   <span aria-hidden="true">&times;</span>
// </button>
//           </Modal.Header>
//       <form onSubmit={handleCreate}>
//       <Modal.Body>
//         <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             name="name"
//             value={photoData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description">Description:</label>
//           <textarea
//             className="form-control"
//             id="description"
//             name="description"
//             value={photoData.description}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="imageUrl">Image URL:</label>
//           <input
//             type="text"
//             className="form-control"
//             id="imageUrl"
//             name="imageUrl"
//             value={photoData.imageUrl}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         </Modal.Body> 
//         <Modal.Footer>
//               <Button type="button" variant="primary" onClick={handleCreate}>
//                 Create Image
//               </Button>
//             </Modal.Footer>
       
//       </form>
//       </Modal>
//     </div>
//   );
// };

// export default CreatePhoto;





 



import React, { useState } from 'react';
import { Button,Modal } from 'react-bootstrap'; // Replace 'your-ui-library' with the actual library you're using
 

const CreatePhoto = () => {
  const [showModal, setShowModal] = useState(false);
  const [photoData, setPhotoData] = useState({
    id: null,
    name: '',
    description: '',
    imageUrl: null,
  });
  const Navigate = useNavigate()
  const handleCreate = async(e) => {
    
    e.preventDefault()
    ;try {
      const newPhoto = await createPhoto(photoData)
      .then((response) => response.newPhoto)
      .then((data) => console.log('Image created:', data))
      Navigate('/')
    } catch (error) {
      console.error('Error creating image:', error)
    }
    // Implement your logic for creating a profile here
    // You can send the data to the server, update state, etc.
    console.log('Creating profile:', photoData);
    // Reset the form and close the modal
    setPhotoData({
      id: null,
      name: '',
      description: '',
      imageUrl: null,
    });
    setShowModal(false);
  };

  const handleClose = () => {
    // Reset the form and close the modal without saving changes
    setPhotoData({
      id: null,
      name: '',
      description: '',
      imageUrl: null,
    });
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setPhotoData((prevData) => ({
      ...prevData,
      [name]: name === 'imageUrl' ? files[0] : value,
    }));
  };


  return (
    <div>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Open Modal
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Create Profile</Modal.Title>
          <button type="button" className="close" onClick={handleClose} aria-label="Close">
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
              <label htmlFor="imageUrl">Upload Image:</label>
              <input
                type="file"
                className="form-control"
                id="imageUrl"
                name="imageUrl"
                accept="image/*"
                onChange={handleChange}
                required
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Create Image
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

    </div>
  );
};

 

export default CreatePhoto;
