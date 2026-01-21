import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  updateBlogStatus,
} from "../controllers/blogsController.js";
import upload from "../middleware/multer.js";
import isAuthenticated, { isAdmin } from "../middleware/isauthenticated.js";

const router = express.Router();

router.post("/create-blogs", upload.array("images", 5), createBlog);
router.get("/getAllBlog", getAllBlogs);
router.get("/getBlogById/:id", getBlogById);
router.put("/update-blog/:id", upload.array("images", 5), updateBlog);

router.delete("/delete-blog/:id", deleteBlog);

router.patch("/update-status/:id", updateBlogStatus);
export default router;
