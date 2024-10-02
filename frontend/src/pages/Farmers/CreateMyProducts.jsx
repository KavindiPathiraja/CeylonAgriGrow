import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from "../../components/Spinner";
import BackButton from "../../components/BackButton";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../config/firebase";

const CreateProducts = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const storage = getStorage(app);

    // Extracting farmer details from location state
    const { farmerName = '', farmerEmail = '' } = location.state || {};

    const [ProductName, setProductName] = useState('');
    const [Category, setCategory] = useState('');
    const [Quantity, setQuantity] = useState('');
    const [SellingPrice, setSellingPrice] = useState('');
    const [FarmerName, setFarmerName] = useState(farmerName);
    const [FarmerEmail, setFarmerEmail] = useState(farmerEmail);
    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSaveProducts = () => {
        const uploadImageAndSubmit = (downloadURL) => {
            // Creating data object from form inputs
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
            setError('');

            // Making a POST request to save the Products data
            axios
                .post('http://localhost:5556/products', data)
                .then(() => {
                    setLoading(false);
                    navigate('/farmers/details/:id'); // Update with the correct ID
                })
                .catch((error) => {
                    setLoading(false);
                    setError('An error occurred. Please check console.');
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
                    setError('Failed to upload image. Please try again.');
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
        <div className="p-6 bg-gray-100 min-h-screen">
            <BackButton destination='/farmers/details/:id' />
            <h1 className="text-3xl my-4 text-green-800">Create Products</h1>
            {loading && <Spinner />}
            {error && <p className="text-red-600">{error}</p>}
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

export default CreateProducts;
