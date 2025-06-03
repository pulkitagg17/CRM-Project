
const Customer = require("../Models/Customer");

const getCustomerStats = async (req, res) => {
  try {
    const customers = await Customer.find({});
    const totalCustomers = customers.length;
    const totalRevenue = customers.reduce((sum, c) => sum + (c.orderValue || 0), 0);
    const totalOrders = customers.reduce((sum, c) => sum + (c.totalOrders || 0), 0);
    const avgCustomerValue = totalCustomers > 0 ? Math.floor(totalRevenue / totalCustomers) : 0;

    res.json({
      success: true,
      totalCustomers,
      totalRevenue,
      avgCustomerValue,
      totalOrders
    });
  } catch (error) {
    console.error("Error calculating stats:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = getCustomerStats;
