import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Hcard from '../HomeCard/Hcard';
import BackButton from '../../components/BackButton';

const ItemDis = () => {
    const { ProductNo, FarmerID } = useParams();  // Extract ProductNo and FarmerID from URL
    const navigate = useNavigate();  // Initialize useNavigate
    const [products, setproducts] = useState([]);
    const [Quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5556/products')
            .then((response) => {
                const data = response.data.data;  // Access the 'data' array within the response object
                if (Array.isArray(data)) {
                    setproducts(data);
                } else {
                    console.warn('Data is not an array:', data);
                    setproducts([]);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products data:', error);
                setproducts([]);
                setLoading(false);
            });
    }, []);
    

    const itemdis = products.find((product) => product.ProductNo.toString() === ProductNo);  // Ensure matching string types
    //const recommendedItems = products.filter((product) => product.ProductNo.toString() !== ProductNo);  // Filter out current item

    const handleIncrease = () => setQuantity(Quantity + 1);
    const handleDecrease = () => {
        if (Quantity > 1) setQuantity(Quantity - 1);
    };

    const handleAddToCart = () => {
        try {
            if (!itemdis) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Item details are not available.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                return;
            }
    
            const cartItem = {
                userId: FarmerID,  // Pass FarmerID from URL
                ProductNo: itemdis.ProductNo,
                ProductName: itemdis.ProductName,
                image: itemdis.image,
                SellingPrice: itemdis.SellingPrice,
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
                    // Navigate to cart page with FarmerID
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
        return <div>Loading...</div>;  // Show loading until data is fetched
    }

    if (!itemdis) {
        return <div>Item not found</div>;  // If no matching item is found
    }
    const recommendedItems = products.filter((product) => product.ProductNo !== parseInt(ProductNo, 5));

    return (
        <div>
                        <BackButton destination={`/ReadOneHome/${FarmerID}`} />

        <div className="min-h-screen p-8 flex flex-col items-center">
            <div className="w-2/3 flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-10">\
            
                <div className="w-full lg:w-1/2">
                    <img
                        className="rounded-xl w-full transition-transform duration-300 transform hover:scale-105"
                        src={itemdis?.image}
                        alt={itemdis?.ProductName}
                    />
                </div>
                <div className="w-full lg:w-1/2 space-y-6">
                    <h1 className="text-4xl font-semibold">{itemdis?.ProductName}</h1>
                    <p className="text-lg text-gray-600">{itemdis?.Description}</p>
                    <h2 className="text-2xl font-semibold">Rs.{itemdis?.SellingPrice}</h2>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleDecrease}
                            className="px-4 py-2 bg-gray-200 rounded-full"
                        >
                            -
                        </button>
                        <span className="text-xl">{Quantity}</span>
                        <button
                            onClick={handleIncrease}
                            className="px-4 py-2 bg-gray-200 rounded-full"
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

            <div className="w-full lg:w-2/3 mt-16">
                <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
                <div className="overflow-x-hidden whitespace-nowrap mb-5">
                    <div className="flex space-x-4 animate-marquee">
                        {recommendedItems.length > 0 ? (
                            <div className="flex flex-wrap gap-8 justify-center">
                               {recommendedItems.map((product) => (
    <Hcard
        key={product.ProductNo}
        ProductNo={product.ProductNo}
        image={product.image}
        ProductName={product.ProductName}
        SellingPrice={product.SellingPrice}
        FarmerID={FarmerID}  // Pass FarmerID to the Hcard component
    />
))}

                            </div>
                        ) : (
                            <div>No recommended items found</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ItemDis;
