
import User from '../Models/UserModel.js'; 
import jwt from 'jsonwebtoken';

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup a user
const signupUser = async (req, res) => {
  const { email, password, fname, lname, mobile } = req.body;

  try {
    const user = await User.signup(fname, lname, mobile, email, password);

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Sign out a user
const logoutUser = (req, res) => {
  try {
    // Invalidate the JWT token (by clearing the cookie or simply responding with success)
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Exporting all functions as default
export default {loginUser,signupUser,logoutUser};
