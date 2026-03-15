import React from "react";

const About = () => {
  return (
    <div className="container mt-5">

      <div className="row align-items-center">

        {/* Image Section */}
        <div className="col-md-6 mb-4">
          <img
            src="https://img.freepik.com/free-vector/online-shopping-concept-illustration_114360-1084.jpg"
            className="img-fluid rounded shadow"
            alt="About us"
          />
        </div>

        {/* Text Section */}
        <div className="col-md-6">

          <h1 className="fw-bold mb-3">About Our Store</h1>

          <p className="text-muted">
            Welcome to E-Store! We provide a wide range of high-quality products
            at affordable prices. Our mission is to make online shopping simple,
            fast, and enjoyable for everyone.
          </p>

          <p className="text-muted">
            From fashion to accessories, we carefully select products that match
            the latest trends and customer needs. With secure checkout and fast
            delivery, we ensure the best shopping experience.
          </p>

          <button className="btn btn-dark mt-3">
            Explore Products
          </button>

        </div>

      </div>

    </div>
  );
};

export default About;