const express = require('express')
const router = express.Router()
const Product = require("../models/product");
const multer = require("multer");
const { verifyToken } = require('../middleware/authMiddleware');


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



router.post('/add',verifyToken, upload.single('productImage'), async (req, res) => {
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

router.delete('/delete/:id', async (req, res) => {
    try {

        const { id } = req.params;

        await Product.findByIdAndDelete(id);

        res.status(200).json({
            message: "Product is Deleted!"
        });

    } catch (err) {

        res.status(500).json({
            message: "Server Error"
        });
    }
});

router.put('/edit/:editId', upload.single('productImage'), async (req, res) => {
    try {
        const { productName, productDescription, productPrice } = req.body;
        const { editId } = req.params;

        console.log(req.body);
        console.log(req.file);

        const product = await Product.findById(editId);

        if (!product) {
            return res.status(404).json({
                message: "❌ Product not found"
            });
        }

        // ✅ Create update object
        let updatedData = {
            productName,
            productDescription,
            productPrice
        };

        // ✅ Only update image if new image is uploaded
        if (req.file) {
            updatedData.productImage = req.file.filename;
        }

        await Product.findByIdAndUpdate(editId, updatedData);

        res.status(200).json({
            message: "✅ Product Updated Successfully!"
        });

    } catch (err) {
        console.log(err);   

        res.status(500).json({
            message: "Server Error"
        });
    }
});



module.exports = router