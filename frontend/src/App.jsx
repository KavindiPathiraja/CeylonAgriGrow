import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import AddDisease from './pages/AddDisease'
import DiseaseTable from './pages/diseaseTable'
import DiseaseList from './pages/diseaseList'
import UpdateDisease from './pages/updateDisease'
import SelectCrop from './pages/selectCropPage'
import CropDiseases from './pages/CropDiseases'
import SingleDisease from './pages/SingleDisese'

import ShowProduct from './pages/Products/ShowProducts';
import ReadOneProducts from './pages/Products/ReadOneProducts';
import CreateProducts from './pages/Products/CreateProducts';
import EditProducts from './pages/Products/EditProducts';
import DeleteProducts from './pages/Products/DeleteProducts';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>

      <Route path='/Pest&Disease/addDisease' element={<AddDisease />}/>
      <Route path='/Pest&Disease/diseaseTable' element={<DiseaseTable />}/>
      <Route path='/Pest&Disease/diseaseList' element={<DiseaseList />}/>
      <Route path='/Pest&Disease/diseaseTable/UpdateDisease/:id' element={<UpdateDisease />}/>
      <Route path='/Pest&Disease/selectCrop' element={<SelectCrop />}/>
      <Route path='/Pest&Disease/FindDiseases/:Crop' element={<CropDiseases />}/>
      <Route path='/Diseaselist/:id' element={<SingleDisease />}/>


      <Route path='/products/allProducts' element={<ShowProduct />}/>
      <Route path='/products/details/:id' element={<ReadOneProducts />}/>
      <Route path='/products/create' element={<CreateProducts />}/>
      <Route path='/products/edit/:id' element={<EditProducts />}/>
      <Route path='/products/delete/:id' element={<DeleteProducts />}/>

    </Routes>
  )
}

export default App