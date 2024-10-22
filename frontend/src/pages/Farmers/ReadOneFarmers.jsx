import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Swal from 'sweetalert2'; // Ensure you import SweetAlert2
import Spinner from "../../components/Spinner";
import ReportProduct from "../Products/ReportProduct";
import Header from '../../components/header1';
import Footer from '../../components/footer';

const ShowFarmer = () => {
    const { FarmerID } = useParams(); 
    const [farmer, setFarmer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); 
    const [productsLoading, setProductsLoading] = useState(true);
    const navigate = useNavigate();

    const farmerId = localStorage.getItem('farmerId');

    useEffect(() => {
        const fetchFarmerDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5556/farmers/${farmerId}`);
                setFarmer(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching farmer details:", error);
                setLoading(false);
            }
        };
    
        const fetchFarmerProducts = async () => {
            setProductsLoading(true);
            try {
                const response = await axios.get(`http://localhost:5556/products?farmerId=${farmerId}`);
                const allProducts = response.data.data || [];
                setProducts(allProducts);
    
                const farmerEmail = farmer?.Email;
                const filtered = allProducts.filter(product => product.FarmerEmail === farmerEmail);
                setFilteredProducts(filtered);
    
                // Check for products with quantity less than 10 and show alert
                const lowStockProducts = filtered.filter(product => product.Quantity < 10);
                if (lowStockProducts.length > 0) {
                    const productNames = lowStockProducts.map(product => product.ProductName).join(", ");
                    Swal.fire({
                        icon: 'warning',
                        title: 'Low Stock Alert',
                        text: `The following products have low stock: ${productNames}. Please restock soon.`,
                        confirmButtonColor: '#3085d6'
                    });
                }

                setProductsLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setProductsLoading(false);
            }
        };
    
        fetchFarmerDetails();
        fetchFarmerProducts();
    }, [farmerId, farmer?.Email]);

    const handleEditProduct = (productId) => {
        navigate(`/myProducts/edit/${productId}`);
    };

    const handleDeleteProduct = async (productId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5556/products/${productId}`);
                setFilteredProducts(filteredProducts.filter(product => product._id !== productId)); 
                alert("Product deleted successfully.");
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Failed to delete product. Please try again.");
            }
        }
    };

    return (
        <div>
            <style>
                {`
                    .background-image {
                        background-image: url('../../assets/image3.jpg');
                        background-size: cover;
                        background-position: center;
                        position: relative; /* Ensure that content can be positioned relative to this */
                        min-height: 100vh; /* Ensure it covers the full height of the viewport */
                    }
                `}
            </style>
            <div className='background-image p-6 min-h-screen'>
                <Header />
                <h1 className="text-3xl my-4 text-green-800">Farmer Profile</h1>
                
                {loading ? (
                    <Spinner />
                ) : (
                    <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
                        <div className='flex justify-between items-center'>
                            <h2 className="text-2xl font-bold">{farmer.FarmerName}</h2>
                            <div className='flex space-x-4'>
                                <Link to={`/farmers/details/${farmer._id}`}>
                                    <BsInfoCircle className='text-2xl text-green-800 hover:text-green-600' />
                                </Link>
                                <Link to={`/farmers/edit/${farmer._id}`}>
                                    <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-yellow-500' />
                                </Link>
                                <Link to={`/farmers/delete/${farmer._id}`}>
                                    <MdOutlineDelete className='text-2xl text-red-600 hover:text-red-500' />
                                </Link>
                            </div>
                        </div>
                        <p>Email: {farmer.Email}</p>
                        <p>Contact No: {farmer.ContactNo}</p>
                        <p>Address: {farmer.Address}</p>
                        <img src={farmer.image} alt="Profile Pic" className="w-32 h-32 object-cover rounded-full mt-4" />
                    </div>
                    
                )}

                <h2 className="text-xl font-bold mt-8">Your Products</h2>

                <div className="flex items-center space-x-4 mb-4">
                    <Link to='/myProducts/create' className="flex items-center">
                        <MdOutlineAddBox className='text-green-800 text-4xl' />
                    </Link>
                    

                    <ReportProduct filteredProducts={filteredProducts} className="flex items-center" />
                </div>

                {productsLoading ? (
                    <Spinner />
                ) : (
                    <table className='w-full border border-green-500 rounded-lg bg-white mt-4'>
                        <thead>
                            <tr className='bg-green-100'>
                                <th className='p-4 border border-green-300'>Product No</th>
                                <th className='p-4 border border-green-300'>Product Name</th>
                                <th className='p-4 border border-green-300'>Image</th>
                                <th className='p-4 border border-green-300'>Description</th>
                                <th className='p-4 border border-green-300'>Category</th>
                                <th className='p-4 border border-green-300'>Quantity</th>
                                <th className='p-4 border border-green-300'>Selling Price</th>
                                <th className='p-4 border border-green-300'>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <tr key={product._id} className='text-center bg-white even:bg-green-50'>
                                        <td className='p-4 border border-green-300'>{product.ProductNo}</td>
                                        <td className='p-4 border border-green-300'>{product.ProductName}</td>
                                        <td className='p-4 border border-green-300'>
                                            <img src={product.image} alt="Product Pic" className="w-16 h-16 object-cover rounded-full" />
                                        </td>
                                        <td className='p-2 border border-green-300'>
                                            <div className="h-24 overflow-auto">
                                                {product.Description}
                                            </div>
                                        </td>
                                        <td className='p-4 border border-green-300'>{product.Category}</td>
                                        <td className='p-4 border border-green-300'>{product.Quantity}</td>
                                        <td className='p-4 border border-green-300'>{product.SellingPrice}</td>
                                        <td className='p-4 border border-green-300'>
                                            <div className='flex justify-center gap-4'>
                                                <Link to={`/myProducts/details/${product._id}`}>
                                                    <BsInfoCircle className='text-2xl text-green-800 hover:text-green-600' />
                                                </Link>
                                                <Link to={`/myProducts/edit/${product._id}`} >
                                                    <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-yellow-500' />
                                                </Link>
                                                <Link to={`/myProducts/delete/${product._id}`}>
                                                    <MdOutlineDelete className='text-2xl text-red-600 hover:text-red-500' />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className='p-4 text-center'>No products found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            <Footer />
            </div>
        </div>
    );
};

export default ShowFarmer;
