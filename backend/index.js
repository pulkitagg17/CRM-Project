const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors');
const passport = require('./Config/passport');
const session = require('express-session');

// Middleware
app.use(express.json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Database connection
const dbconnect = require("./Configuration/dbconnct");
dbconnect();

// Routes
const router = require("./Routers/routes");
app.use('/api', router);

// Basic health check route
app.get("/", async(req, res) => {
    res.json({
        success: true,
        message: "Server is running"
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something broke!'
    });
});

const port = process.env.PORT_NO || 4000;
app.listen(port, () => {
    console.log("Server started at port:", port);
});
