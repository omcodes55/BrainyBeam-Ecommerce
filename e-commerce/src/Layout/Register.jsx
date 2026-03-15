import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

  const [email, setEmail] = useState("");
  const [number, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      const { data } = await axios.post("http://localhost:3000/register", {
        email,
        password,
        number,
      });

      toast.success(data.message);

      setEmail("");
      setPassword("");
      setPhone("");

      navigate("/login");

    } catch (error) {

      toast.error(error.response?.data?.message || "Registration Failed");

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
                Register
              </h2>

              <form onSubmit={handleRegister}>

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
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    className="form-control"
                    value={number}
                    placeholder="Enter your mobile number"
                    onChange={(e) => setPhone(e.target.value)}
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
                    Register
                  </button>
                </div>

              </form>

              <p className="text-center mt-3">
                Already have an account?{" "}
                <Link to="/login">
                  Login
                </Link>
              </p>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default Register;