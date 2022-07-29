
const mongoose = require('../db/connection');

const CartItemSchema = new mongoose.Schema({

	item: String,
	price: Number,
	quantity: Number,
});

const CartItem = mongoose.model('CartItem', CartItemSchema);

module.exports = CartItem;
