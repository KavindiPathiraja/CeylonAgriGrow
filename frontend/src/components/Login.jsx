import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    const credentials = { Email: email, Password: password };

    try {
      const response = await axios.post("http://localhost:5556/farmers/Login", credentials);
      const userData = response.data;

      if (userData) {
        localStorage.setItem('farmerId', userData._id); // Store farmer ID in local storage
        navigate(`/farmers/details/${userData._id}`);
        alert(`Welcome back, ${userData.FarmerName}!`);
      }
       else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      alert("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Log in to your account</h2>
        <form id="login-form" onSubmit={onLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <a href="#" className="text-blue-500 hover:underline">Forgot your Password?</a>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <div className="mb-6">
            <input
              type="submit"
              name="submit"
              value="Log In"
              className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            />
          </div>
        </form>
        <div className="text-center text-gray-600">
          <span>Don't have an account? <a href="/farmers/create" className="text-blue-500 hover:underline">Sign up</a></span>
        </div>
        <div className="flex justify-center space-x-4 mt-6 text-gray-500">
          <a href="#" className="hover:underline">© Stackfindover</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Privacy & terms</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
