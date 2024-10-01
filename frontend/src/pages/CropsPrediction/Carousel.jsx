import React, { useState } from 'react';
// Import local images from assets with correct relative path
import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/image2.jpg';
import image3 from '../../assets/image3.jpg';
import image4 from '../../assets/image4.jpg';

// Images for the carousel
const images = [
  image1,
  image2,
  image3,
  image4,
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle next and previous buttons
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Inline CSS styles
  const styles = {
    carouselContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '500px', // Increased height
      backgroundColor: '#f5f5f5',
    },
    carousel: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#013220',
      color: 'white',
      border: 'none',
      padding: '15px 25px', // Increased padding
      cursor: 'pointer',
      fontSize: '18px', // Increased font size
      margin: '0 15px', // Increased margin
      borderRadius: '5px',
    },
    buttonHover: {
      backgroundColor: '#005533',
    },
    imageWrapper: {
      backgroundColor: 'white',
      padding: '15px', // Increased padding
      borderRadius: '10px',
    },
    image: {
      width: '600px', // Increased width
      height: '400px', // Increased height
      objectFit: 'cover',
    },
  };

  return (
    <div style={styles.carouselContainer}>
      <div style={styles.carousel}>
        {/* Previous Button */}
        <button
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          onClick={handlePrev}
        >
          Previous
        </button>

        {/* Image */}
        <div style={styles.imageWrapper}>
          <img src={images[currentIndex]} alt="carousel" style={styles.image} />
        </div>

        {/* Next Button */}
        <button
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
