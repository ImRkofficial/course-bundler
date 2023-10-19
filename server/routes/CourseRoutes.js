import express from 'express';
import { addLecture, createCourse, getAllCourses, getCourseLectures } from '../controllers/CourseController.js';
import singleUpload from '../middlewares/multer.js';

const router = express.Router();

// Get All Courses without lectures
router.route('/courses').get(getAllCourses);

// Create new Course -Only Admin
router.route('/createcourse').post(singleUpload,createCourse);

// Add lecture ,delete course ,get course details

// Get Lectures
router.route('/course/:id',).get(getCourseLectures)

// Add Lectures
router.route('/course/:id').post(singleUpload,addLecture)

// Delete lecture

export default router;