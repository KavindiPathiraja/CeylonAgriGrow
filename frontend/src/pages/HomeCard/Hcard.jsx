import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCartArrowDown } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const HCard = ({ FarmerID }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5556/products');
        const fetchedData = response.data;

        // Check if fetchedData is an object and if fetchedData.data is an array
        if (fetchedData && Array.isArray(fetchedData.data)) {
          setData(fetchedData.data);
        } else {
          console.warn('Data is not an array or is empty:', fetchedData);
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProductClick = (product) => {
    if (product.Quantity <= 0) {
      Swal.fire({
        title: 'Product Unavailable',
        text: 'This product is currently out of stock.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    } else {
      console.log(`Product ${product.ProductName} added to cart`);
      // Logic for adding to cart can go here
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  if (!Array.isArray(data) || data.length === 0) return <p>No data available</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {data.map((product) => (
        <div
          key={product.ProductNo}
          className="w-72 shadow-lg rounded-lg bg-neutral-50 p-4 transform transition-transform duration-300 hover:-translate-y-2"
        >
          <Link to={`/itemdis/${product.ProductNo}/${FarmerID}/itemdis/${product.ProductNo}/${FarmerID}`} className="flex flex-col items-center">
            <img
              src={product.image}
              alt={product.ProductName}
              className="w-full h-48 object-cover rounded-md"
            />
            <div className="mt-4">
              <h2 className="font-semibold text-lg font-title text-pink-500">{product.ProductName}</h2>
              <p className="mt-2 text-sm text-neutral-700">
                {product.Description && product.Description.length > 100
                  ? product.Description.slice(0, 100) + '...'
                  : product.Description || 'No description available.'}
              </p>
            </div>
            <div className="mt-4 flex justify-between items-center w-full">
              <span className="text-lg font-semibold text-pink-500">{`RS.${product.SellingPrice}`}</span>
              <button
                onClick={() => handleProductClick(product)}
                className="bg-primary rounded-md text-pink-500 py-2 px-4"
              >
                <FaCartArrowDown size={24} />
              </button>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HCard;
