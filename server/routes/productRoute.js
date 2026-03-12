const express = require('express')
const router = express.Router()
const Product = require("../models/product");

router.post('/add', async (req, res) => {
    try {
        const { productName, productImage, productDescription, productPrice } = req.body;
        console.log(productName, productImage, productDescription, productPrice)

        await Product.create(
            { productName, productImage, productDescription, productPrice }

        )


        res.status(200).json({
            message: "Product Added Successfully!",
        });

    } catch (err) {
        res.status(500).json({
            message: "Server Error",
        });

    }
})


module.exports = router