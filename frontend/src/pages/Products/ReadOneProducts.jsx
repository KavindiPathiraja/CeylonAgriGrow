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
    <div className="show-Products-container p-4">
      <BackButton destination='/products/allProducts'/>
      <h1 className="show-Products-title text-3xl my-4">Show product</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="product-details-container border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">ProductNo</label>
            <span>{product.ProductNo}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">ProductName </label>
            <span>{product.ProductName}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Category</label>
            <span>{product.Category}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Quantity</label>
            <span>{product.Quantity}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">SellingPrice</label>
            <span>{product.SellingPrice}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">FarmerName</label>
            <span>{product.FarmerName}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">FarmerEmail</label>
            <span>{product.FarmerEmail}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowProducts;
