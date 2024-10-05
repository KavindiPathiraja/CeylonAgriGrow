import React, { useState } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/table_bg.jpg'; // Import the background image
import BackButton from '../../components/BackButton';

const provinces = {
  Eastern: ['Ampara', 'Batticaloa', 'Trincomalee'],
  'North Central': ['Anuradhapura', 'Polonnaruwa'],
  Uva: ['Badulla', 'Monaragala'],
  Western: ['Colombo', 'Gampaha'],
  Southern: ['Galle', 'Hambantota', 'Matara'],
  Northern: ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu'],
  Central: ['Kandy', 'Matale', 'Nuwara Eliya'],
  Sabaragamuwa: ['Kegalle', 'Ratnapura'],
  'North Western': ['Kurunegala', 'Puttalam'],
};

const CreateCrops = () => {
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [landArea, setLandArea] = useState('');
  const [distanceWater, setDistanceWater] = useState('');
  const [soilType, setSoilType] = useState('');
  const [soilPhAcidic, setSoilPhAcidic] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [pastCrop, setPastCrop] = useState(''); // New state for past crop
  const [labour, setLabour] = useState('');
  const [dateOfPlanting, setDateOfPlanting] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveCrop = () => {
    const data = {
      province,
      district,
      landarea: landArea,
      distancewater: distanceWater,
      soiltype: soilType,
      soilph: soilPhAcidic,
      rainfall,
      pastCrop, 
      labour: Number(labour),
      dateOfPlanting,
    };
    
    setLoading(true);
    
    axios
      .post('http://localhost:5556/crops/addcrops', data)
      .then((response) => {
        setLoading(false);
        const cropPrediction = response.data.cropPrediction;
        alert(`Predicted Crops:\n${cropPrediction}`); 
        
        // Optional: Save predicted crops to your database
        axios.post('http://localhost:5556/crops/savepredicted', {
          predictedCrops: cropPrediction,
        });
        navigate('/crops/getall');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        console.log(error);
      });
  };
  
  return (
    <div
      className="page-container"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundColor: '#4CAF50' }} // Background set to green
    >
      <div className="p-4">
        <h1 className="text-3xl my-4 text-white">Create Crop</h1> {/* Text changed to white for contrast */}
        <BackButton destination='/crops/getall'/>
        {loading ? <Spinner /> : ''}
        <div className="border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto bg-white">
          {/* All form elements in one column */}
          <div className="flex flex-col">
            {/* Province dropdown */}
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Province</label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full"
              >
                <option value="">Select Province</option>
                {Object.keys(provinces).map((prov) => (
                  <option key={prov} value={prov}>
                    {prov}
                  </option>
                ))}
              </select>
            </div>

            {/* District dropdown */}
            {province && (
              <div className="my-4">
                <label className="text-xl mr-4 text-gray-500">District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="border-2 border-gray-500 px-4 py-2 w-full"
                >
                  <option value="">Select District</option>
                  {provinces[province].map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Land Area */}
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Land Area</label>
              <div>
                <label className="mr-4">
                  <input
                    type="radio"
                    value="Over 3 Ha"
                    checked={landArea === 'Over 3 Ha'}
                    onChange={(e) => setLandArea(e.target.value)}
                  />
                  Over 3 Ha
                </label>
                <label>
                  <input
                    type="radio"
                    value="Less than 3 Ha"
                    checked={landArea === 'Less than 3 Ha'}
                    onChange={(e) => setLandArea(e.target.value)}
                  />
                  Less than 3 Ha
                </label>
              </div>
            </div>

            {/* Distance to water */}
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Distance to Water</label>
              <div>
                <label className="mr-4">
                  <input
                    type="radio"
                    value="Over 2 km"
                    checked={distanceWater === 'Over 2 km'}
                    onChange={(e) => setDistanceWater(e.target.value)}
                  />
                  Over 2 km
                </label>
                <label>
                  <input
                    type="radio"
                    value="Less than 2 km"
                    checked={distanceWater === 'Less than 2 km'}
                    onChange={(e) => setDistanceWater(e.target.value)}
                  />
                  Less than 2 km
                </label>
              </div>
            </div>

            {/* Soil Type */}
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Soil Type</label>
              <div>
                <label className="mr-4">
                  <input
                    type="radio"
                    value="Sandy"
                    checked={soilType === 'Sandy'}
                    onChange={(e) => setSoilType(e.target.value)}
                  />
                  Sandy
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    value="Clayey"
                    checked={soilType === 'Clayey'}
                    onChange={(e) => setSoilType(e.target.value)}
                  />
                  Clayey
                </label>
                <label>
                  <input
                    type="radio"
                    value="Loamy"
                    checked={soilType === 'Loamy'}
                    onChange={(e) => setSoilType(e.target.value)}
                  />
                  Loamy
                </label>
              </div>
            </div>

            {/* Soil pH is Acidic? */}
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Soil pH is Acidic?</label>
              <div>
                <label className="mr-4">
                  <input
                    type="radio"
                    value="Yes"
                    checked={soilPhAcidic === 'Yes'}
                    onChange={(e) => setSoilPhAcidic(e.target.value)}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    value="No"
                    checked={soilPhAcidic === 'No'}
                    onChange={(e) => setSoilPhAcidic(e.target.value)}
                  />
                  No
                </label>
              </div>
            </div>

            {/* Rainfall */}
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Rainfall</label>
              <div>
                <label className="mr-4">
                  <input
                    type="radio"
                    value="Frequent"
                    checked={rainfall === 'Frequent'}
                    onChange={(e) => setRainfall(e.target.value)}
                  />
                  Frequent
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    value="Mediate"
                    checked={rainfall === 'Mediate'}
                    onChange={(e) => setRainfall(e.target.value)}
                  />
                  Mediate
                </label>
                <label>
                  <input
                    type="radio"
                    value="Low"
                    checked={rainfall === 'Low'}
                    onChange={(e) => setRainfall(e.target.value)}
                  />
                  Low
                </label>
              </div>
            </div>

            {/* Past Crop */}
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Past Crop</label>
              <input
                type="text"
                value={pastCrop}
                onChange={(e) => setPastCrop(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full"
                placeholder="Enter past crop(s) grown"
              />
            </div>

            {/* Labour */}
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Labour</label>
              <input
                type="number"
                value={labour}
                onChange={(e) => setLabour(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full"
                placeholder="Enter number of labourers"
              />
            </div>

            {/* Date of Planting */}
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Date of Planting</label>
              <input
                type="date"
                value={dateOfPlanting}
                onChange={(e) => setDateOfPlanting(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveCrop}
              className="bg-sky-400 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCrops;