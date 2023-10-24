import jwt from 'jsonwebtoken';
import { catchAsyncError } from './catchAsyncErrors.js';
import ErrorHandler from '../utils/errorHandler.js';
import { User } from '../models/User.js';



export const isAuthenticated = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler('Please Log In',401))
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    // console.log(decoded);

    req.user =await User.findById(decoded._id);
    next();
});


export const authorizeAdmin =(req,res,next)=>{
    if(req.user.role !== 'admin'){
        return next(new ErrorHandler(`${req.user.role} have not access for this resource`,403))
    }

    next();
}

export const authorizeSubscriber = (req,res,next)=>{
    if(req.user.subscription.status !== 'active' && req.user.role !== 'admin'){
        return next(new ErrorHandler('Only Subscribers can access this resource',403))
    }

    next();
}