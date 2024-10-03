import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Hcard from '../HomeCard/Hcard';
import BackButton from '../../components/BackButton';

const ItemDis = () => {
    const { ProductNo, FarmerID } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [Quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5556/products')
            .then((response) => {
                const data = response.data.data;
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.warn('Data is not an array:', data);
                    setProducts([]);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products data:', error);
                setProducts([]);
                setLoading(false);
            });
    }, []);

    const itemDis = products.find((product) => product.ProductNo.toString() === ProductNo);

    const handleIncrease = () => setQuantity(Quantity + 1);
    const handleDecrease = () => {
        if (Quantity > 1) setQuantity(Quantity - 1);
    };

    const handleAddToCart = () => {
        try {
            if (!itemDis) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Item details are not available.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                return;
            }

            const cartItem = {
                userId: FarmerID,
                ProductNo: itemDis.ProductNo,
                ProductName: itemDis.ProductName,
                image: itemDis.image,
                SellingPrice: itemDis.SellingPrice,
                Quantity,
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cart));

            Swal.fire({
                title: 'Item added to cart successfully!',
                text: 'Would you like to view your cart or add more items?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Go to Cart',
                cancelButtonText: 'Add More',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = `/cart/${FarmerID}`;
                }
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while adding the item to the cart. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleBuyNow = () => {
        // Logic to buy the item immediately
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="loader"></div>
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    if (!itemDis) {
        return <div className="text-center mt-10 text-xl">Item not found</div>;
    }

    const recommendedItems = products.filter((product) => product.ProductNo !== parseInt(ProductNo, 10));

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <BackButton destination={`/ReadOneHome/${FarmerID}`} />
            <div className="flex-grow p-8 flex flex-col items-center justify-center">
                <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-10 bg-white shadow-xl rounded-lg p-6 transition-transform duration-300 hover:shadow-2xl">
                    <div className="w-full lg:w-1/2 overflow-hidden rounded-lg shadow-lg">
                        <img
                            className="rounded-lg w-full transition-transform duration-300 transform hover:scale-105"
                            src={itemDis?.image}
                            alt={itemDis?.ProductName}
                        />
                    </div>
                    <div className="w-full lg:w-1/2 space-y-6">
                        <h1 className="text-4xl font-bold text-gray-800">{itemDis?.ProductName}</h1>
                        <p className="text-lg text-gray-600">{itemDis?.Description}</p>
                        <h2 className="text-2xl font-bold text-green-600">Rs.{itemDis?.SellingPrice}</h2>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleDecrease}
                                className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200"
                            >
                                -
                            </button>
                            <span className="text-xl font-bold">{Quantity}</span>
                            <button
                                onClick={handleIncrease}
                                className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200"
                            >
                                +
                            </button>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleAddToCart}
                                className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Products section */}
                <div id="products" className="bg-gray-200 py-16 px-8 md:px-16 rounded-t-[20%] mt-10">
                    <h3 className="text-5xl font-light text-pink-500 mb-16 text-center">Store</h3>
                    <Hcard FarmerID={FarmerID} />
                </div>
            </div>
        </div>
    );
};

export default ItemDis;
