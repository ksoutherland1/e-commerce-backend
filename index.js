//=============================================================================
// Basic Config
//=============================================================================
const express = require('express');
const app = express();
const cors = require('cors') 
app.set('port', process.env.PORT || 8000);

//=============================================================================
// Middleware
//=============================================================================
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//=============================================================================
// ROUTES
//=============================================================================
// Redirect

app.get('/', (req, res) => {
	res.redirect('/api/bookmarks');
});

/* START CONTROLLERS HERE */

// const bookmarksController = require('./controllers/bookmarksController');
// app.use('/api/bookmarks/', bookmarksController);

// const usersController = require('./controllers/usersController')
// app.use('/api/users', usersController)

/* END CONTROLLERS HERE */

app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).send(message);
});

//=============================================================================
// START SERVER
//=============================================================================
app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
