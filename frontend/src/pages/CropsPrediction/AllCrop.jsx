import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import './AllCrop.css'; 
import ReportCrop from './ReportCrop'; 
import backgroundImage from '../../assets/table_bg.jpg'; 
import BackButton from '../../components/BackButton';
import Header from '../../components/header';
import Footer from '../../components/footer';

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

const AllCrop = () => {
  const [crops, setCrops] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [filteredProvinces, setFilteredProvinces] = useState(Object.keys(provinces));
  const navigate = useNavigate();

  // Fetch crops data from the backend
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get('http://localhost:5556/crops/getallcrops');
        const cropsWithPredictions = response.data.map(crop => ({
          ...crop,
          predictedCrops: crop.cropPrediction ? crop.cropPrediction.split(',') : [] // Assume cropPrediction is a comma-separated string
        }));
        setCrops(cropsWithPredictions);
      } catch (error) {
        console.error('Error fetching crop data:', error);
      }
    };

    fetchCrops();
  }, []);

  // Filter provinces based on search input
  useEffect(() => {
    const filtered = Object.keys(provinces).filter(province =>
      province.toLowerCase().includes(searchKey.toLowerCase())
    );
    setFilteredProvinces(filtered);
  }, [searchKey]);

  // Function to delete a crop
  const DeleteCrop = async (id) => {
    try {
      await axios.delete(`http://localhost:5556/crops/deletecrops/${id}`);
      setCrops(crops.filter((crop) => crop._id !== id)); 
      alert('Crop deleted successfully!');
    } catch (error) {
      console.error('Error deleting crop:', error);
      alert('Failed to delete crop.');
    }
  };

  return (
    <div>
      <Header />
      <div className="page-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
        {/* Page Title */}
        <div className='font-semibold text-4xl w-3/5 text-center m-auto pt-32 text-primary leading-tight font-Zodiak-Bold h1'>
          All Crop Details
        </div>

        {/* BackButton, PredictCrop and ReportCrop Buttons */}
        <div className="button-flex-container" style={{ marginTop: '0' }}>
          <BackButton destination='/' />
          <a href="/crops/create" className="predict-button">Predict Crop</a>
          <ReportCrop className="report-button" /> 
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className="search-bar"
            placeholder="Search provinces"
          />
        </div>

        {/* Crop Table */}
        <table className="crop-table">
          <thead>
            <tr>
              <th>Province</th>
              <th>District</th>
              <th>Land Area</th>
              <th>Distance to Water</th>
              <th>Soil Type</th>
              <th>Soil pH</th>
              <th>Rainfall</th>
              <th>Past Crop</th>
              <th>Labour</th>
              <th>Date of Planting</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {crops
              .filter(crop => filteredProvinces.includes(crop.province))
              .map((crop, index) => (
                <tr key={index}>
                  <td>{crop.province}</td>
                  <td>{crop.district}</td>
                  <td>{crop.landarea}</td>
                  <td>{crop.distancewater}</td>
                  <td>{crop.soiltype}</td>
                  <td>{crop.soilph}</td>
                  <td>{crop.rainfall}</td>
                  <td>{crop.pastCrop}</td>
                  <td>{crop.labour}</td>
                  <td>{new Date(crop.dateOfPlanting).toLocaleDateString()}</td>
                  <td>
                    {/* Action buttons for each crop */}
                    <Link to={`/crops/details/${crop._id}`}>
                      <button className="btn btn-primary me-3">View</button>
                    </Link>
                    <Link to={`/crops/edit/${crop._id}`}>
                      <button className="btn btn-warning me-3">Update</button>
                    </Link>
                    <button className="btn btn-danger me-3" onClick={() => DeleteCrop(crop._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default AllCrop;
