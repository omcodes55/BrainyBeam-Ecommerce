import { useEffect, useState } from "react";
import Card from "../ReusableComponents/Card";
import axios from "axios";

const Product = () => {
  const [productList, setProductList] = useState([]);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/product/list");

      console.log(data.productList);

      setProductList(data.productList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="container mt-5">
      {/* ===== HEADING ===== */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-6">🛒 Our Products</h1>
        <p className="text-muted">
          Discover premium quality products at the best prices
        </p>
      </div>

      {/* ===== PRODUCT GRID ===== */}
      <div className="row g-4">
        {productList.length === 0 ? (
          <div className="text-center">
            <h5 className="text-muted">No products found 🚫</h5>
          </div>
        ) : (
          productList.map((item) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={item._id}>
              <div className="card h-100 border-0 shadow-sm product-card">
                {/* IMAGE */}
                <div className="text-center p-3">
                  <img
                    src={`http://localhost:3000/uploads/${item.productImage}`}
                    alt="product"
                    className="img-fluid"
                    style={{
                      height: "180px",
                      objectFit: "contain",
                    }}
                  />
                </div>

                {/* BODY */}
                <div className="card-body d-flex flex-column">
                  <h6 className="fw-bold">{item.productName}</h6>

                  <p className="text-muted small flex-grow-1">
                    {item.productDescription.slice(0, 60)}...
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="fw-bold text-success fs-5">
                      ₹ {item.productPrice}
                    </span>

                    <button className="btn btn-dark btn-sm">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Product;
