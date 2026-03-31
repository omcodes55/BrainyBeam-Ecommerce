import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "../utils/axiosInstance";

const AddtoCart = () => {
  const [cart, setCart] = useState(null);

  const getId = (id) => (id?._id ? id._id : id);

  // ✅ Fetch Cart
  const fetchAddToCart = async () => {
    try {
      const { data } = await axios.get("/cart/list");
      setCart(data);
    } catch (error) {
      toast(error.response?.data?.message || "Error");
    }
  };

  useEffect(() => {
    fetchAddToCart();
  }, []);

  // ✅ Update Quantity (🔥 Optimized - No reload)
  const updateQuantity = async (productId, action) => {
    try {
      const updatedItems = cart.items.map((item) => {
        const id = getId(item.productId);

        if (id === productId) {
          let newQty =
            action === "increase"
              ? item.quantity + 1
              : item.quantity - 1;

          return {
            ...item,
            quantity: newQty < 1 ? 1 : newQty,
          };
        }

        return item;
      });

      const updatedTotal = updatedItems.reduce(
        (sum, item) => sum + item.productPrice * item.quantity,
        0
      );

      setCart({
        ...cart,
        items: updatedItems,
        totalAmount: updatedTotal,
      });

      await axios.put("/cart/update", { productId, action });

    } catch (error) {
      toast(error.response?.data?.message || "Error");
      fetchAddToCart();
    }
  };

  // ✅ Remove Item (Optimized)
  const removeItem = async (productId) => {
    try {
      const updatedItems = cart.items.filter(
        (item) => getId(item.productId) !== productId
      );

      const updatedTotal = updatedItems.reduce(
        (sum, item) => sum + item.productPrice * item.quantity,
        0
      );

      setCart({
        ...cart,
        items: updatedItems,
        totalAmount: updatedTotal,
      });

      await axios.delete(`/cart/remove/${productId}`);

      toast.success("Item removed");
    } catch (error) {
      toast(error.response?.data?.message || "Error");
      fetchAddToCart();
    }
  };

  // ✅ Total Items
  const totalItems = cart?.items?.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <Toaster />

      <div className="container mt-5">
        <div className="row g-4">

          {/* LEFT */}
          <div className="col-lg-8">
            <h3 className="mb-4">🛒 Your Cart</h3>

            {!cart || cart.items?.length === 0 ? (
              <div className="alert alert-warning text-center">
                Cart is empty 🚫
              </div>
            ) : (
              cart.items.map((item) => (
                <div
                  key={getId(item.productId)}
                  className="card mb-3 shadow-sm border-0"
                >
                  <div className="row g-0 align-items-center">

                    {/* IMAGE */}
                    <div className="col-md-3 text-center p-3">
                      <img
                        src={`http://localhost:3000/uploads/${item.productImage}`}
                        onError={(e) => (e.target.src = "/default.png")}
                        className="img-fluid rounded"
                        style={{ height: "120px", objectFit: "contain" }}
                        alt="product"
                      />
                    </div>

                    {/* DETAILS */}
                    <div className="col-md-6">
                      <div className="card-body">
                        <h6 className="fw-bold">{item.productName}</h6>

                        <p className="text-muted small">
                          {item.productDescription}
                        </p>

                        <span className="text-success fw-bold">
                          ₹ {item.productPrice}
                        </span>

                        <br />

                        <button
                          className="btn btn-sm btn-danger mt-2"
                          onClick={() =>
                            removeItem(getId(item.productId))
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* QUANTITY */}
                    <div className="col-md-3 text-center">
                      <div className="d-flex justify-content-center gap-2">

                        <button
                          className="btn btn-outline-danger btn-sm"
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            updateQuantity(
                              getId(item.productId),
                              "decrease"
                            )
                          }
                        >
                          -
                        </button>

                        <span className="fw-bold">
                          {item.quantity}
                        </span>

                        <button
                          className="btn btn-outline-success btn-sm"
                          onClick={() =>
                            updateQuantity(
                              getId(item.productId),
                              "increase"
                            )
                          }
                        >
                          +
                        </button>

                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* RIGHT */}
          <div className="col-lg-4">
            <div className="card shadow border-0 p-4">
              <h4>Order Summary</h4>

              <div className="d-flex justify-content-between">
                <span>Total Items</span>
                <span>{totalItems || 0}</span>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <span>Total Amount</span>
                <strong>₹ {cart?.totalAmount || 0}</strong>
              </div>

              <hr />

              <button
                className="btn btn-success w-100"
                disabled={!cart || cart.items?.length === 0}
              >
                Pay Now 💳
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default AddtoCart;