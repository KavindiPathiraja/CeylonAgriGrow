import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import './AllCrop.css'; 
import ReportCrop from './ReportCrop'; 
import backgroundImage from '../../assets/table_bg.jpg'; 
import BackButton from '../../components/BackButton';

const provinces = {
  Eastern: ['Ampara', 'Batticaloa', 'Trincomalee'],
  //... other provinces
};

const AllCrop = () => {
  const [crops, setCrops] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [filteredProvinces, setFilteredProvinces] = useState(Object.keys(provinces));
  const navigate = useNavigate();

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

  useEffect(() => {
    const filtered = Object.keys(provinces).filter(province =>
      province.toLowerCase().includes(searchKey.toLowerCase())
    );
    setFilteredProvinces(filtered);
  }, [searchKey]);

  const DeleteCrop = async (id) => {
    try {
      await axios.delete(`http://localhost:5556/crops/deletecrops/${id}`);
      setCrops(crops.filter((crop) => crop._id !== id)); 
    } catch (error) {
      console.error('Error deleting crop:', error);
    }
  };

  return (
    <div className="page-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1 className="header">All Crop Details</h1>
      <div className="button-flex-container">
        <BackButton destination='/' />
        <a href="/crops/create" className="predict-button">Predict Crop</a>
        <ReportCrop className="report-button" />
      </div>
      <div className="search-container">
        <input
          type="text"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          className="search-bar"
          placeholder="Search provinces"
        />
      </div>
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
            {/* New Column for Predicted Crops */}
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
                  <button className="btn btn-primary me-3">
                    <Link to={`/crops/details/${crop._id}`} style={{ color: "white" }}>
                      View
                    </Link>
                  </button>
                  <button className="btn btn-warning me-3">
                    <Link to={`/crops/edit/${crop._id}`} style={{ color: "black" }}>
                      Update
                    </Link>
                  </button>
                  <button className="btn btn-danger me-3" onClick={() => DeleteCrop(crop._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCrop;
