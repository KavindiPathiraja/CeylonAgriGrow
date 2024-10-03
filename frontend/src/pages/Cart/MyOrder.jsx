import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { jsPDF } from "jspdf";

const MyOrder = () => {
    const { FarmerID } = useParams(); // Get FarmerID from URL params

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrders, setExpandedOrders] = useState({});

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (!FarmerID) {
                    Swal.fire("Error", "No customer ID provided", "error");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`http://localhost:5556/order/${FarmerID}`);
                console.log(response.data); // Log the response data to inspect
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching orders:", error);
                Swal.fire("Error", "Failed to fetch orders", "error");
                setLoading(false);
            }
        };

        fetchOrders();
    }, [FarmerID]);

    const handleToggleExpand = (orderId) => {
        setExpandedOrders((prev) => ({
            ...prev,
            [orderId]: !prev[orderId],
        }));
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:5556/order/${orderId}`);
            setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));
            Swal.fire("Success", "Order deleted successfully", "success");
        } catch (error) {
            console.error("Error deleting order:", error);
            Swal.fire("Error", "Failed to delete order", "error");
        }
    };

    const handleDownloadBill = (order) => {
        const doc = new jsPDF();

        // Set bill header
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("Online Store - Order Receipt", 105, 20, null, null, "center");

        // Order Information
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Order ID: ${order.orderId}`, 20, 40);
        doc.text(`Order Date: ${new Date(order.createdAt).toLocaleDateString()}`, 20, 50);
        doc.text(`Farmer Name: ${order.customerInfo.FarmerName || 'N/A'}`, 20, 60);
        doc.text(`Email: ${order.customerInfo.Email || 'N/A'}`, 20, 70);
        doc.text(`Mobile: ${order.customerInfo?.ContactNo || 'N/A'}`, 20, 80);

        // Delivery Information
        if (order.deliveryInfo?.address) {
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text("Delivery Information:", 20, 95);
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.text(`Address: ${order.deliveryInfo.address}`, 20, 105);
            doc.text(`City: ${order.deliveryInfo.city}`, 20, 115);
            doc.text(`Postal Code: ${order.deliveryInfo.postalCode}`, 20, 125);
        }

        // Products Table Header
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Products", 20, 140);
        doc.setLineWidth(0.5);
        doc.line(20, 145, 190, 145); // Horizontal line below the header

        // Table Columns
        doc.setFontSize(12);
        let yPosition = 155;
        doc.text("No.", 20, yPosition);
        doc.text("Product Name", 40, yPosition);
        doc.text("Price (USD)", 120, yPosition);
        doc.text("Quantity", 160, yPosition);

        // Products Table Content
        doc.setFont("helvetica", "normal");
        yPosition += 10;

        order.products.forEach((product, index) => {
            doc.text(`${index + 1}`, 20, yPosition);
            doc.text(`${product.ProductName}`, 40, yPosition);
            doc.text(`$${product.SellingPrice.toFixed(2)}`, 120, yPosition);
            doc.text(`${product.quantity}`, 160, yPosition);
            yPosition += 10;
        });

        // Line after products
        doc.setLineWidth(0.5);
        doc.line(20, yPosition, 190, yPosition);
        yPosition += 10;

        // Total Cost and Payment Method
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(`Total Cost: $${order.total.toFixed(2)}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Payment Method: ${order.paymentMethod}`, 20, yPosition);

        // Save PDF
        doc.save(`Order_Bill_${order.orderId}.pdf`);
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="min-h-screen p-8 w-full lg:w-3/4 mx-auto">
            <h1 className="text-3xl font-bold mb-6">My Orders</h1>
            {orders.length > 0 ? (
                orders.map((order) => (
                    <div
                        key={order._id}
                        className="border border-gray-300 p-4 mb-4 rounded-lg shadow-md relative"
                    >
                        <h2 className="text-xl font-semibold mb-2">
                            Order ID: {order.orderId}
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Order Date: {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <div className="flex space-x-4 mt-4">
                            {order.products.map((product) => (
                                <div
                                    key={product.ProductNo}
                                    className="text-center flex flex-col items-center"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-20 h-20 object-cover rounded-lg shadow-md"
                                    />
                                    <p className="text-gray-700 font-medium mt-2">
                                        {product.title}
                                    </p>
                                    <p className="text-gray-600">
                                        Price: ${product.SellingPrice.toFixed(2)}
                                    </p>
                                    <p className="text-gray-600">
                                        Quantity: {product.quantity}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <p className="text-gray-800 font-semibold mt-4">
                            Total Cost: ${order.total.toFixed(2)}
                        </p>

                        {expandedOrders[order._id] && (
                            <div className="mt-4">
                                <div className="flex flex-row items-start justify-between gap-8 border-t pt-4">
                                    <div className="flex-1 pr-4 border-r border-gray-300">
                                        <h3 className="text-lg font-semibold mb-2">Products:</h3>
                                        {order.products.map((product) => (
                                            <p className="text-gray-700 font-medium mt-2" key={product.ProductNo}>
                                                {product.ProductName} - Price: ${product.SellingPrice.toFixed(2)}, Quantity: {product.quantity}
                                            </p>
                                        ))}
                                    </div>

                                    <div className="flex-1 px-4 border-r border-gray-300">
                                        <h3 className="text-lg font-semibold mb-2">
                                            Customer Information:
                                        </h3>
                                        <p>Name: {order.customerInfo.FarmerName || 'N/A'}</p>
                                        <p>Email: {order.customerInfo.Email || 'N/A'}</p>
                                        <p>Mobile: {order.customerInfo?.ContactNo || 'N/A'}</p>
                                    </div>

                                    <div className="flex-1 pl-4">
                                        {order.deliveryInfo?.address ? (
                                            <div>
                                                <h3 className="text-lg font-semibold mb-2">
                                                    Delivery Information:
                                                </h3>
                                                <p>Address: {order.deliveryInfo.address}</p>
                                                <p>City: {order.deliveryInfo.city}</p>
                                                <p>Postal Code: {order.deliveryInfo.postalCode}</p>
                                                <p>Delivery Method: Delivery</p>
                                            </div>
                                        ) : (
                                            <div>
                                                <h3 className="text-lg font-semibold mb-2">
                                                    Delivery Information:
                                                </h3>
                                                <p>No delivery information available.</p>
                                                <p>Delivery Method: Self Pickup</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex mt-4 justify-end gap-3">
                            <button
                                className="py-2 px-4 bg-pink-500 text-white rounded-lg"
                                onClick={() => handleToggleExpand(order._id)}
                            >
                                {expandedOrders[order._id] ? "Hide Details" : "Expand Details"}
                            </button>
                            <button
                                className="py-2 px-4 bg-red-500 text-white rounded-lg"
                                onClick={() => handleDeleteOrder(order.orderId)}
                            >
                                Delete Order
                            </button>
                            <button
                                className="py-2 px-4 bg-green-500 text-white rounded-lg"
                                onClick={() => handleDownloadBill(order)}
                            >
                                Download Bill
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-xl font-semibold text-gray-600">
                    No orders available.
                </p>
            )}
        </div>
    );
};

export default MyOrder;
