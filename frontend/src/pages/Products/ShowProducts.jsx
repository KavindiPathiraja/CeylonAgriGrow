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
        <div className='p-4'>
            <li><Link to="/">Home</Link></li>
            <div className='flex flex-col md:flex-row justify-between items-center'>
                {/* Dropdown for filtering */}
                <select 
                    className='text-3l my-8 p-2 border border-gray-400 rounded-md' 
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
                    placeholder="Search..."
                    className='text-3l my-8 p-2 border border-gray-400 rounded-md'
                    onChange={handleSearchChange}
                />

                <div className="flex items-center space-x-4">
                    <Link to='/products/create' className="flex items-center">
                        <MdOutlineAddBox className='text-sky-800 text-4xl' />
                    </Link>
                    {/* Render the ReportProduct component for generating PDF */}
                    <ReportProduct filteredProducts={filteredProducts} className="flex items-center" />
                </div>
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>ProductNo</th>
                            <th className='border border-slate-600 rounded-md'>ProductName</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Category</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Quantity</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>SellingPrice</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>FarmerName</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>FarmerEmail</th>
                            <th className='border border-slate-600 rounded-md'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((Product) => (
                            <tr key={Product._id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {Product.ProductNo}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {Product.ProductName}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {Product.Category}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {Product.Quantity}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {Product.SellingPrice}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {Product.FarmerName}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {Product.FarmerEmail}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/products/details/${Product._id}`}>
                                            <BsInfoCircle className='text-2xl text-green-800' />
                                        </Link>
                                        <Link to={`/products/edit/${Product._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-600' />
                                        </Link>
                                        <Link to={`/products/delete/${Product._id}`}>
                                            <MdOutlineDelete className='text-2xl text-red-600' />
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
