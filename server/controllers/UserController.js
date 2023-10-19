import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { Course } from "../models/Course.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto";

export const register = catchAsyncError(async (req,res,next)=>{
    const {name,email,password} = req.body;

    // const file =req.file;

    if(!name || !email || !password)
    return next(new ErrorHandler('Please enter all fields',400));

    let user = await User.findOne({email});

    if(user){
        return next(new ErrorHandler('User already exist',409));
    }

    // Upload File on cloudinary

    user = await User.create({
        name,email,password,avatar:{
            public_id:'temp id',
            url:'tempurl'
        }
    })

    sendToken(res,user,'User Registered Successfully',201)

});

export const login = catchAsyncError(async (req,res,next)=>{
    const {email,password} = req.body;


    if(!email || !password)
    return next(new ErrorHandler('Please enter all fields',400));

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler('Incorrect email or password',401));
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return next(new ErrorHandler('Incorrect Email or Password',401))
    }

    sendToken(res,user,`Welcome Back ${user.name}`,200);

});


export const logout = catchAsyncError(async(req,res,next)=>{
    res.status(200).cookie('token',null,{
        expires:new Date(Date.now())
    }).json({
        success:true,
        message:"Logged Out Successfully"
    })
});


export const getMyProfile= catchAsyncError(async (req,res,next)=>{
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success:true,
        user
    });
});


export const changePassword= catchAsyncError(async (req,res,next)=>{
    const {oldPassword,newPassword}= req.body;
    if(!oldPassword || !newPassword){
        return next(new ErrorHandler('Please enter all fields',400))
    }

    const user = await User.findById(req.user._id).select('+password');

    const isMatch = await user.comparePassword(oldPassword);

    if(!isMatch){
        return next(new ErrorHandler('Incorrect Old Password',400))
    }

    user.password = newPassword;

    await user.save()

    res.status(200).json({
        success:true,
        message:"Password change successfully"
    });
});


export const updateProfile= catchAsyncError(async (req,res,next)=>{
    const {name,email}= req.body;

    const user =await User.findById(req.user._id);
    if(name) user.name=name;
    if(email) user.email=email;

    await user.save()

    res.status(200).json({
        success:true,
        message:"Profile updated successfully"
    });
});



export const updateProfilePicture = catchAsyncError(async(req,res,next)=>{
    // Cloudinary TODO
    res.status(200).json({
        success:true,
        message:"Profile picture updated successfully"
    });
})


export const forgetPassword = catchAsyncError(async(req,res,next)=>{

    const {email} = req.body;

    const user =await User.findOne({email});

    if(!user){
        return next(new ErrorHandler('User Not Found',404));
    }

    const resetToken = await user.getResetToken();

    await user.save();

    let url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    let message = `Click on the Link for reset your password ${url} and If you not did any request then ignore it.`

   await sendEmail(user.email,'CourseBundler Reset Password',message)

    res.status(200).json({
        success:true,
        message:`Reset token has been sent to ${user.email}`
    });
})


export const resetPassword = catchAsyncError(async(req,res,next)=>{
    const {token} = req.params;

    const resetPasswordToken= crypto.createHash('sha256').update(token).digest('hex');

    const user = await  User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{
            $gt:Date.now()
        }
    });

    if(!user){
        return next(new ErrorHandler('Token is invalid or has been expired',401))
    }

    user.password = req.body.password;
    user.resetPasswordExpire= undefined;
    user.resetPasswordToken=undefined;

    await user.save();

    res.status(200).json({
        success:true,
        message:"Password changed successfully",
    });
});


export const addToPlaylist = catchAsyncError(async(req,res,next)=>{

    const user = await User.findById(req.user._id);

    const course = await Course.findById(req.body.id);

    if(!course){
        return next(new ErrorHandler('Inavaild Course Id',404));
    }

    const itemExist = user.playlist.find((item)=>{
        if(item.course.toString() === course._id.toString())
        return true;
    })

    if(itemExist){
        return next(new ErrorHandler('Item Already Added',409));
    }

    user.playlist.push({
        course:course._id,
        poster:course.poster.url
    })

    await user.save();


    res.status(200).json({
        success:true,
        message:'Added to playlist'
    })
});


export const removeFromPlaylist = catchAsyncError(async(req,res,next)=>{

    const user = await User.findById(req.user._id);

    const course = await Course.findById(req.query.id);

    if(!course){
        return next(new ErrorHandler('Course Id Invalid',404))
    }

    const newPlayList = user.playlist.filter(item=>{
        if(item.course.toString() !== course._id.toString())
        return item
    })

    user.playlist = newPlayList;

    await user.save();


    res.status(200).json({
        success:true,
        message:"Removed from playlist"
    })
});


