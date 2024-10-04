import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import BackButton from "../../components/BackButton";

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { products, userId: FarmerID, total } = location.state || {};

    const [loading, setLoading] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        FarmerName: "",
        Email: "",
        ContactNo: "",
    });
    const [deliveryInfo, setDeliveryInfo] = useState({
        address: "",
        city: "",
        postalCode: "",
    });
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [cardInfo, setCardInfo] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    useEffect(() => {
        const fetchCustomerInfo = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5556/farmers/${FarmerID}`);
                const { FarmerName, Email, ContactNo } = response.data;
                setCustomerInfo({
                    FarmerName: FarmerName || "",
                    Email: Email || "",
                    ContactNo: ContactNo || ""
                });
            } catch (error) {
                console.error("Error fetching customer information:", error);
                Swal.fire("Error", "Failed to fetch customer information. Please try again later.", "error");
            } finally {
                setLoading(false);
            }
        };

        if (FarmerID) {
            fetchCustomerInfo();
        }
    }, [FarmerID]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleDeliveryChange = (e) => {
        const { name, value } = e.target;
        setDeliveryInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleCardInfoChange = (e) => {
        const { name, value } = e.target;
        setCardInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        if (!customerInfo.FarmerName || !customerInfo.Email || !customerInfo.ContactNo) {
            Swal.fire('Error', 'Please fill in all customer information fields.', 'error');
            return false;
        }
        if (!deliveryInfo.address || !deliveryInfo.city || !deliveryInfo.postalCode) {
            Swal.fire('Error', 'Please fill in all delivery information fields.', 'error');
            return false;
        }
        if (paymentMethod === 'Card' && (!cardInfo.cardNumber || !cardInfo.expiryDate || !cardInfo.cvv)) {
            Swal.fire('Error', 'Please fill in all card information fields.', 'error');
            return false;
        }
        return true;
    };

    const validateCardInfo = () => {
        const { cardNumber, expiryDate, cvv } = cardInfo;

        // Card Number validation
        const cardNumberPattern = /^\d{16}$/; // Basic check for 16 digits
        if (!cardNumberPattern.test(cardNumber)) {
            Swal.fire('Error', 'Please enter a valid card number (16 digits).', 'error');
            return false;
        }

        // Expiry Date validation
        const expiryPattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // MM/YY format
        if (!expiryPattern.test(expiryDate)) {
            Swal.fire('Error', 'Please enter a valid expiry date (MM/YY).', 'error');
            return false;
        }

        const [month, year] = expiryDate.split('/').map(Number);
        const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
        const currentMonth = new Date().getMonth() + 1; // Get current month (1-12)

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            Swal.fire('Error', 'Card has expired. Please use a valid card.', 'error');
            return false;
        }

        // CVV validation
        const cvvPattern = /^\d{3,4}$/; // 3 or 4 digits
        if (!cvvPattern.test(cvv)) {
            Swal.fire('Error', 'Please enter a valid CVV (3 or 4 digits).', 'error');
            return false;
        }

        return true;
    };

    const handlePlaceOrder = async () => {
        if (!validateForm()) return; // Existing validation for customer and delivery info
        if (paymentMethod === 'Card' && !validateCardInfo()) return; // Validate card info
    
        setLoading(true);
        
        // Map the products to include the necessary fields
        const formattedProducts = products.map(product => ({
            ProductNo: product.ProductNo,
            ProductName: product.title, // Assuming you have a title field in your product
            image: product.image,
            Description: product.description, // Assuming you have a description field in your product
            quantity: product.Quantity, // Save the quantity
            SellingPrice: product.SellingPrice,
            FarmerName: customerInfo.FarmerName, // If needed
            FarmerEmail: customerInfo.Email, // If needed
        }));
    
        const orderData = {
            FarmerID,
            products: formattedProducts, // Use formatted products
            total: total || 0,
            customerInfo,
            deliveryInfo,
            paymentMethod,
            cardInfo,
        };
    
        try {
            const response = await axios.post("http://localhost:5556/order", orderData);
            localStorage.removeItem("cart"); // Changed from `removeproduct` to `removeItem`
            Swal.fire("Success", `Order placed successfully! Order ID: ${response.data.orderId}`, "success")
                .then(() => {
                    // Reset form state here if necessary
                    navigate(`/ReadOneHome/${FarmerID}`);
                });
        } catch (error) {
            Swal.fire("Error", "Failed to place order. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div>
            <BackButton destination={`/cart/${FarmerID}`} />
            <div className="p-8 flex flex-col items-center">
                <div className="w-full max-w-4xl bg-gray-100 p-6 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-semibold mb-4">Checkout</h1>
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.ProductNo} className="flex justify-between items-center p-4 border-b">
                                <div className="flex gap-2 items-center">
                                    <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded" />
                                </div>
                                <span>Qty: {product.Quantity}</span>
                                <span>Total Price: Rs.{(product.SellingPrice * product.Quantity).toFixed(2)}</span>
                            </div>
                        ))
                    ) : (
                        <p>No products to display</p>
                    )}
                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold mb-2">Customer Information</h2>
                        <input
                            type="text"
                            name="FarmerName"
                            placeholder="Farmer Name"
                            value={customerInfo.FarmerName}
                            onChange={handleInputChange}
                            className="block w-full mb-2 p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="email"
                            name="Email"
                            placeholder="Email"
                            value={customerInfo.Email}
                            onChange={handleInputChange}
                            className="block w-full mb-2 p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="ContactNo"
                            placeholder="Contact Number"
                            value={customerInfo.ContactNo}
                            onChange={handleInputChange}
                            className="block w-full mb-2 p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold mb-2">Delivery Information</h2>
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={deliveryInfo.address}
                            onChange={handleDeliveryChange}
                            className="block w-full mb-2 p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={deliveryInfo.city}
                            onChange={handleDeliveryChange}
                            className="block w-full mb-2 p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="postalCode"
                            placeholder="Postal Code"
                            value={deliveryInfo.postalCode}
                            onChange={handleDeliveryChange}
                            className="block w-full mb-2 p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold mb-2">Payment Method</h2>
                        <select
                            value={paymentMethod}
                            onChange={handlePaymentChange}
                            className="block w-full mb-2 p-2 border border-gray-300 rounded"
                        >
                            <option value="Cash">Cash</option>
                            <option value="Card">Card</option>
                        </select>
                    </div>
                    {paymentMethod === "Card" && (
                        <div className="mb-4">
                            <h2 className="text-2xl font-semibold mb-2">Card Information</h2>
                            <input
                                type="text"
                                name="cardNumber"
                                placeholder="Card Number"
                                value={cardInfo.cardNumber}
                                onChange={handleCardInfoChange}
                                className="block w-full mb-2 p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                name="expiryDate"
                                placeholder="MM/YY"
                                value={cardInfo.expiryDate}
                                onChange={handleCardInfoChange}
                                className="block w-full mb-2 p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                name="cvv"
                                placeholder="CVV"
                                value={cardInfo.cvv}
                                onChange={handleCardInfoChange}
                                className="block w-full mb-2 p-2 border border-gray-300 rounded"
                            />
                        </div>
                    )}
                    <button
                        onClick={handlePlaceOrder}
                        className="bg-green-500 text-white py-2 px-4 rounded mt-4"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
