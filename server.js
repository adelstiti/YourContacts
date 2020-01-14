const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

// Connect Database

connectDB();

// Init Middleware

app.use(express.json({extended : false}));

// Define Routes
app.use('/api/users',require('./routes/users'));
app.use('/api/contacts',require('./routes/contacts'));
app.use('/api/auth',require('./routes/auth'));

// Serve Static Assets if in production



const PORT = process.env.PORT || 5000 ;

app.listen(PORT,() => console.log(`Server Started on port ${PORT} `));