import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");

  const LogOut = () => {
    localStorage.clear();
    toast("User Logged out");
    navigate("/login");
  };

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          🛒 E-Store
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {role === "user" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/product">Products</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/contact">Contact</Link>
                </li>
              </>
            )}

            {role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/manage-product">
                  Manage Product
                </Link>
              </li>
            )}

          </ul>

          <div className="d-flex gap-2">
            {token ? (
              <button className="btn btn-danger" onClick={LogOut}>
                Logout
              </button>
            ) : (
              <>
                <button className="btn btn-success" onClick={handleLogin}>
                  Login
                </button>
                <button
                  className="btn btn-outline-light"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;