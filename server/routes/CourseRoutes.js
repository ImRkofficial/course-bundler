import express from 'express';
import { addLecture, createCourse, deleteCourse, deleteLecture, getAllCourses, getCourseLectures } from '../controllers/CourseController.js';
import singleUpload from '../middlewares/multer.js';
import { authorizeAdmin, isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

// Get All Courses without lectures
router.route('/courses').get(getAllCourses);

// Create new Course -Only Admin
router.route('/createcourse').post(isAuthenticated,authorizeAdmin,singleUpload,createCourse);


// Add lecture ,delete course ,get course details

// Get Lectures
router.route('/course/:id',).get(isAuthenticated,getCourseLectures)

// Add Lectures
router.route('/course/:id').post(isAuthenticated,authorizeAdmin,singleUpload,addLecture)

// Delete Course
router.route('/course/:id').delete(isAuthenticated,authorizeAdmin,deleteCourse)


// Delete Lecture
router.route('/lecture').delete(isAuthenticated,authorizeAdmin,deleteLecture)

export default router;