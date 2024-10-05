import { useState, useEffect } from "react";
import React from 'react';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../config/firebase";
import Swal from 'sweetalert2';
import Header from "../../components/header1"; // Assuming this is the path to your Header component
import Footer from "../../components/footer"; // Assuming this is the path to your Footer component
import '../add service.css'; // Ensure the CSS file is imported

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
          Swal.fire('Success', 'Farmer updated successfully!', 'success').then(() => {
            navigate(`/farmers/details/${id}`);
          });
        })
        .catch((error) => {
          setLoading(false);
          Swal.fire('Error', 'An error happened. Please check console', 'error');
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
    <>
      <Header />
      <div className="bg-[url('/bg.jpg')] bg-cover min-h-screen">
        <BackButton destination={`/farmers/details/${id}`} />
        <div className="pt-12">
          <div className="flex justify-center bg-primary w-2/5 m-auto pt-8 pb-8 rounded-lg opacity-95">
            <div className="w-full max-w-lg p-4">
              <h1 className="text-3xl mb-4 text-white-800">Edit Farmer</h1>
              {loading ? <Spinner /> : ''}
              <div className="flex flex-col border-2 border-green-500 rounded-lg p-6 mx-auto bg-white shadow-lg w-full">
                <div className="my-4">
                  <label className='block uppercase tracking-wide text-white text-xs font-bold mb-2' htmlFor="farmer-id">
                    Farmer ID
                  </label>
                  <input
                    type="text"
                    value={FarmerID}
                    onChange={(e) => setFarmerID(e.target.value)}
                    readOnly
                    className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                  />
                </div>
                <div className="my-4">
                  <label className='block uppercase tracking-wide text-white text-xs font-bold mb-2' htmlFor="farmer-name">
                    Farmer Name
                  </label>
                  <input
                    type="text"
                    value={FarmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                  />
                </div>
                <div className='my-4'>
                  <label className='block uppercase tracking-wide text-white text-xs font-bold mb-2' htmlFor="contact-no">
                    Contact No
                  </label>
                  <input
                    type='number'
                    value={ContactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                  />
                </div>
                <div className='my-4'>
                  <label className='block uppercase tracking-wide text-white text-xs font-bold mb-2' htmlFor="email">
                    Email
                  </label>
                  <input
                    type='text'
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                  />
                </div>
                <div className="my-4">
                  <label className='block uppercase tracking-wide text-white text-xs font-bold mb-2' htmlFor="address">
                    Address
                  </label>
                  <input
                    type="text"
                    value={Address}
                    onChange={(e) => setAddress(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                  />
                </div>
                <div className="my-4">
                  <label className='block uppercase tracking-wide text-white text-xs font-bold mb-2' htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                  />
                </div>
                <div className="my-4">
                  <label className='block uppercase tracking-wide text-white text-xs font-bold mb-2' htmlFor="image">
                    Upload New Image
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                  />
                </div>
                <button
                  className="w-full bg-secondary hover:bg-lime-500 text-grey-300 font-bold py-2 px-4 border-b-4 border-lime-800 hover:border-lime-900 rounded"
                  onClick={handleEditFarmers}
                  disabled={loading}
                >
                  {loading ? <Spinner /> : "Update Farmer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditFarmers;
