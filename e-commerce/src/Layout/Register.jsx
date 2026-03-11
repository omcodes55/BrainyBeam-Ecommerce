import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState();
  const [number, setPhone] = useState();
  const [password, setPassword] = useState();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Email: ", email);
    console.log("Phone Number: ", number);
    console.log("Password: ", password);
    try {
      const { data } = await axios.post("http://localhost:3000/register", {
        email,
        password,
        number,
      });
      toast(data.message);
      setEmail("");
      setPassword("");
      setPhone("");

    } catch (error) {
      toast(error.response.data.message);
    }
  };
  return (
    <>
      <Toaster />
      <div className="container">
        <div className="row justify-content-center" style={{ padding: "50px" }}>
          <form
            className="col-4"
            style={{
              padding: "50px",
              border: "2px solid",
              borderRadius: "20px",
            }}
            onSubmit={handleRegister}
          >
            <h1 className="text-center">Register</h1>
            <div className="mb-3">
              <label for="exampleInputEmail" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                value={email}
                id="exampleInputEmail"
                aria-describedby="emailHelp"
                placeholder="Enter your valid email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPhonenumber" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                value={number}
                id="exampleInputPhonenumber"
                aria-describedby="PhoneHelp"
                placeholder="Enter your mobile number"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                id="exampleInputPassword"
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
