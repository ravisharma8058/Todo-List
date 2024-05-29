const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Database connection
// mongoose.connect('mongodb://127.0.0.1/todo', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// mongoose.connection.on('error', (error) => {
//     console.error('MongoDB connection error:', error);
// });


mongoose.connect('mongodb://127.0.0.1/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('MongoDB connected successfully');
});


// Routes
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
