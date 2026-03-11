import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log("Email: ", email);
    // console.log("Password: ", password);   show console only
    try {
      const { data } = await axios.post("http://localhost:3000/login", {
        email,
        password 
      });
      
      console.log(data)
      toast(data.message);

      localStorage.setItem("token",data.token)
      localStorage.setItem("userEmail", data.user.email)
      localStorage.setItem("userId", data.user._id)
      localStorage.setItem("role",data.user.role)

      setEmail("");
      setPassword("");
      navigate('/')

    } catch (error) {
      toast(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Toaster />
      <div className="container">
        <div className="row justify-content-center" style={{ padding: "50px" }}>
          <form
            className="col-4"
            style={{
              padding: "50px",
              border: "2px solid",
              borderRadius: "20px",
            }}
            onSubmit={handleLogin}
          >
            <h1 className="text-center">Login</h1>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                value={email}
                id="exampleInputEmail"
                aria-describedby="emailHelp"
                placeholder="Enter your valid email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                id="exampleInputPassword"
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div>
            <button type="submit" className="btn btn-primary" >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
