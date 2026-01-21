// import dotenv from "dotenv";
// dotenv.config();
import express from 'express';

import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connectDatabase from "./config/dbConfig.js"
// import authRoutes from "./route/userRoute.js";
import categoryRoute from "./routes/categoryRoutes.js";
import faq from "./routes/faqRoutes.js"
import blogs from "./routes/blogsRoutes.js"
import casestudy from "./routes/caseStudyRoutes.js"
import servicedetails from "./routes/serviceDetailsRoutes.js"
import service from "./routes/serviceRoutes.js"
import subcategory from "./routes/subcategoryRoutes.js"
import authuser from "./routes/userauthRoutes.js"
const app = express();
dotenv.config();
app.use(cors({
    credentials: true,
    // origin: process.env.CLIENT_URL || "*" 
}));

app.use(express.json());   // << REQUIRED
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("combined"));

app.use(helmet({
    crossOriginResourcePolicy: false,
}));

app.use("/api/v1/auth",authuser);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/faq", faq);
app.use("/api/v1/blog", blogs);
app.use("/api/v1/casestudy", casestudy);
app.use("/api/v1/servicedetails", servicedetails);
app.use("/api/v1/service",service)
app.use("/api/v1/subcategory",subcategory)
// Global Error Handler
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  // const message = error.message || "";
  res.status(statusCode).json({
    status: "error",
    message: error.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
});
connectDatabase()
const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
