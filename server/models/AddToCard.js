const mongoose = require('mongoose');

const AddToCartSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number
            }
        }
    ],

    totalAmount: {
        type: String
    }

})
module.exports = mongoose.model("AddToCart", AddToCartSchema)