
const mongoose = require('../db/connection');

const CartItemSchema = new mongoose.Schema({

	// Clean this up, make price and quantity number values
	item: String,
	price: String,
	quantity: String,
});

const CartItem = mongoose.model('CartItem', CartItemSchema);

module.exports = CartItem;
