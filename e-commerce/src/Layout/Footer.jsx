import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <div className="container">
        <div className="row align-items-center text-center">
          {/* LEFT (empty for spacing) */}
          <div className="col-md-4"></div>

          {/* CENTER */}
          <div className="col-md-4">
            <p className="mb-2 mb-md-0">
              © {new Date().getFullYear()} E-Store. All rights reserved
            </p>
          </div>

          {/* RIGHT SOCIAL LOGOS */}
          <div className="col-md-4 d-flex justify-content-md-end justify-content-center gap-3 mt-2 mt-md-0">
            <a href="https://www.linkedin.com/in/om-vadher-508a09246/" target="_blank">
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                alt="LinkedIn"
                width="28"
              />
            </a>

            <a href="https://wa.me/917486928889" target="_blank">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                alt="WhatsApp"
                width="28"
              />
            </a>

            <a href="https://www.instagram.com" target="_blank">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                alt="Instagram"
                width="28"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
