import React from 'react'
import PhotoList from './component/PhotoList';
import CreatePhoto from './component/CreatePhoto';
import UpdatePhoto from './component/UpdatePhoto';
import DeletePhoto from './component/DeletePhoto';
import PhotoListById from './component/GetPhotosById';

const Dashboard = () => {
  return (
    <div>
      <h1>Photo Gallery</h1>
 <PhotoList/>
    </div>
  )
}

export default Dashboard