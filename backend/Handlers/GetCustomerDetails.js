// File: Handlers/GetAllCustomers.js
const Customer = require("../Models/Customer");

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.json({
      success: true,
      message: "All customers fetched successfully",
      customers
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = getAllCustomers;
