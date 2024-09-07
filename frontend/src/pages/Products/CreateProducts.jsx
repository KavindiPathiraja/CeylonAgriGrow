// Importing necessary dependencies
import { useState } from "react";
import React from 'react';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";

import axios from "axios";
import { useNavigate } from "react-router-dom";

// Functional component for creating products
const CreateProducts = () => {
  // State variables for managing form data and loading state
  const [ProductName, setProductName] = useState('');
  const [Category, setCategory] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [SellingPrice, setSellingPrice] = useState('');
  const [FarmerName, setFarmerName] = useState('');
  const [FarmerEmail, setFarmerEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Event handler for saving the Products
  const handleSaveProducts = () => {
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

    // Making a POST request to save the Products data
    axios
      .post('http://localhost:5556/products', data)
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
      <h1 className="text-3xl my-4">Create Products</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
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

        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Quantity</label>
          <input
            type='number'
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
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
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveProducts}>
          Save
        </button>
      </div>
    </div>
  );
};

// Exporting the I component
export default CreateProducts;
