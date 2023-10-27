import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { Course } from "../models/Course.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto";
import getDataUri from "../utils/dataUri.js";
import cloudinary from 'cloudinary';
import { Stats } from "../models/Stats.js";

export const register = catchAsyncError(async (req,res,next)=>{
    const {name,email,password} = req.body;


    if(!name || !email || !password)
    return next(new ErrorHandler('Please enter all fields',400));

    let user = await User.findOne({email});

    if(user){
        return next(new ErrorHandler('User already exist',409));
    }

    // Upload File on cloudinary
    const file =req.file;
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content)

    user = await User.create({
        name,email,password,avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
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

    const user = await User.findById(req.user._id);

    // Cloudinary Upload file
    const file = req.file;
    const fileUri = getDataUri(file);

    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    user.avatar ={
        public_id:myCloud.public_id,
        url:myCloud.secure_url
    }

    await user.save();

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


// ! Admin Controller
export const getAllUsers = catchAsyncError(async (req,res,next)=>{
    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    })
});


export const updateUserRole = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler('User not Found',404))
    }

    if(user.role === 'user'){
        user.role ='admin'
    }else{
        user.role='user'
    }

    await user.save();

    res.status(200).json({
        success:true,
        message:'User Role Updated'
    })
});


export const deleteUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler('User not found',404))
    };

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    // ! Cancel Subscription


    await User.deleteOne(user)

    res.status(200).json({
        success:true,
        message:"User deleted successfully"
    })
});


export const deleteMyProfile  = catchAsyncError(async(req,res,next)=>{
    const user  = await User.findById(req.user._id);

    await cloudinary.v2.uploader.destroy(user.avatar.public_id)

    // Cancel Subscription

    await User.deleteOne(user);

    res.status(200).cookie('token',null,{
        expires:new Date(Date.now())
    }).json({
        success:true,
        message:'Profile deleted successfully'
    })
})


User.watch().on('change',async ()=>{
    const stats = await Stats.find().sort({createdAt:'desc'}).limit(1)

    const subscription  = await User.find({"subscriptions.status":'active'})

    stats[0].users = await User.countDocuments();
    stats[0].subscription = subscription.length;
    stats[0].createdAt = new Date(Date.now());

    await stats[0].save();
})