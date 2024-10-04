import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from 'axios';

const DeleteProduct = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Function to handle the Product deletion
  const handleDeleteProduct = () => {
    setLoading(true);
    // Sending a DELETE request to the server to delete the Product by ID
    axios
      .delete(`http://localhost:8076/products/${id}`)
      .then(() => {
        // If the deletion is successful, update the state and navigate to the home page
        setLoading(false);
        navigate('/farmers/details/:id');
      })
      .catch((error) => {
        // If an error occurs, update the state, show an alert, and log the error to the console
        setLoading(false);
        alert(`An error happened: ${error.response ? error.response.data : error.message}`);
        console.error(error);
      });
  };

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      {/* Back button to navigate back */}
      
      <BackButton destination={`/farmers/details/${id}`} />
      <h1 className='text-3xl my-4 text-red-800'>Delete Product</h1>
      {/* Display a spinner while the delete operation is in progress */}
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-red-500 rounded-xl w-[600px] p-6 mx-auto bg-white'>
        <h3 className='text-2xl text-gray-700 mb-4'>Are you sure you want to delete this product?</h3>

        {/* Button to initiate the Product deletion */}
        <button
          className='p-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
          onClick={handleDeleteProduct}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteProduct;
