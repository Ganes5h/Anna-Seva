const Admin = require('../models/adminModel'); // Adjust the path as necessary
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = 'Secret$1234@';

// Signup Controller
exports.signup = async (req, res) => {
  const { username, password, email, role } = req.body;

  try {
    // Check if user already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      username,
      password: hashedPassword,
      email,
      role
    });

    const newAdmin = await admin.save();
    res.status(201).json({ message: 'Admin registered successfully', admin: newAdmin });
  } catch (error) {
    res.status(500).json({ error: 'Error registering admin', details: error.message });
  }
};

// Login Controller
// exports.login = async (req, res) => {
//   const { email, password,role } = req.body;

//   try {
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     const token = jwt.sign({ adminId: admin._id, role: role }, JWT_SECRET, { expiresIn: '1h' });

//     res.json({ message: 'Login successful', token });
//   } catch (error) {
//     res.status(500).json({ error: 'Error logging in', details: error.message });
//   }
// };
