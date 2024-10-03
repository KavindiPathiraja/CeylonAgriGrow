import React from 'react';
import { Link } from 'react-router-dom';

// Define the styles
const styles = {
  navbar: {
    backgroundColor: '#013220',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Make the navbar span the full width of the screen
    position: 'relative', // Ensure it stays in place
    boxSizing: 'border-box', // Include padding and border in element's total width
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginRight: '20px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
  },
  button: {
    backgroundColor: 'white',
    border: 'none',
    color: '#013220',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    textDecoration: 'none',
  },
};

const NavBar = () => {
  return (
    <nav style={styles.navbar}>
      {/* Log In Button */}
      <button style={styles.button}>
        <Link to="/farmers/Login" style={{ textDecoration: 'none', color: '#013220' }}>
          Log In
        </Link>
      </button>

      {/* Navigation Links */}
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/crops/getall" style={styles.link}>
            Crop
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/" style={styles.link}>
            Fertilizer
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/Pest&Disease/PredictDisease" style={styles.link}>
            Diseases
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/products/allProducts" style={styles.link}>
            Products
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
