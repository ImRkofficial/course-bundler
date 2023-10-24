import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";

export const contact = catchAsyncError(async (req,res,next)=>{
    const {name,email,message} = req.body;

    if(!name || !email || !message){
        return next(new ErrorHandler('Please Fill all fields',400))
    }

    const to =process.env.MY_MAIL;
    const subject = "Contact From CourseBundler";
    const text = `I am ${name} and email is ${email} \n
            ${message}`;

    await sendEmail(to,subject,text)

    res.status(200).json({
        success:true,
        message:"Your message has been sent."
    })
})


export const requestCourse = catchAsyncError(async (req,res,next)=>{
    const {name,email,course} = req.body;
    
    if(!name || !email || !course){
        return next(new ErrorHandler('Please Fill all fields',400))
    }
    const to =process.env.MY_MAIL;
    const subject = "Course Request From CourseBundler";
    const text = `I am ${name} and email is ${email} \n
            ${course}`;

    await sendEmail(to,subject,text)
    res.status(200).json({
        success:true,
        message:'Your Request has been sent.'
    })
})


export const getDashBoardStats = catchAsyncError(async (req,res,next)=>{
    res.status(200).json({
        success:true
    })
})