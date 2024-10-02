// Importing necessary dependencies
import { useState } from "react";
import React from 'react';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../config/firebase";
import Swal from 'sweetalert2';

// Functional component for creating Farmers
const CreateFarmers = () => {
  // State variables for managing form data and loading state
  const [FarmerName, setFarmerName] = useState('');
  const [ContactNo, setContactNo] = useState('');
  const [Email, setEmail] = useState('');
  const [Address, setAddress] = useState('');
  const [Password, setPassword] = useState('');
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const storage = getStorage(app);

  // Event handler for saving the Farmers
  const handleSaveFarmers = () => {
    // Basic validation to ensure no required fields are empty
    if (!FarmerName || !ContactNo || !Email || !Address || !Password) {
      Swal.fire('Validation Error', 'All fields are required.', 'error');
      return;
    }

    // Check if the email format is valid (basic regex for email validation)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(Email)) {
      Swal.fire('Validation Error', 'Please enter a valid email address.', 'error');
      return;
    }

    // Validate ContactNo to ensure it is a 10-digit number
    if (!/^\d{10}$/.test(ContactNo)) {
      Swal.fire('Validation Error', 'Please enter a valid 10-digit contact number.', 'error');
      return;
    }

    // Creating data object from form inputs
    const uploadImageAndSubmit = (downloadURL) => {
      const data = {
        FarmerName,
        ContactNo,
        Email,
        Address,
        Password,
        image: downloadURL || null, // Set image to null if no image is uploaded
      };

      setLoading(true);

      // Making a POST request to save the Farmers data
      axios
        .post('http://localhost:5556/farmers', data)
        .then(() => {
          // Resetting loading state and navigating to the all Farmers page
          setLoading(false);
          Swal.fire('Success', 'Farmer created successfully!', 'success').then(() => {
            navigate('/farmers/Login');
          });
        })
        .catch((error) => {
          // Handling errors by resetting loading state, showing an alert, and logging the error
          setLoading(false);
          if (error.response && error.response.data && error.response.data.message) {
            Swal.fire('Error', error.response.data.message, 'error'); // Show error from server
          } else {
            Swal.fire('Error', 'An error happened. Please check console', 'error');
          }
          console.log(error);
        });
    };

    if (image) {
      const storageRef = ref(storage, `farmer_images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => { },
        (error) => {
          console.error(error);
          setLoading(false);
          Swal.fire('Error', 'Failed to upload image. Please try again.', 'error');
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(uploadImageAndSubmit);
        }
      );
    } else {
      uploadImageAndSubmit(null); // No image uploaded
    }
  };

  // JSX for rendering the create Farmers form
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <BackButton destination='/farmers/Login' />
      <h1 className="text-3xl my-4 text-green-800">Create Farmers</h1>
      {loading && <Spinner />}
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
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>

        <div className="my-4">
          <label htmlFor="image" className="text-xl mr-4 text-gray-500">Image (Optional)</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          className='p-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500'
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
