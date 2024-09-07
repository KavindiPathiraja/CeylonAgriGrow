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
    </Routes>
  )
}

export default App