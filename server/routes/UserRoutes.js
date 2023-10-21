import express from 'express';
import { addToPlaylist, changePassword, deleteMyProfile, deleteUser, forgetPassword, getAllUsers, getMyProfile, login, logout, register, removeFromPlaylist, resetPassword, updateProfile, updateProfilePicture, updateUserRole } from '../controllers/UserController.js';
import { authorizeAdmin, isAuthenticated } from '../middlewares/auth.js';
import singleUpload from '../middlewares/multer.js';

const router = express.Router();

// To register a new user
router.route('/register').post(singleUpload,register)

// Login
router.route('/login').post(login)


// Logout
router.route('/logout').get(logout);


// Get My Profile
router.route('/me').get(isAuthenticated,getMyProfile);

//Delete My Profile
router.route('/me').delete(isAuthenticated,deleteMyProfile)


// Change Password
router.route('/changepassword').put(isAuthenticated,changePassword);

// Update Profile
router.route('/updateprofile').put(isAuthenticated,updateProfile);


// Update profile picture
router.route('/updateprofilepicture').put(isAuthenticated,singleUpload,updateProfilePicture);

// Forgot Password
router.route('/forgetpassword').post(forgetPassword);
// Reset password
router.route('/resetpassword/:token').put(resetPassword);

// Add to playlist
router.route('/addtoplaylist').post(isAuthenticated,addToPlaylist);


//Remove from playlist
router.route('/removefromplaylist').delete(isAuthenticated,removeFromPlaylist)



//!  Admin Routes
// Get All Users
router.route('/admin/users').get(isAuthenticated,authorizeAdmin,getAllUsers)


// Update User Role
router.route('/admin/user/:id').put(isAuthenticated,authorizeAdmin,updateUserRole)

//Delete User
router.route('/admin/user/:id').delete(isAuthenticated,authorizeAdmin,deleteUser)


export default router;