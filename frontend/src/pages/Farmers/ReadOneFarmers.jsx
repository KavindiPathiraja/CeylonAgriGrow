import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from "../../components/Spinner";
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const ShowFarmer = () => {
    const [farmers, setFarmers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [selectedFarmer, setSelectedFarmer] = useState(null);
    const [selectedFarmerEmail, setSelectedFarmerEmail] = useState(''); // State for selected farmer's email
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(""); // State for category filter

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5556/farmers') // Update the API endpoint for farmers
            .then((response) => {
                setFarmers(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!products.length) {
            fetchProducts(); // Fetch products only once
        }
    }, [products]);

    useEffect(() => {
        if (selectedFarmer) {
            // Filter products based on selected farmer
            setFilteredProducts(products
                .filter(product => product.FarmerName === selectedFarmer)
                .filter(product => selectedCategory === "" || product.Category === selectedCategory)
            );
        }
    }, [selectedFarmer, products, selectedCategory]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    // Filter farmers based on search query
    const filteredFarmers = farmers.filter(farmer =>
        Object.values(farmer).some(value =>
            value.toString().toLowerCase().includes(searchQuery)
        )
    );

    // Handle category selection change
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    // Fetch all products
    const fetchProducts = async () => {
        setProductsLoading(true);
        try {
            const response = await axios.get('http://localhost:5556/products');
            setProducts(response.data.data || []);
            setProductsLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setProductsLoading(false);
        }
    };

    return (
        <div className='p-6 bg-gray-100 min-h-screen'>
            <li><Link to="/" className="text-green-800 hover:text-green-600">Home</Link></li>
            <li><Link to="/myProducts/allProducts" className="text-green-800 hover:text-green-600">All Products</Link></li>
            <h1 className="show-Farmers-title text-3xl my-4 text-green-800">Farmer Dashboard</h1>
            
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Search Farmers..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className='border-2 border-gray-500 px-4 py-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                    />
                    <table className='w-full border border-green-500 rounded-lg bg-white'>
                        <thead>
                            <tr className='bg-green-100'>
                                <th className='p-4 border border-green-300'>Farmer ID</th>
                                <th className='p-4 border border-green-300'>Farmer Name</th>
                                <th className='p-4 border border-green-300'>Contact No</th>
                                <th className='p-4 border border-green-300'>Email</th>
                                <th className='p-4 border border-green-300'>Address</th>
                                <th className='p-4 border border-green-300'>Password</th>
                                <th className='p-4 border border-green-300'>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFarmers.map((farmer) => (
                                <tr key={farmer._id} className='text-center bg-white even:bg-green-50'>
                                    <td className='p-4 border border-green-300'>
                                        {farmer.FarmerID}
                                    </td>
                                    <td className='p-4 border border-green-300'>
                                        {farmer.FarmerName}
                                    </td>
                                    <td className='p-4 border border-green-300'>
                                        {farmer.ContactNo}
                                    </td>
                                    <td className='p-4 border border-green-300'>
                                        {farmer.Email}
                                    </td>
                                    <td className='p-4 border border-green-300'>
                                        {farmer.Address}
                                    </td>
                                    <td className='p-4 border border-green-300'>
                                        {farmer.Password}
                                    </td>
                                    <td className='p-4 border border-green-300'>
                                        <div className='flex justify-center gap-4'>
                                            {/* <Link to={`/farmers/details/${farmer._id}`}>
                                                <BsInfoCircle className='text-2xl text-green-800 hover:text-green-600' />
                                            </Link> */}
                                            <Link to={`/farmers/edit/${farmer._id}`}>
                                                <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-yellow-500' />
                                            </Link>
                                            <Link to={`/farmers/delete/${farmer._id}`}>
                                                <MdOutlineDelete className='text-2xl text-red-600 hover:text-red-500' />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setSelectedFarmer(farmer.FarmerName);
                                                    setSelectedFarmerEmail(farmer.Email); // Set the selected farmer's email
                                                }}
                                                className='text-blue-500 hover:text-blue-700'
                                            >
                                                View Products
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {selectedFarmer && (
                        <div className='mt-8'>
                            <h2 className="text-xl font-bold mb-4">Products for Farmer {selectedFarmer}</h2>
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

                            <Link
                                to='/myProducts/create'
                                state={{ farmerName: selectedFarmer, farmerEmail: selectedFarmerEmail }} // Pass the farmer details
                                className="flex items-center"
                            >
                                <MdOutlineAddBox className='text-green-800 text-4xl' />
                            </Link>

                            {productsLoading ? (
                                <Spinner />
                            ) : (
                                <table className='w-full border border-green-500 rounded-lg bg-white'>
                                    <thead>
                                        <tr className='bg-green-100'>
                                            <th className='p-4 border border-green-300'>Product No</th>
                                            <th className='p-4 border border-green-300'>Product Name</th>
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
                                                        <Link to={`/myProducts/details/${product._id}`}>
                                                            <BsInfoCircle className='text-2xl text-green-600 hover:text-yellow-500' />
                                                        </Link>
                                                        <Link to={`/myProducts/edit/${product._id}`}>
                                                            <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-yellow-500' />
                                                        </Link>
                                                        <Link to={`/myProducts/delete/${product._id}`}>
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
                    )}
                </>
            )}
        </div>
    );
};

export default ShowFarmer;
