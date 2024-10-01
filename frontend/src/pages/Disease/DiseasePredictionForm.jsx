import { useState } from 'react';
import axios from 'axios';
import Modal from '../../components/prediction';  // Import the Modal component

const DiseasePredictionForm = () => {
  const [cropName, setCropName] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [prediction, setPrediction] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous error or prediction
    setError('');
    setPrediction([]);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5556/generate-response', {
        cropName,
        symptoms
      });

      // Assuming response.data.diseasePrediction is a comma-separated string or an array
      const predictions = response.data.diseasePrediction.split(',').map(item => item.trim());
      setPrediction(predictions);
      setIsModalOpen(true);  // Open the modal when predictions are received
    } catch (error) {
      setError('Failed to generate disease prediction. Please try again.');
      console.error('Error generating response:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-12 bg-gray-50">
      <div className="max-w-md w-full p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Disease Prediction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cropName" className="block text-sm font-medium text-gray-700">Crop Name:</label>
            <input
              type="text"
              id="cropName"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700">Symptoms:</label>
            <textarea
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 rounded-md shadow-sm ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {loading ? 'Predicting...' : 'Predict Disease'}
          </button>
        </form>

        {/* Display Error */}
        {error && (
          <p className="mt-4 p-4 bg-red-100 border border-red-200 text-red-800 rounded-md">{error}</p>
        )}

        {/* Display Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          content={prediction}
        />
      </div>
    </div>
  );
};

export default DiseasePredictionForm;
