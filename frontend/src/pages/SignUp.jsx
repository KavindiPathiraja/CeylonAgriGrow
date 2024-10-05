// Importing necessary dependencies
import { useState } from "react";
import React from 'react';
import BackButton from "../components/BackButton"; // Ensure this is used or remove
import Spinner from "../components/Spinner"; // Make sure to conditionally render the Spinner
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../config/firebase";
import Swal from 'sweetalert2';
import "./signup.css";

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

    // Function to upload image and submit data
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
          setLoading(false);
          Swal.fire('Success', 'Farmer created successfully!', 'success').then(() => {
            navigate('/signin');
          });
        })
        .catch((error) => {
          setLoading(false);
          const errorMessage = error.response?.data?.message || 'An error happened. Please check console';
          Swal.fire('Error', errorMessage, 'error'); // Show error from server
          console.log(error);
        });
    };

    // Handling image upload
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

  return (
    <>
      <div className="container1">
        <div className="user_login2">
          <h2>Create a New Account</h2>
          <p className="p">Farmer Name</p>
          <input
            type="text"
            value={FarmerName}
            onChange={(e) => setFarmerName(e.target.value)}
          />
          <p className="p">Contact No</p>
          <input
            type='text'
            value={ContactNo}
            onChange={(e) => setContactNo(e.target.value)}
          />
          <p className="p">Email</p>
          <input
            type='text'
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="p">Address</p>
          <input
            type="text"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <p className="p">Password</p>
          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="p">Image</p>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <br />
          <button className="btn" onClick={handleSaveFarmers} disabled={loading}>
            {loading ? <Spinner /> : 'Create Farmer'}
          </button>
          <p className="info">
        Already Have an Account{" "}
        <Link to="/signin">
          <b>Sign Up</b>
        </Link>{" "}
        here
      </p>
        </div>
      </div>
     
    </>
  );
};

export default CreateFarmers;
