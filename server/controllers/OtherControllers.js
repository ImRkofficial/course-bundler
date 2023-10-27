import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { Stats } from "../models/Stats.js";
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

    const stats = await Stats.find({}).sort({createdAt:'desc'}).limit(12);


    const statsData =[];

    
    for (let i = 0; i < stats.length; i++) {
        statsData.unshift(stats[i]);
        
    }
    const requiredSize = 12 - stats.length;

    for (let i = 0; i < requiredSize; i++) {
       statsData.unshift({
            users:0,
            subscription:0,
            views:0
       })
        
    }

    const userCount = statsData[11].users;
    const subscriptionCount = statsData[11].subscription;
    const viewCount = statsData[11].views;

    let userProfit =true;
    let subscriptionProfit = true;
    let viewsProfit = true;

    let userPercentage =0;
    let subscriptionPercentage= 0;
    let viewsPercentage = 0;

    if(statsData[10].users === 0) userPercentage = userCount *100;
    if(statsData[10].views === 0) viewsPercentage = viewCount *100;
    if(statsData[10].subscription === 0) subscriptionPercentage = subscriptionCount *100;

    else{
        const difference = {
            users:statsData[11].users - statsData[10].users,
            views:statsData[11].views - statsData[10].views,
            subscription:statsData[11].subscription - statsData[10].subscription
        }

        userPercentage = (difference.users / statsData[10].users) * 100;
        viewsPercentage = (difference.views / statsData[10].views) * 100;
        subscriptionPercentage = (difference.subscription / statsData[10].subscription) * 100;

        if(userPercentage < 0) userProfit=false;
        if(viewsPercentage < 0) viewsProfit=false;
        if(subscriptionPercentage < 0) subscriptionProfit=false;
    }


    res.status(200).json({
        stats:statsData,
        userCount,
        subscriptionCount,
        viewCount,
        userPercentage,
        viewsPercentage,
        subscriptionPercentage,
        userProfit,
        subscriptionProfit,
        viewsProfit
    })
}) 