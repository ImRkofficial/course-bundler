import express from 'express';
import { contact, getDashBoardStats, requestCourse } from '../controllers/OtherControllers.js';
import { authorizeAdmin,isAuthenticated } from '../middlewares/auth.js';
const router = express.Router();


// Contact
router.route('/contact').post(contact);

// Request Course
router.route('/courserequest').post(requestCourse);

//Admin DashBoard
router.route('/admin/stats').get(isAuthenticated,authorizeAdmin,getDashBoardStats)


export default router;