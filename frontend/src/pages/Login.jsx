import { useState } from "react";
import "./login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = () => {
  const [FarmerID, setFarmerID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    const credentials = { FarmerID: FarmerID, Password: password };

    try {
      const response = await axios.post("http://localhost:5556/farmers/Login", credentials);
      const userData = response.data;

      if (userData) {
        localStorage.setItem("farmerId", userData._id); // Store farmer ID in local storage
        navigate(`/ReadOneHome/${FarmerID}`);
        toast.success(`Welcome back, ${userData.FarmerName}!`);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      toast.error("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <>
      <div className="container">
        <div className="user_login">
          <h2>Login To Your Account</h2>
          <form onSubmit={onLogin}>
            <p className="p">FarmerID</p>
            <input
              type="text"
              name="FarmerID"
              id="FarmerID"
              onChange={(e) => setFarmerID(e.target.value)}
              required
            />
            <p className="p">Password</p>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <p className="trouble">Having trouble signing in?</p>
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
            <span>Don't have an account? <Link to="/farmers/create" className="text-blue-500 hover:underline">Sign up</Link></span>
          </div>
          <div className="signin">-— or Sign in with —-</div>
          <span id="Signinbtn">
            <div id="customBtn">
              <span className="icon"></span>
              <span className="buttonText">Google</span>
            </div>
            <div id="customBtn1">
              <span className="icon1"></span>
              <span className="buttonText1">Facebook</span>
            </div>
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
