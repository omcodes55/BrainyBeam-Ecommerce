import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ManageProducts = () => {
  const [productName, setProductName] = useState();
  const [productImage, setProductImage] = useState();
  const [productDescription, setProductDescription] = useState();
  const [productPrice, setProductPrice] = useState();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    console.log("Product Name ---> ", productName);
    console.log("Product Image ---> ", productImage);
    console.log("Product Description ---> ", productDescription);
    console.log("Product Price ---> ", productPrice);

    try {
      const { data } = await axios.post("http://localhost:3000/product/add", {
        productName,
        productImage,
        productDescription,
        productPrice
      });
      console.log(data);
      toast(data.message);

      setProductName("");
      setProductImage("");
      setProductDescription("");
      setProductPrice("");



    } catch (err) {
      console.log(err);
      toast(err.response?.data?.message);
    }
  };

  return (
    <>
      <Toaster />

      <div className="container">
        <div className="row justify-content-center">
          <h1 className="text-center"> Manage Product</h1>

          <form onSubmit={handleAddProduct} className="col-6">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Product Name"
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput2" className="form-label">
                Add Product Image
              </label>
              <input
                type="file"
                value={productImage}
                className="form-control"
                id="exampleFormControlInput2"
                onChange={(e) => setProductImage(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput3" className="form-label">
                Product Description
              </label>
              <input
                type="text"
                value={productDescription}
                className="form-control"
                id="exampleFormControlInput3"
                placeholder="Product Description"
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput4" className="form-label">
                Product Price
              </label>
              <input
                type="number"
                value={productPrice}
                className="form-control"
                id="exampleFormControlInput4"
                placeholder="Product Price"
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ManageProducts;
