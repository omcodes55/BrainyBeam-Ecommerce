import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [hello, setHello] = useState("");

  const navigateProduct = () => {
    navigate("/product");
  };

  const fetchHello = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000");
      console.log(data);
      setHello(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHello();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* LEFT SIDE */}
        <div className="col-lg-6 col-md-12 mb-4">
          <span className="badge bg-dark mb-3 px-3 py-2">
            New Collection 🚀
          </span>

          <h1 className="display-4 fw-bold">{hello || "Welcome to E-Store"}</h1>

          <p className="text-muted mt-3 fs-5">
            Discover premium fashion, accessories, and lifestyle products. Shop
            smarter with unbeatable prices and fast delivery.
          </p>

          <div className="d-flex gap-3 mt-4">
            <button
              className="btn btn-dark btn-lg px-4"
              onClick={navigateProduct}
            >
              Shop Now →
            </button>

            <button
              className="btn btn-outline-dark btn-lg px-4"
              onClick={navigateProduct}
            >
              Explore
            </button>
          </div>

          {/* EXTRA INFO */}
          <div className="d-flex gap-4 mt-4 text-muted small">
            <span>✔ Free Delivery</span>
            <span>✔ Secure Payment</span>
            <span>✔ Easy Returns</span>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="col-lg-6 col-md-12 text-center position-relative">
          <div
            className="bg-light rounded-circle position-absolute"
            style={{
              width: "300px",
              height: "300px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 0,
            }}
          ></div>

          <img
            className="img-fluid position-relative"
            src="https://img.freepik.com/free-photo/young-woman-with-smartphone-shopping-bags_23-2148316462.jpg"
            alt="Ecommerce"
            style={{
              maxHeight: "420px",
              objectFit: "contain",
              zIndex: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
