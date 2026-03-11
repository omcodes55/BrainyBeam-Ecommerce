import React from "react";
import Product from "./Product";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();


  const [hello,setHello] = useState()


  const navigateProduct = () => {
    navigate("/product");
  };

  const fetchHello = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000");
      console.log(data);
      setHello(data)
    } catch (err) {
      console.log(err);
    }
  };

  

  useEffect(() => {
    fetchHello();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-6">
            <h1>{hello}</h1>
            <p>
              Shop the latest trends and timeless essentials all in one place.
              Our curated collection offers premium quality, affordable prices,
              and styles for every season. Discover fashion that fits your
              lifestyle and enjoy a seamless online shopping experience with
              fast delivery and secure checkout.
            </p>
            <div className="d-flex  gap-3">
              <button className="btn btn-primary" onClick={navigateProduct}>
                Shop Now
              </button>
              <button
                className="btn btn-outline-success"
                onClick={navigateProduct}
              >
                View Collection
              </button>
            </div>
          </div>
          <div className="col-6">
            <img
              className="img-fluid"
              src="https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-f-9.webp"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
