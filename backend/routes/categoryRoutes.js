import express from "express";
import { createCategory, deleteAllCategories, deleteCategory, getAllCategories, getAllCategoriesStatus, getCategoryById, updateCategory, updateCategoryOrder, updateCategoryStatus } from "../controllers/categoryController.js";
import upload from "../middleware/multer.js";
import isAuthenticated, { isAdmin } from "../middleware/isauthenticated.js";

const router =express.Router();

router.post("/create-category",upload.single("image"), createCategory);
router.get("/getAllcategory",getAllCategories);
router.get("/getcategoryById/:id",getCategoryById);
router.put("/update-category/:id",updateCategory);
router.delete("/delete-category/:id",deleteCategory);
router.put("/reorder/category", updateCategoryOrder);
router.delete("/delete-category",deleteAllCategories);
router.patch("/update-status/:id", updateCategoryStatus);
router.delete("/getcategorystatus",getAllCategoriesStatus);
export default router;