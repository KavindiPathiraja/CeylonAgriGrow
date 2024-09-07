// Importing necessary dependencies
import { useState } from "react";
import React from 'react';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Functional component for creating Farmers
const CreateFarmers = () => {
  // State variables for managing form data and loading state
  const [FarmerName, setFarmerName] = useState('');
  const [ContactNo, setContactNo] = useState('');
  const [Email, setEmail] = useState('');
  const [Address, setAddress] = useState('');
  const [Password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Event handler for saving the Farmers
  const handleSaveFarmers = () => {
    // Creating data object from form inputs
    const data = {
      FarmerName,
      ContactNo,
      Email,
      Address,
      Password,
    };
    setLoading(true);

    // Making a POST request to save the Farmers data
    axios
      .post('http://localhost:5556/farmers', data)
      .then(() => {
        // Resetting loading state and navigating to the all Farmers page
        setLoading(false);
        navigate('/farmers/Login');
      })
      .catch((error) => {
        // Handling errors by resetting loading state, showing an alert, and logging the error
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  };

  // JSX for rendering the create Farmers form
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <BackButton destination='/farmers/Login'/>
      <h1 className="text-3xl my-4 text-green-800">Create Farmers</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-green-500 rounded-xl w-[600px] p-4 mx-auto bg-white">
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Farmer Name</label>
          <input
            type="text"
            value={FarmerName}
            onChange={(e) => setFarmerName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>ContactNo</label>
          <input
            type='text'
            value={ContactNo}
            onChange={(e) => setContactNo(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Email</label>
          <input
            type='text'
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Address</label>
          <input
            type="text"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Password</label>
          <input
            type="text"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>
        
        <button 
          className='p-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500' 
          onClick={handleSaveFarmers}
        >
          Save
        </button>
      </div>
    </div>
  );
};

// Exporting the CreateFarmers component
export default CreateFarmers;
