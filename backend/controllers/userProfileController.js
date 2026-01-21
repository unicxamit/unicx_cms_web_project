
import userModel from "../models/userModel.js"
import sendToken from "../utils/jwttokne.js";

import sendEmail from "../utils/sendEmail.js";
import dotenv from "dotenv"
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
dotenv.config();

 export  const forgotPassword=async(req,res,next)=>{
  try{
   const {email}=req.body;
  const user=await userModel.findOne({email});
  if(!user){
    res.status(400).json({
      message:"user not found",
    })
  }
  const resetToken= user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken}`
    const message=`Your reset passsword token is :- /n/n ${resetPasswordUrl} /n/n if not requested please ignore it!`;
    
    try{
      await sendEmail({
        to:user.email,
        subject:"Reset Password Recovery Email",
        message,
      })
     res.status(200).json({
      status:"success",
      message:`Email send to ${user.email} successfully`,
     })
    }catch(error){
      user.resetPasswordToken=undefined,
      user.resetPasswordExpire=undefined,
      user.save({
        validateBeforeSave:false
      })
      console.log(error,"resetPassword email sending error")
    }
  }catch(error){

    console.log(error,"forgot password token");
    next()
  }
}

// Reset Password 

export const resetPassword =async(req,res,next)=>{
  try{
  // create reset token 
  const createToken= crypto.createHash("sha256")
  .update(req.params.token)
  .digest("hex");

  const user= await userModel.findOne({resetPasswordToken,resetPasswordExpire:{$gt: Date.now()}});
  if(!user){
    return res.status(400).json("Reset Password Token is invalid or has been expired");
  }
  if(req.body.password !== req.body.confirmPassword){
     return res.status(401).json("password does not match");
  }
  user.password=req.body.params,
  user.resetPasswordToken=undefined,
  user.resetPasswordExpire=undefined
  await user.save();
  sendToken(user,200,res);
  }catch(error){
    console.log(error)
    next()
  }
}

// update password

export const updatePassword=async(req,res,next)=>{
  try{
      const user= await userModel.findById(req.user.id).select("+password");
      const isPasswordMatched= await user.comparePassword(req.body.oldPassword);
      if(!isPasswordMatched){
        return res.status(400).json("old password is not currect")
      }

      if(req.body.password !== req.body.confirmPassword){
        return res.status(401).json("password does not match");
      }
      user.password=req.body.newPassword;
      await user.save();
      sendToken(user,200,res);
  }catch(error){
    console.log(error,"update password error")
    next()
  }
}

// upload image avtar 

export const uploadImage=async(req,res,next)=>{
  try{
    const userId=req.userId;
    console.log(userId,"user details")
       const image=req.file;
      
       const upload= await uploadImageCloudinary(image);
      const updateUser= await userModel.findByIdAndUpdate(userId,{
        avatar:upload.url
      })
       return res.json({message:"upload profile",data:{
        _id:userId,
        avatar:upload.url
       }})        
  }catch(error){
    console.log(error,"image uploading error");
    next()
  }
}

// update user profile
export const updateUserProfile=async(req,res,next)=>{
  try{
    const userId=req.userId;
    const {name,email,mobile}=req.body;
    const updatedUser = await userModel.findById(userId);
    if(!updatedUser){
      return next(res.status(200).json({
        message:"user id does not find"
      }))
    }
    // let hashpassword=""
    // if(password){
    //   hashpassword= await userModel.
    // }
    const user=await userModel.updateOne({_id:userId},{
      // ...{name $$ {name:name}},
      ...(name &&{name:name}),
      ...(email && {email:email}),
      ...(mobile && {mobile:mobile})
    })
    // const updatedUser = await userModel.findById(userId); // 🔥 fetch updated user

    // sendToken(updatedUser, 201, res);
    // sendToken(user,201,res)
    res.status(202).json({
      status:true,
      message:"user updated successfully",
      user
    })
  }catch(error){
    console.log(error,"update profile error");
    next()
  }
}

// get single user
export const getSingleUser=async(req,res,next)=>{
  try{
    const userId=req.userId;
    console.log(userId,"userId")
     const user= await userModel.findById(userId);
     if(!user){
      return res.status(400).json({
        message:"user not find"
      })
     }
     res.status(200).json({
      status:true,
      message:"user is find",
      user,
     })
  }catch(error){
    console.log(error,"find user error");
  }
}

// delete user

export const deleteUser=async(req,res,next)=>{
try{
   const userId=req.userId;
console.log(userId,"userId")
   const user= await userModel.findByIdAndDelete(req.params.id);
   console.log(user,"delete user")
   if(!user){
     return next(res.status(401).json("this user id not find"))
   }
   res.status(200).json({
    status:true,
    message:"user deleted successfully",
   })
}catch(error){
  console.log(error,"delete error")
  next()
}
}

// get all user 

export const getUserDetails=async(req,res,next)=>{
  try{
      const user= await userModel.find();
      res.status(201).json({
        status:true,
        message:"get all user",
        user,
      })
  }catch(error){
    console.log(error,"user error")
    next()
  }
}


// forgot password by a otp 
export const forgotPasswordByAOtp=async(req,res,next)=>{
  try{
   const {email}=req.body;
   const user= await userModel.findOne({email})
   if(!user){
    return next(res.status(401).json({message:"user email not find"}));
   }
   let otp= Math.floor(10000+Math.random()*90000).toString();
   let otpExpires=new Date(Date.now()+10*60*1000);

   const update= await userModel.findByIdAndUpdate(user._id,{
    forget_password_otp:otp,
    forget_password_expiry:new Date(otpExpires).toISOString(),
   })
   const message = `<h1>Your OTP is: ${otp}</h1><br/><p>This OTP will expire in ${otpExpires} minutes.</p>`;
   try{
   await  sendEmail({
    to:email,
    subject:"forgot password otp ",
    message
   })
   }catch(error){
    console.log(error)
   }
  return res.json({
    message:"check your email",
    success:true,
  })
  }catch(error){
    console.log(error,"forgot password error")
    next()
  }
}


// verify forgot password otp 
export const verifyPasswordOtp=async(req,res,next)=>{
  try{
   const {email,otp}=req.body;
   if(!email || !otp){
    return next(res.status(401).json({
      message:"email and otp not find"
    }))
   }
   const user= await userModel.findOne({email});
   if(!user){
    return next(res.status(400).json({
      message:"using this email user not find"
    }))
   }
  //  expirestoken not exed current date
  if(user.forget_password_expiry<new Date().toISOString()){
    return next(res.status(401).json({
      message:"your otp expire"
    }))
  }
  if(otp!== user.forget_password_otp){
    return next(res.status(400).json({
      message:"Invalid otp "
    }))
  }
  res.status(200).json({
    status:true,
    message:"otp verified successfully "
  })
  }catch(error){
    console.log(error,"verify otp error")
    next()
  }
}

// reset password by otp
export const resetPasswordOtp=async(req,res,next)=>{
  try{
    const {email,newPassword,confirmPassword}=req.body;
    const user=await userModel.findOne({email});
    if(!user){
      return next(res.status(401).json({
        message:"user not find"
      }))
    }
    const isPasswordMatched= await user.comparePassword(req.body.oldPassword);
    if(newPassword !== confirmPassword){
      return next(res.status(401).json({
        message:"newPassword and confirem password not same."
      }))
    }

    const update= await userModel.findByIdAndUpdate(user._id,{
      password:newPassword
    })
    res.status(201).json({
      status:true,
      message:"password updated"
    })
  }catch(error){
    console.log(error,"reset password error")
    next()
  }
}