import { useState, useEffect } from "react";
import React from 'react';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../config/firebase";
import Swal from 'sweetalert2';

// Functional component for EditFarmers
const EditFarmers = () => {
  const [FarmerID, setFarmerID] = useState('');
  const [FarmerName, setFarmerName] = useState('');
  const [ContactNo, setContactNo] = useState('');
  const [Email, setEmail] = useState('');
  const [Address, setAddress] = useState('');
  const [Password, setPassword] = useState('');
  const [image, setImage] = useState(null); // State for image
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const storage = getStorage(app);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5556/farmers/${id}`)
      .then((response) => {
        setFarmerID(response.data.FarmerID);
        setFarmerName(response.data.FarmerName);
        setContactNo(response.data.ContactNo);
        setEmail(response.data.Email);
        setAddress(response.data.Address);
        setPassword(response.data.Password);
        setImage(response.data.image || null); // Set the image URL if available
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  }, [id]);

  const handleEditFarmers = () => {
    setLoading(true);
    
    const uploadImageAndSubmit = (downloadURL) => {
      const data = {
        FarmerName,
        ContactNo,
        Email,
        Address,
        Password,
        image: downloadURL || image, // Include existing image URL if no new image uploaded
      };

      axios
        .put(`http://localhost:5556/farmers/${id}`, data)
        .then(() => {
          setLoading(false);
          navigate(`/farmers/details/:id`);
        })
        .catch((error) => {
          setLoading(false);
          alert('An error happened. Please check console');
          console.log(error);
        });
    };

    if (image && typeof image === 'object') { // Check if a new image is being uploaded
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
      uploadImageAndSubmit(null); // No new image uploaded
    }
  };

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <BackButton destination={`/farmers/details/:id`} />
      <h1 className="text-3xl my-4 text-green-800">Edit Farmer</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-green-500 rounded-lg p-6 mx-auto bg-white shadow-lg w-4/5 max-w-3xl">
        <div className="my-4">
          <label className='text-lg font-semibold text-gray-700'>Farmer ID</label>
          <input
            type="text"
            value={FarmerID}
            onChange={(e) => setFarmerID(e.target.value)}
            readOnly
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>
        <div className="my-4">
          <label className='text-lg font-semibold text-gray-700'>Farmer Name</label>
          <input
            type="text"
            value={FarmerName}
            onChange={(e) => setFarmerName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>
        <div className='my-4'>
          <label className='text-lg font-semibold text-gray-700'>ContactNo</label>
          <input
            type='number'
            value={ContactNo}
            onChange={(e) => setContactNo(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>
        <div className='my-4'>
          <label className='text-lg font-semibold text-gray-700'>Email</label>
          <input
            type='text'
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>
        <div className="my-4">
          <label className='text-lg font-semibold text-gray-700'>Address</label>
          <input
            type="text"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>
        <div className="my-4">
          <label className='text-lg font-semibold text-gray-700'>Password</label>
          <input
            type="text"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>
        <div className="my-4">
          <label htmlFor="image" className="text-lg font-semibold text-gray-700">Image</label>
          {image && <img src={image} alt="Farmer" className="h-20 w-20 object-cover my-2" />} {/* Display existing image */}
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button className='p-2 bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500' onClick={handleEditFarmers}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditFarmers;
