const express = require('express');
const { populate } = require('../models/CartItem');
const router = express.Router();
const CartItem = require('../models/CartItem');

// Index: GET all the CartItems
router.get('/', async (req, res, next) => {
	try {
		// 1. Get all of the CartItems from the DB
		const CartItems = await CartItem.find({});
		// 2. Send them back to the client as JSON
		res.json(CartItems);
	} catch (err) {
		// if there's an error, pass it on!
		next(err);
	}
});

// Show: Get a CartItem by ID
router.get('/:id', async (req, res, next) => {
	try {
		// 1. Find the CartItem by its unique ID
		const CartItems = await CartItem.findById(req.params.id);
		// 2. Send it back to the client as JSON
		res.json(CartItems);
	} catch (err) {
		// if there's an error, pass it on!
		next(err);
	}
});

// Create: POST a CartItem
router.post('/', async (req, res, next) => {
	try {
		// 1. Use the data in the req body to create a new CartItem
		const newCartItem = await CartItem.create(req.body);
		// 2. If the create is successful, send back the record that was inserted, specifying 201 status for Created
		res.status(201).json(newCartItem);
	} catch (err) {
		// 3. If there was an error, pass it on!
		next(err);
	}
});

router.put('/:id', async (req, res, next) => {
    try {
        const updatedCartItem = await CartItem.findByIdAndUpdate(
            req.params.id,req.body, 
        {
            new: true}
        )
        if(updatedCartItem){
            res.json(updatedCartItem)
        } else {
            res.sendStatus(404)
        }
    } catch(err){
        next(err)
    }
})

router.delete('/:id', async(req, res, next) => {
    try {
        const deletedCartItem = await CartItem.findByIdAndDelete(req.params.id)
        res.json(deletedCartItem) 
    } catch(err) {
        next(err)
    }
})

// Export this router object so that it is accessible when we require the file elsewhere
module.exports = router;
