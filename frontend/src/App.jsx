import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
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

import CreateCard from "./pages/Card/CreateCard";
import ItemCard from "./pages/Cart/ItemCard";
import Main from "./pages/Cart/Main";
import ItemDis from "./pages/Cart/ItemDis";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Cart/Checkout";
import MyOrder from "./pages/Cart/MyOrder";
import AllOrders from "./pages/Cart/AllOrders";
import DeleteOrder from "./pages/Cart/DeleteOrder";

import ReadOneHome from "./pages/ReadOneHome";
import HCard from './pages/HomeCard/Hcard';

import AddCrop from './pages/addCrop';
import MyCrops from './pages/myCrops';
import AllCrops from './components/AllCrops';
import EditItems from './components/UpdateCrop';
import PrivateRoute from "./components/PrivateRoute";
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';

import Home from './pages/Home';
import Home1 from './pages/Home1';

const App = () => {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Routes>

        <Route path="/ReadOneHome/:FarmerID" element={<ReadOneHome />} />

        <Route path='/crops/create' element={<CreateCrop />} />
        <Route path='/crops/details/:id' element={<ShowCrop />} />
        <Route path='/crops/edit/:id' element={<EditCrop />} />
        <Route path='/crops/getall' element={<AllCrop />} />
        <Route path='/crops/report' element={<ReportCrop />} />
        <Route path='/crops/delete/:id' element={<DeleteCrop />} />

        <Route path='/Pest&Disease/diseaseTable/addNew' element={<AddDisease />} />
        <Route path='/Pest&Disease/diseaseTable' element={<DiseaseTable />} />

        <Route path='/Pest&Disease/diseaseTable/UpdateDisease/:id' element={<UpdateDisease />} />
        <Route path='/Pest&Disease/selectCrop' element={<SelectCrop />} />
        <Route path='/Pest&Disease/PredictDisease' element={<DiseasePrediction />} />
        <Route path='/Pest&Disease/selectCrop/:cropType' element={<DiseaseList />} />
        <Route path='/DiseaseList/:id' element={<SingleDisease />} />

        <Route path='/home' element={<Home />} />

        <Route path='/products/allProducts' element={<ShowProduct />} />
        <Route path='/products/details/:id' element={<ReadOneProducts />} />
        <Route path='/products/create' element={<CreateProducts />} />
        <Route path='/products/edit/:id' element={<EditProducts />} />
        <Route path='/products/delete/:id' element={<DeleteProducts />} />

        <Route path='/farmers/allFarmers' element={<ShowFarmers />} />
        <Route path='/farmers/details/:id' element={<ReadOneFarmers />} />
        <Route path='/farmers/create' element={<CreateFarmers />} />
        <Route path='/farmers/edit/:id' element={<EditFarmers />} />
        <Route path='/farmers/delete/:id' element={<DeleteFarmers />} />

        <Route path='/farmers/Login' element={<Login />} />

        <Route path='/myProducts/details/:id' element={<ReadOneMyProducts />} />
        <Route path='/myProducts/create' element={<CreateMyProducts />} />
        <Route path='/myProducts/edit/:id' element={<EditMyProducts />} />
        <Route path='/myProducts/delete/:id' element={<DeleteMyProducts />} />

        <Route path="/card/create/:FarmerID" element={<CreateCard />} />

        <Route path="/itemcard/create" element={<ItemCard />} />
        <Route path="/cart/main" element={<Main />} />
        <Route path="/itemdis/:ProductNo/:FarmerID" element={<ItemDis />} />
        <Route path="/cart/:FarmerID" element={<Cart />} />
        <Route path="/checkout/:FarmerID" element={<Checkout />} />
        <Route path="/my-orders/:FarmerID" element={<MyOrder />} />
        <Route path="/allorders" element={<AllOrders />} />
        <Route path="/deleteorder/:orderId" element={<DeleteOrder />} />

        <Route path="/Hcard" element={<HCard />} />

        <Route path='/' element={<Home1 />} />
        <Route path='/addCrop' element={<AddCrop />} />
        <Route element={<PrivateRoute />}>
          <Route path='/myCrops' element={<MyCrops />} />
        </Route>
        <Route path='/allCrops' element={<AllCrops />} />
        <Route path='/updateCrop/:id' element={<EditItems />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
