const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/authMiddleware');

// Auth handlers
const createUser = require('../Handlers/Auth/CreateUser');
const loginUser = require('../Handlers/Auth/Userlogin');

// Segment handlers
const createSegment = require('../Handlers/Segment/CreateSegment');

// Campaign handlers
const createCampaign = require('../Handlers/Campaign/CreateCampaign');
const analyzeCampaign = require('../Handlers/Campaign/AnalyzeCampaign');

// Customer handlers
const createCustomer = require('../Handlers/Customer/CreateCustomer');
const getAllCustomers = require('../Handlers/Customer/GetCustomerDetails');
const getCustomerStats = require('../Handlers/Customer/GetCustomerStats');

// Auth routes
router.post('/auth/register', createUser);
router.post('/auth/login', loginUser);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/dashboard');
});

// Segment routes (protected)
router.post('/segments', authMiddleware, createSegment);
router.get('/segments', authMiddleware, getSegments);

// Campaign routes (protected)
router.post('/campaigns', authMiddleware, createCampaign);
router.get('/campaigns', authMiddleware, getCampaigns);
router.post('/campaigns/:id/analyze', authMiddleware, analyzeCampaign);

// Customer routes
router.post('/customers', authMiddleware, createCustomer);
router.get('/customers', authMiddleware, getAllCustomers);
router.get('/customers/stats', authMiddleware, getCustomerStats);

// Communication log routes
router.get('/communications', authMiddleware, getCommunicationLogs);
router.post('/communications', authMiddleware, createCommunicationLog);

module.exports = router;
