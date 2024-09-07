// Importing necessary dependencies
import { useState, useEffect } from "react";
import React from 'react';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Functional component for EditProducts
const EditProducts = () => {
  // State variables for managing form data and loading state
  const [ProductNo, setProductNo] = useState('');
  const [ProductName, setProductName] = useState('');
  const [Category, setCategory] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [SellingPrice, setSellingPrice] = useState('');
  const [FarmerName, setFarmerName] = useState('');
  const [FarmerEmail, setFarmerEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:5556/products/${id}`)
    .then((Response) => {
      setProductNo(Response.data.ProductNo);
      setProductName(Response.data.ProductName);
      setCategory(Response.data.Category);
      setQuantity(Response.data.Quantity);
      setSellingPrice(Response.data.SellingPrice);
      setFarmerName(Response.data.FarmerName);
      setFarmerEmail(Response.data.FarmerEmail);

      setLoading(false);
    }).catch((error) =>{
      setLoading(false);
      alert(`An error happned. Please Check console`);
      console.log(error);
    });
  }, [])

  // Event handler for edit the Products
  const handleEditProducts = () => {
    // Creating data object from form inputs
    const data = {
      ProductName,
      Category,
      Quantity,
      SellingPrice,
      FarmerName,
      FarmerEmail,
    };
    setLoading(true);

    // Making a PUT request to Edit the Products data
    axios
      .put(`http://localhost:5556/products/${id}`, data)
      .then(() => {
        // Resetting loading state and navigating to the home pQuantity
        setLoading(false);
        navigate('/products/allProducts');
      })
      .catch((error) => {
        // Handling errors by resetting loading state, showing an alert, and logging the error
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  };

  // JSX for rendering the create Products form
  return (
    <div className="p-4">
      <BackButton destination='/products/allProducts'/>
      <h1 className="text-3xl my-4">Edit Products</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
      <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>ProductNo</label>
          <input
            type="text"
            value={ProductNo}
            onChange={(e) => setProductNo(e.target.value)}
            readOnly
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>ProductName</label>
          <input
            type="text"
            value={ProductName}
            onChange={(e) => setProductName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Category</label>
          <select
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="" disabled>Select Category</option>
            <option value="Crop">Crop</option>
            <option value="Fertilizer">Fertilizer</option>
            <option value="Pesticide">Pesticide</option>
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Quantity</label>
          <input
            type='number'
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>SellingPrice</label>
          <input
            type="number"
            value={SellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>FarmerName</label>
          <input
            type="text"
            value={FarmerName}
            onChange={(e) => setFarmerName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>FarmerEmail</label>
          <input
            type="text"
            value={FarmerEmail}
            onChange={(e) => setFarmerEmail(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditProducts}>
          Save
        </button>
      </div>
    </div>
  );
};

// Exporting the EditProducts component
export default EditProducts;
