import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import "./signup.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({});
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      seterror(false);
      const res = await fetch("http://localhost:5556/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setloading(false);
      if (data.success === false) {
        seterror(true);
        return;
      }
      navigate("/signin");
    } catch (error) {
      setloading(false);
      seterror(true);
    }
  };
  return (
    <>
      <div className="container1">
        <div className="user_login2">
          <h2>Create a New Account</h2>
          <form onSubmit={handleSubmit}>
            <p className="p">UserName</p>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Name"
              id="username"
              required
            />
            <p className="p">Address</p>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Address"
              id="address"
              required
            />
            <p className="p">Email</p>
            <input
              onChange={handleChange}
              type="email"
              placeholder="Email"
              id="email"
              required
            />
            <p className="p">Password</p>
            <input
              onChange={handleChange}
              type="password"
              placeholder="Password"
              id="password"
              pattern="^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$"
              title="Password must contain at least 8 characters, including at least one letter, one number and one special character"
              required
            />
            <br />
            <button className="btn" disabled={loading}>
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
      <p className="info">
        Already Have an Account{" "}
        <Link to="/signin">
          <b>Sign Up</b>
        </Link>{" "}
        here
      </p>
    </>
  );
};

export default SignUp;
