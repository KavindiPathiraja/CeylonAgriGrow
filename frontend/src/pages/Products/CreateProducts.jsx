// Importing necessary dependencies
import { useState } from "react";
import React from 'react';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../config/firebase";
import Header from '../../components/header1'; // Import Header
import Footer from '../../components/footer'; // Import Footer

// Functional component for creating products
const CreateProducts = () => {
  // State variables for managing form data and loading state
  const [ProductName, setProductName] = useState('');
  const [Description, setDescription] = useState('');
  const [Category, setCategory] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [SellingPrice, setSellingPrice] = useState('');
  const [FarmerName, setFarmerName] = useState('');
  const [FarmerEmail, setFarmerEmail] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const storage = getStorage(app);

  // Event handler for saving the Products
  const handleSaveProducts = () => {
    // Creating data object from form inputs
    const uploadImageAndSubmit = (downloadURL) => {
      const data = {
        ProductName,
        image: downloadURL || null, // Set image to null if no image is uploaded
        Description,
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
          // Resetting loading state and navigating to the all products page
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
    
    if (image) {
      const storageRef = ref(storage, `product_images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error(error);
          setLoading(false);
          alert('Failed to upload image. Please try again.');
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(uploadImageAndSubmit);
        }
      );
    } else {
      uploadImageAndSubmit(null); // No image uploaded
    }
  };

  // JSX for rendering the create Products form
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* Include Header */}
      <div className="p-6 bg-gray-100 flex-grow">
        <BackButton destination='/products/allProducts' />
        <h1 className="text-3xl my-4 text-green-800">Create Products</h1>
        {loading ? <Spinner /> : ''}
        <div className="flex flex-col border-2 border-green-500 rounded-xl w-[600px] p-4 mx-auto bg-white">
          {/* Form Fields */}
          {/* ... Your form fields here ... */}
          <button 
            className='p-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500' 
            onClick={handleSaveProducts}
          >
            Save
          </button>
        </div>
      </div>
      <Footer /> {/* Include Footer */}
    </div>
  );
};

// Exporting the CreateProducts component
export default CreateProducts;
