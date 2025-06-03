const  User= require('../Models/User');

const createuser= async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, companyName } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'First name, last name, email, and password are required',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists',
      });
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      role,
      companyName,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      UserId: newUser._id,
    });
  } catch (err) {
    console.error('Error creating User:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error while creating User',
    });
  }
};

module.exports = createuser;
