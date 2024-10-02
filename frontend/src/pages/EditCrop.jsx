import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
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

const EditCrop = () => {
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [landArea, setLandArea] = useState('');
  const [distanceWater, setDistanceWater] = useState('');
  const [soilType, setSoilType] = useState('');
  const [soilPhAcidic, setSoilPhAcidic] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [pastCrop, setPastCrop] = useState('');
  const [labour, setLabour] = useState('');
  const [dateOfPlanting, setDateOfPlanting] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the crop ID from URL params

  useEffect(() => {
    // Fetch crop data by ID
    axios.get(`http://localhost:5556/crops/getcrops/${id}`)
      .then(response => {
        const crop = response.data;
        setProvince(crop.province || '');
        setDistrict(crop.district || '');
        setLandArea(crop.landarea || '');
        setDistanceWater(crop.distancewater || '');
        setSoilType(crop.soiltype || '');
        setSoilPhAcidic(crop.soilph || '');
        setRainfall(crop.rainfall || '');
        setPastCrop(crop.pastCrop || '');
        setLabour(crop.labour || '');
        setDateOfPlanting(crop.dateOfPlanting ? new Date(crop.dateOfPlanting).toISOString().split('T')[0] : '');
        setLoadingData(false);
      })
      .catch(error => {
        setLoadingData(false);
        console.error('Error fetching crop data:', error);
      });
  }, [id]);

  const handleUpdateCrop = () => {
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
      .put(`http://localhost:5556/crops/upcrops/${id}`, data)
      .then(() => {
        setLoading(false);
        alert('Crop updated successfully');
        navigate('/crops/getall'); // Navigate to the list after updating
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        console.log(error);
      });
  };

  if (loadingData) {
    return <Spinner />;
  }

  return (
    <div className='p-4'>
      <h1 className='text-3xl my-4'>Edit Crop</h1>
      <BackButton destination='crops/getall'/>
      {loading && <Spinner />}
      <div className='border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='flex flex-wrap'>
          {/* First Column */}
          <div className='w-full md:w-1/2 pr-4'>
            {/* Province dropdown */}
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Province</label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              >
                <option value=''>Select Province</option>
                {Object.keys(provinces).map((prov) => (
                  <option key={prov} value={prov}>
                    {prov}
                  </option>
                ))}
              </select>
            </div>

            {/* District dropdown */}
            {province && (
              <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className='border-2 border-gray-500 px-4 py-2 w-full'
                >
                  <option value=''>Select District</option>
                  {provinces[province].map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Land Area */}
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Land Area</label>
              <div>
                <label className='mr-4'>
                  <input
                    type='radio'
                    value='Over 3 Ha'
                    checked={landArea === 'Over 3 Ha'}
                    onChange={(e) => setLandArea(e.target.value)}
                  />
                  Over 3 Ha
                </label>
                <label>
                  <input
                    type='radio'
                    value='Less than 3 Ha'
                    checked={landArea === 'Less than 3 Ha'}
                    onChange={(e) => setLandArea(e.target.value)}
                  />
                  Less than 3 Ha
                </label>
              </div>
            </div>

            {/* Distance to water */}
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Distance to Water</label>
              <div>
                <label className='mr-4'>
                  <input
                    type='radio'
                    value='Over 2 km'
                    checked={distanceWater === 'Over 2 km'}
                    onChange={(e) => setDistanceWater(e.target.value)}
                  />
                  Over 2 km
                </label>
                <label>
                  <input
                    type='radio'
                    value='Less than 2 km'
                    checked={distanceWater === 'Less than 2 km'}
                    onChange={(e) => setDistanceWater(e.target.value)}
                  />
                  Less than 2 km
                </label>
              </div>
            </div>
          </div>

          {/* Second Column */}
          <div className='w-full md:w-1/2 pl-4'>
            {/* Soil Type */}
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Soil Type</label>
              <div>
                <label className='mr-4'>
                  <input
                    type='radio'
                    value='Sandy'
                    checked={soilType === 'Sandy'}
                    onChange={(e) => setSoilType(e.target.value)}
                  />
                  Sandy
                </label>
                <label className='mr-4'>
                  <input
                    type='radio'
                    value='Clayey'
                    checked={soilType === 'Clayey'}
                    onChange={(e) => setSoilType(e.target.value)}
                  />
                  Clayey
                </label>
                <label>
                  <input
                    type='radio'
                    value='Loamy'
                    checked={soilType === 'Loamy'}
                    onChange={(e) => setSoilType(e.target.value)}
                  />
                  Loamy
                </label>
              </div>
            </div>

            {/* Soil pH is Acidic? */}
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Soil pH is Acidic?</label>
              <div>
                <label className='mr-4'>
                  <input
                    type='radio'
                    value='Yes'
                    checked={soilPhAcidic === 'Yes'}
                    onChange={(e) => setSoilPhAcidic(e.target.value)}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type='radio'
                    value='No'
                    checked={soilPhAcidic === 'No'}
                    onChange={(e) => setSoilPhAcidic(e.target.value)}
                  />
                  No
                </label>
              </div>
            </div>

            {/* Rainfall */}
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Rainfall</label>
              <div>
                <label className='mr-4'>
                  <input
                    type='radio'
                    value='Frequent'
                    checked={rainfall === 'Frequent'}
                    onChange={(e) => setRainfall(e.target.value)}
                  />
                  Frequent
                </label>
                <label className='mr-4'>
                  <input
                    type='radio'
                    value='Mediate'
                    checked={rainfall === 'Mediate'}
                    onChange={(e) => setRainfall(e.target.value)}
                  />
                  Mediate
                </label>
                <label>
                  <input
                    type='radio'
                    value='Drought'
                    checked={rainfall === 'Drought'}
                    onChange={(e) => setRainfall(e.target.value)}
                  />
                  Drought
                </label>
              </div>
            </div>
          </div>

          {/* Full width fields */}
          <div className='w-full'>
            {/* Past Crop */}
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Past Crop</label>
              <input
                type='text'
                value={pastCrop}
                onChange={(e) => setPastCrop(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
                placeholder='Enter past crop'
              />
            </div>

            {/* Labour */}
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Labour</label>
              <input
                type='number'
                value={labour}
                onChange={(e) => setLabour(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
                placeholder='Enter number of laborers'
              />
            </div>

            {/* Date of Planting */}
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Date of Planting</label>
              <input
                type='date'
                value={dateOfPlanting}
                onChange={(e) => setDateOfPlanting(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleUpdateCrop}
          className='bg-blue-500 text-white px-6 py-3 rounded-md mx-auto block mt-4 hover:bg-blue-600'
        >
          Update Crop
        </button>
      </div>
    </div>
  );
};

export default EditCrop;
