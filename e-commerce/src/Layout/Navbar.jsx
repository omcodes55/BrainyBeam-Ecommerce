import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate()

  const handleLogin = ()=>{
    navigate('/login')
  }

  const handleRegister = ()=>{
    navigate('/register')
  }


  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="#">
          E-Store
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/product">
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="d-flex gap-3">
          <div className="btn btn-success" onClick={handleLogin}>Login</div>
          <div className="btn btn-outline-primary" onClick={handleRegister}>Register</div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
