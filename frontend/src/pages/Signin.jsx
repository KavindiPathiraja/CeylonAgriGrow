import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";
import axios from "axios";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

function Login() {
  const [FarmerID, setFarmerID] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const credentials = { FarmerID, Password: password };

    setLoading(true); // Set loading to true when starting login

    try {
      const response = await axios.post("http://localhost:5556/farmers/Login", credentials);
      const userData = response.data;

      if (userData) {
        localStorage.setItem('farmerId', userData._id); // Store farmer ID in local storage
        navigate(`/ReadOneHome/${FarmerID}`);
        alert(`Welcome back, ${userData.FarmerName}!`);
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      alert("Login failed: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <>
      <div className="container2">
        <div className="user_login">
          <h2>Login To Your Account</h2>
          <form onSubmit={onLogin}>
            <p className="p">Farmer ID</p> {/* Updated label */}
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
            <Link to="/forgotpassword">
              <p className="trouble">Forgot password?</p>
            </Link>
            <button className="btn" disabled={loading}>
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
          <p className="info">
            Don't Have an Account{" "}
            <Link to="/farmers/create">
              <b>Sign Up</b>
            </Link>{" "}
            here
          </p>
          <div className="signin">-— or Sign in with —-</div>
          <span id="Signinbtn">
            <div id="customBtn">
              <span className="icon2"></span>
              <span className="buttonText">Google</span>
            </div>
            <div id="customBtn1">
              <span className="icon1"></span>
              <span className="buttonText1">Facebook</span>
            </div>
          </span>

          <p className="info">
        Don't Have an Account{" "}
        <Link to="/farmers/create">
          <b>Sign Up</b>
        </Link>{" "}
        here
      </p>
        </div>
        
      </div>
      
    </>
  );
};

export default Login; // Changed export to match the function name
