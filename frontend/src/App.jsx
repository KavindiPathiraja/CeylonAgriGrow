import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'

import ShowProduct from './pages/Products/ShowProducts';
import ReadOneProducts from './pages/Products/ReadOneProducts';
import CreateProducts from './pages/Products/CreateProducts';
import EditProducts from './pages/Products/EditProducts';
import DeleteProducts from './pages/Products/DeleteProducts';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>

      <Route path='/products/allProducts' element={<ShowProduct />}/>
      <Route path='/products/details/:id' element={<ReadOneProducts />}/>
      <Route path='/products/create' element={<CreateProducts />}/>
      <Route path='/products/edit/:id' element={<EditProducts />}/>
      <Route path='/products/delete/:id' element={<DeleteProducts />}/>
      
    </Routes>
  )
}

export default App