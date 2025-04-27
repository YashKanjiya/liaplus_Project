// server.js (or your main file where Express app is initialized)

const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Import routes (assuming you have routes like authRoutes and blogRoutes)
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

// MongoDB Connection (Make sure to replace with your MongoDB Atlas connection string)
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// Middleware for parsing JSON request bodies
app.use(express.json());

// Use routes for authentication and blog functionality
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// Set up the server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

