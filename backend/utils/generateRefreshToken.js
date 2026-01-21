import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

const generateRefreshToken=async(userId)=>{
   const token= jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:process.env.EXPIRES_REFRESH_TOKEN})
   const updateRefreshTokenUser=await userModel.updateOne({_id:userId},{ Refresh_token:token})
}

export default generateRefreshToken;