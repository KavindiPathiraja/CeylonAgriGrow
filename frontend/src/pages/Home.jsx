import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the Home Page</h1>
      <p style={styles.description}>
        This is a simple home page built with React. Explore more by navigating through the links!
      </p>
      <button style={styles.button}><Link to="/farmers/Login">Log In</Link></button>

      <ul style={styles.navList}>
        <li style={styles.navItem}><Link to="/">Crop</Link></li>
        <li style={styles.navItem}><Link to="/">Fertilizer</Link></li>
        <li style={styles.navItem}><Link to="/Pest&Disease/PredictDisease">Diseases</Link></li>
        <li style={styles.navItem}><Link to="/products/allProducts">Products</Link></li>
      </ul>

    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f8ff',
    color: '#333',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    maxWidth: '600px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};


export default Home