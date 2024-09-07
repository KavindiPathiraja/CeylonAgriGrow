import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import backgroundImage from '../assets/table_bg.jpg'; // Import the background image
import BackButton from '../components/BackButton';

const ShowCrop = () => {
  const [crop, setCrop] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5556/crops/getcrops/${id}`)
      .then((response) => {
        setCrop(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div 
      className='p-4 h-screen flex items-center justify-center'
      style={{
        backgroundColor: '#d1ffbd', // Background color
        backgroundImage: `url(${backgroundImage})`, // Background image
        backgroundSize: 'cover', // Cover the whole container
        backgroundPosition: 'center', // Center the background image
      }}
    >
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 bg-white shadow-lg'>
        <h1 className='text-3xl mb-4 text-center'>Show Crop Details</h1>
        <BackButton destination='crops/getall'/>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Id</span>
              <span>{crop._id}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Province</span>
              <span>{crop.province}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>District</span>
              <span>{crop.district}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Land Area</span>
              <span>{crop.landarea}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Distance to Water</span>
              <span>{crop.distancewater}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Soil Type</span>
              <span>{crop.soiltype}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Soil pH</span>
              <span>{crop.soilph}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Rainfall</span>
              <span>{crop.rainfall}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Past Crop</span>
              <span>{crop.pastCrop}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Labour</span>
              <span>{crop.labour}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Date of Planting</span>
              <span>{new Date(crop.dateOfPlanting).toString()}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShowCrop;
