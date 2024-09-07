import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'

import ShowProduct from './pages/Products/ShowProducts';
import ReadOneProducts from './pages/Products/ReadOneProducts';
import CreateProducts from './pages/Products/CreateProducts';
import EditProducts from './pages/Products/EditProducts';
import DeleteProducts from './pages/Products/DeleteProducts';

import ShowFarmers from './pages/Farmers/ShowFarmers';
import ReadOneFarmers from './pages/Farmers/ReadOneFarmers';
import CreateFarmers from './pages/Farmers/CreateFarmers';
import EditFarmers from './pages/Farmers/EditFarmers';
import DeleteFarmers from './pages/Farmers/DeleteFarmers';

import Login from './components/Login';

import ReadOneMyProducts from './pages/Farmers/ReadOneMyProducts';
import CreateMyProducts from './pages/Farmers/CreateMyProducts';
import EditMyProducts from './pages/Farmers/EditMyProducts';
import DeleteMyProducts from './pages/Farmers/DeleteMyProducts';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>

      <Route path='/products/allProducts' element={<ShowProduct />}/>
      <Route path='/products/details/:id' element={<ReadOneProducts />}/>
      <Route path='/products/create' element={<CreateProducts />}/>
      <Route path='/products/edit/:id' element={<EditProducts />}/>
      <Route path='/products/delete/:id' element={<DeleteProducts />}/>

      <Route path='/farmers/allFarmers' element={<ShowFarmers />}/>
      <Route path='/farmers/details/:id' element={<ReadOneFarmers />}/>
      <Route path='/farmers/create' element={<CreateFarmers />}/>
      <Route path='/farmers/edit/:id' element={<EditFarmers />}/>
      <Route path='/farmers/delete/:id' element={<DeleteFarmers />}/>

      <Route path='/farmers/Login' element={<Login />}/>

      <Route path='/myProducts/details/:id' element={<ReadOneMyProducts />}/>
      <Route path='/myProducts/create' element={<CreateMyProducts />}/>
      <Route path='/myProducts/edit/:id' element={<EditMyProducts />}/>
      <Route path='/myProducts/delete/:id' element={<DeleteMyProducts />}/>
      
    </Routes>
  )
}

export default App