import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">

        {/* LOGO */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          🛒 E-Store
        </Link>

        {/* TOGGLE */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          {/* LEFT MENU */}
          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <Link className="nav-link px-3" to="/">
                Home
              </Link>
            </li>

            {role === "user" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/product">
                    Products
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link px-3" to="/about">
                    About
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link px-3" to="/contact">
                    Contact
                  </Link>
                </li>
              </>
            )}

            {role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link px-3" to="/manage-product">
                  Manage Product
                </Link>
              </li>
            )}

          </ul>

          {/* RIGHT SIDE */}
          <div className="d-flex align-items-center gap-3">

            {/* 🛒 CART ICON (NO COUNT) */}
            {token && role === "user" && (
              <Link to="/add-to-cart" className="text-white">
                <FaShoppingCart size={22} />
              </Link>
            )}

            {/* AUTH BUTTONS */}
            {token ? (
              <button
                className="btn btn-outline-danger rounded-pill px-3"
                onClick={LogOut}
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  className="btn btn-success rounded-pill px-3"
                  onClick={handleLogin}
                >
                  Login
                </button>

                <button
                  className="btn btn-outline-light rounded-pill px-3"
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