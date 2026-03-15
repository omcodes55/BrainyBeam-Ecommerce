import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      toast.success(data.message);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("role", data.user.role);

      setEmail("");
      setPassword("");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <>
      <Toaster />

      <div className="container mt-5">
        <div className="row justify-content-center">

          <div className="col-lg-4 col-md-6">

            <div className="card shadow border-0 p-4">

              <h2 className="text-center fw-bold mb-4">
                Login
              </h2>

              <form onSubmit={handleLogin}>

                <div className="mb-3">
                  <label className="form-label">
                    Email address
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button className="btn btn-dark">
                    Login
                  </button>
                </div>

              </form>

              <p className="text-center mt-3">
                Don't have an account?{" "}
                <Link to="/register">
                  Register
                </Link>
              </p>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default Login;