const Customer = require('../Models/Customer');

const createCustomer = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      orderValue = 0,
      totalOrders = 0,
      visits = 'Not Available',
      lastSeen = 'Not Available'
    } = req.body;

    // Basic validation
    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, and email are required fields.'
      });
    }

    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(409).json({
        success: false,
        message: 'Customer with this email already exists.'
      });
    }

    // Create new customer
    const newCustomer = new Customer({
      name,
      phone,
      email,
      orderValue,
      totalOrders,
      visits,
      lastSeen
    });

    await newCustomer.save();

    res.status(201).json({
      success: true,
      message: 'Customer created successfully.',
      customer: newCustomer
    });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while creating customer.'
    });
  }
};

module.exports = createCustomer;
