import React from "react";
import { useState } from "react";
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

const SignIn = () => {
  const [formData, setformData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [id, setId] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:5556/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <>
      <div className="container2">
        <div className="user_login">
          <h2>Login To Your Account</h2>
          <form onSubmit={handleSubmit}>
            <p className="p">Email</p>
            <input
              type="email"
              placeholder="Enter Your Email"
              id="email"
              onChange={handleChange}
            />
            <p className="p">password</p>
            <input
              type="password"
              id="password"
              placeholder="Enter a Password"
              onChange={handleChange}
            />
            <br />
            <Link to="/forgotpassword">
              <p className="trouble">Forgot password?</p>
            </Link>
            <button className="btn" disabled={loading}>
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
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
        </div>
      </div>
      <p className="info">
        Doesn't Have an Account{" "}
        <Link to="/signup">
          <b>Sign Up</b>
        </Link>{" "}
        here
      </p>
    </>
  );
};

export default SignIn;
