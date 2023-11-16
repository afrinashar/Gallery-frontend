// App.js
import React from 'react';
import PhotoList from './component/PhotoList';
import CreatePhoto from './component/CreatePhoto';
import UpdatePhoto from './component/UpdatePhoto';
import DeletePhoto from './component/DeletePhoto';
import PhotoListById from './component/GetPhotosById';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';

const App = () => {
  return (<>
   
<Routes>
<Route exact path="/"  element={ <Dashboard />}    />
<Route exact path="/create"  element={ <CreatePhoto />}    />
<Route exact path="/update"  element={    <UpdatePhoto />}    />
<Route exact path="/delete"  element={<DeletePhoto />}    />
<Route exact path="/:id"  element={ <PhotoListById/>}    />
</Routes>




 </> );
};

export default App;
