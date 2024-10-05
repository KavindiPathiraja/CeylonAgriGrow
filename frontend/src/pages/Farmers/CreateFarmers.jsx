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
import Header from "../../components/header1"; // Assuming this is the path to your Header component
import Footer from "../../components/footer"; // Assuming this is the path to your Footer component
import '../add service.css'; // Ensure the CSS file is imported

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
            navigate('/farmers/allfarmers');
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
    <>
      <Header />
      <div className="bg-[url('/bg.jpg')] bg-cover min-h-screen">
        <div className="pt-12">
          <div className="flex justify-center bg-primary w-2/5 m-auto pt-8 pb-8 rounded-lg opacity-95">
            <form className="w-full max-w-lg p-4" onSubmit={handleSaveFarmers}>
              <h1 className="text-3xl mb-4 text-white-800">Create Farmers</h1>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6">
                  <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="farmer-name">
                    Farmer Name
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="farmer-name" type="text" placeholder="Farmer Name" onChange={(e) => setFarmerName(e.target.value)} required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="contact-no">
                    Contact No
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="contact-no" type="text" placeholder="Contact No" onChange={(e) => setContactNo(e.target.value)} required />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6">
                  <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="address">
                    Address
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="address" type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6">
                  <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6">
                  <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="image">
                    Upload Image
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="image" type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
              </div>
              <button className="w-full bg-secondary hover:bg-lime-500 text-grey-300 font-bold py-2 px-4 border-b-4 border-lime-800 hover:border-lime-900 rounded" type="submit" disabled={loading}>
                {loading ? <Spinner /> : "Create Farmer"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateFarmers;
