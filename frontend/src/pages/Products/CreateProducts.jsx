// Importing necessary dependencies
import { useState } from "react";
import React from 'react';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../config/firebase";

// Functional component for creating products
const CreateProducts = () => {
  // State variables for managing form data and loading state
  const [ProductName, setProductName] = useState('');
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
  // JSX for rendering the create Products form
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <BackButton destination='/products/allProducts'/>
      <h1 className="text-3xl my-4 text-green-800">Create Products</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-green-500 rounded-xl w-[600px] p-4 mx-auto bg-white">
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Product Name</label>
          <input
            type="text"
            value={ProductName}
            onChange={(e) => setProductName(e.target.value)}
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
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Category</label>
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
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Quantity</label>
          <input
            type='number'
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Selling Price</label>
          <input
            type="number"
            value={SellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>
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
          <label className='text-xl mr-4 text-gray-500'>Farmer Email</label>
          <input
            type="text"
            value={FarmerEmail}
            onChange={(e) => setFarmerEmail(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>
        <button 
          className='p-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500' 
          onClick={handleSaveProducts}
        >
          Save
        </button>
      </div>
    </div>
  );
};

// Exporting the CreateProducts component
export default CreateProducts;
