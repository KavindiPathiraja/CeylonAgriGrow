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
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5556/products/${id}`)
      .then((response) => {
        setProductNo(response.data.ProductNo);
        setProductName(response.data.ProductName);
        setCategory(response.data.Category);
        setQuantity(response.data.Quantity);
        setSellingPrice(response.data.SellingPrice);
        setFarmerName(response.data.FarmerName);
        setFarmerEmail(response.data.FarmerEmail);

        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  }, [id]);

  // Event handler for editing the Products
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

    // Making a PUT request to edit the Products data
    axios
      .put(`http://localhost:5556/products/${id}`, data)
      .then(() => {
        // Resetting loading state and navigating to the home page
        setLoading(false);
        navigate('/farmers/details/:id');
      })
      .catch((error) => {
        // Handling errors by resetting loading state, showing an alert, and logging the error
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  };

  // JSX for rendering the edit Products form
  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <BackButton destination='/farmers/details/:id' />
      <h1 className="text-3xl my-4 text-green-800">Edit Product</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-green-500 rounded-lg p-6 mx-auto bg-white shadow-lg w-4/5 max-w-3xl">
        <div className="my-4">
          <label className='text-lg font-semibold text-gray-700'>Product No</label>
          <input
            type="text"
            value={ProductNo}
            onChange={(e) => setProductNo(e.target.value)}
            readOnly
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>
        <div className="my-4">
          <label className='text-lg font-semibold text-gray-700'>Product Name</label>
          <input
            type="text"
            value={ProductName}
            onChange={(e) => setProductName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>
        <div className="my-4">
          <label className='text-lg font-semibold text-gray-700'>Category</label>
          <select
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          >
            <option value="" disabled>Select Category</option>
            <option value="Crop">Crop</option>
            <option value="Fertilizer">Fertilizer</option>
            <option value="Pesticide">Pesticide</option>
          </select>
        </div>
        <div className='my-4'>
          <label className='text-lg font-semibold text-gray-700'>Quantity</label>
          <input
            type='number'
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>
        <div className="my-4">
          <label className='text-lg font-semibold text-gray-700'>Selling Price</label>
          <input
            type="number"
            value={SellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>
        <div className="my-4">
          <label className='text-lg font-semibold text-gray-700'>Farmer Name</label>
          <input
            type="text"
            value={FarmerName}
            onChange={(e) => setFarmerName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>
        <div className="my-4">
          <label className='text-lg font-semibold text-gray-700'>Farmer Email</label>
          <input
            type="text"
            value={FarmerEmail}
            onChange={(e) => setFarmerEmail(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>
        <button className='p-2 bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500' onClick={handleEditProducts}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProducts;
