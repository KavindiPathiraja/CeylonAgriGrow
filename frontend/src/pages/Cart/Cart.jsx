import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import Spinner from "../../components/Spinner";
import Hcard from "../HomeCard/Hcard";
import BackButton from "../../components/BackButton";

const Cart = () => {
  const { FarmerID } = useParams();
  const [cartproducts, setCartproducts] = useState([]);
  const [store, setStore] = useState([]);
  const [total, setTotal] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5556/products')
      .then((response) => {
        const data = response.data.data;
        if (Array.isArray(data)) {
          setStore(data);
        } else {
          console.warn('Data is not an array:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching store data:', error);
      })
      .finally(() => setLoading(false));

    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartproducts(cartData);
    calculateTotal(cartData);
  }, []);

  const calculateTotal = (products) => {
    const totalAmount = products.reduce((acc, product) => acc + product.SellingPrice * product.Quantity, 0);
    setTotal(totalAmount);
  };

  const handleIncreaseQuantity = (ProductNo) => {
    const updatedCart = cartproducts.map((product) =>
      product.ProductNo === ProductNo ? { ...product, Quantity: product.Quantity + 1 } : product
    );
    setCartproducts(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleDecreaseQuantity = (ProductNo) => {
    const updatedCart = cartproducts.map((product) =>
      product.ProductNo === ProductNo && product.Quantity > 1
        ? { ...product, Quantity: product.Quantity - 1 }
        : product
    );
    setCartproducts(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleApplyPromo = () => {
    if (promoCode === "SAVE10") {
      setDiscount(total * 0.1);
    } else {
      setDiscount(0);
      Swal.fire({
        title: 'Invalid promo code!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleCheckout = () => {
    const checkoutData = {
      userId: FarmerID,
      products: cartproducts,
      total: total - discount,
    };
    navigate(`/checkout/${FarmerID}`, { state: checkoutData });
  };

  const handleRemoveProduct = (ProductNo) => {
    const updatedCart = cartproducts.filter(product => product.ProductNo !== ProductNo);
    setCartproducts(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const recommendedProducts = store.filter(
    (product) => !cartproducts.some((cartproduct) => cartproduct.ProductNo === product.ProductNo)
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <BackButton destination={`/ReadOneHome/${FarmerID}`} />
      <div className="p-8 flex flex-col items-center">
        <div className="w-full lg:w-3/4 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-10">
          <div className="w-full lg:w-2/3 space-y-6 bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-semibold mb-4 text-gray-800">Your Cart</h1>
            {cartproducts.length > 0 ? (
              cartproducts.map((product) => (
                <div key={product.ProductNo} className="flex items-center justify-between p-4 border-b">
                  <img src={product.image} alt={product.ProductName} className="w-16 rounded shadow" />
                  <div className="flex-1 px-4">
                    <h3 className="text-xl font-semibold text-gray-900">{product.ProductName}</h3>
                    <p className="text-gray-600">Price: Rs.{product.SellingPrice}</p>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleDecreaseQuantity(product.ProductNo)}
                        className="text-gray-500 border px-2 py-1 rounded hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span>Quantity: {product.Quantity}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(product.ProductNo)}
                        className="text-gray-500 border px-2 py-1 rounded hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-gray-800 font-semibold">
                      Total: Rs.{(product.SellingPrice * product.Quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveProduct(product.ProductNo)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600">Your cart is empty.</p>
            )}
          </div>

          <div className="w-full lg:w-1/3 p-6 bg-white rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Order Summary</h2>
            {discount > 0 && (
              <div className="flex justify-between">
                <span>Discount:</span>
                <span>Rs.{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Total:</span>
              <span>Rs.{(total - discount).toFixed(2)}</span>
            </div>
            <input
              type="text"
              placeholder="Promo Code"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button
              onClick={handleApplyPromo}
              className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition duration-300"
            >
              Apply Promo Code
            </button>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300"
              onClick={handleCheckout}
            >
              Checkout
            </button>
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

export default Cart;
