
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Index: GET all the users
router.get('/', async (req, res, next) => {
	try {
		// 1. Get all of the users from the DB
		const users = await User.find({});
        console.log(users)
		// 2. Send them back to the client as JSON
		res.json(users);
	} catch (err) {
		// if there's an error, pass it on!
		next(err);
	}
});

// Show: Get a User by ID
router.get('/:id', async (req, res, next) => {
	try {
		// 1. Find the User by its unique ID
		const user = await User.findById(req.params.id);
		// 2. Send it back to the client as JSON
        res.json(user)
	} catch (err) {
		// if there's an error, pass it on!
		next(err);
	}
});

// Create: POST a User
router.post('/', async (req, res, next) => {
	try {
		// 1. Use the data in the req body to create a new User
		const newUser = await User.create(req.body);
		// 2. If the create is successful, send back the record that was inserted, specifying 201 status for Created
		res.status(201).json(newUser);
	} catch (err) {
		// 3. If there was an error, pass it on!
		next(err);
	}
});


module.exports = router