import { useState } from "react";
import "./login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("http://localhost:5556/login", {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate("/");
        toast.success("Welcome " + email);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="user_login">
          <h2>Login To Your Account</h2>
          <form onSubmit={loginUser}>
            <p className="p">Email</p>
            <input
              type="email"
              placeholder="Enter Your Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <p className="p">password</p>
            <input
              type="password"
              placeholder="Enter a Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <br />
            <p className="trouble">Having trouble Sign in?</p>
            <button type="submit" className="btn">
              Login
            </button>
          </form>
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
      <p className="info">
        Doesn't Have an Account{" "}
        <Link to="/register">
          <b>Sign Up</b>
        </Link>{" "}
        here
      </p>
    </>
  );
};

export default Login;
