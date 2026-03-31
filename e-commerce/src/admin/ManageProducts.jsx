import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const ManageProducts = () => {
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [preview, setPreview] = useState(null);
  const [productList, setProductList] = useState([]);
  const [editId, setEditId] = useState(null);

  // ✅ Fetch Products
  const fetchProduct = async () => {
    try {
      const { data } = await axios.get("/product/list");
      setProductList(data.productList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // ✅ Add / Update Product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("productPrice", productPrice);

    if (productImage) {
      formData.append("productImage", productImage);
    }

    try {
      let res;

      if (editId) {
        res = await axios.put(`/product/edit/${editId}`, formData);
      } else {
        res = await axios.post("/product/add", formData);
      }

      toast.success(res.data.message);

      // reset
      setProductName("");
      setProductImage(null);
      setProductDescription("");
      setProductPrice("");
      setEditId(null);
      setPreview(null);

      fetchProduct();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Server Error");
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/product/delete/${id}`);

      toast(data.message);
      fetchProduct();
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Edit
  const handleEdit = (item) => {
    setEditId(item._id);
    setProductName(item.productName);
    setProductDescription(item.productDescription);
    setProductPrice(item.productPrice);

    setPreview(item.productImage);
    setProductImage(null); // important
  };

  return (
    <>
      <Toaster />

      <div className="container mt-5">
        {/* ===== FORM ===== */}
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card border-0 shadow-lg rounded-4 p-4">
              <h3 className="text-center fw-bold mb-4">
                {editId ? "Update Product" : "Add Product"}
              </h3>

              <form onSubmit={handleAddProduct}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Product Name</label>
                  <input
                    type="text"
                    value={productName}
                    className="form-control form-control-lg rounded-3"
                    placeholder="Enter product name"
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Product Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => {
                      setProductImage(e.target.files[0]);
                      setPreview(URL.createObjectURL(e.target.files[0]));
                    }}
                  />

                  {preview && (
                    <div className="text-center mt-3">
                      <img
                        src={
                          preview.startsWith("blob:")
                            ? preview
                            : `http://localhost:3000/uploads/${preview}`
                        }
                        alt="Preview"
                        className="rounded-3 shadow"
                        style={{
                          width: "110px",
                          height: "110px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    value={productDescription}
                    className="form-control rounded-3"
                    rows="3"
                    placeholder="Enter description"
                    onChange={(e) => setProductDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Price</label>
                  <input
                    type="number"
                    value={productPrice}
                    className="form-control rounded-3"
                    placeholder="Enter price"
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </div>

                <div className="d-grid">
                  <button className="btn btn-dark btn-lg rounded-3">
                    {editId ? "Update Product" : "Add Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* ===== TABLE ===== */}
        <div className="mt-5">
          <h4 className="text-center fw-bold mb-4">📦 Product List</h4>

          <div className="table-responsive">
            <table className="table table-hover align-middle shadow rounded-4 overflow-hidden">
              <thead className="table-dark">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {productList.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      🚫 No Products Found
                    </td>
                  </tr>
                ) : (
                  productList.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img
                          src={`http://localhost:3000/uploads/${item.productImage}`}
                          alt="Product"
                          className="rounded-3"
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                          }}
                        />
                      </td>

                      <td className="fw-semibold">{item.productName}</td>

                      <td className="text-muted">
                        {item.productDescription.slice(0, 35)}...
                      </td>

                      <td className="text-success fw-bold">
                        ₹ {item.productPrice}
                      </td>

                      <td>
                        <button
                          className="btn btn-outline-success btn-sm me-3"
                          onClick={() => handleEdit(item)}
                        >
                          ✏ Edit
                        </button>

                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(item._id)}
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageProducts;
