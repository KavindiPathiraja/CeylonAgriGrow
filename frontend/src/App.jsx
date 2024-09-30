import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Home from './pages/Home'
import AddCrop from './pages/addCrop';
import MyCrops from './pages/myCrops';
import AllCrops from './components/AllCrops';
import EditItems from './components/UpdateCrop';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/addCrop' element={<AddCrop />} />
        <Route path='/myCrops' element={<MyCrops />} />
        <Route path='/allCrops' element={<AllCrops />} />
        <Route path='/updateCrop/:id' element={<EditItems />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App