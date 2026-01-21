import express from "express";
import {
  createCaseStudy,
  deleteCaseStudy,
  getAllCaseStudieswithcategory,
  getCaseStudyById,
  updateCaseStudy,
  updateCaseStudyStatus,
} from "../controllers/caseStudyController.js";
import upload from "../middleware/multer.js";
// import isAuthenticated, { isAdmin } from "../middleware/isauthenticated.js";

const router = express.Router();

router.post("/create-casestudy", upload.array("images", 5), createCaseStudy);
router.get("/getAllcasestudy", getAllCaseStudieswithcategory);
router.get("/getcasestudyById/:id", getCaseStudyById);
router.put("/update-casestudy/:id", upload.array("images", 5), updateCaseStudy);

router.delete("/delete-casestudy/:id", deleteCaseStudy);

router.patch("/update-status/:id", updateCaseStudyStatus);
export default router;
