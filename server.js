const app = require('./app');
const http = require('http');
const mongoose = require('mongoose');
const config = require('./config/db');

// Connect to database
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
});

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.io
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Authenticate socket connections
io.use((socket, next) => {
    socketAuth.authenticateSocket(socket, next);
});

// Handle socket connections
io.on('connection', (socket) => {
    socketController.handleConnection(io, socket);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
