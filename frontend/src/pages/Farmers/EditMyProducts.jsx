import { useState, useEffect } from "react";
import React from 'react';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../config/firebase";
import Swal from 'sweetalert2'; // Import SweetAlert for alerts
import Header from "../../components/header1"; // Import header
import Footer from "../../components/footer"; // Import footer

// Functional component for EditProducts
const EditProducts = () => {
  // State variables for managing form data and loading state
  const [ProductNo, setProductNo] = useState('');
  const [ProductName, setProductName] = useState('');
  const [Descriptioon, setDescriptioon] = useState('');
  const [Category, setCategory] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [SellingPrice, setSellingPrice] = useState('');
  const [FarmerName, setFarmerName] = useState('');
  const [FarmerEmail, setFarmerEmail] = useState('');
  const [image, setImage] = useState(null); // New state for image
  const [currentImage, setCurrentImage] = useState(''); // New state for current image URL

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const storage = getStorage(app);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5556/products/${id}`)
      .then((response) => {
        setProductNo(response.data.ProductNo);
        setProductName(response.data.ProductName);
        setDescriptioon(response.data.Descriptioon);
        setCategory(response.data.Category);
        setQuantity(response.data.Quantity);
        setSellingPrice(response.data.SellingPrice);
        setFarmerName(response.data.FarmerName);
        setFarmerEmail(response.data.FarmerEmail);
        setCurrentImage(response.data.image); // Set the current image URL
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        Swal.fire('Error', 'An error happened. Please check console', 'error'); // Use SweetAlert for error handling
        console.log(error);
      });
  }, [id]);

  // Event handler for editing the Products
  const handleEditProducts = () => {
    const uploadImageAndEdit = (downloadURL) => {
      // Creating data object from form inputs
      const data = {
        ProductName,
        Category,
        Descriptioon,
        Quantity,
        SellingPrice,
        FarmerName,
        FarmerEmail,
        image: downloadURL || currentImage, // Use the current image if no new image is uploaded
      };
      setLoading(true);

      // Making a PUT request to edit the Products data
      axios
        .put(`http://localhost:5556/products/${id}`, data)
        .then(() => {
          // Resetting loading state and navigating to the home page
          setLoading(false);
          Swal.fire('Success', 'Product updated successfully!', 'success').then(() => {
            navigate('/farmers/details/:id');
          });
        })
        .catch((error) => {
          // Handling errors by resetting loading state, showing an alert, and logging the error
          setLoading(false);
          Swal.fire('Error', 'An error happened. Please check console', 'error'); // Use SweetAlert for error handling
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
          Swal.fire('Error', 'Failed to upload image. Please try again.', 'error'); // Use SweetAlert for error handling
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(uploadImageAndEdit);
        }
      );
    } else {
      uploadImageAndEdit(null); // No new image uploaded
    }
  };

  // JSX for rendering the edit Products form
  return (
    <div className="flex flex-col min-h-screen bg-[url('/bg.jpg')] bg-cover">
      <Header /> {/* Add header */}
      <div className="flex-grow pt-12">
        <BackButton destination='/farmers/details/:id' />
        <div className="flex justify-center bg-primary w-2/5 m-auto pt-8 pb-8 rounded-lg opacity-95">
          <div className="flex flex-col w-full max-w-lg p-4">
            <h1 className="text-3xl mb-4 text-white-800">Edit Product</h1>
            {loading ? <Spinner /> : ''}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6">
                <label className='block uppercase tracking-wide text-white text-xs font-bold mb-2'>Product No</label>
                <input
                  type="text"
                  value={ProductNo}
                  onChange={(e) => setProductNo(e.target.value)}
                  readOnly
                  className='appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6">
                <label className='block uppercase tracking-wide text-white text-xs font-bold mb-2'>Product Name</label>
                <input
                  type="text"
                  value={ProductName}
                  onChange={(e) => setProductName(e.target.value)}
                  className='appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6">
                <label className='block uppercase tracking-wide text-white text-xs font-bold mb-2'>Image (Optional)</label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                />
                {currentImage && <img src={currentImage} alt="Current Product" className="mt-2 w-32 h-32 object-cover" />} {/* Display current image */}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6">
                <label className='block uppercase tracking-wide text-white text-xs font-bold mb-2'>Description</label>
                <textarea
                  value={Descriptioon}
                  onChange={(e) => setDescriptioon(e.target.value)}
                  className='appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className='block uppercase tracking-wide text-white text-xs font-bold mb-2'>Category</label>
                <input
                  type="text"
                  value={Category}
                  onChange={(e) => setCategory(e.target.value)}
                  className='appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className='block uppercase tracking-wide text-white text-xs font-bold mb-2'>Quantity</label>
                <input
                  type="number"
                  value={Quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className='appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className='block uppercase tracking-wide text-white text-xs font-bold mb-2'>Selling Price</label>
                <input
                  type="number"
                  value={SellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  className='appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6">
                <label className='block uppercase tracking-wide text-white text-xs font-bold mb-2'>Farmer Name</label>
                <input
                  type="text"
                  value={FarmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  readOnly
                  className='appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6">
                <label className='block uppercase tracking-wide text-white text-xs font-bold mb-2'>Farmer Email</label>
                <input
                  type="email"
                  value={FarmerEmail}
                  onChange={(e) => setFarmerEmail(e.target.value)}
                  readOnly
                  className='appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                />
              </div>
            </div>
            <button
              className='bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
              onClick={handleEditProducts}
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
      <Footer /> {/* Add footer */}
    </div>
  );
};

export default EditProducts;
