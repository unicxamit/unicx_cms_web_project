import express from "express";

import isAuthenticated from "../middleware/isauthenticated.js";
import upload from "../middleware/multer.js";
import { LoginUser, LogoutUser, otpVerify, RegisterWithOtp, ResendOtp, sign } from "../controllers/userAuthController.js";
import { deleteUser, forgotPassword, forgotPasswordByAOtp, getSingleUser, getUserDetails, resetPassword, updateUserProfile, uploadImage, verifyPasswordOtp } from "../controllers/userProfileController.js";

const router = express.Router();

// Authentication Routes
router.post("/register", sign); // Standard registration
router.post("/register-otp", RegisterWithOtp); // Register with OTP
router.post("/verify-otp",isAuthenticated, otpVerify); // OTP verification should be POST
router.post("/resend-otp",isAuthenticated, ResendOtp); // Resend OTP
router.post("/login", LoginUser); // Login user
router.get("/logout",isAuthenticated, LogoutUser); // Logout user
router.post("/password/forgot",forgotPassword)
router.get("/password-reset/:token",resetPassword);
router.put("/update-image",isAuthenticated,upload.single("avatar"),uploadImage);
router.put("/update-user/:id",isAuthenticated,updateUserProfile);
router.get("/find-user/:id",isAuthenticated,getSingleUser);
router.delete("/delete-user/:id",deleteUser);
router.get("/find-all",getUserDetails);
// forgot password with otp 
router.put("/forgot-password-otp",forgotPasswordByAOtp)
// password otp verify
router.put("/forgot-password-otp-verification",verifyPasswordOtp)

export default router;
