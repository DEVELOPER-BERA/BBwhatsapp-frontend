const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const socketio = require('socket.io');
const socketController = require('./controllers/socketController');
const socketAuth = require('./middleware/socketAuth');

// Route files
const routes = require('./routes');

// Create express app
const app = express();

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/', routes);

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Error handler middleware
app.use(errorHandler.errorHandler);
app.use(errorHandler.notFound);

module.exports = app;
