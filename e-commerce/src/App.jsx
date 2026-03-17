import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Product from "./Components/Product";
import Navbar from "./Layout/Navbar";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Login from "./Layout/Login";
import Register from "./Layout/Register";
import ManageProducts from "./admin/ManageProducts";
import Footer from "./Layout/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="main-content">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage-product" element={<ManageProducts />} />
        <Route path="/product" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
