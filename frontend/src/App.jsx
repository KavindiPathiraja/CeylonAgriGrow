import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateCrop from './pages/CreateCrop';
import EditCrop from './pages/EditCrop';
import ShowCrop from './pages/ShowCrop';
import DeleteCrop from './pages/DeleteCrop';
import AllCrop from './pages/AllCrop';
import ReportCrop from './pages/ReportCrop';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/crops/create' element={<CreateCrop />} />
      <Route path='/crops/details/:id' element={<ShowCrop />} />
      <Route path='/crops/edit/:id' element={<EditCrop />} />
      <Route path='/crops/getall' element={<AllCrop />} />
      <Route path='/crops/report' element={<ReportCrop />} />
      <Route path='/crops/delete/:id' element={<DeleteCrop />} />
    </Routes>
  );
}

export default App;
