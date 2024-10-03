import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';
import Carousel from './CropsPrediction/Carousel';
import { useNavigate, useParams,Link } from 'react-router-dom';
import axios from 'axios';
import HCard from './HomeCard/Hcard';



const ReadOneHome = () => {
  //const [userData, setUserData] = useState({});
  const { FarmerID } = useParams(); // Extract FarmerID from the route
  //const navigate = useNavigate();

  // Fetch customer data based on FarmerID
  // useEffect(() => {
  //   if (FarmerID) {
  //     fetchData();
  //   }
  // }, [FarmerID]);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:5556/farmers/${FarmerID}`);
  //     setUserData(response.data);
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //   }
  // };

  return (
    <div style={styles.container}>
      <NavBar />
      <Carousel />
      <p style={styles.description}>
        This is a simple home page built with React. Explore more by navigating through the links!
      </p>

      <ul style={styles.navList}>
        <li style={styles.navItem}><Link to="/">Crop</Link></li>
        <li style={styles.navItem}><Link to="/">Fertilizer</Link></li>
        <li style={styles.navItem}><Link to="/Pest&Disease/PredictDisease">Diseases</Link></li>
        <li style={styles.navItem}><Link to="/products/allProducts">Products</Link></li>
      </ul>

      <div style={styles.boxContainer}>
        {/* Crop Prediction Box */}
        <div style={styles.box}>
          <h3 style={styles.boxTitle}>Crop Prediction</h3>
          <p style={styles.boxDescription}>
            Predict the best crops to grow based on soil type, rainfall, and climate conditions.
          </p>
        </div>

        {/* Fertilizer Recommender Box */}
        <div style={styles.box}>
          <h3 style={styles.boxTitle}>Fertilizer Recommender</h3>
          <p style={styles.boxDescription}>
            Get recommendations on the best fertilizers based on crop type and soil condition.
          </p>
        </div>

        {/* Pest and Diseases Tracking Box */}
        <div style={styles.box}>
          <h3 style={styles.boxTitle}>Pest and Diseases Tracking</h3>
          <p style={styles.boxDescription}>
            Identify and track pests and diseases affecting your crops to take timely action.
          </p>
        </div>

        {/* Farmers Marketplace Box */}
        <div style={styles.box}>
          <h3 style={styles.boxTitle}>Farmers Marketplace</h3>
          <p style={styles.boxDescription}>
            Buy and sell farm products in a simple and efficient online marketplace.
          </p>
        </div>
      </div>
       {/* Products section */}
      <div id="products" className="bg-gray-200 py-16 px-8 md:px-16 min-h-screen w-[100%] rounded-t-[20%]">
      <h3 className="text-5xl font-light text-pink-500 mb-16 text-center">Store</h3>
      <HCard FarmerID={FarmerID} />
    </div>

    </div>

   
  );
};

// Styles for the Home component
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f8ff',
    color: '#333',
    textAlign: 'center',
    padding: '20px',
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    maxWidth: '600px',
  },
  boxContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  box: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    border: '2px solid #013220', // Dark green border
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '250px',
    textAlign: 'left',
    marginBottom: '20px',
  },
  boxTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#013220',
    borderBottom: '2px solid #013220', // Dark green border below title
    paddingBottom: '5px',
  },
  boxDescription: {
    fontSize: '1rem',
    color: '#666',
  },
};

export default ReadOneHome;
