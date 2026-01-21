import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const isAuthenticated = async (req, res, next) => {
  try {
    let token;

    // cookie token
    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // Authorization header token → Bearer eyJhbGci...
    else if (req.headers?.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }
console.log(token,"user token");
    // no token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not logged in",
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }

    req.user = user;
    req.userId = user._id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default isAuthenticated;



// role base Authenticatio check admin login or not

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
