import express from 'express';
import { addToPlaylist, changePassword, forgetPassword, getMyProfile, login, logout, register, removeFromPlaylist, resetPassword, updateProfile, updateProfilePicture } from '../controllers/UserController.js';
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
router.route('/changepassword').put(isAuthenticated,changePassword);

// Update Profile
router.route('/updateprofile').put(isAuthenticated,updateProfile);


// Update profile picture
router.route('/updateprofilepicture').put(isAuthenticated,updateProfilePicture);

// Forgot Password
router.route('/forgetpassword').post(forgetPassword);
// Reset password
router.route('/resetpassword/:token').put(resetPassword);

// Add to playlist
router.route('/addtoplaylist').post(addToPlaylist);


//Remove from playlist
router.route('/removefromplaylist').delete(removeFromPlaylist)

export default router;