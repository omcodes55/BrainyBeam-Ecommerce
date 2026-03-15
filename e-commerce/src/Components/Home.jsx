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

          <h1 className="display-5 fw-bold text-dark">
            {hello}
          </h1>

          <p className="text-muted mt-3">
            Shop the latest trends and timeless essentials all in one place.
            Our curated collection offers premium quality products at affordable
            prices. Discover fashion that fits your lifestyle with fast delivery
            and secure checkout.
          </p>

          <div className="d-flex gap-3 mt-4">

            <button
              className="btn btn-dark btn-lg"
              onClick={navigateProduct}
            >
              Shop Now
            </button>

            <button
              className="btn btn-outline-dark btn-lg"
              onClick={navigateProduct}
            >
              View Collection
            </button>

          </div>

        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="col-lg-6 col-md-12 text-center">

          <img
            className="img-fluid rounded shadow"
            src="https://img.freepik.com/free-photo/young-woman-with-smartphone-shopping-bags_23-2148316462.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Ecommerce"
            style={{ maxHeight: "450px", objectFit: "contain" }}
          />

        </div>

      </div>
    </div>
  );
};

export default Home;