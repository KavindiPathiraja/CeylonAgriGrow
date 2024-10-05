import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/table_bg.jpg'; 
import BackButton from '../../components/BackButton';

const PredictedCrop = () => {
  const { id } = useParams(); // Get crop ID from the URL parameters
  const navigate = useNavigate();
  const [cropDetails, setCropDetails] = useState(null);

  useEffect(() => {
    const fetchCropDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5556/crops/getcrops/${id}`);
        if (response.data) {
          setCropDetails(response.data);
        } else {
          alert('No crop data found!');
          navigate('/crops/getall');
        }
      } catch (error) {
        console.error('Error fetching crop details:', error);
        navigate('/crops/getall');
      }
    };

    fetchCropDetails();
  }, [id, navigate]);

  if (!cropDetails) {
    return <div>Loading...</div>;
  }

  const { crop, cropPrediction } = cropDetails;

  return (
    <div className="page-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundColor: '#d1ffbd' }}>
      <div className="p-4">
        <h1 className="text-3xl my-4 text-white">Predicted Crops Report</h1>
        <BackButton destination="/crops/create" />

        <div className="border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto bg-white">
          <h2 className="text-2xl text-gray-700 my-4">Crop Details</h2>
          <ul className="text-lg text-gray-600 mb-6">
            <li><strong>Province:</strong> {crop.province}</li>
            <li><strong>District:</strong> {crop.district}</li>
            <li><strong>Land Area:</strong> {crop.landarea === 'true' ? 'Over 3 Ha' : 'Less than 3 Ha'}</li>
            <li><strong>Distance to Water:</strong> {crop.distancewater === 'true' ? 'Over 2 km' : 'Less than 2 km'}</li>
            <li><strong>Soil Type:</strong> {crop.soiltype === 'true' ? 'Sandy' : 'Loamy or Clayey'}</li>
            <li><strong>Soil pH Acidic:</strong> {crop.soilph === 'true' ? 'Yes' : 'No'}</li>
            <li><strong>Rainfall:</strong> {crop.rainfall === 'true' ? 'Frequent' : 'Mediate/Drought'}</li>
            <li><strong>Past Crop:</strong> {crop.pastCrop}</li>
            <li><strong>Labour Required:</strong> {crop.labour}</li>
            <li><strong>Date of Planting:</strong> {new Date(crop.dateOfPlanting).toLocaleDateString()}</li>
          </ul>

          <h2 className="text-2xl text-gray-700 my-4">Recommended Crops</h2>
          <pre className="text-lg text-gray-600 bg-gray-100 p-4 rounded">
            {cropPrediction}
          </pre>

          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full my-4"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictedCrop;
