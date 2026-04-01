import React from "react";
import { useNavigate } from "react-router-dom";

const HomeAdmin = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* LEFT SIDE */}
        <div className="col-lg-6 col-md-12 mb-4">
          <span className="badge bg-danger mb-3 px-3 py-2">Admin Panel ⚙️</span>

          <h1 className="display-4 fw-bold">Welcome Admin 👨‍💼</h1>

          <p className="text-muted mt-3 fs-5">
            Manage your store efficiently. Add products, monitor users, and
            track orders all in one place.
          </p>

          <div className="d-flex gap-3 mt-4">
            <button
              className="btn btn-dark btn-lg px-4"
              onClick={() => navigate("/manage-product")}
            >
              Manage Products →
            </button>

            <button
              className="btn btn-outline-dark btn-lg px-4"
            //   onClick={() => navigate("/admin/users")}
            >
              View Users    
            </button>
          </div>

          {/* EXTRA INFO */}
          <div className="d-flex gap-4 mt-4 text-muted small">
            <span>✔ Full Control</span>
            <span>✔ Secure Access</span>
            <span>✔ Real-time Updates</span>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="col-lg-6 col-md-12 text-center">
          <img
            className="img-fluid"
            src="https://img.freepik.com/free-vector/admin-dashboard-concept-illustration_114360-911.jpg"
            alt="Admin Dashboard"
            style={{ maxHeight: "420px", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;

