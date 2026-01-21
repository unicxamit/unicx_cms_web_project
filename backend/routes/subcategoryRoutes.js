import express from "express";
import { createSubCategory, deleteSubCategory, getAllSubCategories, getSubCategoriesByCategory, getSubCategoryById, updateSubCategory, updateSubCategoryOrder, updateSubCategoryStatus } from "../controllers/subCategoryController.js";
import upload from "../middleware/multer.js";
import isAuthenticated, { isAdmin } from "../middleware/isauthenticated.js";


 

const router = express.Router();

router.post("/create-subCategory",upload.single("image"), createSubCategory);
router.get("/getAllSubcategory", getAllSubCategories);
router.get("/getSubCategoryById/:id", getSubCategoryById);
router.get("/getSubCategory/category/:categoryId", getSubCategoriesByCategory);
// router.get("/subcategory/:subCategoryId", getServicesBysubCategory);
router.put("/update-subcategory/:id",upload.single("image"),updateSubCategory);
router.delete("/delete-subcategory/:id", deleteSubCategory);
router.patch("/subcategory/status/:id", updateSubCategoryStatus);
router.put("/reorder/subcategory", updateSubCategoryOrder);

export default router;


