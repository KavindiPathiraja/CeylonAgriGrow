import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import Header from "../../components/header1"; // Import your Header component
import Footer from "../../components/footer"; // Import your Footer component

const ShowProducts = () => {
  const [product, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5556/products/${id}`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* Header component */}
      <div className="show-products-container p-6 bg-gray-100 flex-grow">
        <BackButton destination='/farmers/details/:id' />
        <h1 className="show-products-title text-4xl text-green-700 font-bold mb-6">Product Details</h1>

        {loading ? (
          <Spinner />
        ) : (
          <div className="product-details-container border-2 border-green-500 rounded-lg w-full max-w-2xl p-6 bg-white shadow-lg">
            {/* Product Number */}
            <div className="detail-item flex items-center my-4">
              <label className="detail-label text-lg mr-4 font-semibold text-gray-600">Product No:</label>
              <span className="text-lg text-gray-800">{product.ProductNo}</span>
            </div>
            {/* Product Name */}
            <div className="detail-item flex items-center my-4">
              <label className="detail-label text-lg mr-4 font-semibold text-gray-600">Product Name:</label>
              <span className="text-lg text-gray-800">{product.ProductName}</span>
            </div>
            {/* Description */}
            <div className="detail-item flex items-center my-4">
              <label className="detail-label text-lg mr-4 font-semibold text-gray-600">Description:</label>
              <span className="text-lg text-gray-800">{product.Description}</span>
            </div>
            {/* Category */}
            <div className="detail-item flex items-center my-4">
              <label className="detail-label text-lg mr-4 font-semibold text-gray-600">Category:</label>
              <span className="text-lg text-gray-800">{product.Category}</span>
            </div>
            {/* Quantity */}
            <div className="detail-item flex items-center my-4">
              <label className="detail-label text-lg mr-4 font-semibold text-gray-600">Quantity:</label>
              <span className="text-lg text-gray-800">{product.Quantity}</span>
            </div>
            {/* Selling Price */}
            <div className="detail-item flex items-center my-4">
              <label className="detail-label text-lg mr-4 font-semibold text-gray-600">Selling Price:</label>
              <span className="text-lg text-gray-800">{product.SellingPrice}</span>
            </div>
            {/* Farmer Name */}
            <div className="detail-item flex items-center my-4">
              <label className="detail-label text-lg mr-4 font-semibold text-gray-600">Farmer Name:</label>
              <span className="text-lg text-gray-800">{product.FarmerName}</span>
            </div>
            {/* Farmer Email */}
            <div className="detail-item flex items-center my-4">
              <label className="detail-label text-lg mr-4 font-semibold text-gray-600">Farmer Email:</label>
              <span className="text-lg text-gray-800">{product.FarmerEmail}</span>
            </div>
          </div>
        )}
      </div>
      <Footer /> {/* Footer component */}
    </div>
  );
};

export default ShowProducts;
