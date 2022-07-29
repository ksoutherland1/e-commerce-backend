const express = require('express');
const { populate } = require('../models/ArtItem');
const router = express.Router();
const ArtItem = require('../models/ArtItem');

// Index: GET all the ArtItems
router.get('/', async (req, res, next) => {
	try {
		// 1. Get all of the ArtItems from the DB
		const artItems = await ArtItem.find({});
		// 2. Send them back to the client as JSON
		res.json(artItems);
	} catch (err) {
		// if there's an error, pass it on!
		next(err);
	}
});

// Show: Get a ArtItem by ID
router.get('/:id', async (req, res, next) => {
	try {
		// 1. Find the ArtItem by its unique ID
		const artItems = await ArtItem.findById(req.params.id);
		// 2. Send it back to the client as JSON
		res.json(artItems);
	} catch (err) {
		// if there's an error, pass it on!
		next(err);
	}
});

// Create: POST a ArtItem
router.post('/', async (req, res, next) => {
	try {
		// 1. Use the data in the req body to create a new ArtItem
		const newArtItem = await ArtItem.create(req.body);
		// 2. If the create is successful, send back the record that was inserted, specifying 201 status for Created
		res.status(201).json(newArtItem);
	} catch (err) {
		// 3. If there was an error, pass it on!
		next(err);
	}
});

router.put('/:id', async (req, res, next) => {
    try {
        const updatedArtItem = await ArtItem.findByIdAndUpdate(
            req.params.id,req.body, 
        {
            new: true}
        )
        if(updatedArtItem){
            res.json(updatedArtItem)
        } else {
            res.sendStatus(404)
        }
    } catch(err){
        next(err)
    }
})

router.delete('/:id', async(req, res, next) => {
    try {
        const deletedArtItem = await ArtItem.findByIdAndDelete(req.params.id)
        res.json(deletedArtItem) 
    } catch(err) {
        next(err)
    }
})

// Export this router object so that it is accessible when we require the file elsewhere
module.exports = router;
