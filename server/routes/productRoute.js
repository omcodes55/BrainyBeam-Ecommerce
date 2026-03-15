const express = require('express')
const router = express.Router()
const Product = require("../models/product");
const multer = require("multer")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage })



router.post('/add', upload.single('productImage'), async (req, res) => {
    try {

        const { productName, productDescription, productPrice } = req.body;

        console.log(req.body);
        console.log(req.file);

        await Product.create({
            productName: productName,
            productDescription: productDescription,
            productPrice: productPrice,
            productImage: req.file.filename
        });

        res.status(200).json({
            message: "✅ Product Added Successfully!"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });
    }
});

router.get('/list', async (req, res) => {
    try {

        const productList = await Product.find()
       

        res.status(200).json({
            productList: productList
        });

    } catch (err) {

        res.status(500).json({
            message: "Server Error"
        });
    }
});


module.exports = router