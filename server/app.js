import { config } from 'dotenv';
config({
    path: './config/config.env'
})
import express from 'express';
import ErrorMiddleware from './middlewares/Error.js';
import cookieParser from 'cookie-parser';


const app = express();

// Using middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())



// Importing and Using routes
import course from './routes/CourseRoutes.js';
import user from './routes/UserRoutes.js';
import payment from './routes/PaymentRoutes.js';
app.use('/api/v1', course);
app.use('/api/v1', user);
app.use('/api/v1', payment);




export default app;


app.use(ErrorMiddleware);
