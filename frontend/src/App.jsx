import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CreateCrop from './pages/CreateCrop';
import EditCrop from './pages/EditCrop';
import ShowCrop from './pages/ShowCrop';
import DeleteCrop from './pages/DeleteCrop';
import AllCrop from './pages/AllCrop';
import ReportCrop from './pages/ReportCrop';


import AddDisease from './pages/Disease/AddDisease'
import DiseaseTable from './pages/Disease/diseaseTable'
import DiseaseList from './pages/Disease/diseaseList'
import UpdateDisease from './pages/Disease/updateDisease'
import SelectCrop from './pages/Disease/selectCropPage'
import CropDiseases from './pages/Disease/CropDiseases'
import SingleDisease from './pages/Disease/SingleDisease'
import DiseasePrediction from './pages/Disease/DiseasePredictionForm'

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

import Home from './pages/Home';

const App = () => {
  return (
    <Routes>

      <Route path='/crops/create' element={<CreateCrop />} />
      <Route path='/crops/details/:id' element={<ShowCrop />} />
      <Route path='/crops/edit/:id' element={<EditCrop />} />
      <Route path='/crops/getall' element={<AllCrop />} />
      <Route path='/crops/report' element={<ReportCrop />} />
      <Route path='/crops/delete/:id' element={<DeleteCrop />} />

      <Route path='/' element={<Home />}/>

      <Route path='/Pest&Disease/diseaseTable/addNew' element={<AddDisease />}/>
      <Route path='/Pest&Disease/diseaseTable' element={<DiseaseTable />}/>
      <Route path='/Pest&Disease/diseaseList' element={<DiseaseList />}/>
      <Route path='/Pest&Disease/diseaseTable/UpdateDisease/:id' element={<UpdateDisease />}/>
      <Route path='/Pest&Disease/selectCrop' element={<SelectCrop />}/>
      <Route path='/Pest&Disease/PredictDisease' element={<DiseasePrediction />}/>
      <Route path='/Pest&Disease/FindDiseases/:Crop' element={<CropDiseases />}/>
      <Route path='/Diseaselist/:id' element={<SingleDisease />}/>


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
  );
}

export default App;
