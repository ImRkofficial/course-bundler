import express from 'express';
import { getMyProfile, login, logout, register } from '../controllers/UserController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

// To register a new user
router.route('/register').post(register)

// Login
router.route('/login').post(login)


// Logout
router.route('/logout').get(logout);


// Get My Profile
router.route('/me').get(isAuthenticated,getMyProfile);


// Change Password
// Update Profile
// Update profile picture

// Forgot Password
// Reset password

// Add to playlist
//Remove from playlist

export default router;