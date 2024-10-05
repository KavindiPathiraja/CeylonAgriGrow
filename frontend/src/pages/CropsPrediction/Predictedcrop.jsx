import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';

const PredictedCrop = () => {
  const location = useLocation();
  const { cropPrediction } = location.state || {};
  const navigate = useNavigate();

  if (!cropPrediction) {
    // If no prediction, redirect back to create crop page
    navigate('/crops/create');
  }

  return (
    <div className="p-4" style={{ backgroundColor: '#013220', minHeight: '100vh' }}>
      <h1 className="text-3xl mb-4 text-white">Predicted Crops</h1>
      <BackButton destination='/crops/create' />
      <div className="border-2 border-gray-500 p-4 rounded-md bg-white">
        <h2 className="text-xl mb-4">Predicted Crops:</h2>
        {/* Display the predicted crops with paragraph spacing */}
        {cropPrediction && cropPrediction.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
      <button 
        onClick={() => navigate('/crops/getall')}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Go to Crop Prediction Main Page
      </button>
    </div>
  );
};

export default PredictedCrop;
