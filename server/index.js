const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.js");
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")


dotenv.config()

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'))

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err);
  });




app.get("/", (req, res) => {
  res.send("Welcome to E-store 👋");
});

app.post("/register", async (req, res) => {
  try {
    const { email, password, number } = req.body;

    const existingUser = await User.findOne({
      $or: [
        { email: email },
        { number: number }
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User is already registered"
      })
    }

    const hashPassword = await bcrypt.hash(password, 10);



    // console.log(
    //   "Email: ",
    //   email,
    //   "\nPassword: ",
    //   password,
    //   "\nPhone: ",
    //   number,
    // );  Show in console Only

    await User.create({
      email,
      password: hashPassword,
      number,
      role: 'user'
    });

    res.status(200).json({
      message: "User is registered",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        message: "Email is Invalid!"
      })
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({
        message: "Password is Invalid!"
      })
    }

    // console.log(
    //   "Email: ",
    //   email,
    //   "\nPassword: ",
    //   password,
    //   "\nPhone: ",
    //   number,
    // );  Show in console Only


    const token = await jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1D' }
    )

    res.status(200).json({
      token: token,
      user: existingUser,
      message: "User is Login",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.use("/product", require('./routes/productRoute'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
