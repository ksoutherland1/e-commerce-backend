//controllers/bookmarksController.js
// require the Express module
const express = require('express');
const { populate } = require('../models/Bookmark');
// instantiate a router -- this will hold all the logic
// for the URLs + methods for this resource
const router = express.Router();
// import the bookmark model
const Bookmark = require('../models/Bookmark');

// Add routes to the router object
// Index: GET all the bookmarks
// router.get('/', (req, res, next) => {
// 	// 1. Get all of the bookmarks from the DB
// 	Bookmark.find({})
// 		// 2. Send them back to the client as JSON
// 		.then((bookmarks) => res.json(bookmarks))
// 		// 3. If there's an error pass it on!
// 		.catch(next);
// });

// Index: GET all the bookmarks
router.get('/', async (req, res, next) => {
	try {
		// 1. Get all of the bookmarks from the DB
		const bookmarks = await Bookmark.find({});
        // populate('owner');
		// 2. Send them back to the client as JSON
		res.json(bookmarks);
	} catch (err) {
		// if there's an error, pass it on!
		next(err);
	}
});

// Show: Get a Bookmark by ID
router.get('/:id', async (req, res, next) => {
	try {
		// 1. Find the Bookmark by its unique ID
		const bookmarks = await Bookmark.findById(req.params.id);
		// 2. Send it back to the client as JSON
		res.json(bookmarks);
	} catch (err) {
		// if there's an error, pass it on!
		next(err);
	}
});

// Create: POST a Bookmark
router.post('/', async (req, res, next) => {
	try {
		// 1. Use the data in the req body to create a new bookmark
		const newBookmark = await Bookmark.create(req.body);
		// 2. If the create is successful, send back the record that was inserted, specifying 201 status for Created
		res.status(201).json(newBookmark);
	} catch (err) {
		// 3. If there was an error, pass it on!
		next(err);
	}
});

router.put('/:id', async (req, res, next) => {
    try {
        const updatedBookmark = await Bookmark.findByIdAndUpdate(
            req.params.id,req.body, 
        {
            new: true}
        )
        if(updatedBookmark){
            res.json(updatedBookmark)
        } else {
            res.sendStatus(404)
        }
    } catch(err){
        next(err)
    }
})

router.delete('/:id', async(req, res, next) => {
    try {
        const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id)
        res.json(deletedBookmark) 
    } catch(err) {
        next(err)
    }
})




// Export this router object so that it is accessible when we require the file elsewhere
module.exports = router;
