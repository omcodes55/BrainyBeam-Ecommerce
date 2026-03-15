import React from "react";

const Contact = () => {
  return (
    <div className="container mt-5">

      <div className="text-center mb-4">
        <h1 className="fw-bold">Contact Us</h1>
        <p className="text-muted">
          If you have any questions about our products or services, feel free to contact us.
        </p>
      </div>

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow border-0 p-4 text-center">

            <h4 className="mb-3">📞 Call Support</h4>

            <p className="text-muted">
              Our team is available to assist you. Click below to call directly.
            </p>

            <a
              href="tel:+917486928889"
              className="btn btn-success btn-lg"
            >
              Call 
            </a>

            <hr />

            <p className="mb-1"><strong>Email:</strong> e-store@gmail.com</p>
            <p><strong>Location:</strong> Gujarat, India</p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Contact;