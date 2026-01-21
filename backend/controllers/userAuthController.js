import userModel from "../models/userModel.js"
import sendToken from "../utils/jwttokne.js";

import sendEmail from "../utils/sendEmail.js";
import dotenv from "dotenv"
// import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
dotenv.config();
// import VerifyEmail from "../utils/verifyEmail.js";
// import jwt from "jsonwebtoken";
// const getJWTToken=(id)=>{
//    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.EXPIRES_TOKEN})
// }


export const sign = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Provide email, name, and password" });
    }

    const checkEmail = await userModel.findOne({ email });
    if (checkEmail) {
      return res.status(401).json({ message: "Email already exists" });
    }

    const user = await userModel.create({ name, email, password });

    // const verifyemail = `${process.env.CLIENT_URL}/verify-email?code=${user?._id}`;
    // const message = `Hi ${name}, click here to verify your email: ${verifyemail}`;
    // try {
    //   await sendEmail({
    //     to: user.email,  // ✅ Fix field name
    //     subject: "Verify Email for Registration",
    //     message,
    //     message:VerifyEmail({
    //       name,
    //       url:verifyemail,
    //     })
    //   });
    // } catch (error) {
    //   console.error("Error sending email:", error);
    //   return res.status(500).json({ message: "Email sending failed" });
    // }
   sendToken(user,200,res)
  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


// sendEmail verification using otp 
export const RegisterWithOtp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide name, email, and password",
        error: true,
        success: false,
      });
    }

    // Check if email already exists
    const checkEmail = await userModel.findOne({ email });
    if (checkEmail) {
      return res.status(401).json({
        message: "Email already exists",
        error: true,
        success: false,
      });
    }

    // Generate OTP and expiration time
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user in database
    const user = await userModel.create({
      name,
      email,
      password,
      otp,
      otpExpires,
    });

    // Debugging: Check if user.email is defined
    if (!user.email) {
      console.log("Error: User email is undefined or null.");
      return res.status(500).json({
        message: "Failed to send OTP, email is missing.",
        error: true,
        success: false,
      });
    }

    console.log("Sending OTP to:", user.email); // Debugging log

    // Construct OTP message
    const message = `<h1>Your OTP is: ${otp}</h1><br/><p>This OTP will expire in ${otpExpires} minutes.</p>`;

    try {
      // Send OTP via email
      await sendEmail({
        to: user.email, // Ensure 'to' is correctly set
        subject: "OTP for Email Verification",
        message,
      });

      console.log("OTP email sent successfully.");
    } catch (error) {
      console.log("Email sending error:", error);
      return res.status(500).json({
        message: "Failed to send OTP email.",
        error: true,
        success: false,
      });
    }

    // Send token response
    sendToken(user, 201, res);
  } catch (error) {
    console.log("Registration Error:", error);
    next(error);
  }
};




// verification for email registration throw OTP;

export const otpVerify = async (req, res, next) => {
  try {
    // const { email, otp } = req.body;
    const {otp} = req.body;
    // Check if OTP is provided
    if (!otp) {
      return res.status(400).json({ message: "OTP is missing" });
    }

    // Find user by email (Fixed incorrect query)
    // const user = await userModel.findOne({ email });

    // // Check if user exists
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }
const user= req.user;
    // Check if OTP is valid
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if OTP has expired
    if (Date.now() > user.otpExpires) {
      return res.status(400).json({ message: "OTP has expired. Please request a new OTP" });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = null; // Reset OTP
    user.otpExpires = null; // Reset OTP expiry

    // Save user without running validation
    await user.save({ validateBeforeSave: false });

    // Send response with token
    sendToken(user, 200, res, "Email has been verified.");
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// Reset Verified otp if not match 

export const ResendOtp = async (req, res, next) => {
  try {
    const { email } = req.user;

    if (!email) {
      return res.status(400).json({ message: "Email is required to resend OTP" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "This account is already verified" });
    }

    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    user.otp = newOtp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    console.log("Generated OTP:", newOtp); // ✅ Debugging

    const message = `<h1>Your new OTP is: ${newOtp}</h1>`;

    try {
      const sendotp = await sendEmail({
        to: user.email, // ✅ Fix: Use 'to' instead of 'email'
        subject: "Resend OTP for email verification",
        message: message,
      });

      console.log("OTP Sent Successfully:", sendotp); // ✅ Debugging

      return res.status(200).json({
        status: "success",
        message: "A new OTP has been sent to your email",
      });
    } catch (error) {
      console.error("Email Sending Failed:", error);
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({ message: "Error sending email! Please try again", error });
    }
  } catch (error) {
    console.error("Reset OTP Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// verification email by link
export const VerificationEmail=async(req,res,next)=>{
  try{
       const {code}= req.body;
       const user= await userModel.findOne({_id:code});
       if(!user){
        return res.status(400).json({
          message:"Invalid User",
          error:true,
          success:false,
        })
       }
       const updatedUser= await userModel.updateOne({_id:code},{
        verify_email:true,
       })
       res.status(200).json({
        message:"Email Verification done",
        success:true,
        error:false,
        
       })

  }catch(error){
    console.log(error);
    next();
  }
}

// Login user api 

export const LoginUser=async(req,res,next)=>{
      try{
        const {email,password}=req.body;
      const user= await userModel.findOne({email}).select("+password");
      if(!user){
        return res.status(400).json({message:"Invalid email or password"});
      }
      if(user.status!=="Active"){
        return res.status(400).json("Please connect to tha admin")
       }
      const isMatchPassword= await user.comparePassword(password);
      console.log(isMatchPassword,"password match");
       if(!isMatchPassword){
        return next(res.status(401).json({message:"Invalid email or password"}))
       }
      //  if(user.status){
      //   return res.status(400).json("user already login")
      //  }

       sendToken(user,200,res);
      }catch(error){
        console.log(error);
        next();
      }
}

// logout functionality
// export const LogoutUser = async (req, res, next) => {
//   try {
//     const userId = req.user.id;   // must come from auth middleware

//     await userModel.findByIdAndUpdate(userId, {
//       status: "Inactive"
//     });

//     res.cookie("token", "", {
//       expires: new Date(0),
//       httpOnly: true,
//       secure: true,
//       sameSite: "None"
//     });

//     return res.status(200).json({
//       success: true,
//       message: "User logged out & marked as Inactive"
//     });

//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

export const LogoutUser = async (req, res, next) => {
  try {

    res.cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: true,
      sameSite: "None"
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};