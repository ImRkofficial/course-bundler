import express from 'express';
import { createCourse, getAllCourses } from '../controllers/CourseController.js';

const router = express.Router();

// Get All Courses without lectures
router.route('/courses').get(getAllCourses);

// Create new Course -Only Admin
router.route('/createcourse').post(createCourse);

// Add lecture ,delete course ,get course details

// Delete lecture

export default router;