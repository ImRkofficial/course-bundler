import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { instance } from '../server.js';
import crypto from 'crypto';
import { Payment } from "../models/Payment.js";


export const buySubscription = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user._id);

    if (user.role == 'admin') {
        return next(new ErrorHandler(`Admin can't buy subscription`, 500))
    };

    const planId = process.env.PLAN_ID;

    const subscription = await instance.subscriptions.create({
        plan_id: planId,
        customer_notify: 1,
        total_count: 12,
    });


    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;


    await user.save();

    res.status(201).json({
        success: true,
        subscriptionId: subscription.id
    })

});

export const paymentVerification = catchAsyncError(async (req, res, next) => {
    const { razorpay_signature, razorpay_subscription_id, razorpay_payment_id } = req.body;

    const user = await User.findById(req.user._id);

    const subscription_id = user.subscription.id;

    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY).update(razorpay_payment_id + '|' + subscription_id, 'utf-8').digest('hex');

    const isAuthantic = generated_signature === razorpay_signature;

    if(!isAuthantic){
        return res.redirect(`${process.env.FRONTEND_URL}/paymentfail`)
    }

    await PaymentMethodChangeEvent.create({
         razorpay_signature,
         razorpay_subscription_id,
         razorpay_payment_id 
    })

    user.subscription.status=='active';

    await user.save();
    res.redirect(`${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`)
})

export const getRazorPayKey = catchAsyncError(async (req,res,next)=>{
    res.status(200).json({
        success:true,
        key:process.env.RAZORPAY_API_KEY
    })
})


export const cancelSubscription = catchAsyncError(async (req,res,next)=>{
    const user = await User.findById(req.user._id);

    const subscriptionId = user.subscription.id;
    let refund =false;

    await instance.subscriptions.cancel(subscriptionId)

    const payment =await Payment.findOne({razorpay_subscription_id:subscriptionId})

    const gap = Date.now() - payment.createdAt;

    const refundTime =process.env.REFUND_DAYS * 24 * 60 * 60 * 1000;

    if(gap < refundTime){
        await instance.payments.refund(payment.razorpay_payment_id);
        refund=true
    }

    await payment.deleteOne();

    user.subscription.id=undefined;
    user.subscription.status=undefined;

    await user.save();

    res.status(200).json({
        success:true,
        message:refund ? "Subscription Cancelled, Your payment willbe refund within 7 working days" :"Subscription Cancelled, Now refund initiated as subscription was cancelled after 7 days."
    })
})
