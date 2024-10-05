import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from "../../components/Spinner";
import BackButton from "../../components/BackButton";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../config/firebase";
import Header from "../../components/header1"; // Assuming this is the path to your Header component
import Footer from "../../components/footer"; // Assuming this is the path to your Footer component
import '../add service.css'; // Ensure the CSS file is imported

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
    const [Description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSaveProducts = () => {
        const uploadImageAndSubmit = (downloadURL) => {
            // Creating data object from form inputs
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
        <>
            <Header />
            <div className="bg-[url('/bg.jpg')] bg-cover min-h-screen p-6">
                <BackButton destination='/farmers/details/:id' />
                {loading && <Spinner />}
                {error && <p className="text-red-600">{error}</p>}
                <div className="flex flex-col border-2 border-green-500 rounded-xl w-[600px] p-4 mx-auto bg-gray-100 opacity-95 shadow-lg">
                <h1 className="text-3xl my-4 text-black">Create Products</h1>

                    <div className="my-4">
                        <label className='text-xl mr-4 text-gray-700'>Product Name</label>
                        <input
                            type="text"
                            value={ProductName}
                            onChange={(e) => setProductName(e.target.value)}
                            className='border-2 border-green-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                            required
                        />
                    </div>
                    <div className="my-4">
                        <label htmlFor="image" className="text-xl mr-4 text-gray-700">Image (Optional)</label>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="border-2 border-green-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-700">Description</label>
                        <textarea
                            value={Description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border-2 border-green-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            rows="4" // You can adjust the number of rows as needed
                        />
                    </div>
                    <div className="my-4">
                        <label className='text-xl mr-4 text-gray-700'>Category</label>
                        <select
                            value={Category}
                            onChange={(e) => setCategory(e.target.value)}
                            className='border-2 border-green-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                            required
                        >
                            <option value="" disabled>Select Category</option>
                            <option value="Crop">Crop</option>
                            <option value="Fertilizer">Fertilizer</option>
                            <option value="Pesticide">Pesticide</option>
                        </select>
                    </div>
                    <div className="my-4">
                        <label className='text-xl mr-4 text-gray-700'>Quantity</label>
                        <input
                            type='number'
                            value={Quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className='border-2 border-green-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                            required
                        />
                    </div>
                    <div className="my-4">
                        <label className='text-xl mr-4 text-gray-700'>Selling Price</label>
                        <input
                            type='number'
                            value={SellingPrice}
                            onChange={(e) => setSellingPrice(e.target.value)}
                            className='border-2 border-green-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                            required
                        />
                    </div>
                    <div className="my-4">
                        <label className='text-xl mr-4 text-gray-700'>Farmer Name</label>
                        <input
                            type="text"
                            value={FarmerName}
                            readOnly
                            className='border-2 border-green-500 px-4 py-2 w-full rounded-md bg-gray-200 cursor-not-allowed'
                        />
                    </div>
                    <div className="my-4">
                        <label className='text-xl mr-4 text-gray-700'>Farmer Email</label>
                        <input
                            type="email"
                            value={FarmerEmail}
                            readOnly
                            className='border-2 border-green-500 px-4 py-2 w-full rounded-md bg-gray-200 cursor-not-allowed'
                        />
                    </div>
                    <button
                        onClick={handleSaveProducts}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-green-800 hover:border-green-900 rounded"
                        disabled={loading}
                    >
                        {loading ? <Spinner /> : "Create Product"}
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CreateProducts;
