const express = require('express');
const router = express.Router();
const Product = require("../models/product");
const { verifyToken } = require('../middleware/authMiddleware');
const AddToCart = require('../models/AddToCart');


// ✅ ADD TO CART
router.post('/add', verifyToken, async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await AddToCart.findOne({ userId });

        if (!cart) {
            cart = new AddToCart({
                userId,
                items: []
            });
        }

        const itemIndex = cart.items.findIndex(
            item => item.productId.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += 1;
        } else {
            cart.items.push({
                productId,
                productDescription: product.productDescription,
                productImage: product.productImage,
                productPrice: product.productPrice,
                productName: product.productName
            });
        }

        // ✅ Recalculate total
        cart.totalAmount = cart.items.reduce(
            (acc, item) => acc + item.productPrice * item.quantity,
            0
        );

        await cart.save();

        res.status(200).json({
            message: "✅ Product Added in Cart!"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});


// ✅ GET CART
router.get('/list', verifyToken, async (req, res) => {
    try {
        const cart = await AddToCart.findOne({ userId: req.user._id });
        res.json(cart || { items: [], totalAmount: 0 });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});


// ✅ UPDATE QUANTITY
router.put('/update', verifyToken, async (req, res) => {
    try {
        const { productId, action } = req.body;
        const userId = req.user._id;

        let cart = await AddToCart.findOne({ userId });

        const item = cart.items.find(
            item => item.productId.toString() === productId
        );

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        if (action === "increase") {
            item.quantity += 1;
        } else if (action === "decrease") {
            item.quantity -= 1;

            if (item.quantity <= 0) {
                cart.items = cart.items.filter(
                    i => i.productId.toString() !== productId
                );
            }
        }

        cart.totalAmount = cart.items.reduce(
            (acc, item) => acc + item.productPrice * item.quantity,
            0
        );

        await cart.save();

        res.json({ message: "Cart updated" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});


// ✅ REMOVE ITEM
router.delete('/remove/:productId', verifyToken, async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id;

        let cart = await AddToCart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(
            item => item.productId.toString() !== productId
        );

        cart.totalAmount = cart.items.reduce(
            (acc, item) => acc + item.productPrice * item.quantity,
            0
        );

        await cart.save();

        res.json({ message: "🗑️ Item removed from cart" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;