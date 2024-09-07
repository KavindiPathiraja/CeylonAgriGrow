import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";

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
    <div className="show-products-container p-6 bg-gray-100 min-h-screen">
      <BackButton destination='/farmers/details/:id'/>
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
  );
};

export default ShowProducts;
