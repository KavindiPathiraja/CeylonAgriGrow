import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from "../../components/Spinner";
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import ReportProduct from './ReportProduct'; // Import the new report component

const ShowProduct = () => {
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
    const [searchQuery, setSearchQuery] = useState(""); // State for search query

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5556/products')
            .then((response) => {
                setProduct(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    // Handle dropdown change
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    // Filter products based on selected category and search query
    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory ? product.Category === selectedCategory : true;
        const matchesSearch = Object.values(product).some(value =>
            value.toString().toLowerCase().includes(searchQuery)
        );
        return matchesCategory && matchesSearch;
    });

    return (
        <div className='p-6 bg-gray-100 min-h-screen'>
            <li><Link to="/" className="text-green-800 hover:text-green-600">Home</Link></li>
            <h1 className="show-Products-title text-3xl my-4 text-green-800">Farmer's Marketplace</h1>
            <div className='flex flex-col md:flex-row justify-between items-center mb-6'>
                {/* Dropdown for filtering */}
                <select 
                    className='text-lg my-4 p-2 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                    onChange={handleCategoryChange}
                    value={selectedCategory}
                >
                    <option value="">All Products</option>
                    <option value="Crop">All Crop Products</option>
                    <option value="Fertilizer">All Fertilizer Products</option>
                    <option value="Pesticide">All Pesticide Products</option>
                </select>

                {/* Search input field */}
                <input
                    type="text"
                    placeholder="Search products..."
                    className='text-lg my-4 p-2 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                    onChange={handleSearchChange}
                />

                <div className="flex items-center space-x-4">
                    <Link to='/products/create' className="flex items-center">
                        <MdOutlineAddBox className='text-green-800 text-4xl' />
                    </Link>
                    {/* Render the ReportProduct component for generating PDF */}
                    <ReportProduct filteredProducts={filteredProducts} className="flex items-center" />
                </div>
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border border-green-500 rounded-lg bg-white'>
                    <thead>
                        <tr className='bg-green-100'>
                            <th className='p-4 border border-green-300'>Product No</th>
                            <th className='p-4 border border-green-300'>Product Name</th>
                            <th className='p-4 border border-green-300'>Image</th>
                            <th className='p-4 border border-green-300'>Description</th>
                            <th className='p-4 border border-green-300 max-md:hidden'>Category</th>
                            <th className='p-4 border border-green-300 max-md:hidden'>Quantity</th>
                            <th className='p-4 border border-green-300 max-md:hidden'>Selling Price</th>
                            <th className='p-4 border border-green-300 max-md:hidden'>Farmer Name</th>
                            <th className='p-4 border border-green-300 max-md:hidden'>Farmer Email</th>
                            <th className='p-4 border border-green-300'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product._id} className='text-center bg-white even:bg-green-50'>
                                <td className='p-4 border border-green-300'>
                                    {product.ProductNo}
                                </td>
                                <td className='p-4 border border-green-300'>
                                    {product.ProductName}
                                </td>
                                <td className='p-4 border border-green-300'>
                                    <img src={product.image} alt="Profile Pic" className="w-16 h-16 object-cover rounded-full" />
                                </td>
                                <td className='p-4 border border-green-300'>
                                    {product.Description}
                                </td>
                                <td className='p-4 border border-green-300 max-md:hidden'>
                                    {product.Category}
                                </td>
                                <td className='p-4 border border-green-300 max-md:hidden'>
                                    {product.Quantity}
                                </td>
                                <td className='p-4 border border-green-300 max-md:hidden'>
                                    {product.SellingPrice}
                                </td>
                                <td className='p-4 border border-green-300 max-md:hidden'>
                                    {product.FarmerName}
                                </td>
                                <td className='p-4 border border-green-300 max-md:hidden'>
                                    {product.FarmerEmail}
                                </td>
                                <td className='p-4 border border-green-300'>
                                    <div className='flex justify-center gap-4'>
                                        <Link to={`/products/details/${product._id}`}>
                                            <BsInfoCircle className='text-2xl text-green-800 hover:text-green-600' />
                                        </Link>
                                        <Link to={`/products/edit/${product._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-yellow-500' />
                                        </Link>
                                        <Link to={`/products/delete/${product._id}`}>
                                            <MdOutlineDelete className='text-2xl text-red-600 hover:text-red-500' />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ShowProduct;
